// models/adoptionmodel.js

const mongoose = require('mongoose');

const AdoptionSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  preferredAge: { type: String, required: true },
  preferredGender: { type: String, required: true },
  income: { type: Number, required: true },
  dateSubmitted: { type: Date, default: Date.now },
  adoptedChildId: { type: mongoose.Schema.Types.ObjectId, ref: 'MissingChild' },
});

const Adoption = mongoose.model('Adoption', AdoptionSchema);
module.exports = Adoption;
