const mongoose = require('mongoose');

const SchemeApplicationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  schemeId: { type: String, required: true },
  schemeName: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  schoolName: { type: String, default: '' },
  village: { type: String, default: '' },
  district: { type: String, default: '' },
  state: { type: String, default: '' },
  appliedAt: { type: String, default: () => new Date().toISOString() },
  status: { type: String, default: 'pending' } // 'pending' | 'disbursed'
});

module.exports = mongoose.model('SchemeApplication', SchemeApplicationSchema);
