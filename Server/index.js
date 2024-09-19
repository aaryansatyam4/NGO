const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For hashing and comparing passwords
const User = require('./models/usermodel'); // Assuming the User model is in models/usermodel.js

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://aaryansatyam4:Asatyam2604@user.ycc6w.mongodb.net/', {
  // MongoDB connection options
  
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

//login user

app.post("/login",(req, res)=> {
const {email,password} = req.body
User.findOne({email: email})
.then(user =>{
    if(user){
        if(user.password == password){
            res.json("succesfull")
        } else{
            res.json("password is incorrect")
        }
    }
    else{
        res.json("No record Existed")
    }
})
})



// Register route to handle user signup
app.post('/register', async (req, res) => {
  try {
    const { name, mobile, email, category, password, id } = req.body;

    if (!name || !mobile || !email || !category || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      mobile,
      email,
      category,
      password: hashedPassword, // Store the hashed password
      id
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    res.status(200).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});
// Login route to handle user login
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
