const mongoose = require('mongoose');

// Define the schema for the lost child report
const LostChildSchema = new mongoose.Schema({
  emailId: { type: String, required: true },
  childName: { type: String, required: true },
  age: { type: Number, required: true },
  lastSeenDate: { type: Date, required: true },
  lastSeenLocation: { type: String, required: true },
  description: { type: String },
  guardianName: { type: String, required: true },
  contactInfo: { type: String, required: true },
  additionalComments: { type: String },
  childPhoto: { type: String }, // Path to the uploaded photo
  dateReported: { type: Date, default: Date.now }
});

// Create and export the LostChild model
const LostChild = mongoose.model('LostChild', LostChildSchema);
module.exports = LostChild;
