import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { Send, Heart, Smile, Sparkles, BookOpen, Clock, Activity, MessageCircleCode } from 'lucide-react';

export default function CounselingPage() {
  const { language, isChatLoading } = useStore();
  const t = translations[language];

  const [chatLog, setChatLog] = useState([
    {
      id: "counsel-1",
      sender: "counselor",
      text: language === 'kn' 
        ? "ನಮಸ್ತೆ ಮಗಳೇ, ನಾನು ನಿಮ್ಮ ಪ್ರೀತಿಯ ಕೌನ್ಸೆಲಿಂಗ್ ದಿದಿ. ಇವತ್ತು ನಿನ್ನ ಆತಂಕ, ಪರೀಕ್ಷೆಯ ಭಯ, ಮೂಡ್ ಸ್ವಿಂಗ್ ಅಥವಾ ಮನಸ್ಸಿನ ಕಳವಳಗಳ ಬಗ್ಗೆ ನನ್ನೊಂದಿಗೆ ಹಂಚಿಕೊ. ಇದು ಸಂಪೂರ್ಣ ರಹಸ್ಯವಾಗಿರುತ್ತದೆ."
        : "Namaste dear sister! I am your Wellbeing Counselor. Remember, your feelings are completely valid, beautiful, and important. Share anything that is making you feel down, anxious, or tired. I am right here with you.",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isAnxious, setIsAnxious] = useState(false);
  
  // Interactive breathing guide state
  const [breathingStep, setBreathingStep] = useState('Inhale'); // 'Inhale' | 'Hold' | 'Exhale'
  const [bScale, setBScale] = useState(1);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  // Breathing simulation loop
  useEffect(() => {
    if (!isBreathingActive) return;
    
    let interval = setInterval(() => {
      setBreathingStep(prev => {
        if (prev === 'Inhale') {
          setBScale(1.3);
          return 'Hold';
        } else if (prev === 'Hold') {
          setBScale(0.9);
          return 'Exhale';
        } else {
          setBScale(1);
          return 'Inhale';
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isBreathingActive]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      id: `cmsg-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };

    setChatLog(prev => [...prev, userMsg]);
    const promptText = input.toLowerCase();
    setInput('');

    // Reassuring fallback emotional support responses
    setTimeout(() => {
      let replyText = "";
      if (language === 'kn') {
        if (promptText.includes('ಭಯ') || promptText.includes('ಆತಂಕ') || promptText.includes('exam') || promptText.includes('ಪರೀಕ್ಷೆ')) {
          replyText = "ಪರೀಕ್ಷೆಯ ಭಯ ಸಹಜ ಮಗಳೇ. ಅದಕ್ಕಾಗಿ ಹೆಚ್ಚು ತಲೆಕೆಡಿಸಿಕೊಳ್ಳಬೇಡ. ದಿನಕ್ಕೆ ೮ ಗಂಟೆ ನಿದ್ದೆ ಮಾಡು, ಬಿಸಿ ಆಹಾರ ತಿನ್ನು. ಪರೀಕ್ಷೆಯಲ್ಲಿ ಮಾರ್ಕ್ಸ್ ಗಿಂತ ನಿನ್ನ ಆರೋಗ್ಯ ಮುಖ್ಯ. ಕಣ್ಣು ಮುಚ್ಚಿ ೨ ನಿಮಿಷ ನಮ್ಮ ಉಸಿರಾಟದ ವ್ಯಾಯಾಮ ಮಾಡು, ನಿನ್ನ ಮನಸ್ಸು ಪ್ರಶಾಂತವಾಗುತ್ತದೆ.";
        } else if (promptText.includes('ಮೂಡ್') || promptText.includes('ಕೋಪ') || promptText.includes('ಬೇಸರ')) {
          replyText = "ಹದಿಹರೆಯದ ಸಮಯದಲ್ಲಿ ದೇಹದ ಹಾರ್ಮೋನ್ ಬದಲಾವಣೆಯಿಂದ ಮೂಡ್ ಸ್ವಿಂಗ್ಸ್ ಆಗುವುದು ಸಂಪೂರ್ಣ ನೈಸರ್ಗಿಕ. ನಿನ್ನ ಭಾವನೆಗಳಿಗೆ ಬೆಲೆ ಕೊಡು. ಮನಸ್ಸಿಗೆ ಇಷ್ಟವಾದ ಹಾಡು ಕೇಳು ಅಥವಾ ಸ್ವಲ್ಪ ನಡೆದಾಡು. ನೋವೇನಾದರೂ ಇದ್ದರೆ ನಾನು ಇಲ್ಲೇ ಇದ್ದೇನೆ.";
        } else {
          replyText = "ನಿನ್ನ ಮಾತುಗಳು ನನ್ನ ಹೃದಯ ಮುಟ್ಟಿದವು. ನಿನ್ನ ಕನಸುಗಳು ತುಂಬಾ ದೊಡ್ಡವು ಮತ್ತು ನೀನು ಅವುಗಳನ್ನು ಸಾಧಿಸಬಲ್ಲೆ. ಯೋಚನೆ ಮಾಡಬೇಡ, ನಾನು ನಿನ್ನ ಬೆಂಬಲಕ್ಕಿದ್ದೇನೆ.";
        }
      } else {
        if (promptText.includes('anxious') || promptText.includes('fear') || promptText.includes('exam') || promptText.includes('stress')) {
          replyText = "Feeling anxious about school or exams is very common, dear sister. Take a deep breath. Try to break your studies into small goals, take short breaks, and sleep well. You are much stronger than any exam score!";
        } else if (promptText.includes('sad') || promptText.includes('mood') || promptText.includes('crying') || promptText.includes('depress')) {
          replyText = "Hormones shifting during puberty can cause heavy mood swings. Reassure yourself that this is biological and temporary. You are not alone! Wrap yourself in a cozy blanket, drink warm milk, or do our visual breathing exercise below.";
        } else {
          replyText = "Thank you for sharing your thoughts with me. Sharing is the first step to feeling lighter. Remember to be gentle with yourself. I am always right here by your side.";
        }
      }

      const botMsg = {
        id: `cmsg-${Date.now() + 1}`,
        sender: 'counselor',
        text: replyText,
        timestamp: new Date().toISOString()
      };
      setChatLog(prev => [...prev, botMsg]);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-800 font-serif tracking-tight flex items-center gap-2">
          <Smile className="h-6.5 w-6.5 text-rose-500 fill-rose-100" />
          {language === 'kn' ? 'ಮೈಂಡ್-ವೆಲ್ನೆಸ್ಸ್ ಮತ್ತು ಆಪ್ತ ಸಮಾಲೋಚನೆ' : 'Emotional Care & Counseling'}
        </h2>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
          A completely private, comforting sanctuary for your thoughts and emotions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Counselor Chat Panel */}
        <div className="lg:col-span-2 bg-white border border-rose-100 rounded-3xl p-5 shadow-soft flex flex-col h-[460px] justify-between">
          {/* Chats Feed */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
            {chatLog.map(msg => {
              const isUser = msg.sender === 'user';
              return (
                <div key={msg.id} className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                  <div className="custom-avatar text-[10px]">
                    {isUser ? 'ME' : '💆‍♀️'}
                  </div>
                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed font-semibold shadow-sm ${
                    isUser 
                      ? 'bg-rose-500 text-white rounded-tr-none' 
                      : 'bg-rose-50 text-slate-800 rounded-tl-none border border-rose-100'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts helper */}
          <div className="flex flex-wrap gap-1.5 pb-3">
            {[
              language === 'kn' ? "ಪರೀಕ್ಷೆಯ ಭಯವಾಗುತ್ತಿದೆ" : "I feel stressed about school",
              language === 'kn' ? "ಮನಸ್ಸು ಬೇಸರವಾಗಿದೆ" : "My mood feels very down today",
              language === 'kn' ? "ಉಸಿರಾಟದ ವ್ಯಾಯಾಮ ಮಾಡಿಸು" : "Help me do breathing exercises"
            ].map(txt => (
              <button
                key={txt}
                type="button"
                onClick={() => setInput(txt)}
                className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100/60 border border-rose-200/30 text-[10px] text-rose-700 font-bold rounded-lg transition-all"
              >
                {txt}
              </button>
            ))}
          </div>

          {/* Form input */}
          <form onSubmit={handleSend} className="flex gap-2 border-t border-rose-100 pt-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share how you feel... (e.g. 'I am feeling down today')..."
              className="flex-1 custom-input"
            />
            <button type="submit" className="btn-default">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Right 1 Col: Expanding Visual Breathing Ring */}
        <div className="custom-card justify-between space-y-6">
          <div className="space-y-1.5">
            <h3 className="font-serif text-lg font-bold text-rose-900 flex items-center gap-1.5">
              <Activity className="h-5 w-5 text-rose-500" />
              Mindful Breathing
            </h3>
            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
              Facing anxiety, stomach pain, or study fatigue? Engage in our 2-minute expanding breathing simulator to instantly relax.
            </p>
          </div>

          {/* Circle simulator canvas */}
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div 
              style={{ transform: `scale(${bScale})` }}
              className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-400 to-rose-200 border-4 border-white shadow-lg flex items-center justify-center transition-all duration-1000 ease-in-out"
            >
              <Heart className="h-8 w-8 text-white fill-white/20 animate-pulse" />
            </div>
            
            {isBreathingActive ? (
              <div className="text-center space-y-1 animate-slide-up">
                <span className="text-xs font-black uppercase tracking-widest text-rose-600 animate-pulse block">
                  {breathingStep === 'Inhale' ? '🎈 INHALE...' : breathingStep === 'Hold' ? '⏳ HOLD...' : '🌬️ EXHALE...'}
                </span>
                <span className="text-[9px] text-slate-400 font-bold block">Focus on the circle expand</span>
              </div>
            ) : (
              <span className="text-[10px] text-slate-400 font-bold text-center">Breathing simulator paused</span>
            )}
          </div>

          {/* Trigger button */}
          <button
            onClick={() => setIsBreathingActive(!isBreathingActive)}
            className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
              isBreathingActive 
                ? 'bg-rose-100 border-rose-200 text-rose-700' 
                : 'bg-rose-500 hover:bg-rose-600 text-white shadow-soft glow-btn'
            }`}
          >
            {isBreathingActive ? 'Pause Exercise' : 'Start 2-Min Relax'}
          </button>

          <div className="border-t border-rose-100/50 pt-2.5 text-[9px] text-slate-400 leading-snug font-bold uppercase flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-rose-400" />
            <span>Target: 6 breath cycles per minute</span>
          </div>

        </div>

      </div>
    </div>
  );
}
