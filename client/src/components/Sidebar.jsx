import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { 
  Home, Sparkles, LogIn, Compass, CalendarDays, Smile, 
  Award, Building2, AlertOctagon, Apple, Newspaper, 
  UserCog, Menu, X, Bell, RefreshCw, GraduationCap, MapPin, ShieldAlert
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { language, setLanguage, viewMode, setViewMode, user, emergencies } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[language];

  // Map tabs to their labels and Lucide icons
  const girlNavItems = [
    { id: 'landing', label: language === 'kn' ? 'ಸ್ವಾಗತ ಪುಟ' : 'Welcome Portal', icon: Sparkles },
    { id: 'auth', label: language === 'kn' ? 'ಖಾತೆ ಲಾಗಿನ್' : 'Student Login', icon: LogIn },
    { id: 'dashboard', label: t.navDashboard, icon: Home },
    { id: 'mentor', label: t.navSaheli, icon: Compass },
    { id: 'health', label: t.navTracker, icon: CalendarDays },
    { id: 'counseling', label: language === 'kn' ? 'ಆಪ್ತ ಸಮಾಲೋಚನೆ' : 'Emotional Care', icon: Smile },
    { id: 'govt', label: t.navSchemes, icon: Award },
    { id: 'school', label: t.navSanitation, icon: Building2 },
    { id: 'emergency', label: language === 'kn' ? 'ತುರ್ತು ಸಹಾಯ' : 'Emergency Aid', icon: AlertOctagon },
    { id: 'nutrition', label: language === 'kn' ? 'ಪೌಷ್ಟಿಕಾಂಶ & ಯೋಗ' : 'Nutrition & Yoga', icon: Apple },
    { id: 'updates', label: language === 'kn' ? 'ಆರೋಗ್ಯ ಸಮಾಚಾರ' : 'Live updates', icon: Newspaper },
    { id: 'profile', label: language === 'kn' ? 'ನನ್ನ ಪ್ರೊಫೈಲ್' : 'My Settings', icon: UserCog }
  ];

  const ashaNavItems = [
    { id: 'asha', label: t.navAsha, icon: ShieldAlert || Home },
    { id: 'school', label: t.navSanitation, icon: Building2 },
    { id: 'mentor', label: t.navSaheli, icon: Compass },
    { id: 'profile', label: 'My Settings', icon: UserCog }
  ];

  const navItems = viewMode === 'girl' ? girlNavItems : ashaNavItems;
  const activeSOS = emergencies.filter(e => e.status === 'active').length;

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'GG';
  };

  return (
    <>
      {/* 1. Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#FDF6F8] border-b border-rose-100/50 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-slate-700 hover:text-rose-500 focus:outline-none"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="font-serif text-lg font-black text-rose-600">ರಕ್ಷೋಭ್ಯ</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification alert bell */}
          <div className="relative cursor-pointer">
            <Bell className="h-4.5 w-4.5 text-slate-600 hover:text-rose-500 transition-all" />
            {(activeSOS > 0) && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border border-[#FDF6F8] animate-pulse"></span>
            )}
          </div>
          
          <div className="custom-avatar !w-7 !h-7 text-[10px]">
            {getInitials(user.name)}
          </div>
        </div>
      </div>

      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-30 transition-all"
        />
      )}

      {/* 2. Main 240px Navigation Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-[240px] bg-[#FDF6F8] border-r border-rose-100 flex flex-col justify-between py-6 px-4 z-40 transition-transform duration-300 md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] pr-1">
          {/* Brand header */}
          <div className="flex items-center justify-between border-b border-rose-100/60 pb-3">
            <h1 className="text-xl font-black font-serif tracking-tight text-rose-600 flex items-center gap-1.5">
              <span>ರಕ್ಷೋಭ್ಯ</span>
              <span className="text-[9px] uppercase font-bold tracking-widest bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded border border-rose-300/30">
                Rural
              </span>
            </h1>
          </div>

          {/* Student Profile widget inside sidebar */}
          <div className="bg-white/60 p-3 rounded-2xl border border-rose-100/50 flex flex-col gap-2 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="custom-avatar text-xs font-bold shrink-0">
                {getInitials(user.name)}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-slate-800 truncate leading-snug">{user.name}</h4>
                <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide">
                  {viewMode === 'girl' ? t.roleAdolescent : t.roleAsha}
                </span>
              </div>
            </div>
            {viewMode === 'girl' && (
              <div className="space-y-1 text-[9px] text-slate-500 font-semibold border-t border-rose-100/40 pt-1.5">
                <div className="flex items-center gap-1">
                  <GraduationCap className="h-3 w-3 text-rose-400" />
                  <span className="truncate">{user.schoolName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-rose-400" />
                  <span>{user.village}</span>
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-left transition-all duration-200 relative ${
                    isActive 
                      ? 'bg-rose-500 text-white shadow-soft font-bold' 
                      : 'text-slate-600 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                >
                  {/* Left edge 2px Active Indicator line */}
                  {isActive && (
                    <span className="absolute left-0 top-1/4 bottom-1/4 w-1.5 rounded-r bg-white"></span>
                  )}
                  <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-white' : 'text-rose-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 3. Bottom controls (Language, roles switchers) */}
        <div className="border-t border-rose-100/60 pt-4 space-y-3.5">
          {/* Segmented language toggle switch bar for high visibility */}
          <div className="flex bg-rose-100 p-0.5 rounded-xl border border-rose-200/50 shadow-sm shrink-0 justify-between w-full">
            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 py-1 rounded-lg text-[9px] sm:text-xs font-bold transition-all text-center ${
                language === 'en'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('kn')}
              className={`flex-1 py-1 rounded-lg text-[9px] sm:text-xs font-bold transition-all text-center ${
                language === 'kn'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              ಕನ್ನಡ
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`flex-1 py-1 rounded-lg text-[9px] sm:text-xs font-bold transition-all text-center ${
                language === 'hi'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Role Portal toggler */}
          <button
            onClick={() => {
              const newMode = viewMode === 'girl' ? 'asha' : 'girl';
              setViewMode(newMode);
              handleNavClick(newMode === 'girl' ? 'dashboard' : 'asha');
            }}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100/60 text-[10px] font-black border border-rose-200/25 active:scale-95 transition-all"
          >
            <RefreshCw className="h-3 w-3" />
            <span>{t.toggleRole}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
