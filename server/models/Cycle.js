const mongoose = require('mongoose');

const CycleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, default: null },
  flow: { type: String, default: 'medium' },
  pain: { type: String, default: 'none' },
  mood: { type: String, default: 'cozy' },
  symptoms: { type: [String], default: [] },
  notes: { type: String, default: '' },
  loggedAt: { type: String, default: () => new Date().toISOString() }
});

module.exports = mongoose.model('Cycle', CycleSchema);
