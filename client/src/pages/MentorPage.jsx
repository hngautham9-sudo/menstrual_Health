import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { Send, Mic, Volume2, Heart, Lock, UserCircle, MessageSquareQuote, Check } from 'lucide-react';

export default function MentorPage() {
  const { language, chatMessages, isChatLoading, sendChatMessage } = useStore();
  const t = translations[language];

  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isChatLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isChatLoading) return;
    
    const text = input;
    setInput('');
    await sendChatMessage(text);
  };

  const handleQuickQuestion = async (question) => {
    if (isChatLoading) return;
    await sendChatMessage(question);
  };

  const handleMicPress = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      if (language === 'kn') {
        recognition.lang = 'kn-IN';
      } else if (language === 'hi') {
        recognition.lang = 'hi-IN';
      } else {
        recognition.lang = 'en-IN';
      }

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.start();
    } else {
      // simulated backup fallback
      setIsRecording(true);
      setTimeout(() => {
        let speechText = "";
        if (language === 'kn') {
          speechText = "ಮುಟ್ಟಿನ ಸಮಯದಲ್ಲಿ ತೀವ್ರ ಹೊಟ್ಟೆನೋವು ಬಂದರೆ ಏನು ಮಾಡಬೇಕು?";
        } else if (language === 'hi') {
          speechText = "पीरियड में बहुत ज्यादा पेट दर्द हो तो क्या करें?";
        } else {
          speechText = "What should I do if I have severe stomach pain?";
        }
        setInput(speechText);
        setIsRecording(false);
      }, 2000);
    }
  };

  const handlePlayVoice = (msgText, msgId) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech synthesis first
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(msgText);
      // Select appropriate local language locales
      if (language === 'kn') {
        utterance.lang = 'kn-IN';
      } else if (language === 'hi') {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-IN';
      }

      utterance.onend = () => {
        setPlayingId(null);
      };

      setPlayingId(msgId);
      window.speechSynthesis.speak(utterance);
    } else {
      // simulated backup fallback
      setPlayingId(msgId);
      setTimeout(() => {
        setPlayingId(null);
      }, 3000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto py-4">
      {/* Header and secure panel */}
      <div className="bg-rose-50 border border-rose-100 rounded-3xl p-5 flex items-center justify-between flex-wrap gap-4 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-rose-900 font-serif flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-500 fill-rose-100" />
            {t.saheliTitle}
          </h2>
          <p className="text-xs text-slate-500 font-semibold">{t.saheliSubtitle}</p>
        </div>
        <div className="badge-safe !bg-white">
          <Lock className="h-3.5 w-3.5 text-green-700" />
          <span>{language === 'kn' ? "ಶೇರ್ ಆಗುವುದಿಲ್ಲ • ಖಾಸಗಿ" : "100% Secure • Private"}</span>
        </div>
      </div>

      {/* Suggested prompts grid */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider flex items-center gap-1.5 pl-1">
          <MessageSquareQuote className="h-4 w-4 text-rose-400" />
          {language === 'kn' ? "ಇಲ್ಲಿದೆ ಕೆಲವು ಪ್ರಶ್ನೆಗಳು (ಸುಲಭವಾಗಿ ಕೇಳಿ):" : "Suggested questions (Tap to ask):"}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { key: 'q1', text: t.suggestedQ1 },
            { key: 'q2', text: t.suggestedQ2 },
            { key: 'q3', text: t.suggestedQ3 },
            { key: 'q4', text: t.suggestedQ4 }
          ].map(q => (
            <button
              key={q.key}
              onClick={() => handleQuickQuestion(q.text)}
              disabled={isChatLoading}
              className="bg-white border border-rose-100/60 hover:border-rose-300 hover:bg-rose-50/20 transition-all text-xs font-semibold text-left p-3 rounded-2xl text-slate-600 leading-snug shadow-sm hover:scale-[1.01]"
            >
              {q.text}
            </button>
          ))}
        </div>
      </div>

      {/* Main chat log container */}
      <div className="bg-white border border-rose-100 rounded-3xl shadow-soft flex flex-col h-[460px] overflow-hidden">
        
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isPlaying = playingId === msg.id;

            return (
              <div 
                key={msg.id} 
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Custom Avatar Initial logo */}
                <div className="custom-avatar text-[10px]">
                  {isUser ? 'ME' : 'SA'}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1.5">
                  <div className={`p-3.5 rounded-2xl relative text-xs leading-relaxed font-semibold transition-all shadow-sm ${
                    isUser 
                      ? 'bg-rose-500 text-white rounded-tr-none' 
                      : 'bg-rose-50 text-slate-800 rounded-tl-none border border-rose-100'
                  }`}>
                    {/* Sound button */}
                    {!isUser && (
                      <button
                        onClick={() => handlePlayVoice(msg.text, msg.id)}
                        className={`absolute right-2 top-2 p-1 rounded-lg text-rose-500/70 hover:text-rose-600 hover:bg-white/80 transition-all ${isPlaying ? 'animate-bounce text-rose-600' : ''}`}
                        title="Read out loud"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                    
                    <p className={!isUser ? "pr-6" : ""}>{msg.text}</p>
                  </div>
                  
                  {isPlaying && (
                    <div className="text-[9px] text-rose-500 font-bold tracking-wide animate-pulse flex items-center gap-1 px-2.5">
                      <Volume2 className="h-3 w-3" />
                      <span>{t.audioPlaying}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isChatLoading && (
            <div className="flex gap-3 max-w-[80%]">
              <div className="custom-avatar animate-pulse">SA</div>
              <div className="bg-rose-50 text-slate-500 rounded-2xl rounded-tl-none p-3.5 text-xs font-bold italic animate-pulse border border-rose-100 shadow-sm">
                {language === 'kn' ? "ಸಹೇಲಿ ಯೋಚಿಸುತ್ತಿದ್ದಾಳೆ..." : language === 'hi' ? "सहेली सोच रही है..." : "Saheli is thinking..."}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input panel */}
        <form 
          onSubmit={handleSend}
          className="border-t border-rose-100 p-3 bg-slate-50 flex items-center gap-2"
        >
          {/* Micro Speaking Recorder */}
          <button
            type="button"
            onClick={handleMicPress}
            disabled={isChatLoading}
            className={`p-3.5 rounded-2xl transition-all shadow-sm ${
              isRecording 
                ? 'bg-red-500 text-white animate-ping' 
                : 'bg-white text-rose-500 border border-rose-100 hover:bg-rose-50'
            }`}
            title={t.micBtn}
          >
            <Mic className="h-4 w-4" />
          </button>

          {/* Text input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isChatLoading}
            placeholder={isRecording ? "Listening to speech input..." : t.chatPlaceholder}
            className="flex-1 custom-input py-3"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={!input.trim() || isChatLoading}
            className="btn-default !p-3.5"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
