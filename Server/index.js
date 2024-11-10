const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

// Import models
const User = require('./models/usermodel');
const MissingChild = require('./models/missingchild');
const LostChild = require('./models/lostchildmodel');
const Event = require('./models/eventmodel'); // Assuming Event model is created
const Adoption = require('./models/adoptionmodel1');
// Initialize the app
const app = express();

// Enable CORS for all routes globally
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend origin
  credentials: true, // Allow credentials like cookies
}));

// Middleware setup
app.use(express.json());
app.use(cookieParser()); // For accessing cookies

// MongoDB connection
mongoose.connect('your connection string here', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Multer configuration for image uploads
const storageUserPic = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'userpic/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const uploadUserPic = multer({ storage: storageUserPic });

const storageMissingChild = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload2/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const uploadMissingChild = multer({ storage: storageMissingChild });

const storageLostChild = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const uploadLostChild = multer({ storage: storageLostChild });

// ----------------------------- User Registration API -----------------------------
app.post('/register', uploadUserPic.single('photo'), async (req, res) => {
  try {
    const { name, mobile, email, category, password, id } = req.body;
    if (!name || !mobile || !email || !category || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Profile photo is required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      mobile,
      email,
      category,
      password: hashedPassword,
      id,
      photo: req.file.filename,
    });

    const savedUser = await newUser.save();
    res.status(200).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// ----------------------------- User Login API -----------------------------
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No user found with this email' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    res.cookie('userId', user._id, { httpOnly: true, secure: false });
    res.json({ message: 'Login successful', userId: user._id, category: user.category });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// ----------------------------- Get Logged-in User Info API -----------------------------
app.get('/user/me', async (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const photoUrl = user.photo ? `http://localhost:3001/${user.photo}` : null;
    res.json({ ...user._doc, photoUrl: photoUrl || 'default-url' });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  // Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// ----------------------------- Event Creation API -----------------------------
app.post('/create-event', async (req, res) => {
  const { title, date, location, time, objectives } = req.body;
  const submittedBy = req.cookies.userId; // Assuming userId is stored in cookies

  if (!submittedBy) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  if (!title || !date || !location || !time || !objectives) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newEvent = new Event({
      title,
      date,
      location,
      time,
      objectives,
      submittedBy,
      approved: false, // This will be false by default, but explicitly setting it for clarity
    });
    const savedEvent = await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: savedEvent });
  } catch (error) {
    console.error('Error creating event:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ----------------------------- Add Missing Child API -----------------------------
app.post('/add-missing-child', uploadMissingChild.single('childPhoto'), async (req, res) => {
  const { parentName, contactNumber, childName, age, gender, lastSeen, description } = req.body;
  const childPhoto = req.file ? req.file.filename : null;
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  try {
    const newChild = new MissingChild({
      parentName,
      contactNumber,
      childName,
      age,
      gender,
      lastSeen,
      description,
      childPhoto,
      submittedBy: userId,
    });
    const savedChild = await newChild.save();
    res.status(201).json({ message: 'Child data saved successfully', child: savedChild });
  } catch (err) {
    console.error('Error saving child data:', err.message);
    res.status(500).json({ message: 'Error saving child data', error: err.message });
  }
});

// ----------------------------- Add Lost Child API -----------------------------
app.post('/add-lost-child', uploadLostChild.single('childPhoto'), async (req, res) => {
  const { childName, age, gender, lastSeenLocation, description, guardianName, contactInfo, additionalComments } = req.body;
  const childPhoto = req.file ? req.file.filename : null;
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  try {
    const newLostChild = new LostChild({
      submittedBy: userId,
      childName,
      age,
      gender,
      lastSeenLocation,
      description,
      guardianName,
      contactInfo,
      additionalComments,
      childPhoto,
    });
    const savedLostChild = await newLostChild.save();
    res.status(201).json({ message: 'Lost child report saved successfully', child: savedLostChild });
  } catch (err) {
    console.error('Error saving lost child report:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// ----------------------------- Get All Lost Children API -----------------------------
app.get('/all-lost-children', async (req, res) => {
  try {
    const lostChildren = await LostChild.find();
    res.status(200).json(lostChildren);
  } catch (err) {
    console.error('Error fetching lost children:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ----------------------------- Close Case API -----------------------------
app.put('/close-case/:id', async (req, res) => {
  const { founded } = req.body;
  const childId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(childId)) {
    return res.status(400).json({ message: 'Invalid child ID' });
  }
  try {
    const updatedChild = await LostChild.findByIdAndUpdate(childId, { founded }, { new: true });
    if (!updatedChild) {
      return res.status(404).json({ message: 'Child not found' });
    }
    res.status(200).json(updatedChild);
  } catch (err) {
    console.error('Error closing the case:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// ----------------------------- Get Rescue Data API -----------------------------
app.get('/rescue-data', async (req, res) => {
  try {
    const rescuesDone = await LostChild.countDocuments({ founded: true });
    const rescuesRemaining = await LostChild.countDocuments({ founded: false });
    res.status(200).json({ rescuesDone, rescuesRemaining });
  } catch (err) {
    console.error('Error fetching rescue data:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});



const otpMap = new Map(); // Temporary store for OTPs, replace with session if needed

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '22103044@mail.jiit.ac.in',
    pass: 'Bolnolgel31',
  },
});

// Send OTP
app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  otpMap.set(email, otp);

  const mailOptions = {
    from: '22103044@mail.jiit.ac.in',
    to: email,
    subject: 'Your OTP for Child Adoption',
    text: `Your OTP is ${otp}. Please use this to verify your adoption form.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending OTP', error });
    }
    res.status(200).json({ message: 'OTP sent successfully' });
  });
});


// Verify OTP
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = otpMap.get(email);

  if (storedOtp === otp) {
    otpMap.delete(email);
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

app.post('/adopt-child', async (req, res) => {
  const { firstName, lastName, email, phone, address, city, state, zip, preferredAge, preferredGender, income } = req.body;

  try {
    // Store the form data in the Adoption model
    const adoptionRecord = new Adoption({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      preferredAge,
      preferredGender,
      income,
    });
    const savedAdoption = await adoptionRecord.save();

    // Find an unfounded and unadopted child
    const child = await MissingChild.findOne({ founded: false, adopted: false }).exec();
    if (!child) {
      return res.status(404).json({ message: 'No children available for adoption at the moment' });
    }

    // Update the child’s status in the database
    child.founded = true;
    child.adopted = true;
    await child.save();

    // Update the adoptedChildId in the adoption record
    savedAdoption.adoptedChildId = child._id;
    await savedAdoption.save();

    // Mocked police contact details
    const policeContact = {
      name: 'Officer John Doe',
      phone: '123-456-7890',
      station: 'Downtown Police Station',
    };

    // Send notification email to the applicant
    const mailOptions = {
      from: '22103044@mail.jiit.ac.in',
      to: email,
      subject: 'Adoption Assignment',
      text: `Dear applicant, you have been assigned the child: ${child.childName}. Please proceed to ${policeContact.station} and contact Officer ${policeContact.name} at ${policeContact.phone} for further steps.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending notification email', error });
      }
      res.status(200).json({ message: 'Adoption form submitted successfully. Check your email for details.' });
    });
  } catch (error) {
    console.error('Error processing adoption form:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});








// ----------------------------- Serve Uploaded Images -----------------------------
app.use('/uploads', cors(), express.static('uploads'));
app.use('/upload2', cors(), express.static('upload2'));
app.use('/userpic', cors(), express.static('userpic'));

// ----------------------------- Start Server -----------------------------
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
