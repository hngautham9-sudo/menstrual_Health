import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { ShieldAlert, FileSpreadsheet, Heart, CheckCircle2, UserCheck, Flame, PieChart, Users, Star } from 'lucide-react';

export default function AshaDashboard() {
  const { 
    language, 
    emergencies, 
    sanitationReports, 
    fetchEmergencies, 
    fetchSanitationReports, 
    resolveEmergency, 
    resolveSanitationReport 
  } = useStore();

  const t = translations[language];

  useEffect(() => {
    fetchEmergencies();
    fetchSanitationReports();
  }, [language]);

  // Aggregate stats from mock datasets
  const activeSOSCount = emergencies.filter(e => e.status === 'active').length;
  const criticalSanitationCount = sanitationReports.filter(r => r.status !== 'resolved' && (r.toiletCleanliness <= 2 || !r.waterAvailability || !r.doorLocksWork)).length;
  
  // Anonymized statistics mock aggregation for this village block
  const totalGirlsMonitored = 48;
  const severeCrampsCount = 4; // Simulated from cycle logs
  const schoolAbsenceCount = 2; // Simulated missing school notes

  const handleResolveEmergency = (id) => {
    resolveEmergency(id);
  };

  const handleResolveSanitation = (id) => {
    resolveSanitationReport(id);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#C9748F] to-[#F5C6D0] rounded-3xl p-6 text-white shadow-soft relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-48 h-48 rounded-full bg-white/5 blur-2xl"></div>
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-black font-sans leading-tight">{t.ashaTitle}</h2>
          <p className="text-xs text-white/90 font-medium">{t.ashaSubtitle}</p>
        </div>
      </section>

      {/* Grid: 3 summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Active Emergencies stat */}
        <div className="bg-white border border-[#F5C6D0]/30 rounded-2xl p-5 shadow-soft flex items-center gap-4">
          <div className={`p-3 rounded-xl ${activeSOSCount > 0 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-50 text-slate-400'}`}>
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Active SOS Alerts</span>
            <span className="text-2xl font-black text-slate-800">{activeSOSCount}</span>
          </div>
        </div>

        {/* Broken restrooms stat */}
        <div className="bg-white border border-[#F5C6D0]/30 rounded-2xl p-5 shadow-soft flex items-center gap-4">
          <div className={`p-3 rounded-xl ${criticalSanitationCount > 0 ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-400'}`}>
            <FileSpreadsheet className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Critical Restrooms</span>
            <span className="text-2xl font-black text-slate-800">{criticalSanitationCount}</span>
          </div>
        </div>

        {/* Anonymized monitored profiles stat */}
        <div className="bg-white border border-[#F5C6D0]/30 rounded-2xl p-5 shadow-soft flex items-center gap-4">
          <div className="p-3 rounded-xl bg-slate-50 text-[#C9748F]">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Monitored Students</span>
            <span className="text-2xl font-black text-slate-800">{totalGirlsMonitored}</span>
          </div>
        </div>

      </div>

      {/* Grid: SOS Beacon panel & Sanitation fixes checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Active Emergency SOS Panel */}
        <div className="bg-white border border-[#F5C6D0]/30 rounded-2xl p-6 shadow-soft space-y-4">
          <h3 className="text-sm font-extrabold text-[#C9748F] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-500 animate-pulse" />
            {t.activeAlerts}
          </h3>

          {emergencies.length === 0 ? (
            <div className="py-8 text-center bg-slate-50 rounded-xl border border-slate-100">
              <CheckCircle2 className="h-8 w-8 text-greenSage mx-auto mb-2" />
              <p className="text-xs text-slate-500 font-bold">{t.noAlerts}</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {emergencies.map(alert => (
                <div 
                  key={alert.id} 
                  className="bg-red-50/50 border border-red-200 rounded-xl p-4 space-y-3 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-xs">{alert.userName}</h4>
                      <p className="text-[10px] text-slate-500 font-semibold">{alert.schoolName} ({alert.locationName})</p>
                    </div>
                    <span className="text-[9px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold tracking-wide uppercase">
                      Emergency SOS
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-semibold italic bg-white p-2.5 rounded-lg border-l-3 border-red-500">
                    "{alert.message}"
                  </p>

                  <div className="flex items-center justify-between gap-4 pt-1 border-t border-red-100 flex-wrap">
                    <span className="text-[9px] text-slate-400 font-bold uppercase">
                      Reported: {new Date(alert.reportedAt).toLocaleTimeString()}
                    </span>
                    <button
                      onClick={() => handleResolveEmergency(alert.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] transition-all"
                    >
                      {t.resolveAlert}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bathroom reports checklist */}
        <div className="bg-white border border-[#F5C6D0]/30 rounded-2xl p-6 shadow-soft space-y-4">
          <h3 className="text-sm font-extrabold text-[#C9748F] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-orange-500" />
            {t.sanitationSummary}
          </h3>

          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
            {sanitationReports.filter(r => r.status !== 'resolved').length === 0 ? (
              <div className="py-8 text-center bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="h-8 w-8 text-greenSage mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-bold">All restrooms clean and verified!</p>
              </div>
            ) : (
              sanitationReports.filter(r => r.status !== 'resolved').map(report => {
                const isCritical = report.toiletCleanliness <= 2 || !report.waterAvailability || !report.doorLocksWork;

                return (
                  <div 
                    key={report.id}
                    className={`bg-white border rounded-xl p-4 shadow-soft space-y-3 flex flex-col justify-between ${
                      isCritical ? 'border-red-200 bg-red-50/10' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-extrabold text-slate-800 text-xs">{report.schoolName}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Village: {report.village}
                        </p>
                      </div>
                      <div className="flex gap-0.5 shrink-0">
                        {[1,2,3,4,5].map(s => (
                          <Star 
                            key={s} 
                            className={`h-3 w-3 ${s <= report.toiletCleanliness ? 'text-[#C9748F] fill-[#C9748F]' : 'text-slate-200'}`} 
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-600 font-bold">
                      <span className={report.waterAvailability ? 'text-greenSage' : 'text-red-500'}>
                        Water: {report.waterAvailability ? '✔ Yes' : '❌ No'}
                      </span>
                      <span className={report.doorLocksWork ? 'text-greenSage' : 'text-red-500'}>
                        Locks: {report.doorLocksWork ? '✔ Yes' : '❌ No'}
                      </span>
                      <span className={report.soapAvailable ? 'text-greenSage' : 'text-red-500'}>
                        Soap: {report.soapAvailable ? '✔ Yes' : '❌ No'}
                      </span>
                      <span className={report.padDisposalBins ? 'text-greenSage' : 'text-red-500'}>
                        Bins: {report.padDisposalBins ? '✔ Yes' : '❌ No'}
                      </span>
                    </div>

                    {report.description && (
                      <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded border-l-2 border-slate-300">
                        "{report.description}"
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-100 flex-wrap">
                      <span className="text-[9px] text-slate-400 font-semibold">
                        Submitted: {new Date(report.reportedAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleResolveSanitation(report.id)}
                        className="bg-[#C9748F] hover:bg-[#C9748F]/90 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] transition-all"
                      >
                        {t.resolveReport}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* Aggregate Trends public health dashboard */}
      <section className="bg-white border border-[#F5C6D0]/30 rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-sm font-extrabold text-[#C9748F] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
          <PieChart className="h-5 w-5 text-[#C9748F]" />
          {t.aggregateTrends}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat 1: Severe cramps list summary */}
          <div className="bg-[#FDF6F8] border-l-4 border-red-400 rounded-r-xl p-4 space-y-2">
            <span className="text-xs text-slate-600 font-bold leading-none">{t.statPainCount}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-800">{severeCrampsCount}</span>
              <span className="text-xs text-slate-400 font-semibold">girls / this village block</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-snug">
              *Actions Taken: Distributed supplemental heating bags and scheduled a specialized counseling seminar.
            </p>
          </div>

          {/* Stat 2: Absent count list summary */}
          <div className="bg-[#FDF6F8] border-l-4 border-orange-400 rounded-r-xl p-4 space-y-2">
            <span className="text-xs text-slate-600 font-bold leading-none">{t.statAbsenceCount}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-800">{schoolAbsenceCount}</span>
              <span className="text-xs text-slate-400 font-semibold">girls missing school / month</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-snug">
              *Actions Taken: Forwarded names to school administration to excuse absences and distribute sanitary towels.
            </p>
          </div>

          {/* Stat 3: Distribution targets */}
          <div className="bg-[#FDF6F8] border-l-4 border-[#C9748F] rounded-r-xl p-4 space-y-2">
            <span className="text-xs text-slate-600 font-bold leading-none">Targeted pad distribution</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-800">120</span>
              <span className="text-xs text-slate-400 font-semibold">kits reserved / this week</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-snug">
              *Allocated schools: Government High School, Bilichodu and Tribal Residential Ashram School, Kollegala.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-500 leading-relaxed font-semibold">
          <span className="text-slate-800 font-bold">ℹ️ Coordinator note:</span> Anonymized metrics are collected from cycle logs to identify village-level hygiene triggers without compromising personal child health details. Thank you for protecting adolescent girls' privacy.
        </div>
      </section>
    </div>
  );
}
