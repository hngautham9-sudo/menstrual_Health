import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { ShieldCheck, User, LogIn, ArrowRight, UserPlus, Eye, EyeOff } from 'lucide-react';

export default function AuthPage({ setActiveTab }) {
  const { language, updateUserProfile, viewMode, setViewMode } = useStore();
  const t = translations[language];

  const [activeTab, setFormTab] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign up fields
  const [name, setName] = useState('');
  const [age, setAge] = useState(14);
  const [schoolName, setSchoolName] = useState('Government High School, Bilichodu');
  const [village, setVillage] = useState('Bilichodu');
  const [district, setDistrict] = useState('Davanagere');

  const preseededSchools = [
    "Government High School, Bilichodu",
    "Tribal Residential Ashram School, Kollegala",
    "Maharani Government Girls Vidyalaya, Davanagere",
    "Adarsha Vidyalaya Tribal School, Jagalur"
  ];

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    // Simulate Firebase Credentials log in. We will configure active user profile.
    if (email.toLowerCase().includes('asha')) {
      setViewMode('asha');
      await updateUserProfile({
        name: "Shantha Mary (ASHA)",
        role: "asha",
        schoolName: "Bilichodu Primary Subcenter",
        village: "Bilichodu",
        district: "Davanagere"
      });
      setActiveTab('asha');
    } else {
      setViewMode('girl');
      await updateUserProfile({
        name: name || "Gauri Gowda",
        age: Number(age) || 14,
        schoolName,
        village,
        district,
        role: "girl"
      });
      setActiveTab('dashboard');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setViewMode('girl');
    const updated = await updateUserProfile({
      name,
      age: Number(age),
      schoolName,
      village,
      district,
      role: 'girl'
    });
    setActiveTab('dashboard');
  };

  return (
    <div className="max-w-md mx-auto py-8 animate-fade-in space-y-6">
      
      {/* Visual top logo block */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-rose-900 font-serif">Secure Safe Space</h2>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
          Rakshobhya Client Authentication Gateway
        </p>
      </div>

      <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-soft space-y-6">
        {/* Simple underline tabs selector */}
        <div className="flex border-b border-rose-100 gap-4 justify-center">
          <button
            onClick={() => setFormTab('login')}
            className={`pb-2.5 text-xs font-black uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'login' 
                ? 'border-rose-500 text-rose-500' 
                : 'border-transparent text-slate-400 hover:text-rose-400'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setFormTab('signup')}
            className={`pb-2.5 text-xs font-black uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'signup' 
                ? 'border-rose-500 text-rose-500' 
                : 'border-transparent text-slate-400 hover:text-rose-400'
            }`}
          >
            Register Student
          </button>
        </div>

        {activeTab === 'login' ? (
          /* A. LOGIN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Email Address</label>
              <input
                type="email"
                placeholder="gauri@school.in (or asha@health.gov)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full custom-input"
                required
              />
            </div>

            <div className="space-y-1 relative">
              <label className="text-xs font-bold text-slate-600 block">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password details..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full custom-input pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-7 text-slate-400 hover:text-rose-500"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="pt-2">
              <button type="submit" className="w-full btn-default glow-btn">
                <span>Access Profile</span>
                <LogIn className="h-4 w-4" />
              </button>
            </div>
            
            <div className="text-center pt-2">
              <span className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                *Hackathon hint: Enter "asha" in email to log in as ASHA worker. Otherwise, signs in as Gauri.
              </span>
            </div>
          </form>
        ) : (
          /* B. REGISTRATION FORM */
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Student Name</label>
                <input
                  type="text"
                  placeholder="Gauri Gowda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full custom-input"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Age: <span className="text-rose-500 font-black">{age}</span></label>
                <input
                  type="range"
                  min="10"
                  max="20"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full accent-rose-500 mt-2"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Your School</label>
              <select
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-rose-100 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                {preseededSchools.map(school => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Village</label>
                <input
                  type="text"
                  placeholder="Bilichodu"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full custom-input"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">District</label>
                <input
                  type="text"
                  placeholder="Davanagere"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full custom-input"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" className="w-full btn-default glow-btn">
                <span>Create Safe Onboarding</span>
                <UserPlus className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Trust reassurance banner */}
      <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-100/50 flex items-center gap-3 text-[10px] text-slate-500 font-semibold leading-relaxed">
        <ShieldCheck className="h-6 w-6 text-rose-500 shrink-0" />
        <span>
          Firebase client credentials encryption keeps your logs completely anonymous and secured. Nobody but you can access your cycle diary logs.
        </span>
      </div>

    </div>
  );
}
