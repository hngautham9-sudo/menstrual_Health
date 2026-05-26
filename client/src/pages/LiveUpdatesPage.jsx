import React from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { Newspaper, Calendar, Share2, Sparkles, Heart } from 'lucide-react';

export default function LiveUpdatesPage() {
  const { language } = useStore();
  const t = translations[language];

  // News bulletins tailored for rural adolescent girls
  const updatesList = [
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
    },
    {
      id: 3,
      title: language === 'kn' ? "ಬುಡಕಟ್ಟು ಆರೋಗ್ಯ ಶಿಬಿರ ಮತ್ತು ಆಪ್ತಸಮಾಲೋಚನೆ" : language === 'hi' ? "आदिवासी स्वास्थ्य शिविर और परामर्श" : "Tribal Health Camp & Counseling",
      desc: language === 'kn'
        ? "ಸ್ಥಳೀಯ ಉಪಕೇಂದ್ರದಲ್ಲಿ ಮಹಿಳಾ ವೈದ್ಯರಿಂದ ಉಚಿತ ಆರೋಗ್ಯ ತಪಾಸಣೆ ಮತ್ತು ಹದಿಹರೆಯದ ಬದಲಾವಣೆಗಳ ಮಾರ್ಗದರ್ಶನ ಶಿಬಿರ ಆಯೋಜಿಸಲಾಗಿದೆ."
        : language === 'hi'
        ? "स्थानीय उपकेंद्र में महिला डॉक्टरों द्वारा मुफ्त स्वास्थ्य जांच और किशोरावस्था मार्गदर्शन शिविर आयोजित किया जा रहा है।"
        : "A special adolescent health consultation camp by lady doctors has been organized at the local subcenter. Free checkups and guidance are available.",
      tag: "Counseling",
      date: "2 days ago"
    },
    {
      id: 4,
      title: language === 'kn' ? "ಕಸ್ತೂರಬಾ ಗಾಂಧಿ ವಸತಿ ಶಾಲೆಗಳ ಪ್ರವೇಶಾವಕಾಶ" : language === 'hi' ? "कस्तूरबा गांधी विद्यालय प्रवेश सूचना" : "Kasturba Gandhi Vidyalaya Admissions Open",
      desc: language === 'kn'
        ? "ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಬಡ ಕುಟುಂಬಗಳ ಹೆಣ್ಣು ಮಕ್ಕಳಿಗೆ ವಸತಿ ಸಹಿತ ಉಚಿತ ಉನ್ನತ ಪ್ರಾಥಮಿಕ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಹೊಸ ಸೀಟುಗಳ ಭರ್ತಿ ಪ್ರಕ್ರಿಯೆ ಆರಂಭವಾಗಿದೆ."
        : "Free residential high schooling seats for adolescent girls in rural tribal belts are now accepting application submissions at district block offices.",
      tag: "Education",
      date: "1 week ago"
    }
  ];

  const handleShare = (title) => {
    alert(`Mock Share: "${title}" link copied! Forward to your school friends.`);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-800 font-serif tracking-tight flex items-center gap-2">
          <Newspaper className="h-6.5 w-6.5 text-rose-500" />
          {language === 'kn' ? "ಆರೋಗ್ಯ ಮತ್ತು ಸರ್ಕಾರಿ ಸೌಲಭ್ಯಗಳ ಸಮಾಚಾರ" : "Live Swasthya News updates"}
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          Get real-time updates on village health camp schedules, pad distributions, and women scholarships
        </p>
      </div>

      {/* Grid bulletin posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {updatesList.map(news => (
          <div key={news.id} className="custom-card flex flex-col justify-between space-y-4">
            
            <div className="space-y-2">
              <div className="flex justify-between items-center gap-4 flex-wrap">
                <span className="badge-health">{news.tag}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-rose-400" />
                  {news.date}
                </span>
              </div>

              <h4 className="font-serif text-base font-bold text-rose-950 leading-snug">
                {news.title}
              </h4>
              
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                {news.desc}
              </p>
            </div>

            {/* Actions share button */}
            <div className="pt-2 border-t border-rose-100/50 flex justify-between items-center mt-auto gap-4 flex-wrap">
              <span className="text-[9px] text-slate-400 font-bold uppercase">
                Source: District Health Subcenter
              </span>
              <button
                onClick={() => handleShare(news.title)}
                className="btn-outline !py-1.5 !px-3 text-[10px] uppercase font-black tracking-wider inline-flex items-center gap-1"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share news
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Aggregated trust note */}
      <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 text-center space-y-3">
        <Heart className="h-6 w-6 text-rose-500 fill-rose-100 mx-auto" />
        <h4 className="font-serif text-base font-bold text-rose-900">Empowering Village Schoolgirls</h4>
        <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed font-semibold">
          Updates published on Rakshobhya are compiled and verified by district ASHA workers, Anganwadi coordinators, and state health departments to ensure absolute safety and accurate instructions.
        </p>
      </div>

    </div>
  );
}
