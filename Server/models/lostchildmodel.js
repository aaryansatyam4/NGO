const mongoose = require('mongoose');

const LostChildSchema = new mongoose.Schema({
  submittedBy: { type: String, required: true }, // Who reported the child
  childName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  lastSeenLocation: { type: String, required: true }, // Update to lastSeenLocation
  description: { type: String },
  guardianName: { type: String, required: true },
  contactInfo: { type: String, required: true },
  additionalComments: { type: String },
  childPhoto: { type: String }, // Path to the uploaded photo
  lastSeenDate: { type: Date, default: Date.now }, // Automatically records the current date
});

const LostChild = mongoose.model('LostChild', LostChildSchema);
module.exports = LostChild;
