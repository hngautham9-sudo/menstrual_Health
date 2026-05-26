import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { UserCog, Save, ShieldCheck, Heart } from 'lucide-react';

export default function ProfilePage() {
  const { language, user, updateUserProfile } = useStore();
  const t = translations[language];

  // Profile form state pre-populated
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [schoolName, setSchoolName] = useState(user.schoolName);
  const [village, setVillage] = useState(user.village);
  const [district, setDistrict] = useState(user.district);
  const [showSuccess, setShowSuccess] = useState(false);

  const preseededSchools = [
    "Government High School, Bilichodu",
    "Tribal Residential Ashram School, Kollegala",
    "Maharani Government Girls Vidyalaya, Davanagere",
    "Adarsha Vidyalaya Tribal School, Jagalur"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserProfile({
      name,
      age: Number(age),
      schoolName,
      village,
      district
    });
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in py-4">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-800 font-serif tracking-tight flex items-center gap-2">
          <UserCog className="h-6 w-6 text-rose-500" />
          {language === 'kn' ? 'ನನ್ನ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಸೆಟ್ಟಿಂಗ್ಸ್' : 'Profile Settings'}
        </h2>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
          Manage your private credentials and school details
        </p>
      </div>

      {showSuccess && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-2 animate-pulse-subtle">
          <Heart className="h-5 w-5 text-rose-500 fill-rose-100" />
          <span>
            {language === 'kn' ? "ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!" : "Settings successfully updated!"}
          </span>
        </div>
      )}

      {/* Main Settings Card */}
      <form onSubmit={handleSubmit} className="bg-white border border-rose-100 rounded-3xl p-6 shadow-soft space-y-6">
        <h3 className="text-sm font-black text-rose-800 uppercase tracking-wider border-b border-rose-100 pb-3">
          Demographic Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">Full Name</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full custom-input"
              required
            />
          </div>

          {/* Age */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">Age: <span className="text-rose-500 font-black">{age}</span></label>
            <input 
              type="range"
              min="10"
              max="22"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full accent-rose-500 mt-2"
            />
          </div>
        </div>

        {/* School Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 block">Enrollment School</label>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Village */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">Village</label>
            <input 
              type="text"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="w-full custom-input"
              required
            />
          </div>

          {/* District */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">District</label>
            <input 
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full custom-input"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 border-t border-rose-100 flex justify-end">
          <button type="submit" className="btn-default glow-btn text-xs font-black uppercase tracking-wider">
            <Save className="h-4 w-4" />
            <span>{t.save}</span>
          </button>
        </div>
      </form>

      {/* Security note */}
      <div className="bg-rose-50/50 border border-rose-100/50 p-4 rounded-2xl flex items-center gap-3 text-[10px] text-slate-500 font-semibold leading-relaxed">
        <ShieldCheck className="h-6 w-6 text-rose-500 shrink-0" />
        <span>
          Your demographic profiles are stored securely in local app storage and fallback databases. Under no circumstance do we share school health scores with public identity vectors.
        </span>
      </div>

    </div>
  );
}
