import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { Apple, Activity, BookOpen, Check, Heart, ShieldAlert, Sparkles, Smile } from 'lucide-react';

export default function NutritionPage() {
  const { language, chatMessages, sanitationReports } = useStore();
  const t = translations[language];

  // Smart Context Analyzers (Cross-Module Sync)
  const hasPainMention = chatMessages?.some(m => 
    m.sender === 'user' && (m.text.toLowerCase().includes('pain') || m.text.toLowerCase().includes('cramp') || m.text.includes('ನೋವು') || m.text.includes('ಹೊಟ್ಟೆ') || m.text.includes('दर्द'))
  );

  const hasBadSanitation = sanitationReports?.some(r => 
    (!r.waterAvailability || r.toiletCleanliness < 3 || !r.soapAvailable)
  );

  // WIFS log state
  const [wifsLogged, setWifsLogged] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleWifsLog = () => {
    setWifsLogged(true);
    setShowConfirm(true);
    setTimeout(() => {
      setShowConfirm(false);
    }, 4000);
  };

  const dietGuidelines = [
    {
      food: language === 'kn' ? "ಸೊಪ್ಪು ತರಕಾರಿಗಳು (ಸಬ್ಬಸಿಗೆ, ಪಾಲಕ್)" : "Green Leafy Vegetables (Spinach)",
      reason: language === 'kn' ? "ಹೆಚ್ಚಿನ ಕಬ್ಬಿಣಾಂಶವಿದ್ದು, ಮುಟ್ಟಿನ ಸಮಯದಲ್ಲಿ ನಷ್ಟವಾಗುವ ರಕ್ತವನ್ನು ಮರುತುಂಬಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ." : "Extremely high in iron. Helps replenish hemoglobin lost during period blood flow.",
      image: "🥬"
    },
    {
      food: language === 'kn' ? "ಬೆಲ್ಲ ಮತ್ತು ಕಡಲೆಕಾಯಿ ಚಿಕ್ಕಿ" : "Jaggery (Bella) & Peanut Chikki",
      reason: language === 'kn' ? "ನೈಸರ್ಗಿಕ ಸಿಹಿ ಮತ್ತು ತ್ವರಿತ ಶಕ್ತಿಯನ್ನು ನೀಡುತ್ತದೆ. ರಕ್ತಹೀನತೆ ತಡೆಯಲು ಅತ್ಯುತ್ತಮ ಸಾಂಪ್ರದಾಯಿಕ ಆಹಾರ." : "Jaggery is a powerhouse of iron. Peanuts give high protein. The ultimate rural snack to prevent anemia.",
      image: "🥜"
    },
    {
      food: language === 'kn' ? "ರಾಗಿ ಮುದ್ದೆ / ರಾಗಿ ಅಂಬಲಿ" : "Ragi Malt / Millet Mudde",
      reason: language === 'kn' ? "ಕ್ಯಾಲ್ಸಿಯಂ ಮತ್ತು ನಾರಿನಂಶವಿದ್ದು, ಸೊಂಟನೋವು ಮತ್ತು ಹೊಟ್ಟೆ ಉಬ್ಬರ ತಡೆಯುತ್ತದೆ." : "Rich in calcium and fiber. Calms muscle contractions, soothing waist aches and bloating.",
      image: "🌾"
    },
    {
      food: language === 'kn' ? "ಕಿತ್ತಳೆ ಹಣ್ಣು / ನಿಂಬೆ ಹಣ್ಣಿನ ಶರಬತ್" : "Citrus Fruits & Lemon Sharbath",
      reason: language === 'kn' ? "ವಿಟಮಿನ್ C ಇದ್ದು, ನಾವು ಸೇವಿಸುವ ಆಹಾರದಲ್ಲಿರುವ ಕಬ್ಬಿಣಾಂಶವನ್ನು ಶರೀರವು ಹೀರಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ." : "Vitamin C helps the body absorb iron from vegetables. Essential to consume alongside spinach.",
      image: "🍋"
    }
  ];

  const yogaPoses = [
    {
      name: "Balasana (Child's Pose)",
      benefits: language === 'kn' ? "ಬೆನ್ನು ಮತ್ತು ಸೊಂಟದ ಸ್ನಾಯುಗಳನ್ನು ಸಡಿಲಗೊಳಿಸಿ ಹೊಟ್ಟೆನೋವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ." : "Relaxes lower back, calms uterine contractions, and relieves abdominal cramps.",
      steps: language === 'kn' ? "ಮಂಡಿಯೂರಿ ಕುಳಿತುಕೊಂಡು, ಕೈಗಳನ್ನು ಮುಂದಕ್ಕೆ ಚಾಚಿ ಹಣೆಯನ್ನು ನೆಲಕ್ಕೆ ಮುಟ್ಟಿಸಿ ನಿಧಾನವಾಗಿ ಉಸಿರಾಡಿ." : "Kneel on floor, sit on heels, fold forward stretching arms out, rest forehead down. Breathe deeply.",
      image: "🧘‍♀️"
    },
    {
      name: "Supta Baddha Konasana (Reclining Butterfly)",
      benefits: language === 'kn' ? "ಸೊಂಟದ ಭಾಗದ ರಕ್ತ ಪರಿಚಲನೆಯನ್ನು ಸುಧಾರಿಸಿ ನರಗಳನ್ನು ಶಾಂತಗೊಳಿಸುತ್ತದೆ." : "Stretches groin, opens pelvic muscles, improves lower abdomen blood flow to soothe tension.",
      steps: language === 'kn' ? "ನೆಲದ ಮೇಲೆ ಮಲಗಿ, ಪಾದಗಳನ್ನು ಒಂದಕ್ಕೊಂದು ಸ್ಪರ್ಶಿಸುವಂತೆ ಮಡಚಿ, ಮಂಡಿಗಳನ್ನು ಹೊರಕ್ಕೆ ಚಾಚಿ ಕೈಗಳನ್ನು ಪಕ್ಕಕ್ಕಿಡಿ." : "Lie on back, bend knees, press soles together allowing knees to fall open. Rest hands on stomach.",
      image: "🦋"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-800 font-serif tracking-tight flex items-center gap-2">
          <Apple className="h-6.5 w-6.5 text-rose-500 fill-rose-100" />
          {language === 'kn' ? "ಪೌಷ್ಟಿಕಾಂಶ, WIFS ದಿನಚರಿ ಮತ್ತು ಯೋಗ ಗೈಡ್" : "Nutrition & Cramps Relief Yoga"}
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          Eat healthy iron-rich foods, log your weekly blue pills, and learn simple cramps relief stretches
        </p>
      </div>

      {/* Smart Personalized Ecosystem Recommendations */}
      {(hasPainMention || hasBadSanitation) && (
        <div className="bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 rounded-3xl p-5 shadow-soft space-y-3 animate-slide-up">
          <h3 className="font-black text-rose-900 text-sm uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-rose-500 animate-pulse" />
            {language === 'kn' ? "ಸಹೇಲಿಯ ವಿಶೇಷ ಸಲಹೆಗಳು" : "Saheli's Smart Recommendations"}
          </h3>
          <div className="space-y-2">
            {hasPainMention && (
              <div className="bg-white/80 p-3 rounded-2xl border border-rose-100 flex items-start gap-3 hover:scale-[1.01] transition-all">
                <Heart className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                  {language === 'kn' 
                    ? "ನೀವು ಹೊಟ್ಟೆನೋವಿನ ಬಗ್ಗೆ ಸಹೇಲಿಗೆ ತಿಳಿಸಿದ್ದೀರಿ. ನೋವು ಶಮನಕ್ಕೆ 'ಬಾಲಾಸನ' (Child's Pose) ಯೋಗಾಸನ ಮಾಡಿ ಮತ್ತು ಬೆಲ್ಲದ ಚಹಾ ಕುಡಿಯಿರಿ." 
                    : "We noticed you mentioned cramps to AI Saheli. Please focus on the 'Balasana (Child's Pose)' below to relax your muscles, and eat Jaggery to boost energy!"}
                </p>
              </div>
            )}
            
            {hasBadSanitation && (
              <div className="bg-white/80 p-3 rounded-2xl border border-orange-100 flex items-start gap-3 hover:scale-[1.01] transition-all">
                <ShieldAlert className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                  {language === 'kn' 
                    ? "ಶಾಲೆಯ ಶೌಚಾಲಯದಲ್ಲಿ ನೀರಿನ ಸಮಸ್ಯೆ ಇರುವುದನ್ನು ನಾವು ಗಮನಿಸಿದ್ದೇವೆ. ಸೋಂಕು (UTI) ತಡೆಯಲು ಹೆಚ್ಚಿನ ಸಿಟ್ರಸ್ ಹಣ್ಣುಗಳನ್ನು ಸೇವಿಸಿ ಮತ್ತು ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ." 
                    : "We noticed recent school sanitation reports mentioning poor water/soap access. To prevent Urinary Tract Infections (UTI), highly increase your Citrus Fruits intake (Vitamin C) today and drink plenty of water from home!"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 1. WIFS Weekly blue tablet checklist */}
      <section className="bg-white border border-rose-100 rounded-3xl p-6 shadow-soft space-y-4">
        <h3 className="text-base font-black text-rose-800 uppercase tracking-wider flex items-center gap-2 border-b border-rose-100 pb-3">
          <Activity className="h-5 w-5 text-rose-500" />
          Weekly Iron Folic Acid supplementation (WIFS) Tracker
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <span className="badge-health">Blue Pill Day: Thursday</span>
            <p className="text-xs text-slate-600 font-semibold leading-relaxed">
              ASHA didi Shantha Mary distributes a blue WIFS iron tablet every Thursday in school. Log your blue tablet intake here to earn your health coordinator badge! Tapping keeps a clean history.
            </p>
          </div>

          <div className="shrink-0 space-y-2 text-center">
            {wifsLogged ? (
              <div className="bg-[#EAF7ED] border border-sage/50 text-green-800 px-6 py-3 rounded-2xl text-xs font-black flex items-center gap-2 animate-pulse-subtle">
                <Check className="h-4.5 w-4.5 text-green-700" />
                <span>WIFS Blue Tablet Taken ✓</span>
              </div>
            ) : (
              <button
                onClick={handleWifsLog}
                className="btn-default glow-btn text-xs font-black uppercase tracking-wider"
              >
                Log Today's blue WIFS Tablet
              </button>
            )}
            
            {showConfirm && (
              <span className="text-[10px] text-green-700 font-bold block animate-slide-up">
                Logged successfully! Forwarded to school health subcenter.
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 2. Diet & Nutrition guides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Diet section */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-rose-950 flex items-center gap-2 pl-1">
            <Sparkles className="h-4.5 w-4.5 text-rose-500" />
            Iron-Rich Traditional Foods
          </h3>

          <div className="space-y-4">
            {dietGuidelines.map(item => (
              <div key={item.food} className="bg-white border border-rose-100 rounded-3xl p-4 shadow-sm flex gap-4 hover:scale-[1.01] transition-all">
                <div className="text-2xl w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0 border border-rose-100">
                  {item.image}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-xs leading-snug">{item.food}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yoga Exercises section */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-rose-950 flex items-center gap-2 pl-1">
            <Smile className="h-4.5 w-4.5 text-rose-500 fill-rose-100" />
            Yoga Stretches for Cramp Relief
          </h3>

          <div className="space-y-4">
            {yogaPoses.map(pose => (
              <div key={pose.name} className="custom-card !p-5 space-y-3">
                <div className="flex items-center gap-2 border-b border-rose-100/50 pb-2">
                  <span className="text-2xl">{pose.image}</span>
                  <h4 className="font-serif text-base font-bold text-rose-900">{pose.name}</h4>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-rose-600 uppercase tracking-wide">Benefits:</span>
                  <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">{pose.benefits}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black text-rose-600 uppercase tracking-wide">How to perform:</span>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{pose.steps}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
