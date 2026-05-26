const mongoose = require('mongoose');

const SanitationReportSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, default: 'anonymous' },
  reporterName: { type: String, default: 'Anjali M.' },
  schoolName: { type: String, required: true },
  village: { type: String, default: '' },
  toiletCleanliness: { type: Number, required: true },
  waterAvailability: { type: Boolean, default: false },
  padDisposalBins: { type: Boolean, default: false },
  soapAvailable: { type: Boolean, default: false },
  doorLocksWork: { type: Boolean, default: false },
  description: { type: String, default: '' },
  photoUrl: { type: String, default: null },
  status: { type: String, default: 'reported' },
  reportedAt: { type: String, default: () => new Date().toISOString() },
  resolvedBy: { type: String, default: null },
  resolvedAt: { type: String, default: null }
});

module.exports = mongoose.model('SanitationReport', SanitationReportSchema);
