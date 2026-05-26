import React, { useState, useEffect } from 'react';
import { useStore } from './store/useStore';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import MentorPage from './pages/MentorPage';
import HealthTrackerPage from './pages/HealthTrackerPage';
import CounselingPage from './pages/CounselingPage';
import GovtConnectPage from './pages/GovtConnectPage';
import SchoolMonitorPage from './pages/SchoolMonitorPage';
import EmergencyPage from './pages/EmergencyPage';
import NutritionPage from './pages/NutritionPage';
import LiveUpdatesPage from './pages/LiveUpdatesPage';
import ProfilePage from './pages/ProfilePage';
import AshaDashboard from './pages/AshaDashboard';
import { Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing'); // Default to public LandingPage on mount
  const { language, viewMode, fetchCycles, fetchSanitationReports, fetchSchemeApplications } = useStore();

  useEffect(() => {
    fetchCycles();
    fetchSanitationReports();
    fetchSchemeApplications();
  }, [language]);

  const renderContent = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage setActiveTab={setActiveTab} />;
      case 'auth':
        return <AuthPage setActiveTab={setActiveTab} />;
      case 'dashboard':
        return <DashboardPage setActiveTab={setActiveTab} />;
      case 'mentor':
        return <MentorPage />;
      case 'health':
        return <HealthTrackerPage />;
      case 'counseling':
        return <CounselingPage />;
      case 'govt':
        return <GovtConnectPage />;
      case 'school':
        return <SchoolMonitorPage />;
      case 'emergency':
        return <EmergencyPage />;
      case 'nutrition':
        return <NutritionPage />;
      case 'updates':
        return <LiveUpdatesPage />;
      case 'profile':
        return <ProfilePage />;
      case 'asha':
        return <AshaDashboard />;
      default:
        return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF6F8] flex flex-col md:flex-row antialiased font-sans select-none">
      {/* 1. Responsive Navigation left bar / mobile header panel */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Content viewport wrapper */}
      <main className="flex-1 overflow-y-auto min-h-screen py-8 px-4 sm:px-8 max-w-4xl mx-auto w-full">
        <div className="bg-white/40 backdrop-blur-md rounded-3xl p-4 sm:p-6 border border-rose-100 shadow-sm">
          {renderContent()}
        </div>

        {/* Reassuring Footer */}
        <footer className="mt-12 border-t border-rose-100/50 py-6 text-center text-[10px] text-slate-400 font-semibold tracking-wider">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>ರಕ್ಷೋಭ್ಯ • Rakshobhya Women Empowerment Ecosystem</span>
            <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              <span>for rural & tribal schoolgirls in India</span>
            </div>
            <span className="text-rose-600">100% Secure & Private Journal</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
