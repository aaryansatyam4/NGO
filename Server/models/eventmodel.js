const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  time: { type: String, required: true },
  objectives: { type: String, required: true },
  submittedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  approved: { type: Boolean, default: false }, // Default to false
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
