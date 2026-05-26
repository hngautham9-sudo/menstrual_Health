const express = require('express');
const router = express.Router();
const { memoryDb, getIsConnected } = require('../db');
const { generateChatResponse, getCycleWellnessTip, getMatchingSchemes } = require('../services/ai');

// Mongoose Models
const User = require('../models/User');
const Cycle = require('../models/Cycle');
const SanitationReport = require('../models/SanitationReport');
const EmergencyAlert = require('../models/EmergencyAlert');

// Helper to generate a basic unique id
const generateId = (prefix) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

// 1. GET User profile
router.get('/users/:id', async (req, res) => {
  if (getIsConnected()) {
    try {
      const user = await User.findOne({ id: req.params.id });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const user = memoryDb.users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// 2. POST Save/Update user profile
router.post('/users', async (req, res) => {
  const { id, name, age, schoolName, village, district, state, primaryLanguage, role } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const updatedUser = {
    id: id || generateId('user'),
    name,
    age: Number(age) || 14,
    schoolName: schoolName || "Government School",
    village: village || "Village Name",
    district: district || "District",
    state: state || "Karnataka",
    primaryLanguage: primaryLanguage || "en",
    role: role || "girl",
    avatarUrl: req.body.avatarUrl || "https://images.unsplash.com/photo-1594744803329-e58b31de215f?w=150&auto=format&fit=crop",
    joinedAt: new Date().toISOString()
  };

  if (getIsConnected()) {
    try {
      const doc = await User.findOneAndUpdate(
        { id: updatedUser.id },
        updatedUser,
        { new: true, upsert: true }
      );
      return res.status(201).json(doc);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const existingIndex = memoryDb.users.findIndex(u => u.id === id);
  if (existingIndex > -1) {
    memoryDb.users[existingIndex] = updatedUser;
  } else {
    memoryDb.users.push(updatedUser);
  }

  res.status(201).json(updatedUser);
});

// 3. GET Menstrual cycle logs for user
router.get('/cycles/:userId', async (req, res) => {
  let logs;
  if (getIsConnected()) {
    try {
      logs = await Cycle.find({ userId: req.params.userId });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    logs = memoryDb.cycles.filter(c => c.userId === req.params.userId);
  }

  const wellnessTip = getCycleWellnessTip(logs, req.query.lang || 'en');
  
  res.json({
    logs: logs.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
    wellnessTip
  });
});

// 4. POST Log menstrual cycle
router.post('/cycles', async (req, res) => {
  const { userId, startDate, endDate, flow, pain, mood, symptoms, notes } = req.body;

  if (!userId || !startDate) {
    return res.status(400).json({ error: "User ID and Start Date are required" });
  }

  const newLog = {
    id: generateId('cyc'),
    userId,
    startDate,
    endDate: endDate || null,
    flow: flow || 'medium',
    pain: pain || 'none',
    mood: mood || 'cozy',
    symptoms: symptoms || [],
    notes: notes || '',
    loggedAt: new Date().toISOString()
  };

  let userLogs;
  if (getIsConnected()) {
    try {
      await Cycle.create(newLog);
      userLogs = await Cycle.find({ userId });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    memoryDb.cycles.push(newLog);
    userLogs = memoryDb.cycles.filter(c => c.userId === userId);
  }

  const wellnessTip = getCycleWellnessTip(userLogs, req.body.lang || 'en');

  res.status(201).json({
    log: newLog,
    logs: userLogs.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
    wellnessTip
  });
});

// 5. GET All sanitation reports
router.get('/sanitation/reports', async (req, res) => {
  if (getIsConnected()) {
    try {
      const reports = await SanitationReport.find({});
      return res.json(reports.sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt)));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  res.json(memoryDb.reports.sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt)));
});

// 6. POST Submit school sanitation report
router.post('/sanitation/reports', async (req, res) => {
  const { userId, schoolName, village, toiletCleanliness, waterAvailability, padDisposalBins, soapAvailable, doorLocksWork, description } = req.body;

  if (!schoolName || !toiletCleanliness) {
    return res.status(400).json({ error: "School name and cleanliness score are required" });
  }

  let user;
  if (getIsConnected()) {
    try {
      user = await User.findOne({ id: userId });
    } catch (err) {
      // Ignored fallback
    }
  }
  if (!user) {
    user = memoryDb.users.find(u => u.id === userId) || { name: "Anjali M.", village: "Kollegala" };
  }

  const newReport = {
    id: generateId('rep'),
    userId: userId || 'anonymous',
    reporterName: user.name,
    schoolName,
    village: village || user.village,
    toiletCleanliness: Number(toiletCleanliness),
    waterAvailability: !!waterAvailability,
    padDisposalBins: !!padDisposalBins,
    soapAvailable: !!soapAvailable,
    doorLocksWork: !!doorLocksWork,
    description: description || '',
    photoUrl: req.body.photoUrl || null,
    status: 'reported',
    reportedAt: new Date().toISOString()
  };

  if (getIsConnected()) {
    try {
      const doc = await SanitationReport.create(newReport);
      return res.status(201).json(doc);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  memoryDb.reports.push(newReport);
  res.status(201).json(newReport);
});

// 7. PUT Update sanitation report status (Resolve toilet issue)
router.put('/sanitation/reports/:id', async (req, res) => {
  const { status, resolvedBy } = req.body;

  if (getIsConnected()) {
    try {
      const report = await SanitationReport.findOne({ id: req.params.id });
      if (!report) {
        return res.status(404).json({ error: "Sanitation report not found" });
      }
      if (status) report.status = status;
      if (resolvedBy) report.resolvedBy = resolvedBy;
      report.resolvedAt = new Date().toISOString();
      await report.save();
      return res.json(report);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const report = memoryDb.reports.find(r => r.id === req.params.id);
  if (!report) {
    return res.status(404).json({ error: "Sanitation report not found" });
  }

  if (status) report.status = status;
  if (resolvedBy) report.resolvedBy = resolvedBy;
  report.resolvedAt = new Date().toISOString();

  res.json(report);
});

// 8. POST Welfare matching schemes
router.post('/schemes/match', (req, res) => {
  const { age, schoolStatus, region, state } = req.body;
  
  if (!age) {
    return res.status(400).json({ error: "Age is required" });
  }

  const matched = getMatchingSchemes({
    age: Number(age),
    schoolStatus: schoolStatus || 'studying',
    region: region || 'rural',
    state: state || 'Karnataka'
  });

  res.json(matched);
});

// 9. POST AI Chat interaction
router.post('/ai/chat', async (req, res) => {
  const { text, language } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: "Message text is required" });
  }

  try {
    const replyText = await generateChatResponse(text, language);
    res.json({
      id: generateId('msg'),
      sender: 'saheli',
      text: replyText,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("AI response error:", error);
    res.status(500).json({ error: "Internal AI Counselor Error" });
  }
});

// 10. POST Trigger Emergency SOS Panic Alert
router.post('/emergency/trigger', async (req, res) => {
  const { userId, locationName, message } = req.body;
  
  let user;
  if (getIsConnected()) {
    try {
      user = await User.findOne({ id: userId });
    } catch (err) {
      // Ignored fallback
    }
  }
  if (!user) {
    user = memoryDb.users.find(u => u.id === userId);
  }

  const alert = {
    id: generateId('sos'),
    userId: userId || 'anonymous',
    userName: user ? user.name : "Adolescent Student",
    schoolName: user ? user.schoolName : "GHS School",
    locationName: locationName || "School Toilet / Girls Block",
    message: message || "Immediate counseling support or sanitary emergency needed.",
    status: 'active',
    reportedAt: new Date().toISOString()
  };

  if (getIsConnected()) {
    try {
      const doc = await EmergencyAlert.create(alert);
      return res.status(201).json(doc);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  memoryDb.emergencies.push(alert);
  res.status(201).json(alert);
});

// 11. GET Active SOS Alerts (for ASHA worker dashboard)
router.get('/emergency/alerts', async (req, res) => {
  if (getIsConnected()) {
    try {
      const activeAlerts = await EmergencyAlert.find({});
      return res.json(activeAlerts.sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt)));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const activeAlerts = memoryDb.emergencies.sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt));
  res.json(activeAlerts);
});

module.exports = router;

