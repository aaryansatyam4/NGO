const mongoose = require('mongoose');

const MissingChildSchema = new mongoose.Schema({
  parentName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  childName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  lastSeen: { type: String, required: true },
  description: { type: String, required: true },
  childPhoto: { type: String }, // Path to the uploaded image
  submittedBy: { type: String, required: true }, // User ID who submitted the report
  dateReported: { type: Date, default: Date.now },
  adopted: { type: Boolean, default: false },
  founded: { type: Boolean, default: false }

});

const MissingChild = mongoose.model('MissingChild', MissingChildSchema);
module.exports = MissingChild;
