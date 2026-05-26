import { create } from 'zustand';

const API_BASE = import.meta.env.VITE_API_URL || (window.location.port === '5173' ? 'http://localhost:5000/api' : `${window.location.origin}/api`);

// Predefined fallback mock data matching db.js seeds
const MOCK_SCHEMES = [
  {
    id: "sch-suchi",
    name: "Suchi Scheme (Karnataka)",
    nameLocal: "ಶುಚಿ ಯೋಜನೆ (ಕರ್ನಾಟಕ)",
    description: "Distribution of free sanitary napkins to adolescent girls in government and aided schools in rural and tribal regions.",
    descriptionLocal: "ಗ್ರಾಮೀಣ ಮತ್ತು ಬುಡಕಟ್ಟು ಪ್ರದೇಶಗಳ ಸರ್ಕಾರಿ ಮತ್ತು ಅನುದಾನಿತ ಶಾಲೆಗಳ ಹದಿಹರೆಯದ ಹುಡುಗಿಯರಿಗೆ ಉಚಿತ ಸ್ಯಾನಿಟರಿ ನ್ಯಾಪ್ಕಿನ್ಗಳು.",
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
    nameLocal: "ಕಸ್ತೂರಿಬಾ ಗಾಂಧಿ ಬಾಲಿಕา ವಿದ್ಯಾಲಯ",
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
    descriptionLocal: "ಹದಿಹರೆಯದ ಹುಡುಗಿಯರ (11-18 ವರ್ಷ) ಪೌಷ್ಟಿಕಾಂಶ ಮತ್ತು ಆರೋಗ್ಯ ಸ್ಥಿತಿಯನ್ನು ಸುಧಾರಿಸುವ ಮೂಲಕ ಸಬಲೀकरणಗೊಳಿಸುವುದು.",
    eligibility: { minAge: 11, maxAge: 18, gender: "female", region: "all", schoolStatus: "any" },
    benefits: "Supplementary nutrition, iron-folic acid supplementation, vocational training, and life skills counseling.",
    benefitsLocal: "ಪೌಷ್ಟಿಕಾಂಶ ಪೂರೈಕೆ, ಐರನ್ ಮತ್ತು ಫೋಲಿಕ್ ಆಸಿಡ್ ಮಾತ್ರೆಗಳು ಮತ್ತು ವೃತ್ತಿಪರ ಮಾರ್ಗದರ್ಶನ.",
    category: "health",
    state: "National",
    applicationSteps: ["Enroll with the local ASHA or Anganwadi worker.", "Participate in Weekly Iron Folic Acid Supplementation (WIFS) days."]
  }
];

const makePastDate = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

export const useStore = create((set, get) => ({
  // Active UI States
  language: 'kn', // default to Kannada (Empowering local girls)
  viewMode: 'girl', // 'girl' | 'asha'
  
  // User Profile
  user: {
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
  },
  
  // Cycle Tracking State
  cycles: [
    {
      id: "cyc-1",
      userId: "user-default",
      startDate: makePastDate(58),
      endDate: makePastDate(53),
      flow: "medium",
      pain: "moderate",
      mood: "tired",
      symptoms: ["cramps", "backache"],
      notes: "Felt very tired on day 1. Stayed home from school for one day."
    },
    {
      id: "cyc-2",
      userId: "user-default",
      startDate: makePastDate(30),
      endDate: makePastDate(26),
      flow: "heavy",
      pain: "severe",
      mood: "sensitive",
      symptoms: ["cramps", "bloating", "headache"],
      notes: "ASHA Didi gave me warm water bag and recommended a light walk."
    }
  ],
  predictionDate: null,
  wellnessTip: "🌟 Start logging your period details. AI Saheli will analyze your logs and forecast your cycle dates!",
  
  // Chat History
  chatMessages: [
    {
      id: "welcome-msg",
      sender: "saheli",
      text: "ನಮಸ್ಕಾರ ತಂಗಿ! ನಾನು ನಿನ್ನ ಏಐ ಸಹೇಲಿ (AI Saheli). ನಿನ್ನ ಮುಟ್ಟು, ಆರೋಗ್ಯ, ಸ್ವಚ್ಛತೆ ಅಥವಾ ಕನಸುಗಳ ಬಗ್ಗೆ ನೀನು ಏನು ಬೇಕಿದ್ದರೂ ಕೇಳಬಹುದು. ಎಲ್ಲವೂ ಖಾಸಗಿಯಾಗಿರುತ್ತದೆ.",
      timestamp: new Date().toISOString()
    }
  ],
  isChatLoading: false,

  // Schemes Matching State
  matchedSchemes: MOCK_SCHEMES,
  appliedSchemes: [],

  // Sanitation Reports State
  sanitationReports: [
    {
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
      description: "The water tap has dried up since last week. Girls are finding it difficult to wash hands.",
      status: "reported",
      reportedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
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
      description: "The main door lock of the girls bathroom is completely broken. We have to stand outside to guard.",
      status: "reviewed",
      reportedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],

  // Emergency SOS State
  emergencies: [],
  isSosTriggered: false,

  // Actions
  setLanguage: (lang) => set({ language: lang }),
  setViewMode: (mode) => set({ viewMode: mode }),
  
  updateUserProfile: async (profileData) => {
    try {
      const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      if (response.ok) {
        const updated = await response.json();
        set({ user: updated });
        return updated;
      }
    } catch (err) {
      console.warn("Express server unreachable, updating local user profile state.");
    }
    // Local Fallback
    const updated = { ...get().user, ...profileData };
    set({ user: updated });
    return updated;
  },

  fetchCycles: async () => {
    const user = get().user;
    const lang = get().language;
    try {
      const response = await fetch(`${API_BASE}/cycles/${user.id}?lang=${lang}`);
      if (response.ok) {
        const data = await response.json();
        set({ 
          cycles: data.logs,
          wellnessTip: data.wellnessTip
        });
        get().calculatePredictions(data.logs);
        return;
      }
    } catch (err) {
      console.warn("Express server unreachable. Reading local cycle cache.");
    }
    get().calculatePredictions(get().cycles);
  },

  addCycleLog: async (logData) => {
    const user = get().user;
    const lang = get().language;
    const fullLog = { userId: user.id, lang, ...logData };
    
    try {
      const response = await fetch(`${API_BASE}/cycles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullLog)
      });
      if (response.ok) {
        const data = await response.json();
        set({ 
          cycles: data.logs,
          wellnessTip: data.wellnessTip
        });
        get().calculatePredictions(data.logs);
        return;
      }
    } catch (err) {
      console.warn("Express server unreachable. Adding to local cycle state.");
    }

    // Local Fallback Log
    const newLog = {
      id: `cyc-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      ...logData,
      loggedAt: new Date().toISOString()
    };
    const updatedCycles = [...get().cycles, newLog].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    
    // Evaluate custom local wellness advisory tips based on flow/pain triggers
    let tipText = "";
    if (logData.pain === 'severe') {
      tipText = get().language === 'kn' 
        ? "🌸 ನೀವು ತೀವ್ರವಾದ ಹೊಟ್ಟೆನೋವನ್ನು ದಾಖಲಿಸಿದ್ದೀರಿ. ದಯವಿಟ್ಟು ಬಿಸಿ ನೀರಿನ ಶಾಖವನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ ಮತ್ತು ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ."
        : logData.lang === 'hi'
        ? "🌸 हमें पता चला कि आपको तेज दर्द है। पेट पर गर्म पानी की थैली से सिकाई करें और गुनगुना पानी पिएं।"
        : "🌸 We notice you logged severe cramps. Please keep a warm water bag on your stomach, drink warm tea and take rest.";
    } else {
      tipText = get().language === 'kn'
        ? "🌟 ನಿಮ್ಮ ಮುಟ್ಟಿನ ಚಕ್ರವು ಸುಗಮವಾಗಿ ಕಾಣಿಸುತ್ತಿದೆ. ಶಕ್ತಿಗಾಗಿ ಹಸಿರು ಸೊಪ್ಪುಗಳನ್ನು ಸೇವಿಸಿ."
        : "🌟 Your cycle intervals look healthy. To maintain good energy, ensure you eat iron-rich food.";
    }
    
    set({ 
      cycles: updatedCycles,
      wellnessTip: tipText
    });
    get().calculatePredictions(updatedCycles);
  },

  calculatePredictions: (cycleList) => {
    if (!cycleList || cycleList.length === 0) return;
    
    // Simple cycle predictor: Find average interval between starts
    const startDates = cycleList.map(c => new Date(c.startDate)).sort((a, b) => a - b);
    if (startDates.length < 2) {
      // Predict 28 days from last start date
      const lastStart = startDates[0];
      const nextDate = new Date(lastStart);
      nextDate.setDate(nextDate.getDate() + 28);
      set({ predictionDate: nextDate.toISOString().split('T')[0] });
      return;
    }

    let totalDiff = 0;
    for (let i = 1; i < startDates.length; i++) {
      const diffTime = Math.abs(startDates[i] - startDates[i-1]);
      totalDiff += Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    const avgInterval = Math.round(totalDiff / (startDates.length - 1)) || 28;
    
    const lastStart = startDates[startDates.length - 1];
    const predicted = new Date(lastStart);
    predicted.setDate(predicted.getDate() + avgInterval);
    
    set({ predictionDate: predicted.toISOString().split('T')[0] });
  },

  sendChatMessage: async (messageText) => {
    if (!messageText.trim()) return;
    
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toISOString()
    };

    set(state => ({ 
      chatMessages: [...state.chatMessages, userMsg],
      isChatLoading: true
    }));

    try {
      const response = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: messageText,
          language: get().language
        })
      });
      if (response.ok) {
        const reply = await response.json();
        set(state => ({
          chatMessages: [...state.chatMessages, reply],
          isChatLoading: false
        }));
        return;
      }
    } catch (err) {
      console.warn("Express server unreachable, using local AI mockup responses.");
    }

    // Local Fallback simulation (takes language preference into account)
    setTimeout(() => {
      let replyText = "";
      const textLower = messageText.toLowerCase();
      const lang = get().language;

      if (lang === 'kn') {
        if (textLower.includes('ನೋವು') || textLower.includes('ಹೊಟ್ಟೆ')) {
          replyText = "ಹೊಟ್ಟೆನೋವಿಗೆ ಬಿಸಿ ನೀರಿನ ಶಾಖ ತೆಗೆದುಕೊಳ್ಳಿ ತಂಗಿ. ಉಗುರುಬೆಚ್ಚಗಿನ ಶುಂಠಿ ನೀರನ್ನು ಕುಡಿಯಿರಿ. ನೋವು ಹೆಚ್ಚಿದ್ದರೆ ಶಾಲಾ ಶಿಕ್ಷಕಿಗೆ ಅಥವಾ ಆಶಾ ದಿದಿಗೆ ತಿಳಿಸಿ.";
        } else if (textLower.includes('ಸ್ವಚ್ಛ') || textLower.includes('ಪ್ಯಾಡ್')) {
          replyText = "ಪ್ರತಿ ೪-೬ ಗಂಟೆಗೊಮ್ಮೆ ಸ್ಯಾನಿಟರಿ ಪ್ಯಾಡ್ ಬದಲಾಯಿಸುವುದು ಅತಿ ಮುಖ್ಯ. ಬಳಸಿದ ಪ್ಯಾಡ್ ಅನ್ನು ಪೇಪರ್‌ನಲ್ಲಿ ಸುತ್ತಿ ಕಸದ ಬುಟ್ಟಿಗೆ ಹಾಕಿ.";
        } else {
          replyText = "ನಿನ್ನ ಪ್ರಶ್ನೆ ತುಂಬಾ ಒಳ್ಳೆಯದು ತಂಗಿ. ನಿನ್ನ ದೇಹದಲ್ಲಿ ಬದಲಾವಣೆಗಳು ಆಗುವುದು ಸಂಪೂರ್ಣ ಸಹಜ. ದಿನವೂ ಸೊಪ್ಪು ತರಕಾರಿಗಳು ಮತ್ತು ಹಣ್ಣುಗಳನ್ನು ತಿನ್ನುವುದರಿಂದ ದೇಹ ಸದೃಢವಾಗುತ್ತದೆ.";
        }
      } else if (lang === 'hi') {
        if (textLower.includes('दर्द') || textLower.includes('पेट')) {
          replyText = "पेट दर्द में गर्म पानी की थैली से पेट की सिकाई करें। खूब गुनगुना पानी पिएं। अगर दर्द बहुत तेज हो, तो स्कूल की शिक्षिका या आशा दीदी को बताएं।";
        } else if (textLower.includes('साफ') || textLower.includes('पैड')) {
          replyText = "माहवारी के दौरान संक्रमण से बचने के लिए हर ४-६ घंटे में पैड बदलना आवश्यक है। पुराने पैड को कागज में लपेटकर कचरे के डिब्बे में डालें।";
        } else {
          replyText = "तुम्हारी सेहत और सपने सबसे महत्वपूर्ण हैं। खुद को मजबूत रखने के लिए अच्छा खाना खाओ। कोई भी घबराहट हो तो मुझे बताओ, मैं हमेशा तुम्हारे साथ हूँ।";
        }
      } else {
        if (textLower.includes('pain') || textLower.includes('cramp')) {
          replyText = "Stomach pain is common during periods. Apply a warm water bag, sip warm ginger-jeera tea, and rest. If it's severe, let your school ASHA didi know.";
        } else if (textLower.includes('hygiene') || textLower.includes('pad')) {
          replyText = "Make sure to change sanitary pads every 4-6 hours. Wrap used pads in paper and put them in a bin. Wash with clean water regularly.";
        } else {
          replyText = "I am listening to you, sister. Ensure you eat healthy foods like spinach and groundnuts. Keep learning and staying strong! You are doing great.";
        }
      }

      const botMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'saheli',
        text: replyText,
        timestamp: new Date().toISOString()
      };

      set(state => ({
        chatMessages: [...state.chatMessages, botMsg],
        isChatLoading: false
      }));
    }, 1000);
  },

  matchSchemes: async (quizAnswers) => {
    try {
      const response = await fetch(`${API_BASE}/schemes/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizAnswers)
      });
      if (response.ok) {
        const matched = await response.json();
        set({ matchedSchemes: matched });
        return;
      }
    } catch (err) {
      console.warn("Express server unreachable, running quiz logic on local scheme array.");
    }
    // Local Filter Quiz implementation
    const { age, schoolStatus, region } = quizAnswers;
    const filtered = MOCK_SCHEMES.filter(scheme => {
      if (scheme.eligibility.minAge && age < scheme.eligibility.minAge) return false;
      if (scheme.eligibility.maxAge && age > scheme.eligibility.maxAge) return false;
      if (scheme.eligibility.schoolStatus === 'studying' && schoolStatus !== 'studying') return false;
      if (scheme.eligibility.region === 'rural' && region !== 'rural' && region !== 'tribal') return false;
      if (scheme.eligibility.region === 'tribal' && region !== 'tribal') return false;
      return true;
    });
    set({ matchedSchemes: filtered });
  },

  applyScheme: (schemeId) => {
    set(state => {
      if (state.appliedSchemes.includes(schemeId)) return state;
      return { appliedSchemes: [...state.appliedSchemes, schemeId] };
    });
  },

  fetchSanitationReports: async () => {
    try {
      const response = await fetch(`${API_BASE}/sanitation/reports`);
      if (response.ok) {
        const reports = await response.json();
        set({ sanitationReports: reports });
      }
    } catch (err) {
      console.warn("Express server offline. Displaying local school reports cache.");
    }
  },

  submitSanitationReport: async (reportData) => {
    const user = get().user;
    const fullReport = { userId: user.id, ...reportData };
    try {
      const response = await fetch(`${API_BASE}/sanitation/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullReport)
      });
      if (response.ok) {
        const newReport = await response.json();
        set(state => ({
          sanitationReports: [newReport, ...state.sanitationReports]
        }));
        return;
      }
    } catch (err) {
      console.warn("Express server offline. Saving report locally.");
    }
    // Local Fallback Submission
    const mockReport = {
      id: `rep-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      reporterName: user.name,
      village: user.village,
      ...reportData,
      status: 'reported',
      reportedAt: new Date().toISOString()
    };
    set(state => ({
      sanitationReports: [mockReport, ...state.sanitationReports]
    }));
  },

  resolveSanitationReport: async (reportId) => {
    const user = get().user;
    try {
      const response = await fetch(`${API_BASE}/sanitation/reports/${reportId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'resolved',
          resolvedBy: user.name
        })
      });
      if (response.ok) {
        const updated = await response.json();
        set(state => ({
          sanitationReports: state.sanitationReports.map(r => r.id === reportId ? updated : r)
        }));
        return;
      }
    } catch (err) {
      console.warn("Express server offline. Resolving local report copy.");
    }
    // Local update
    set(state => ({
      sanitationReports: state.sanitationReports.map(r => r.id === reportId ? {
        ...r,
        status: 'resolved',
        resolvedBy: user.name,
        resolvedAt: new Date().toISOString()
      } : r)
    }));
  },

  triggerEmergencySos: async (locationDetail = "School Toilet Block") => {
    const user = get().user;
    set({ isSosTriggered: true });

    try {
      const response = await fetch(`${API_BASE}/emergency/trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          locationName: locationDetail,
          message: "Urgent physical health supply or emotional support requested."
        })
      });
      if (response.ok) {
        const alert = await response.json();
        set(state => ({
          emergencies: [alert, ...state.emergencies]
        }));
      }
    } catch (err) {
      console.warn("Express server offline. Storing SOS state locally.");
    }

    // Add local distress alert to health worker tracking list
    const mockSos = {
      id: `sos-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      userName: user.name,
      schoolName: user.schoolName,
      locationName: locationDetail,
      message: "Urgent physical health supply or emotional support requested.",
      status: 'active',
      reportedAt: new Date().toISOString()
    };

    set(state => ({
      emergencies: [mockSos, ...state.emergencies]
    }));

    // Auto dismiss UI warning alert card after 8 seconds
    setTimeout(() => {
      set({ isSosTriggered: false });
    }, 8000);
  },

  fetchEmergencies: async () => {
    try {
      const response = await fetch(`${API_BASE}/emergency/alerts`);
      if (response.ok) {
        const alerts = await response.json();
        set({ emergencies: alerts });
      }
    } catch (err) {
      console.warn("Express server offline. Using local emergency queue.");
    }
  },

  resolveEmergency: async (alertId) => {
    set(state => ({
      emergencies: state.emergencies.filter(e => e.id !== alertId)
    }));
  }
}));
