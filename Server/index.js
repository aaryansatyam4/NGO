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
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser()); // For accessing cookies

// MongoDB connection
mongoose.connect('mongodb+srv://aaryansatyam4:Asatyam2604@user.ycc6w.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Multer configuration for file uploads

// Storage configuration for missing-child (upload2)
const storageMissingChild = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload2/'); // Directory to save images for missing children
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});
const uploadMissingChild = multer({ storage: storageMissingChild });

// Storage configuration for lost-child (uploads)
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
app.post('/register', async (req, res) => {
  try {
    const { name, mobile, email, category, password } = req.body;

    if (!name || !mobile || !email || !category || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      mobile,
      email,
      category,
      password: hashedPassword, // Save hashed password
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
    res.json(user); // Return user details
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ----------------------------- Add Missing Child API -----------------------------
app.post('/add-missing-child', uploadMissingChild.single('childPhoto'), async (req, res) => {
  const { parentName, contactNumber, childName, age, gender, lastSeen, description } = req.body;
  const childPhoto = req.file ? req.file.path : null;

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
// ----------------------------- Add Lost Child API -----------------------------
app.post('/add-lost-child', uploadLostChild.single('childPhoto'), async (req, res) => {
    const { childName, age, gender, lastSeenLocation, description, guardianName, contactInfo, additionalComments } = req.body;
    const childPhoto = req.file ? req.file.path : null;
  
    const userId = req.cookies.userId; // Get userId from cookies
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
  
    try {
      // Fetch user to get the userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Automatically set the current date for `lastSeenDate`
      const newLostChild = new LostChild({
        submittedBy: userId, // Automatically associate the report with the logged-in user's ID
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
app.use('/uploads', express.static('uploads'));
app.use('/upload2', express.static('upload2'));

// ----------------------------- Start Server -----------------------------
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
