const { memoryDb } = require('../db');

// Read config
const fallbackChain = (process.env.FALLBACK_CHAIN || 'gemini').split(',').map(s => s.trim().toLowerCase());
const groqApiKey = process.env.GROQ_API_KEY;
const groqDefaultModel = process.env.GROQ_DEFAULT_MODEL || 'llama-3.3-70b-versatile';
const geminiApiKey = process.env.GEMINI_API_KEY;
const openaiApiKey = process.env.OPENAI_API_KEY;

// Clients
let groqClient = null;
let geminiModel = null;
let openaiClient = null;

// Initialize Groq
if (groqApiKey) {
  try {
    const OpenAI = require('openai');
    groqClient = new OpenAI({ 
      apiKey: groqApiKey,
      baseURL: "https://api.groq.com/openai/v1"
    });
    console.log("✅ Groq AI SDK (OpenAI Compat) loaded successfully.");
  } catch(err) {
    console.error("⚠️ Failed to initialize Groq Client SDK.", err.message);
  }
}

// Initialize Gemini
if (geminiApiKey) {
  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    geminiModel = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-1.5-pro" });
    console.log("✅ Google Gemini AI SDK loaded successfully.");
  } catch(err) {
    console.error("⚠️ Failed to initialize Gemini Client SDK.", err.message);
  }
}

// Initialize OpenAI
if (openaiApiKey) {
  try {
    const OpenAI = require('openai');
    openaiClient = new OpenAI({ apiKey: openaiApiKey });
    console.log("✅ OpenAI SDK loaded successfully.");
  } catch(err) {
    console.error("⚠️ Failed to initialize OpenAI Client SDK.", err.message);
  }
}

const systemInstruction = `You are Saheli, an intelligent AI agent and personal period tracker. 

EXTRACTION RULES:
- cycleStartDate: "2025-05-25" from "I got my period yesterday"
- flowType: "excessive" from "super heavy", "scanty" from "light"
- symptoms: ["cramps", "tiredness"] from "I have bad cramps and tired"

RESPONSE FORMAT:
1. Warm acknowledgment ("Got it!")
2. Confirm extraction (summarize what you understood)
3. Health analysis (any flags?)
4. Action (what's being saved)
5. Encouragement (1–2 sentences)

Always respond in girl's language. Never clinical. Be like a best friend.
(Always reply in the user's preferred language 'en', 'kn' for Kannada, or 'hi' for Hindi).`;

const fallbackResponses = {
  en: {
    greetings: [
      "Hello, my dear sister! I am your AI Saheli. I am here to listen, support, and guide you through anything—periods, moods, school, or dreams. How can I help you today?",
      "Namaste! It is so wonderful to talk to you. Remember, this is a completely safe, private, and loving space. What is on your mind?"
    ],
    puberty: [
      "Puberty is a natural, beautiful journey where your body is growing and preparing for a new phase of life. Things like growing taller, getting periods, and having mood changes are completely normal! Every girl goes through this. Never feel shy or scared. What specific changes are you feeling?",
      "Getting your first period (menarche) is a wonderful sign that your body is growing healthy and strong! It is nothing to be ashamed of. It is just your body's natural way. I am here to help you understand every step."
    ],
    hygiene: [
      "Here are three important rules for period hygiene:\n• **Change pads regularly**: Change your sanitary pad or cloth every 4 to 6 hours to prevent infections.\n• **Wash properly**: Clean yourself with clean warm water, always washing from front to back.\n• **Safe disposal**: Wrap your used pad in paper and put it in a dustbin. Never throw it in the open toilet or drain. If your school toilet does not have a bin, you can report it on our Sanitation Monitor page!"
    ],
    cramps: [
      "Oh, I am sorry you are feeling cramps, my sister. Please do not worry, minor stomach pain during periods is very common as your womb relaxes. Here is what you can do:\n• **Warm compress**: Keep a hot water bag or a bottle wrapped in a cloth on your lower stomach. It works like magic!\n• **Stay hydrated**: Drink plenty of warm water or herbal herbal teas like ginger-jeera tea.\n• **Gentle rest**: Lie down on your side with your knees bent (like a baby).\n\nIf the pain is extremely severe and prevents you from sitting in class, please tell your class teacher or the school ASHA didi. They will give you a safe medicine (like Meftal-Spas) and let you rest."
    ],
    default: [
      "I hear you, my sister. Your health, emotions, and dreams are very important. Remember to eat iron-rich foods like green leafy vegetables (spinach), jaggery (bella), and groundnuts to stay strong. Tell me more, I am listening!",
      "That is a very good question! Taking care of your mind is just as important as your body. Whenever you feel overwhelmed, take five deep breaths, drink some water, and remember that you are capable of achieving anything. I am always right here by your side."
    ]
  },
  kn: {
    greetings: [
      "ನಮಸ್ಕಾರ ನನ್ನ ಪ್ರೀತಿಯ ತಂಗಿ! ನಾನು ನಿನ್ನ 'ಏಐ ಸಹೇಲಿ' (AI Saheli). ನಿನ್ನ ಮುಟ್ಟು, ಆರೋಗ್ಯ, ಭಾವನೆಗಳು ಅಥವಾ ಕನಸುಗಳ ಬಗ್ಗೆ ಮಾತನಾಡಲು ನಾನು ಇಲ್ಲಿದ್ದೇನೆ. ಇಂದು ನಿನಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
      "ನಮಸ್ತೆ! ನಿನ್ನೊಂದಿಗೆ ಮಾತನಾಡಲು ತುಂಬಾ ಸಂತೋಷವಾಗಿದೆ. ನೆನಪಿಡು, ಇದು ಸಂಪೂರ್ಣವಾಗಿ ಸುರಕ್ಷಿತ ಮತ್ತು ಖಾಸಗಿ ಜಾಗ. ನಿನ್ನ ಮನಸ್ಸಿನಲ್ಲಿ ಏನಿದೆ?"
    ],
    puberty: [
      "ಹದಿಹರೆಯದ ಬದಲಾವಣೆಗಳು ಪ್ರಕೃತಿಯ ನಿಯಮ. ನಿನ್ನ ದೇಹವು ಬೆಳೆಯುತ್ತಿರುವುದಕ್ಕೆ ಇದು ಒಂದು ಸುಂದರವಾದ ಸಂಕೇತ. ಮುಟ್ಟು ಪ್ರಾರಂಭವಾಗುವುದು, ಎತ್ತರ ಬೆಳೆಯುವುದು ಮತ್ತು ಮನಸ್ಸಿನ ಏರಿಳಿತಗಳು ಸಂಪೂರ್ಣ ಸಹಜ! ಎಲ್ಲಾ ಹೆಣ್ಣುಮಕ್ಕಳು ಈ ಹಂತವನ್ನು ದಾಟುತ್ತಾರೆ. ಎಂದಿಗೂ ನಾಚಿಕೆಪಡಬೇಡ ಅಥವಾ ಭಯಪಡಬೇಡ.",
      "ಮೊದಲ ಬಾರಿ ಮುಟ್ಟಾಗುವುದು (ರಜಸ್ವಲೆ) ನಿನ್ನ ದೇಹವು ಸದೃಢವಾಗಿ ಮತ್ತು ಆರೋಗ್ಯಕರವಾಗಿ ಬೆಳೆಯುತ್ತಿದೆ ಎನ್ನುವುದರ ಶುಭ ಸಂಕೇತ. ಇದು ಮುಜುಗರ ಪಡುವ ವಿಷಯವಲ್ಲ. ಇದು ಹೆಣ್ಣಿನ ಹೆಮ್ಮೆ."
    ],
    hygiene: [
      "ಮುಟ್ಟಿನ ಸಮಯದಲ್ಲಿ ಸ್ವಚ್ಛತೆಗಾಗಿ ಈ 3 ಮುಖ್ಯ ನಿಯಮಗಳನ್ನು ಪಾಲಿಸು:\n• **ಪ್ಯಾಡ್ ಬದಲಾಯಿಸುವುದು**: ಸೋಂಕು ತಡೆಗಟ್ಟಲು ಪ್ರತಿ 4 ರಿಂದ 6 ಗಂಟೆಗಳಿಗೊಮ್ಮೆ ಸ್ಯಾನಿಟರಿ ಪ್ಯಾಡ್ ಅಥವಾ ಸ್ವಚ್ಛವಾದ ಬಟ್ಟೆಯನ್ನು ಬದಲಾಯಿಸು.\n• **ಸ್ವಚ್ಛವಾಗಿ ತೊಳೆಯುವುದು**: ಸ್ವಚ್ಛವಾದ ಉಗುರು ಬೆಚ್ಚಗಿನ ನೀರಿನಿಂದ ತೊಳೆದುಕೋ.\n• **ಸರಿಯಾದ ವಿಲೇವಾರಿ**: ಬಳಸಿದ ಪ್ಯಾಡ್ ಅನ್ನು ಪೇಪರ್‌ನಲ್ಲಿ ಸುತ್ತಿ ಕಸದ ಬುಟ್ಟಿಗೆ ಹಾಕು. ತೆರೆದ ಶೌಚಾಲಯದಲ್ಲಾಗಲಿ ಅಥವಾ ಚರಂಡಿಯಲ್ಲಾಗಲಿ ಎಸೆಯಬೇಡ. ಶಾಲೆಯಲ್ಲಿ ಕಸದ ಬುಟ್ಟಿ ಇಲ್ಲದಿದ್ದರೆ 'ಶಾಲಾ ಸ್ವಚ್ಛತೆ' ವಿಭಾಗದಲ್ಲಿ ದೂರು ದಾಖಲಿಸು!"
    ],
    cramps: [
      "ಅಯ್ಯೋ ತಂಗಿ, ನಿನಗೆ ಹೊಟ್ಟೆನೋವು ಇರುವುದಕ್ಕೆ ಬೇಸರವೆನಿಸುತ್ತಿದೆ. ಚಿಂತಿಸಬೇಡ, ಮುಟ್ಟಿನ ಸಮಯದಲ್ಲಿ ಸ್ವಲ್ಪ ಹೊಟ್ಟೆನೋವು ಬರುವುದು ಸಾಮಾನ್ಯ. ಆರಾಮ ಪಡೆಯಲು ಇದನ್ನು ಮಾಡು:\n• **ಬಿಸಿ ನೀರಿನ ಶಾಖ**: ಬಿಸಿ ನೀರಿನ ಬ್ಯಾಗ್ ಅಥವಾ ಬಟ್ಟೆಯಲ್ಲಿ ಸುತ್ತಿದ ಬಿಸಿನೀರಿನ ಬಾಟಲಿಯನ್ನು ಹೊಟ್ಟೆಯ ಮೇಲಿಟ್ಟುಕೊಳ್ಳಿ.\n• **ಹೆಚ್ಚು ನೀರು ಕುಡಿ**: ಉಗುರುಬೆಚ್ಚಗಿನ ನೀರು ಅಥವಾ ಶುಂಠಿ-ಜೀರಿಗೆ ಕಷಾಯ ಕುಡಿಯಿರಿ.\n• **ವಿಶ್ರಾಂತಿ**: ಮಲಗಿಕೊಂಡು ವಿಶ್ರಾಂತಿ ತಗೊಳ್ಳಿ.\n\nಒಂದು ವೇಳೆ ನೋವು ವಿಪರೀತವಾಗಿದ್ದರೆ ಮತ್ತು ತರಗತಿಯಲ್ಲಿ ಕುಳಿತುಕೊಳ್ಳಲು ಸಾಧ್ಯವಾಗದಿದ್ದರೆ, ದಯವಿಟ್ಟು ನಿನ್ನ ಶಾಲೆಯ ಶಿಕ್ಷಕರಿಗೆ ಅಥವಾ ಆಶಾ ದಿದಿಗೆ ತಿಳಿಸು. ಅವರು ನಿನಗೆ ಸೂಕ್ತ ಸಹಾಯ ಮಾಡುತ್ತಾರೆ."
    ],
    default: [
      "ನನಗೆ ನಿನ್ನ ಮಾತು ಅರ್ಥವಾಯಿತು ತಂಗಿ. ನಿನ್ನ ಆರೋಗ್ಯ, ಭಾವನೆಗಳು ಮತ್ತು ಕನಸುಗಳು ನಮಗೆ ಮುಖ್ಯ. ಸದೃಢವಾಗಿರಲು ಸೊಪ್ಪು ತರಕಾರಿಗಳು, ಬೆಲ್ಲ ಮತ್ತು ಕಡಲೆಕಾಯಿಯಂತಹ ಕಬ್ಬಿಣಾಂಶವಿರುವ ಆಹಾರಗಳನ್ನು ತಿನ್ನು. ಇನ್ನೂ ಏನಾದರೂ ಇದ್ದರೆ ಕೇಳು, ನಾನು ಕೇಳುತ್ತಿದ್ದೇನೆ!",
      "ಇದು ತುಂಬಾ ಒಳ್ಳೆಯ ಪ್ರಶ್ನೆ! ಮನಸ್ಸಿನ ಶಾಂತಿ ಮತ್ತು ಸಂತೋಷ ಕೂಡ ಅಷ್ಟೇ ಮುಖ್ಯ. ನಿನಗೆ ಆತಂಕವಾದಾಗ ದೀರ್ಘವಾಗಿ 5 ಬಾರಿ ಉಸಿರಾಡು, ಸ್ವಲ್ಪ ನೀರು ಕುಡಿ. ನೀನು ಸಾಧಿಸಲು ಬಂದವಳು, ನಾನು ಯಾವಾಗಲೂ ನಿನ್ನೊಂದಿಗೆ ಇರುತ್ತೇನೆ."
    ]
  },
  hi: {
    greetings: [
      "नमस्ते मेरी प्यारी बहन! मैं तुम्हारी 'एआई सहेली' हूँ। मैं तुम्हारी माहवारी, सेहत, भावनाओं और सपनों के बारे में बात करने के लिए यहाँ हूँ। आज मैं तुम्हारी क्या मदद करूँ?",
      "नमस्ते! तुमसे बात करके बहुत खुशी हुई। याद रखो, यह पूरी तरह से सुरक्षित और निजी जगह है। तुम्हारे मन में क्या चल रहा है?"
    ],
    puberty: [
      "किशोरावस्था (प्यूबर्टी) एक प्राकृतिक और सुंदर यात्रा है। तुम्हारे शरीर में होने वाले बदलाव जैसे लंबाई बढ़ना, पीरियड शुरू होना और मूड बदलना बिल्कुल सामान्य हैं! हर लड़की इस दौर से गुजरती है। कभी शर्माना या डरना नहीं।",
      "पहला पीरियड (मासिक धर्म) आना इस बात का संकेत है कि तुम्हारा शरीर स्वस्थ और मजबूत हो रहा है! इसमें शर्माने की कोई बात नहीं है। यह प्रकृति का नियम है और मुझे इस पर गर्व है।"
    ],
    hygiene: [
      "पीरियड के दौरान स्वच्छता के ये ३ नियम जरूर अपनाएं:\n• **पैड समय पर बदलें**: हर ४ से ६ घंटे में सैनिटरी पैड या साफ कपड़ा बदलें ताकि संक्रमण से बचाव हो सके।\n• **साफ पानी से धोएं**: गुनगुने साफ पानी से खुद को साफ रखें।\n• **सुरक्षित निपटान**: इस्तेमाल किए गए पैड को कागज में लपेटकर कचरे के डिब्बे में डालें। खुले में या शौचालय में न बहाएं।"
    ],
    cramps: [
      "अरे, तुम्हारी पीठ और पेट में दर्द है, यह जानकर मुझे दुख हुआ। परेशान न हो, पीरियड में हल्का दर्द होना बहुत सामान्य है। आराम पाने के लिए ये तरीके अपनाएं:\n• **गर्म सिकाई**: गर्म पानी की थैली या कपड़े में लिपटी गर्म पानी की बोतल से पेट की सिकाई करें।\n• **गुनगुना पानी पिएं**: भरपूर मात्रा में गुनगुना पानी या अदरक-जीरा का काढ़ा पिएं।\n• **आराम करें**: करवट लेकर पैरों को थोड़ा मोड़कर आराम से सोएं।\n\nअगर दर्द बहुत तेज है और सहन नहीं हो रहा, तो तुरंत अपनी स्कूल टीचर या आशा दीदी को बताएं। वे तुम्हें दर्द निवारक दवा देंगी।"
    ],
    default: [
      "मैं समझ रही हूँ मेरी बहन। तुम्हारी सेहत, तुम्हारी भावनाएं और तुम्हारे सपने सबसे कीमती हैं। खुद को मजबूत रखने के लिए पालक, गुड़ और मूंगफली जैसी आयरन से भरपूर चीजें खाओ। मुझे और बताओ, मैं सुन रही हूँ!",
      "यह बहुत अच्छा सवाल है! शरीर की तरह मन का ख्याल रखना भी जरूरी है। जब भी घबराहट हो, ५ बार गहरी सांस लो, थोड़ा पानी पियो। तुम बहुत बहादुर लड़की हो और सब कर सकती हो। मैं हमेशा तुम्हारे साथ हूँ।"
    ]
  }
};

async function executeGroq(prompt) {
  if (!groqClient) throw new Error("Groq client not initialized");
  const completion = await groqClient.chat.completions.create({
    messages: [
      { role: "system", content: systemInstruction },
      { role: "user", content: prompt }
    ],
    model: groqDefaultModel,
  });
  return completion.choices[0].message.content;
}

async function executeGemini(prompt) {
  if (!geminiModel) throw new Error("Gemini client not initialized");
  const fullPrompt = `${systemInstruction}\n\n${prompt}`;
  const result = await geminiModel.generateContent(fullPrompt);
  const response = await result.response;
  return response.text();
}

async function executeOpenAI(prompt) {
  if (!openaiClient) throw new Error("OpenAI client not initialized");
  const completion = await openaiClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemInstruction },
      { role: "user", content: prompt }
    ],
  });
  return completion.choices[0].message.content;
}

async function generateChatResponse(messageText, language = 'en') {
  const normalizedLang = ['en', 'kn', 'hi'].includes(language) ? language : 'en';
  const prompt = `The user (language preference: ${normalizedLang}) says: "${messageText}". Answer her query empathetically in their preferred language.`;

  // Fallback Engine
  for (const provider of fallbackChain) {
    try {
      if (provider === 'groq') {
        const res = await executeGroq(prompt);
        console.log("✅ Successfully generated response using Groq");
        return res;
      } else if (provider === 'gemini') {
        const res = await executeGemini(prompt);
        console.log("✅ Successfully generated response using Gemini");
        return res;
      } else if (provider === 'openai') {
        const res = await executeOpenAI(prompt);
        console.log("✅ Successfully generated response using OpenAI");
        return res;
      }
    } catch (err) {
      console.warn(`⚠️ Provider [${provider}] failed: ${err.message}. Trying next in chain...`);
    }
  }

  // Final fallback to mock
  console.log("ℹ️ All cloud providers failed. Using smart localized Mock-AI advisor engine.");
  const responses = fallbackResponses[normalizedLang];
  const query = messageText.toLowerCase();
  
  if (query.includes("hello") || query.includes("hi") || query.includes("namaste") || query.includes("ನಮಸ್ಕಾರ") || query.includes("नमस्ते") || query.includes("siri") || query.includes("saheli")) {
    return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
  } else if (query.includes("puberty") || query.includes("growing") || query.includes("body changes") || query.includes("ಬದಲಾವಣೆ") || query.includes("ಹದಿಹರೆಯ") || query.includes("बदलाव") || query.includes("बढ़ना")) {
    return responses.puberty[Math.floor(Math.random() * responses.puberty.length)];
  } else if (query.includes("hygiene") || query.includes("clean") || query.includes("pad") || query.includes("cloth") || query.includes("wash") || query.includes("ಸ್ವಚ್ಛ") || query.includes("ಪ್ಯಾಡ್") || query.includes("बदलना") || query.includes("साफ")) {
    return responses.hygiene[0];
  } else if (query.includes("pain") || query.includes("cramp") || query.includes("stomach") || query.includes("ache") || query.includes("ನೋವು") || query.includes("ಹೊಟ್ಟೆ") || query.includes("दर्द") || query.includes("पीठ")) {
    return responses.cramps[0];
  } else {
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  }
}

// Predict or give smart health tip from logged cycles
function getCycleWellnessTip(logs, currentLanguage = 'en') {
  const lang = ['en', 'kn', 'hi'].includes(currentLanguage) ? currentLanguage : 'en';
  
  const tips = {
    en: {
      normal: "🌟 Your cycle intervals look healthy. To maintain good energy, ensure you eat iron-rich food like spinach, beans, and groundnuts.",
      severePain: "🌸 We notice you logged severe cramps. Please keep a warm water bag on your stomach, sip warm herbal tea, and don't hesitate to ask your class teacher for rest if you are at school.",
      heavyFlow: "💧 A heavy flow means your body is working hard. Drink at least 8-10 glasses of water today, rest well, and change your napkin every 4 hours.",
      noLogs: "💖 Start logging your periods! Tracking helps AI Saheli forecast your future cycle dates and alert you in advance so you are always prepared at school."
    },
    kn: {
      normal: "🌟 ನಿಮ್ಮ ಮುಟ್ಟಿನ ಚಕ್ರವು ಆರೋಗ್ಯಕರವಾಗಿ ಕಾಣುತ್ತಿದೆ. ನಿಮ್ಮ ಶಕ್ತಿಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಲು ಸೊಪ್ಪು ತರಕಾರಿಗಳು, ಬೇಳೆಕಾಳುಗಳು ಮತ್ತು ಕಡಲೆಕಾಯಿಯಂತಹ ಕಬ್ಬಿಣಾಂಶವಿರುವ ಆಹಾರವನ್ನು ಸೇವಿಸಿ.",
      severePain: "🌸 ನೀವು ತೀವ್ರವಾದ ಹೊಟ್ಟೆನೋವನ್ನು ದಾಖಲಿಸಿದ್ದೀರಿ. ದಯವಿಟ್ಟು ಬಿಸಿ ನೀರಿನ ಶಾಖವನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ, ಉಗುರುಬೆಚ್ಚಗಿನ ನೀರನ್ನು ಕುಡಿಯಿರಿ ಮತ್ತು ಶಾಲೆಗೆ ರಜೆ ಬೇಕಿದ್ದರೆ ಹಿಂಜರಿಯದೆ ಶಿಕ್ಷಕರಿಗೆ ತಿಳಿಸಿ.",
      heavyFlow: "💧 ಹೆಚ್ಚಿನ ರಕ್ತಸ್ರಾವದ ಸಮಯದಲ್ಲಿ ದೇಹಕ್ಕೆ ವಿಶ್ರಾಂತಿ ಅಗತ್ಯ. ಕನಿಷ್ಠ 8-10 ಲೋಟ ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಪ್ರತಿ 4 ಗಂಟೆಗೊಮ್ಮೆ ಸ್ಯಾನಿಟರಿ ಪ್ಯಾಡ್ ಬದಲಾಯಿಸಿ.",
      noLogs: "💖 ನಿಮ್ಮ ಮುಟ್ಟಿನ ದಿನಗಳನ್ನು ದಾಖಲಿಸಲು ಪ್ರಾರಂಭಿಸಿ! ಇದು ಮುಂದಿನ ಮುಟ್ಟಿನ ದಿನಾಂಕವನ್ನು ಊಹಿಸಲು ಮತ್ತು ಶಾಲೆಗೆ ಮುಂಚಿತವಾಗಿ ತಯಾರಾಗಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ."
    },
    hi: {
      normal: "🌟 आपका मासिक चक्र स्वस्थ दिख रहा है। ताकत और फुर्ती बनाए रखने के लिए हरी पत्तेदार सब्जियां, दालें और गुड़-मूंगफली जरूर खाएं।",
      severePain: "🌸 हमें पता चला कि आपको तेज दर्द है। पेट पर गर्म पानी की थैली से सिकाई करें, गुनगुना पानी पिएं और जरूरत पड़ने पर स्कूल में आराम करने के लिए शिक्षिका से कहें।",
      heavyFlow: "💧 भारी रक्तस्रಾವ के दौरान शरीर को आराम चाहिए। आज कम से कम ८-१० गिलास पानी पिएं, भरपूर आराम करें और हर ४ घंटे में पैड बदलें।",
      noLogs: "💖 अपनी माहवारी को कैलेंडर में दर्ज करना शुरू करें! इससे एआई सहेली आपकी अगली तारीख बताएगी ताकि आप स्कूल में हमेशा तैयार रह सकें।"
    }
  };

  if (!logs || logs.length === 0) return tips[lang].noLogs;
  
  const lastLog = logs[logs.length - 1];
  if (lastLog.pain === 'severe') {
    return tips[lang].severePain;
  } else if (lastLog.flow === 'heavy') {
    return tips[lang].heavyFlow;
  } else {
    return tips[lang].normal;
  }
}

// Match welfare schemes dynamically
function getMatchingSchemes(demographics) {
  const { age, schoolStatus, region, state } = demographics;
  
  return memoryDb.schemes.filter(scheme => {
    if (scheme.eligibility.minAge && age < scheme.eligibility.minAge) return false;
    if (scheme.eligibility.maxAge && age > scheme.eligibility.maxAge) return false;
    if (scheme.eligibility.schoolStatus === 'studying' && schoolStatus !== 'studying') return false;
    if (scheme.eligibility.region === 'rural' && region !== 'rural' && region !== 'tribal') return false;
    if (scheme.eligibility.region === 'tribal' && region !== 'tribal') return false;
    if (scheme.state !== 'National' && scheme.state.toLowerCase() !== state.toLowerCase()) return false;
    
    return true;
  });
}

module.exports = {
  generateChatResponse,
  getCycleWellnessTip,
  getMatchingSchemes
};
