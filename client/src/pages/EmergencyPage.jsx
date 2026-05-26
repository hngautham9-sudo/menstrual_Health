import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { AlertOctagon, Phone, ShieldCheck, Heart, Clock, Truck } from 'lucide-react';

export default function EmergencyPage() {
  const { language, user, triggerEmergencySos, isSosTriggered } = useStore();
  const t = translations[language];

  const [location, setLocation] = useState('School Restroom Block');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSos = (e) => {
    e.preventDefault();
    triggerEmergencySos(`${user.schoolName} - ${location}`);
    setSuccess(true);
    setMessage('');
    setTimeout(() => {
      setSuccess(false);
    }, 4500);
  };

  const emergencyContacts = [
    { name: "Shantha Mary (ASHA Worker didi)", phone: "+91 94801 23456", desc: "Local Primary Subcenter coordinator" },
    { name: "Smt. Lakshmi Devi (School Health Teacher)", phone: "+91 94802 87654", desc: "Government High School Principal & Health Coordinator" },
    { name: "National Childline Helpline", phone: "1098", desc: "24/7 free national support for teenagers" },
    { name: "Women Emergency Helpline", phone: "1091", desc: "Free state health counseling and assistance" }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-800 font-serif tracking-tight flex items-center gap-2">
          <AlertOctagon className="h-6.5 w-6.5 text-rose-600 animate-pulse" />
          {language === 'kn' ? "ತುರ್ತು ಪರಿಸ್ಥಿತಿ ಮತ್ತು SOS ನೆರವು" : "ASHA Crisis SOS Support"}
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          Do you need sanitary pads immediately at school or facing extreme severe cramps pain? Alert didi instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form alert trigger */}
        <div className="lg:col-span-2 space-y-6">
          {success && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-2 animate-pulse-subtle">
              <Heart className="h-5 w-5 text-rose-500" />
              <span>{t.sosTriggered}</span>
            </div>
          )}

          <form onSubmit={handleSos} className="bg-white border border-rose-100 rounded-3xl p-6 shadow-soft space-y-6">
            <h3 className="text-sm font-black text-rose-800 uppercase tracking-wider border-b border-rose-100 pb-3 flex items-center gap-2">
              <AlertOctagon className="h-5 w-5 text-rose-600" />
              Trigger Instant SOS Distress Beacon
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">Specific Location (Room/Floor/Block)</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Toilet block, Main school building room 3..."
                className="w-full custom-input"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">Additional Details (Optional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. 'I need sanitary pads immediately' or 'I have unbearable cramps pain and need to go home'..."
                rows="3"
                className="w-full p-3 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 text-xs font-semibold text-slate-700"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-all active:scale-95 animate-pulse-subtle"
            >
              Dispatch Distress Beacon to ASHA Worker
            </button>
          </form>
        </div>

        {/* Right Column: Phone Directories */}
        <div className="space-y-6">
          <div className="custom-card space-y-4">
            <h3 className="font-serif text-lg font-bold text-rose-900 flex items-center gap-1.5 border-b border-rose-100 pb-2">
              <Phone className="h-5 w-5 text-rose-500" />
              SOS Phone Directory
            </h3>

            <div className="space-y-4">
              {emergencyContacts.map(contact => (
                <div key={contact.name} className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-800">{contact.name}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">{contact.desc}</p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100/60 border border-rose-200/20 text-rose-700 text-xs font-black"
                  >
                    <Phone className="h-3 w-3 text-rose-500" />
                    <span>{contact.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-soft space-y-4">
            <h3 className="font-serif text-base font-bold text-rose-900 flex items-center gap-1.5">
              <Truck className="h-4.5 w-4.5 text-rose-500" />
              What happens next?
            </h3>
            
            <div className="space-y-3 text-[10px] text-slate-500 font-semibold leading-relaxed">
              <div className="flex gap-2">
                <span className="text-rose-500 font-black">1.</span>
                <p>ASHA didi Shantha Mary receives a priority notification alert on her mobile portal showing your name and classroom location details.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-rose-500 font-black">2.</span>
                <p>She will immediately bring a fresh sanitary napkin pad, water, and pain-relief aids directly to you.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-rose-500 font-black">3.</span>
                <p>School Health Teacher Lakshmi Devi is alerted to check on you and provide a quiet rest area in the girls room.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
