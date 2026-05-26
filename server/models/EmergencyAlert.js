const mongoose = require('mongoose');

const EmergencyAlertSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, default: 'anonymous' },
  userName: { type: String, default: 'Adolescent Student' },
  schoolName: { type: String, default: 'GHS School' },
  locationName: { type: String, default: 'School Toilet / Girls Block' },
  message: { type: String, default: 'Immediate counseling support or sanitary emergency needed.' },
  status: { type: String, default: 'active' },
  reportedAt: { type: String, default: () => new Date().toISOString() }
});

module.exports = mongoose.model('EmergencyAlert', EmergencyAlertSchema);
