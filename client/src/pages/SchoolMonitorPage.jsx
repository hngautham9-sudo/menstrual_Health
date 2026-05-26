import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { Star, Droplet, CheckSquare, PlusCircle, CheckCircle } from 'lucide-react';

export default function SchoolMonitorPage() {
  const { language, sanitationReports, submitSanitationReport, fetchSanitationReports } = useStore();
  const t = translations[language];

  useEffect(() => {
    fetchSanitationReports();
  }, [language]);

  const [schoolName, setSchoolName] = useState('Government High School, Bilichodu');
  const [cleanliness, setCleanliness] = useState(3);
  const [hasWater, setHasWater] = useState(true);
  const [hasBins, setHasBins] = useState(false);
  const [hasSoap, setHasSoap] = useState(true);
  const [hasLocks, setHasLocks] = useState(true);
  const [details, setDetails] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const preseededSchools = [
    "Government High School, Bilichodu",
    "Tribal Residential Ashram School, Kollegala",
    "Maharani Government Girls Vidyalaya, Davanagere",
    "Adarsha Vidyalaya Tribal School, Jagalur"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReport = {
      schoolName,
      toiletCleanliness: Number(cleanliness),
      waterAvailability: hasWater,
      padDisposalBins: hasBins,
      soapAvailable: hasSoap,
      doorLocksWork: hasLocks,
      description: details
    };

    await submitSanitationReport(newReport);

    setDetails('');
    setShowForm(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 4500);
  };

  const getStatusBadge = (report) => {
    if (report.status === 'resolved') {
      return (
        <span className="badge-safe">
          Resolved ✓ (Fixed by didi)
        </span>
      );
    }

    const score = report.toiletCleanliness;
    const isCritical = !report.waterAvailability || !report.doorLocksWork;

    if (score <= 2 || isCritical) {
      return (
        <span className="text-[10px] bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-black border border-red-200 animate-pulse uppercase tracking-wider">
          {t.underRepair}
        </span>
      );
    } else if (score === 3) {
      return (
        <span className="text-[10px] bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full font-black border border-orange-200 uppercase tracking-wider">
          {t.needsAttention}
        </span>
      );
    } else {
      return (
        <span className="badge-safe">
          {t.excellent}
        </span>
      );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-800 font-serif tracking-tight">{t.sanTitle}</h2>
          <p className="text-sm text-slate-500 font-medium">{t.sanSubtitle}</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-default text-xs font-black uppercase tracking-wider shrink-0"
        >
          <PlusCircle className="h-4 w-4" />
          <span>{language === 'kn' ? "ವರದಿ ಸಲ್ಲಿಸಿ" : "Submit Bathroom Rating"}</span>
        </button>
      </div>

      {showSuccess && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-2 animate-pulse-subtle">
          <CheckCircle className="h-5 w-5 text-rose-500" />
          <span>
            {language === 'kn' 
              ? "ನಿಮ್ಮ ಅನನಾಮಧೇಯ ವರದಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ! ಶಾಲಾ ಆರೋಗ್ಯ ಅಧಿಕಾರಿಗೆ ತಿಳಿಸಲಾಗಿದೆ." 
              : "Your anonymous report has been dispatched to school health coordinators!"}
          </span>
        </div>
      )}

      {/* Audit form */}
      {showForm && (
        <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-soft space-y-6 animate-slide-up">
          <h3 className="text-sm font-black text-rose-800 uppercase tracking-wider border-b border-rose-100 pb-3">
            {language === 'kn' ? "ಶಾಲಾ ಶೌಚಾಲಯ ಗುಣಮಟ್ಟ ವರದಿ" : "New Facility Inspection"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* School */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">{t.selectSchool}</label>
              <select
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-rose-100 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                {preseededSchools.map(school => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </div>

            {/* Rating cleanliness */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">
                {t.rateCleanliness}: <span className="text-rose-500 font-black">{cleanliness} / 5</span>
              </label>
              <div className="flex items-center gap-4">
                <input 
                  type="range"
                  min="1"
                  max="5"
                  value={cleanliness}
                  onChange={(e) => setCleanliness(e.target.value)}
                  className="flex-1 accent-rose-500"
                />
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(star => (
                    <Star 
                      key={star}
                      className={`h-4.5 w-4.5 ${
                        star <= cleanliness 
                          ? 'text-rose-500 fill-rose-500' 
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Checklist switches */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-600 block">
                {language === 'kn' ? "ಶೌಚಾಲಯದಲ್ಲಿ ಲಭ್ಯವಿರುವ ಸೌಲಭ್ಯಗಳು:" : "Toilet Facilities Checklist:"}
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Water */}
                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs font-semibold transition-all ${
                  hasWater ? 'bg-rose-50 border-rose-200 text-rose-700 font-bold' : 'bg-white border-rose-100 text-slate-600'
                }`}>
                  <span>{t.hasWater}</span>
                  <input 
                    type="checkbox"
                    checked={hasWater}
                    onChange={(e) => setHasWater(e.target.checked)}
                    className="w-4 h-4 accent-rose-500"
                  />
                </label>

                {/* Pad bins */}
                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs font-semibold transition-all ${
                  hasBins ? 'bg-rose-50 border-rose-200 text-rose-700 font-bold' : 'bg-white border-rose-100 text-slate-600'
                }`}>
                  <span>{t.hasBins}</span>
                  <input 
                    type="checkbox"
                    checked={hasBins}
                    onChange={(e) => setHasBins(e.target.checked)}
                    className="w-4 h-4 accent-rose-500"
                  />
                </label>

                {/* Soap */}
                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs font-semibold transition-all ${
                  hasSoap ? 'bg-rose-50 border-rose-200 text-rose-700 font-bold' : 'bg-white border-rose-100 text-slate-600'
                }`}>
                  <span>{t.hasSoap}</span>
                  <input 
                    type="checkbox"
                    checked={hasSoap}
                    onChange={(e) => setHasSoap(e.target.checked)}
                    className="w-4 h-4 accent-rose-500"
                  />
                </label>

                {/* Door Locks */}
                <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs font-semibold transition-all ${
                  hasLocks ? 'bg-rose-50 border-rose-200 text-rose-700 font-bold' : 'bg-white border-rose-100 text-slate-600'
                }`}>
                  <span>{t.hasLocks}</span>
                  <input 
                    type="checkbox"
                    checked={hasLocks}
                    onChange={(e) => setHasLocks(e.target.checked)}
                    className="w-4 h-4 accent-rose-500"
                  />
                </label>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">{t.sanDetails}</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Details of broken hinges, dry water pipes, no soap..."
                rows="2"
                className="w-full p-3 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs font-semibold text-slate-700"
              />
            </div>

            {/* Form actions */}
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 text-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-default !py-2 text-xs font-black uppercase tracking-wider"
              >
                {t.submitReport}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leaderboard scorecard */}
      <section className="space-y-4">
        <h3 className="font-serif text-lg font-bold text-rose-950 flex items-center gap-1.5 pl-1">
          <Droplet className="h-5 w-5 text-rose-500 fill-rose-100" />
          {t.reportedList}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sanitationReports.map(report => {
            const isCritical = report.toiletCleanliness <= 2 || !report.waterAvailability || !report.doorLocksWork;
            return (
              <div 
                key={report.id}
                className={`custom-card !p-5 ${
                  isCritical && report.status !== 'resolved' ? 'border-red-200 bg-red-50/5' : ''
                }`}
              >
                {/* Header */}
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold text-slate-800 text-sm leading-snug">{report.schoolName}</h4>
                    {getStatusBadge(report)}
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Village: {report.village}
                  </span>
                </div>

                {/* Score indicators */}
                <div className="grid grid-cols-2 gap-2 bg-rose-50/30 border border-rose-100/40 p-3 rounded-2xl my-3">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                    <span>Cleanliness:</span>
                    <span className="text-rose-600 font-black">{report.toiletCleanliness}/5</span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                    <span>Water Tap:</span>
                    <span className={report.waterAvailability ? 'text-green-700' : 'text-red-500'}>
                      {report.waterAvailability ? '✔ Yes' : '❌ No'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                    <span>Locks work:</span>
                    <span className={report.doorLocksWork ? 'text-green-700' : 'text-red-500'}>
                      {report.doorLocksWork ? '✔ Yes' : '❌ No'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                    <span>Soap:</span>
                    <span className={report.soapAvailable ? 'text-green-700' : 'text-red-500'}>
                      {report.soapAvailable ? '✔ Yes' : '❌ No'}
                    </span>
                  </div>
                </div>

                {/* Description details */}
                {report.description && (
                  <p className="text-xs text-slate-500 italic bg-rose-50/20 p-2.5 rounded-xl border-l-2 border-rose-300 my-2 font-semibold">
                    "{report.description}"
                  </p>
                )}

                {/* Timestamp */}
                <div className="pt-2 border-t border-rose-100/60 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase mt-2">
                  <span>Auditor: Anonymous Student</span>
                  <span>{new Date(report.reportedAt).toLocaleDateString()}</span>
                </div>

                {/* ASHA Resolution indicators */}
                {report.status === 'resolved' && report.resolvedAt && (
                  <div className="mt-3 bg-[#EAF7ED] text-green-800 px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 border border-sage/40 text-[10px] leading-snug animate-slide-up">
                    <CheckSquare className="h-4 w-4 text-green-700" />
                    <span>Fixed by didi Shantha Mary ({new Date(report.resolvedAt).toLocaleDateString()})</span>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
