const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt'); 
const User = require('./models/usermodel'); // Assuming the User model is in models/usermodel.js
const MissingChild = require('./models/missingchild');
const LostChild = require('./models/lostchildmodel'); // Import LostChild model

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const mongoURI = 'mongodb+srv://aaryansatyam4:Asatyam2604@user.ycc6w.mongodb.net/';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Configure multer for 'uploads' folder (for MissingChild)
const storageUploads = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Store in 'uploads/' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});
const upload = multer({ storage: storageUploads }); // Multer instance for 'uploads'

// Configure multer for 'upload2' folder (for LostChild)
const storageUpload2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload2/'); // Store in 'upload2/' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});
const upload2 = multer({ storage: storageUpload2 }); // Multer instance for 'upload2'

// Login user route
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                console.log("User found:", user);
                if (user.password === password) {  // Plaintext comparison; not recommended
                    res.json({
                        message: "successful",
                        userId: user._id,
                        category: user.category
                    });
                } else {
                    console.log("Incorrect password");
                    res.json({ message: "password is incorrect" });
                }
            } else {
                console.log("User not found");
                res.json({ message: "No record existed" });
            }
        })
        .catch(err => {
            console.error("Internal server error", err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// Route to handle adding MissingChild details (stored in 'uploads')
app.post('/add-missing-child', upload.single('childPhoto'), (req, res) => {
    const { parentName, contactNumber, childName, age, gender, lastSeen, description } = req.body;
    const childPhoto = req.file ? req.file.path : null;

    const newChild = new MissingChild({
        parentName,
        contactNumber,
        childName,
        age,
        gender,
        lastSeen,
        description,
        childPhoto, // File path for the uploaded photo (stored in 'uploads/')
    });

    newChild.save()
        .then(savedChild => res.status(201).json({ message: 'Child data saved successfully', child: savedChild }))
        .catch(err => res.status(500).json({ message: 'Error saving child data', error: err.message }));
});

// Route to handle adding LostChild details (stored in 'upload2')
app.post('/add-lost-child', upload2.single('childPhoto'), (req, res) => {
    const { emailId, childName, age, lastSeenDate, lastSeenLocation, description, guardianName, contactInfo, additionalComments } = req.body;
    const childPhoto = req.file ? req.file.path : null;

    const newLostChild = new LostChild({
        emailId,
        childName,
        age,
        lastSeenDate,
        lastSeenLocation,
        description,
        guardianName,
        contactInfo,
        additionalComments,
        childPhoto, // File path for the uploaded photo (stored in 'upload2/')
    });

    newLostChild.save()
        .then(savedLostChild => res.status(201).json({ message: 'Lost child report saved successfully', child: savedLostChild }))
        .catch(err => res.status(500).json({ message: 'Error saving lost child report', error: err.message }));
});

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));
app.use('/upload2', express.static('upload2'));

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
