const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, default: 14 },
  schoolName: { type: String, default: "Government School" },
  village: { type: String, default: "Village Name" },
  district: { type: String, default: "District" },
  state: { type: String, default: "Karnataka" },
  primaryLanguage: { type: String, default: "en" },
  role: { type: String, default: "girl" },
  avatarUrl: { type: String, default: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?w=150&auto=format&fit=crop" },
  joinedAt: { type: String, default: () => new Date().toISOString() }
});

module.exports = mongoose.model('User', UserSchema);
