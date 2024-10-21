const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

// Import models
const User = require('./models/usermodel');
const MissingChild = require('./models/missingchild');
const LostChild = require('./models/lostchildmodel');

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
mongoose.connect('mongodb+srv://aaryansatyam4:Asatyam2604@user.ycc6w.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Multer configuration for user profile photo uploads
const storageUserPic = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'userpic/'); // Save images in the userpic directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Use a unique file name
  },
});
const uploadUserPic = multer({ storage: storageUserPic });

// Multer configuration for missing-child photo uploads
const storageMissingChild = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload2/'); // Directory to save images for missing children
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});
const uploadMissingChild = multer({ storage: storageMissingChild });

// Multer configuration for lost-child photo uploads
const storageLostChild = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to save images for lost children
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});
const uploadLostChild = multer({ storage: storageLostChild });

// ----------------------------- User Registration API -----------------------------
app.post('/register', uploadUserPic.single('photo'), async (req, res) => {
  try {
    const { name, mobile, email, category, password, id } = req.body;

    // Check if all fields are present
    if (!name || !mobile || !email || !category || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if photo is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Profile photo is required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      name,
      mobile,
      email,
      category,
      password: hashedPassword,
      id,
      photo: req.file.filename, // Save only the filename
    });

    const savedUser = await newUser.save(); // Save the user in the database
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

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Set cookie with user ID (assuming user._id)
    res.cookie('userId', user._id, { httpOnly: true, secure: false }); // Adjust for production
    res.json({
      message: 'Login successful',
      userId: user._id,
      category: user.category,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// ----------------------------- Get Logged-in User Info API -----------------------------
app.get('/user/me', async (req, res) => {
  const userId = req.cookies.userId; // Get userId from cookies
  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Construct the photo URL
    const photoUrl = user.photo ? `http://localhost:3001/${user.photo}` : null;

    // Send back the user details along with the photo URL
    res.json({
      ...user._doc, // Use user._doc to avoid mongoose object issues
      photoUrl: photoUrl || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp' // Use a default image if photo is missing
    });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ----------------------------- Add Missing Child API -----------------------------
app.post('/add-missing-child', uploadMissingChild.single('childPhoto'), async (req, res) => {
  const { parentName, contactNumber, childName, age, gender, lastSeen, description } = req.body;
  const childPhoto = req.file ? req.file.filename : null;

  const userId = req.cookies.userId; // Get userId from cookies
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
      childPhoto, // File path for the uploaded photo
      submittedBy: userId, // Associate the user who submitted
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

  const userId = req.cookies.userId; // Get userId from cookies
  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const newLostChild = new LostChild({
      submittedBy: userId, // Associate the report with the logged-in user's ID
      childName,
      age,
      gender,
      lastSeenLocation, // Use lastSeenLocation instead of lastSeen
      description,
      guardianName,
      contactInfo,
      additionalComments,
      childPhoto, // Path to uploaded image
    });

    const savedLostChild = await newLostChild.save();
    res.status(201).json({ message: 'Lost child report saved successfully', child: savedLostChild });
  } catch (err) {
    console.error('Error saving lost child report:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// ----------------------------- Get Missing Children API -----------------------------
app.get('/missing-children', async (req, res) => {
  const userId = req.cookies.userId; // Get userId from cookies
  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const missingChildren = await MissingChild.find({ submittedBy: userId }); // Find missing children by userId
    res.status(200).json(missingChildren);
  } catch (err) {
    console.error('Error fetching missing children:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Get all missing children regardless of the user who submitted
app.get('/all-lost-children', async (req, res) => {
  try {
    // Fetch all lost children records from the database
    const lostChildren = await LostChild.find(); // No filter, return all records
    res.status(200).json(lostChildren); // Return all lost children
  } catch (err) {
    console.error('Error fetching lost children:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/close-case/:id', async (req, res) => {
  try {
    const childId = req.params.id;
    console.log("Received request to close case for child ID:", childId); // Log to check the childId
    const { founded } = req.body;

    if (!mongoose.Types.ObjectId.isValid(childId)) {
      return res.status(400).json({ message: 'Invalid child ID' });
    }

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


// ----------------------------- Get Rescues Data for Pie Chart -----------------------------
// Define rescue data route
app.get('api/rescue-data', async (req, res) => {
  try {
    // Count the number of children that are founded and not founded
    const rescuesDone = await LostChild.countDocuments({ founded: true });
    const rescuesRemaining = await LostChild.countDocuments({ founded: false });

    // Return the counts in the API response
    res.status(200).json({
      rescuesDone: rescuesDone,
      rescuesRemaining: rescuesRemaining,
    });
  } catch (err) {
    console.error('Error fetching rescue data:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});


// ----------------------------- Get Lost Children API -----------------------------
app.get('/lost-children', async (req, res) => {
  const userId = req.cookies.userId; // Get userId from cookies
  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const lostChildren = await LostChild.find({ submittedBy: userId }); // Find lost children by userId
    res.status(200).json(lostChildren);
  } catch (err) {
    console.error('Error fetching lost children:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ----------------------------- Fetch Lost Child by Email API -----------------------------
app.get('/lost-children/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const lostChild = await LostChild.findOne({ emailId: email });
    if (!lostChild) {
      return res.status(404).json({ message: 'No lost child record found for this email' });
    }
    res.json(lostChild);
  } catch (err) {
    console.error('Error fetching lost child:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ----------------------------- Fetch User Profile API -----------------------------
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ----------------------------- Serve Uploaded Images -----------------------------
// Serve static files with CORS headers for user profile pictures and other image uploads
app.use('/uploads', cors(), express.static('uploads'));
app.use('/upload2', cors(), express.static('upload2'));
app.use('/userpic', cors(), express.static('userpic'));

// ----------------------------- Start Server -----------------------------
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
