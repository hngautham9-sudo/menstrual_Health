import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { Calendar, Heart, BookOpen, AlertCircle, FilePlus2, CheckCircle2, ChevronRight, Activity, Award, Building2, AlertOctagon } from 'lucide-react';

export default function HealthTrackerPage() {
  const { language, cycles, appliedSchemes, sanitationReports, emergencies, addCycleLog, fetchCycles, predictionDate, wellnessTip } = useStore();
  const t = translations[language];

  useEffect(() => {
    fetchCycles();
  }, [language]);

  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [flow, setFlow] = useState('medium');
  const [pain, setPain] = useState('none');
  const [mood, setMood] = useState('cozy');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [notes, setNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const symptomsList = [
    { id: 'cramps', label: language === 'kn' ? 'ಹೊಟ್ಟೆ ಸೆಳೆತ (Cramps)' : language === 'hi' ? 'पेट दर्द (Cramps)' : 'Stomach Cramps' },
    { id: 'backache', label: language === 'kn' ? 'ಬೆನ್ನು ನೋವು (Backache)' : language === 'hi' ? 'पीठ दर्द (Backache)' : 'Backache' },
    { id: 'headache', label: language === 'kn' ? 'ತಲೆ ನೋವು (Headache)' : language === 'hi' ? 'सिर दर्द (Headache)' : 'Headache' },
    { id: 'bloating', label: language === 'kn' ? 'ಹೊಟ್ಟೆ ಉಬ್ಬರ (Bloating)' : language === 'hi' ? 'पेट फूलना (Bloating)' : 'Bloating' },
    { id: 'acne', label: language === 'kn' ? 'ಮೊಡವೆಗಳು (Acne)' : language === 'hi' ? 'मुँहासे (Acne)' : 'Pimples/Acne' },
    { id: 'tiredness', label: language === 'kn' ? 'ಸುಸ್ತು (Tiredness)' : language === 'hi' ? 'थकान (Tiredness)' : 'Extreme Tiredness' }
  ];

  const handleSymptomToggle = (id) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      startDate,
      endDate: endDate || null,
      flow,
      pain,
      mood,
      symptoms: selectedSymptoms,
      notes
    };
    
    addCycleLog(newLog);
    
    setEndDate('');
    setNotes('');
    setSelectedSymptoms([]);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto py-4">
      {/* Page Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-800 font-serif tracking-tight">{t.trackerTitle}</h2>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{t.trackerSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {showSuccess && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-2 animate-pulse-subtle">
              <CheckCircle2 className="h-5 w-5 text-rose-500" />
              <span>{language === 'kn' ? "ಮುಟ್ಟಿನ ವಿವರಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ! ಸಹೇಲಿ ಸಲಹೆಗಳನ್ನು ಕೆಳಗೆ ಪರಿಶೀಲಿಸಿ." : "Cycle details saved! Check Saheli's care tips below."}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white border border-rose-100 rounded-3xl p-6 shadow-soft space-y-6">
            <h3 className="text-sm font-black text-rose-800 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-rose-100">
              <FilePlus2 className="h-5 w-5 text-rose-500" />
              {t.logPeriod}
            </h3>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{t.startDate}</label>
                <input 
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full custom-input text-xs font-bold"
                  required
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{t.endDate}</label>
                <input 
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="w-full custom-input text-xs font-bold"
                />
              </div>
            </div>

            {/* Flow */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 block">{t.flowLevel}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'none', label: t.flowNone },
                  { id: 'light', label: t.flowLight },
                  { id: 'medium', label: t.flowMedium },
                  { id: 'heavy', label: t.flowHeavy }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFlow(item.id)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      flow === item.id 
                        ? 'bg-rose-500 text-white border-rose-500 shadow-sm' 
                        : 'bg-white text-slate-600 hover:bg-rose-50 border-rose-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pain */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 block">{t.painLevel}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'none', label: t.painNone },
                  { id: 'mild', label: t.painMild },
                  { id: 'moderate', label: t.painModerate },
                  { id: 'severe', label: t.painSevere }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPain(item.id)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      pain === item.id 
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm' 
                        : 'bg-white text-slate-600 hover:bg-rose-50 border-rose-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {pain === 'severe' && (
                <div className="text-[10px] text-rose-800 font-bold bg-rose-50 p-2.5 rounded-lg flex items-center gap-1.5 animate-slide-up border border-rose-200">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 animate-pulse" />
                  <span>
                    {language === 'kn' 
                      ? "ಸೂಚನೆ: ತೀವ್ರವಾದ ಹೊಟ್ಟೆನೋವಿದ್ದರೆ ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ. ಬಿಸಿನೀರಿನ ಶಾಖ ಬಳಸಿ. ನೋವು ತಡೆಯಲಾಗದಿದ್ದರೆ ಆಶಾ ದಿದಿ ಅಥವಾ ಶಾಲಾ ಶಿಕ್ಷಕರ ಸಹಾಯ ಕೇಳಿ." 
                      : "Tip: Apply warm compress, drink warm fluids, and rest. Feel free to alert your ASHA didi if you need a hot water bag."}
                  </span>
                </div>
              )}
            </div>

            {/* Mood */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 block">{t.moodLevel}</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'cozy', label: t.moodCozy },
                  { id: 'tired', label: t.moodTired },
                  { id: 'sensitive', label: t.moodSensitive },
                  { id: 'happy', label: t.moodHappy },
                  { id: 'cranky', label: t.moodCranky }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMood(item.id)}
                    className={`py-2 rounded-xl text-[10px] font-bold transition-all border ${
                      mood === item.id 
                        ? 'bg-rose-500 text-white border-rose-500' 
                        : 'bg-white text-slate-600 hover:bg-rose-50 border-rose-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 block">{t.selectSymptoms}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {symptomsList.map(symp => {
                  const isChecked = selectedSymptoms.includes(symp.id);
                  return (
                    <button
                      key={symp.id}
                      type="button"
                      onClick={() => handleSymptomToggle(symp.id)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs text-left font-semibold transition-all ${
                        isChecked 
                          ? 'bg-rose-100 border-rose-300 text-rose-700 font-bold' 
                          : 'bg-white border-rose-100 text-slate-600 hover:bg-rose-50/50'
                      }`}
                    >
                      <span>{symp.label}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isChecked ? 'bg-rose-500 border-rose-500 text-white' : 'border-rose-300'}`}>
                        {isChecked && <span className="text-[9px]">✔</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">
                {language === 'kn' ? "ಟಿಪ್ಪಣಿಗಳು (ಡೈರಿ)" : "Personal Health Diary (Private)"}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.notesPlaceholder}
                rows="3"
                className="w-full p-3 bg-white border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs font-semibold text-slate-700"
              />
            </div>

            {/* Submit */}
            <button type="submit" className="w-full btn-default glow-btn text-xs font-black uppercase tracking-wider">
              {t.submitLog}
            </button>
          </form>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Predictions */}
          <div className="custom-card space-y-4">
            <h3 className="font-serif text-lg font-bold text-rose-900 flex items-center gap-1.5">
              <Calendar className="h-5 w-5 text-rose-500" />
              {t.predictionTitle}
            </h3>

            {predictionDate ? (
              <div className="space-y-3 text-center sm:text-left py-2">
                <p className="text-xs text-slate-500 font-semibold">{t.predictedNext}</p>
                <div className="inline-block bg-white text-rose-600 border border-rose-200 rounded-2xl px-5 py-3 shadow-sm">
                  <span className="text-xl font-black">{predictionDate}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                  {t.cycleLengthTip}
                </p>
              </div>
            ) : (
              <div className="py-4 text-center">
                <span className="text-xs text-slate-500 font-medium">
                  {language === 'kn' ? "ಅಂದಾಜು ದಿನಾಂಕ ಪಡೆಯಲು ಕನಿಷ್ಠ ಒಂದು ಮುಟ್ಟಿನ ದಿನಾಂಕ ದಾಖಲಿಸಿ." : "Log details to activate predicted schedule calculations."}
                </span>
              </div>
            )}
          </div>

          {/* Wellness tips */}
          <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-soft space-y-4">
            <h3 className="font-serif text-lg font-bold text-rose-900 flex items-center gap-1.5">
              <Heart className="h-5 w-5 text-rose-500 fill-rose-100" />
              {t.wellnessAdvisorTitle}
            </h3>

            <div className="bg-rose-50 p-4 rounded-xl border-l-4 border-rose-500">
              <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                {wellnessTip}
              </p>
            </div>
            
            <div className="border-t border-rose-100 pt-3 space-y-1.5">
              <h4 className="text-[11px] font-black text-rose-800 uppercase flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-rose-500" />
                {language === 'kn' ? "ಮುಟ್ಟಿನ ವಿಜ್ಞಾನ" : "Menstrual Biology"}
              </h4>
              <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                {language === 'kn' 
                  ? "ಮುಟ್ಟು ಎನ್ನುವುದು ಹೆಣ್ಣು ಮಕ್ಕಳಲ್ಲಿ ಪ್ರತಿ ೨೮ ದಿನಕ್ಕೊಮ್ಮೆ ನಡೆಯುವ ನೈಸರ್ಗಿಕ ಶುದ್ಧೀಕರಣ ಕ್ರಿಯೆ. ಇದು ಗರ್ಭಾಶಯವು ಆರೋಗ್ಯಕರವಾಗಿ ಬೆಳೆಯುವ ಸುಂದರ ಹಂತ."
                  : "Menstruation is a natural cycle preparing the body for adulthood. It is a sign of fertility, biological health, and strength."}
              </p>
            </div>
          </div>

          {/* Cross-Module Activity Summary */}
          <div className="bg-white border border-rose-100 rounded-3xl p-5 shadow-soft space-y-4">
            <h3 className="font-serif text-base font-bold text-rose-900 flex items-center gap-1.5">
              <Activity className="h-5 w-5 text-rose-500" />
              {language === 'kn' ? "ನನ್ನ ಚಟುವಟಿಕೆಗಳ ಸಾರಾಂಶ" : "My Activity Summary"}
            </h3>
            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
              {language === 'kn' 
                ? "ರಕ್ಷೋಭ್ಯ ಆಪ್‌ನಲ್ಲಿನ ನಿಮ್ಮ ಎಲ್ಲಾ ವಿಭಾಗಗಳ (ಮಾಸಿಕ ಚಕ್ರ, ಯೋಜನೆಗಳು, ಶಾಲಾ ಸ್ವಚ್ಛತೆ, ಮತ್ತು ತುರ್ತು) ಸುಲಭವಾದ ನೋಟ." 
                : "An easy-peasy detailed track of all your entries across the ecosystem modules."}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {/* Tracker Stats */}
              <div className="bg-rose-50 border border-rose-100 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                <Calendar className="h-4 w-4 text-rose-500 mb-1" />
                <span className="text-xl font-black text-rose-700">{cycles?.length || 0}</span>
                <span className="text-[9px] font-bold text-rose-900 uppercase">{language === 'kn' ? "ಮುಟ್ಟಿನ ದಾಖಲೆಗಳು" : "Period Logs"}</span>
              </div>
              
              {/* Schemes Stats */}
              <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                <Award className="h-4 w-4 text-blue-500 mb-1" />
                <span className="text-xl font-black text-blue-700">{appliedSchemes?.length || 0}</span>
                <span className="text-[9px] font-bold text-blue-900 uppercase">{language === 'kn' ? "ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ ಯೋಜನೆಗಳು" : "Schemes Applied"}</span>
              </div>

              {/* Sanitation Stats */}
              <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                <Building2 className="h-4 w-4 text-emerald-500 mb-1" />
                <span className="text-xl font-black text-emerald-700">{sanitationReports?.length || 0}</span>
                <span className="text-[9px] font-bold text-emerald-900 uppercase">{language === 'kn' ? "ಸ್ವಚ್ಛತಾ ವರದಿಗಳು" : "Sanitation Reports"}</span>
              </div>

              {/* Emergency Stats */}
              <div className="bg-orange-50 border border-orange-100 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                <AlertOctagon className="h-4 w-4 text-orange-500 mb-1" />
                <span className="text-xl font-black text-orange-700">{emergencies?.length || 0}</span>
                <span className="text-[9px] font-bold text-orange-900 uppercase">{language === 'kn' ? "ತುರ್ತು ಎಚ್ಚರಿಕೆಗಳು" : "SOS Alerts"}</span>
              </div>
            </div>
          </div>

          {/* History logs */}
          <div className="space-y-3">
            <h3 className="font-serif text-xs font-black uppercase text-slate-400 tracking-wider">
              {language === 'kn' ? "ಹಿಂದಿನ ಮುಟ್ಟಿನ ದಾಖಲೆಗಳು" : "Your Past Logs History"}
            </h3>

            {cycles.length === 0 ? (
              <div className="bg-white border border-rose-100 rounded-2xl p-4 text-center">
                <p className="text-[11px] text-slate-400 font-medium">No logs recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {cycles.slice().reverse().map((log, index) => (
                  <div key={log.id || index} className="bg-white border border-rose-100 rounded-2xl p-4 shadow-sm text-xs space-y-2 hover:scale-[1.01] transition-all">
                    <div className="flex justify-between items-center">
                      <span className="font-black text-rose-700 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        {log.startDate}
                      </span>
                      <span className="badge-health">
                        {log.flow === 'heavy' ? '💧💧💧' : log.flow === 'medium' ? '💧💧' : '💧'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                        Pain: {log.pain}
                      </span>
                      <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                        Mood: {log.mood}
                      </span>
                    </div>

                    {log.symptoms && log.symptoms.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {log.symptoms.map(s => (
                          <span key={s} className="text-[9px] bg-slate-50 text-slate-500 border border-slate-100 px-1.5 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {log.notes && (
                      <p className="text-[10px] text-slate-500 italic bg-slate-50 p-2 rounded-lg border-l-2 border-slate-300">
                        "{log.notes}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
