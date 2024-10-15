const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt'); 
const nodemailer = require('nodemailer'); // To send email notifications
const faceapi = require('face-api.js');
const canvas = require('canvas');
const path = require('path');
const { Canvas, Image, ImageData } = canvas;

// Load face-api.js with canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const User = require('./models/usermodel');
const MissingChild = require('./models/missingchild');
const LostChild = require('./models/lostchildmodel');

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

// Email setup (Nodemailer)
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service
    auth: {
        user: '22103044@mail.jiit.ac.in',
        pass: 'Bolnolgel31'
    }
});

// Configure multer for 'uploads' and 'upload2'
const storageUploads = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storageUploads });

const storageUpload2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload2/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload2 = multer({ storage: storageUpload2 });

// Function to compare faces
async function compareFaces(missingChildPhoto, lostChildPhoto) {
    const img1 = await canvas.loadImage(missingChildPhoto);
    const img2 = await canvas.loadImage(lostChildPhoto);

    const detection1 = await faceapi.detectSingleFace(img1).withFaceLandmarks().withFaceDescriptor();
    const detection2 = await faceapi.detectSingleFace(img2).withFaceLandmarks().withFaceDescriptor();

    if (!detection1 || !detection2) {
        throw new Error("Face not detected in one of the images.");
    }

    const distance = faceapi.euclideanDistance(detection1.descriptor, detection2.descriptor);
    return distance; // Lower distance means better match
}

// Function to send email notification
function sendEmailNotification(parentEmail, lostChildDetails) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: parentEmail,
        subject: 'Possible Match Found for Your Missing Child',
        text: `A possible match has been found for your missing child. Here are the details of the person who reported the child:
        
        Child Name: ${lostChildDetails.childName}
        Last Seen Location: ${lostChildDetails.lastSeenLocation}
        Guardian Name: ${lostChildDetails.guardianName}
        Contact Info: ${lostChildDetails.contactInfo}
        
        Please contact us for further verification.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// Login user route
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        res.json({
                            message: "Login successful",
                            userId: user._id,
                            category: user.category
                        });
                    } else {
                        res.json({ message: "Incorrect password" });
                    }
                });
            } else {
                res.json({ message: "No record existed" });
            }
        })
        .catch(err => {
            console.error("Internal server error", err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// User registration route
app.post('/register', async (req, res) => {
    try {
        const { name, mobile, email, category, password, id } = req.body;

        if (!name || !mobile || !email || !category || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser = new User({
            name,
            mobile,
            email,
            category,
            password: hashedPassword,
            id
        });

        const savedUser = await newUser.save();
        res.status(200).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
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
app.post('/add-lost-child', upload2.single('childPhoto'), async (req, res) => {
    try {
        const { emailId, childName, age, lastSeenDate, lastSeenLocation, description, guardianName, contactInfo, additionalComments } = req.body;
        const childPhoto = req.file ? req.file.path : null;

        if (!childPhoto) {
            return res.status(400).json({ message: 'File upload failed' });
        }

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
            childPhoto
        });

        // Save LostChild to the database
        const savedLostChild = await newLostChild.save();

        // Check for possible matches with MissingChild
        const missingChildren = await MissingChild.find({});
        for (let missingChild of missingChildren) {
            const matchDistance = await compareFaces(path.join(__dirname, missingChild.childPhoto), path.join(__dirname, childPhoto));

            // If match distance is less than a threshold (indicating more than 60% similarity)
            if (matchDistance < 0.4) { // Adjust threshold as needed
                console.log(`Match found with ${missingChild.parentName}, notifying...`);
                sendEmailNotification(missingChild.contactNumber, savedLostChild);
            }
        }

        res.status(201).json({ message: 'Lost child report saved successfully', child: savedLostChild });
    } catch (err) {
        console.error('Error saving lost child report:', err.message);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Route to fetch user profile data based on user ID
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;

    User.findById(userId)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => {
            console.error('Error fetching user:', err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// Route to fetch lost child details based on parent's email or contact info
app.get('/lost-children/:email', (req, res) => {
    const email = req.params.email;

    LostChild.findOne({ emailId: email }) // Assuming emailId is the parent's email
        .then(lostChild => {
            if (lostChild) {
                res.json(lostChild);
            } else {
                res.status(404).json({ message: 'No lost child record found for this email' });
            }
        })
        .catch(err => {
            console.error('Error fetching lost child:', err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));
app.use('/upload2', express.static('upload2'));

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
