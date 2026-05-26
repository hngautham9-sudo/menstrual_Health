import React from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { Sparkles, CalendarDays, HeartHandshake, Award, FileSpreadsheet, Sparkle, Heart, Flame, ShieldCheck } from 'lucide-react';

export default function DashboardPage({ setActiveTab }) {
  const { language, user, cycles, predictionDate } = useStore();
  const t = translations[language];

  // Swasthya news updates preloaded inside dashboard
  const swasthyaNews = [
    {
      id: 1,
      title: language === 'kn' ? "ಶಾಲೆಯಲ್ಲಿ ಶುಚಿ ಸ್ಯಾನಿಟರಿ ಪ್ಯಾಡ್ ವಿತರಣೆ" : language === 'hi' ? "स्कूल में शुचि सैनिटरी पैड वितरण" : "Suchi Pad Distribution in School",
      desc: language === 'kn' 
        ? "ಮುಂಬರುವ ಬುಧವಾರ ನಮ್ಮ ಶಾಲೆಯ ಮುಖ್ಯ ಶಿಕ್ಷಕರು ಮತ್ತು ಆಶಾ ದಿದಿ ಉಚಿತ ಸ್ಯಾನಿಟರಿ ನ್ಯಾಪ್ಕಿನ್ ಕಿಟ್‌ಗಳನ್ನು ಪ್ರತಿ ವಿದ್ಯಾರ್ಥಿನಿಗೆ ವಿತರಿಸಲಿದ್ದಾರೆ."
        : language === 'hi'
        ? "अगले बुधवार हमारे स्कूल की प्रधानाध्यापिका और आशा दीदी हर छात्रा को मुफ्त सैनिटरी नैपकिन किट वितरित करेंगी।"
        : "Next Wednesday, our school Headmistress and ASHA didi will distribute free sanitary napkin kits to every student under the State Suchi Scheme.",
      tag: "Hygiene",
      date: "Today"
    },
    {
      id: 2,
      title: language === 'kn' ? "ವಾರದ ಕಬ್ಬಿಣಾಂಶ ಮಾತ್ರೆಗಳ ದಿನ (WIFS)" : language === 'hi' ? "साप्ताहिक आयरन पूरक कार्यक्रम" : "Weekly Iron Supplement Day (WIFS)",
      desc: language === 'kn'
        ? "ದೇಹದಲ್ಲಿ ರಕ್ತದ ಕೊರತೆ (ರಕ್ತಹೀನತೆ) ತಡೆಯಲು ಪ್ರತಿ ಗುರುವಾರ ಮಧ್ಯಾಹ್ನದ ಊಟದ ನಂತರ ಆಶಾ ದಿದಿ ನೀಡುವ ನೀಲಿ ಕಬ್ಬಿಣಾಂಶದ ಮಾತ್ರೆಗಳನ್ನು ತಪ್ಪದೇ ಸೇವಿಸಿ."
        : language === 'hi'
        ? "शरीर में खून की कमी (एनीमिया) को रोकने के लिए हर गुरुवार दोपहर के भोजन के बाद नीली आयरन की गोली जरूर लें।"
        : "To prevent anemia (blood weakness), don't forget to take your blue WIFS tablet after lunch every Thursday from ASHA didi.",
      tag: "Health & Nutrition",
      date: "Yesterday"
    }
  ];

  const getDaysRemaining = () => {
    if (!predictionDate) return 28;
    const diff = new Date(predictionDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 28 + (days % 28);
  };

  const daysLeft = getDaysRemaining();

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* 1. Welcoming Hero */}
      <section className="bg-gradient-to-r from-rose-100 via-rose-50 to-cream rounded-3xl p-6 md:p-8 border border-rose-100 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-48 h-48 rounded-full bg-rose-300/10 blur-3xl"></div>
        <div className="max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1 bg-rose-200 text-rose-700 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-rose-300/30">
            <Sparkles className="h-3 w-3 text-rose-500 animate-pulse" />
            {language === 'kn' ? "ಏಐ ಸಹೇಲಿ ಜೊತೆಗಿದ್ದಾಳೆ" : language === 'hi' ? "एआई सहेली तुम्हारे साथ है" : "AI Saheli is with you"}
          </span>
          <h2 className="text-3xl font-serif font-black text-rose-950 leading-tight">
            {language === 'kn' ? "ಪ್ರಿಯ ಗೆಳತಿ, ಮುಟ್ಟಿನ ದಿನಗಳ ಬಗ್ಗೆ ಮುಜುಗರ ಬೇಡ." : language === 'hi' ? "प्रिय सखी, माहवारी पर शर्माना कैसा?" : "Dear sister, periods are normal, healthy, and natural."}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
            {language === 'kn' 
              ? "ಇದು ನಿನ್ನ ಬೆಳೆಯುತ್ತಿರುವ ಸುಂದರ ಶರೀರದ ಸಂಕೇತ. ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿದ್ದರೂ ನಿನ್ನ ಸಹೇಲಿ ಜೊತೆ ಖಾಸಗಿಯಾಗಿ ಮಾತನಾಡು. ಶಾಲಾ ಶೌಚಾಲಯ ಸ್ವಚ್ಛತೆ ಬಗ್ಗೆ ಧ್ವನಿ ಎತ್ತು."
              : language === 'hi'
              ? "यह तुम्हारे बढ़ते हुए सुंदर शरीर का संकेत है। किसी भी सवाल पर अपनी सहेली से खुलकर बात करो। स्कूल शौचालय की सफाई पर अपनी आवाज उठाओ।"
              : "This is a sign of your beautiful growing body. Talk to AI Saheli privately, track your cycles easily, and report sanitary conditions at your school anonymously."}
          </p>
        </div>
      </section>

      {/* 2. Top Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cycle Ring */}
        <div className="custom-card flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-rose-700">{t.cardTrackerTitle}</h3>
            <CalendarDays className="h-5 w-5 text-rose-500" />
          </div>

          <div className="py-2 flex items-center justify-center relative">
            <svg className="w-28 h-28 transform -rotate-90">
              <circle cx="56" cy="56" r="44" className="progress-ring-bg" strokeWidth="6" fill="none" />
              <circle 
                cx="56" 
                cy="56" 
                r="44" 
                className="progress-ring-value" 
                strokeWidth="8" 
                fill="none" 
                strokeDasharray="276" 
                strokeDashoffset={276 - (276 * (28 - daysLeft)) / 28} 
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-3xl font-black font-serif text-rose-800">{daysLeft}</span>
              <p className="text-[9px] text-slate-500 font-black uppercase">{t.cardTrackerDays}</p>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-[10px] text-slate-500 font-bold">
              {predictionDate ? `${t.predictedNext} ${predictionDate}` : "Complete logs to enable predicted date updates."}
            </p>
            <button 
              onClick={() => setActiveTab('health')}
              className="w-full btn-default py-2 text-[10px] uppercase font-black tracking-wide"
            >
              {t.cardTrackerLogNow}
            </button>
          </div>
        </div>

        {/* Advisory Tips */}
        <div className="custom-card flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-rose-700">
              {language === 'kn' ? "ಸಹೇಲಿ ಆಪ್ತ ಸಲಹೆ" : language === 'hi' ? "सहेली की सलाह" : "Saheli Wellness Tips"}
            </h3>
            <Heart className="h-5 w-5 text-rose-500 fill-rose-100" />
          </div>

          <div className="bg-rose-50 p-4 rounded-xl border-l-4 border-rose-400">
            <h4 className="text-[10px] font-black text-rose-800 flex items-center gap-1 mb-1 uppercase tracking-wider">
              <Sparkle className="h-3.5 w-3.5 text-rose-500 animate-pulse" />
              {t.wellnessAdvisorTitle}
            </h4>
            <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
              {cycles.length > 0 ? (
                cycles[cycles.length - 1].pain === 'severe' 
                  ? t.painSevere + ". " + (language === 'kn' ? "ಬಿಸಿ ನೀರಿನ ಚೀಲ ಹೊಟ್ಟೆ ಮೇಲಿಟ್ಟುಕೊಳ್ಳಿ. ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ ತಂಗಿ." : "Use warm water bag for stomach pain. Taking rest is very important.")
                  : language === 'kn' 
                  ? "ಹಸಿರು ಸೊಪ್ಪು ತರಕಾರಿಗಳು ಮತ್ತು ಬೆಲ್ಲ ತಿನ್ನುವುದರಿಂದ ನಿಮ್ಮ ಹಿಮೋಗ್ಲೋಬಿನ್ ಹೆಚ್ಚುತ್ತದೆ ಮತ್ತು ಮುಟ್ಟು ಸುಗಮವಾಗುತ್ತದೆ." 
                  : "Eating green leafy vegetables and jaggery helps raise your hemoglobin levels for stress-free cycles."
              ) : (
                language === 'kn' 
                  ? "ಮುಟ್ಟಿನ ಸ್ವಚ್ಛತೆ ಕಾಪಾಡುವುದು ನಿನ್ನ ಆರೋಗ್ಯಕ್ಕೆ ಅತಿ ಮುಖ್ಯ. ದಿನಕ್ಕೆ ೨ ಬಾರಿ ಸ್ನಾನ ಮಾಡು ಹಾಗೂ ಸ್ಯಾನಿಟರಿ ಪ್ಯಾಡ್ ನಿಯಮಿತವಾಗಿ ಬದಲಾಯಿಸು."
                  : "Maintaining hygiene is critical. Wash with clean water regularly and change sanitary pads every 4-6 hours."
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold bg-rose-50/50 p-2 rounded-lg">
            <ShieldCheck className="h-4 w-4 text-green-700" />
            <span>{language === 'kn' ? "ನಿಮ್ಮ ವಿವರಗಳು ಸಂಪೂರ್ಣವಾಗಿ ಸುರಕ್ಷಿತವಾಗಿವೆ" : "Your personal diary is 100% private"}</span>
          </div>
        </div>

        {/* SOS Panel */}
        <div className="custom-card !bg-rose-50/30 border border-rose-200 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-rose-800">
              {language === 'kn' ? "ತುರ್ತು ಸಹಾಯ ಪೀಠ" : language === 'hi' ? "आपातकालीन सहायता" : "Emergency SOS Support"}
            </h3>
            <Flame className="h-5 w-5 text-rose-600 animate-bounce" />
          </div>

          <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
            {language === 'kn' 
              ? "ಸ್ಯಾನಿಟರಿ ಪ್ಯಾಡ್ ತಕ್ಷಣವೇ ಬೇಕಿದ್ದರೆ ಅಥವಾ ವಿಪರೀತ ಹೊಟ್ಟೆನೋವಿನಿಂದ ವೈದ್ಯಕೀಯ ನೆರವು ಬೇಕಿದ್ದರೆ, SOS ಬಟನ್ ಒತ್ತಿ ಆಶಾ ದಿದಿ ಅಥವಾ ಶಾಲಾ ಶಿಕ್ಷಕರನ್ನು ಕರೆಯಿರಿ."
              : "Need sanitary products immediately at school, or facing unbearable pain? Tap the red SOS button in the sidebar. Our local health coordinator (ASHA worker Shantha Mary) will respond."}
          </p>

          <div className="space-y-1.5 pt-1.5 border-t border-rose-100 text-[10px] text-slate-500 font-bold uppercase">
            <div className="flex justify-between items-center border-b border-rose-100/40 pb-1">
              <span>ASHA:</span>
              <span className="text-rose-700">Shantha Mary</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Center:</span>
              <span className="text-slate-700">Bilichodu PHC</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Action Grid */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 font-serif">
          {language === 'kn' ? "ರಕ್ಷೋಭ್ಯ ಸೌಲಭ್ಯಗಳು" : "Explore Rakshobhya Features"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* AI Mentor */}
          <div className="custom-card group">
            <div className="bg-rose-100 text-rose-700 w-9 h-9 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-all">
              <HeartHandshake className="h-4.5 w-4.5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{t.cardSaheliTitle}</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-4 font-semibold">{t.cardSaheliDesc}</p>
            <button 
              onClick={() => setActiveTab('mentor')}
              className="text-rose-600 text-xs font-black uppercase tracking-wider flex items-center gap-1 group-hover:underline mt-auto"
            >
              {t.cardSaheliChatNow} →
            </button>
          </div>

          {/* Welfare Schemes */}
          <div className="custom-card group">
            <div className="bg-rose-100 text-rose-700 w-9 h-9 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-all">
              <Award className="h-4.5 w-4.5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{t.cardSchemesTitle}</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-4 font-semibold">{t.cardSchemesDesc}</p>
            <button 
              onClick={() => setActiveTab('govt')}
              className="text-rose-600 text-xs font-black uppercase tracking-wider flex items-center gap-1 group-hover:underline mt-auto"
            >
              {t.cardSchemesCheck} →
            </button>
          </div>

          {/* School rest rooms */}
          <div className="custom-card group">
            <div className="bg-rose-100 text-rose-700 w-9 h-9 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-all">
              <FileSpreadsheet className="h-4.5 w-4.5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{t.cardSanitationTitle}</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-4 font-semibold">{t.cardSanitationDesc}</p>
            <button 
              onClick={() => setActiveTab('school')}
              className="text-rose-600 text-xs font-black uppercase tracking-wider flex items-center gap-1 group-hover:underline mt-auto"
            >
              {t.cardSanitationReport} →
            </button>
          </div>
        </div>
      </section>

      {/* 4. Local Swasthya News */}
      <section className="bg-white border border-rose-100 rounded-3xl p-6 shadow-soft space-y-4">
        <h3 className="text-lg font-bold text-rose-950 font-serif flex items-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-rose-500" />
          {language === 'kn' ? "ಸ್ಥಳೀಯ ಆರೋಗ್ಯ ಮತ್ತು ಉದ್ಯೋಗ ಸಮಾಚಾರ" : "Swasthya News & Updates"}
        </h3>

        <div className="divide-y divide-rose-100/50">
          {swasthyaNews.map(news => (
            <div key={news.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4 hover:bg-rose-50/20 px-2 rounded-xl transition-all">
              <div className="hidden sm:flex flex-col items-center bg-rose-100 text-rose-700 text-[10px] font-black px-2.5 py-1.5 rounded-lg border border-rose-200/50 min-w-16">
                <span>{news.date}</span>
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-bold text-slate-800 text-sm">{news.title}</h4>
                  <span className="badge-health">{news.tag}</span>
                </div>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">{news.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
