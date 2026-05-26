const mongoose = require('mongoose');

// In-Memory mock storage fallback for instant execution without local Mongo installation
const memoryDb = {
  users: [],
  cycles: [],
  reports: [],
  schemes: [
    {
      id: "sch-suchi",
      name: "Suchi Scheme (Karnataka)",
      nameLocal: "ಶುಚಿ ಯೋಜನೆ (ಕರ್ನಾಟಕ)",
      description: "Distribution of free sanitary napkins to adolescent girls in government and aided schools in rural and tribal regions.",
      descriptionLocal: "ಗ್ರಾಮೀಣ ಮತ್ತು ಬುಡಕಟ್ಟು ಪ್ರದೇಶಗಳ ಸರ್ಕಾರಿ ಮತ್ತು ಅನುದಾನಿತ ಶಾಲೆಗಳ ಹದಿಹರೆಯದ ಹುಡುಗಿಯರಿಗೆ ಉಚಿತ ಸ್ಯಾನಿಟರಿ ನ್ಯಾಪ್ಕಿನ್ ವಿತರಣೆ.",
      eligibility: { minAge: 10, maxAge: 19, gender: "female", region: "rural", schoolStatus: "studying" },
      benefits: "12 sanitary napkins per pack, free of charge monthly.",
      benefitsLocal: "ತಿಂಗಳಿಗೆ ಉಚಿತವಾಗಿ 12 ಸ್ಯಾನಿಟರಿ ನ್ಯಾಪ್ಕಿನ್ಗಳು.",
      category: "hygiene",
      state: "Karnataka",
      applicationSteps: ["Register with the School Physical Education Teacher or Health Coordinator.", "Verify enrollment details.", "Receive sanitary napkin kits monthly."]
    },
    {
      id: "sch-bhagya",
      name: "Bhagyalakshmi Scheme",
      nameLocal: "ಭಾಗ್ಯಲಕ್ಷ್ಮಿ ಯೋಜನೆ",
      description: "Financial empowerment and safety insurance scheme for girl children in families below the poverty line (BPL) in rural areas.",
      descriptionLocal: "ಗ್ರಾಮೀಣ ಪ್ರದೇಶದ ಬಡತನ ರೇಖೆಗಿಂತ ಕೆಳಗಿರುವ (ಬಿಪಿಎಲ್) ಕುಟುಂಬಗಳ ಹೆಣ್ಣು ಮಕ್ಕಳಿಗೆ ಆರ್ಥಿಕ ಸಬಲೀಕರಣ ಮತ್ತು ಸುರಕ್ಷತಾ ವಿಮಾ ಯೋಜನೆ.",
      eligibility: { minAge: 0, maxAge: 18, gender: "female", region: "all", schoolStatus: "any" },
      benefits: "Fixed deposit in the girl child's name, maturing to ₹1,00,000 upon reaching 18 years of age.",
      benefitsLocal: "ಹೆಣ್ಣು ಮಗುವಿನ ಹೆಸರಿನಲ್ಲಿ ಸ್ಥಿರ ಠೇವಣಿ, 18 ವರ್ಷ ತಲುಪಿದಾಗ ₹1,00,000 ಕ್ಕೆ ಮುಕ್ತಾಯವಾಗುತ್ತದೆ.",
      category: "finance",
      state: "Karnataka",
      applicationSteps: ["Submit application within one year of child's birth.", "Provide BPL card and Birth Certificate to local Anganwadi/ASHA worker.", "Maintain continuous school enrollment."]
    },
    {
      id: "sch-kgbv",
      name: "Kasturba Gandhi Balika Vidyalaya (KGBV)",
      nameLocal: "ಕಸ್ತೂರಿಬಾ ಗಾಂಧಿ ಬಾಲಿಕಾ ವಿದ್ಯಾಲಯ",
      description: "Residential upper primary and secondary schools for girls belonging to rural, tribal, SC, ST, and minority communities.",
      descriptionLocal: "ಗ್ರಾಮೀಣ, ಬುಡಕಟ್ಟು, ಎಸ್‌ಸಿ, ಎಸ್‌ಟಿ ಮತ್ತು ಅಲ್ಪಸಂಖ್ಯಾತ ಸಮುದಾಯಗಳಿಗೆ ಸೇರಿದ ಹುಡುಗಿಯರಿಗಾಗಿ ವಸತಿ ಪ್ರಾಥಮಿಕ ಮತ್ತು ಪ್ರೌಢಶಾಲೆಗಳು.",
      eligibility: { minAge: 10, maxAge: 18, gender: "female", region: "rural", schoolStatus: "studying" },
      benefits: "100% free boarding, residential education, textbooks, stationery, and boarding supplies.",
      benefitsLocal: "100% ಉಚಿತ ವಸತಿ ಶಿಕ್ಷಣ, ಪಠ್ಯಪುಸ್ತಕಗಳು, ಸ್ಟೇಷನರಿ ಮತ್ತು ವಸತಿ ಸರಬರಾಜುಗಳು.",
      category: "education",
      state: "National",
      applicationSteps: ["Contact district block education officer (BEO) or nearest KGBV school headmaster.", "Submit community certificate and income proof."]
    },
    {
      id: "sch-kishori",
      name: "Sabla / Rajiv Gandhi Scheme for Empowerment of Adolescent Girls",
      nameLocal: "ಕಿಶೋರಿ ಶಕ್ತಿ ಯೋಜನೆ / ಸಬ್ಲಾ",
      description: "Aims at empowering adolescent girls of 11-18 years by improving their nutritional & health status and promoting life skills.",
      descriptionLocal: "ಹದಿಹರೆಯದ ಹುಡುಗಿಯರ (11-18 ವರ್ಷ) ಪೌಷ್ಟಿಕಾಂಶ ಮತ್ತು ಆರೋಗ್ಯ ಸ್ಥಿತಿಯನ್ನು ಸುಧಾರಿಸುವ ಮೂಲಕ ಸಬಲೀಕರಣಗೊಳಿಸುವುದು.",
      eligibility: { minAge: 11, maxAge: 18, gender: "female", region: "all", schoolStatus: "any" },
      benefits: "Supplementary nutrition, iron-folic acid supplementation, vocational training, and life skills counseling.",
      benefitsLocal: "ಪೂರಕ ಪೌಷ್ಟಿಕಾಂಶ, ಐರನ್-ಫೋಲಿಕ್ ಆಸಿಡ್ ಪೂರಕಗಳು, ವೃತ್ತಿಪರ ತರಬೇತಿ ಮತ್ತು ಜೀವನ ಕೌಶಲ್ಯಗಳ ಕೌನ್ಸೆಲಿಂಗ್.",
      category: "health",
      state: "National",
      applicationSteps: ["Enroll with the local ASHA or Anganwadi worker.", "Participate in Weekly Iron Folic Acid Supplementation (WIFS) days."]
    }
  ],
  emergencies: []
};

// Seed initial mock user profiles
memoryDb.users.push({
  id: "user-default",
  name: "Gauri Gowda",
  age: 14,
  schoolName: "Government High School, Bilichodu",
  village: "Bilichodu, Jagalur",
  district: "Davanagere",
  state: "Karnataka",
  primaryLanguage: "kn",
  role: "girl",
  avatarUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?w=150&auto=format&fit=crop",
  joinedAt: new Date().toISOString()
});

memoryDb.users.push({
  id: "user-asha",
  name: "Shantha Mary (ASHA Worker)",
  age: 38,
  schoolName: "Bilichodu Primary Health Subcenter",
  village: "Bilichodu",
  district: "Davanagere",
  state: "Karnataka",
  primaryLanguage: "kn",
  role: "asha",
  avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop",
  joinedAt: new Date().toISOString()
});

// Seed mock reports
memoryDb.reports.push({
  id: "rep-1",
  userId: "user-default",
  reporterName: "Gauri Gowda",
  schoolName: "Government High School, Bilichodu",
  village: "Bilichodu",
  toiletCleanliness: 2,
  waterAvailability: false,
  padDisposalBins: true,
  soapAvailable: false,
  doorLocksWork: true,
  description: "The water tap has dried up since last week. Girls are finding it difficult to wash hands after changing pads.",
  status: "reported",
  reportedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
});

memoryDb.reports.push({
  id: "rep-2",
  userId: "user-default",
  reporterName: "Anjali M.",
  schoolName: "Tribal Residential Ashram School, Kollegala",
  village: "Kollegala",
  toiletCleanliness: 4,
  waterAvailability: true,
  padDisposalBins: false,
  soapAvailable: true,
  doorLocksWork: false,
  description: "The main door lock of the girls bathroom is completely broken. We have to stand outside to guard when others are inside.",
  status: "reviewed",
  reportedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
});

// Seed mock periods for default user (past two months)
const makePastDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

memoryDb.cycles.push(
  {
    id: "cyc-1",
    userId: "user-default",
    startDate: makePastDate(60),
    endDate: makePastDate(55),
    flow: "medium",
    pain: "moderate",
    mood: "tired",
    symptoms: ["cramps", "backache"],
    notes: "Felt very tired on day 1. Stayed home from school for one day.",
    loggedAt: new Date().toISOString()
  },
  {
    id: "cyc-2",
    userId: "user-default",
    startDate: makePastDate(32),
    endDate: makePastDate(28),
    flow: "heavy",
    pain: "severe",
    mood: "sensitive",
    symptoms: ["cramps", "bloating", "headache"],
    notes: "ASHA Didi gave me warm water bag and recommended a light walk.",
    loggedAt: new Date().toISOString()
  }
);

let isConnected = false;

async function seedMockData() {
  const User = require('./models/User');
  const Cycle = require('./models/Cycle');
  const SanitationReport = require('./models/SanitationReport');

  try {
    // 1. Seed Users
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("🌱 No users found in database. Seeding initial user profiles...");
      await User.insertMany(memoryDb.users);
      console.log("✅ Users seeded successfully!");
    }

    // 2. Seed Sanitation Reports
    const reportCount = await SanitationReport.countDocuments();
    if (reportCount === 0) {
      console.log("🌱 No sanitation reports found. Seeding default reports...");
      await SanitationReport.insertMany(memoryDb.reports);
      console.log("✅ Sanitation reports seeded successfully!");
    }

    // 3. Seed Cycles
    const cycleCount = await Cycle.countDocuments();
    if (cycleCount === 0) {
      console.log("🌱 No menstrual cycle logs found. Seeding past logs...");
      await Cycle.insertMany(memoryDb.cycles);
      console.log("✅ Menstrual cycle logs seeded successfully!");
    }
  } catch (error) {
    console.error("❌ Error while seeding database:", error.message);
  }
}

async function connectDb() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.warn("⚠️ No MONGO_URI provided in environment variables. Falling back to the highly resilient in-memory database simulation.");
    isConnected = false;
    return false;
  }
  
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ Successfully connected to MongoDB database.");
    isConnected = true;
    
    // Seed default mock data if database is empty
    await seedMockData();
    
    return true;
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB. Falling back to the resilient in-memory database simulation.", error.message);
    isConnected = false;
    return false;
  }
}

module.exports = {
  connectDb,
  getIsConnected: () => isConnected,
  memoryDb
};

