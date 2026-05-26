import React from 'react';
import {
  Sparkles,
  Heart,
  Shield,
  GraduationCap,
  ArrowRight,
  BookOpen,
  Smile,
  Droplet,
  Compass,
  Award,
  Building2
} from 'lucide-react';

export default function LandingPage({ setActiveTab }) {
  return (
    <div className="space-y-12 animate-fade-in py-4 max-w-4xl mx-auto">
      {/* 1. Massive Visual Hero Header */}
      <section className="text-center space-y-6 py-8 relative overflow-hidden bg-gradient-to-b from-rose-50 via-white to-transparent rounded-3xl p-6 border border-rose-100/50">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-72 h-72 rounded-full bg-rose-100/40 blur-3xl -z-10"></div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-black uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 text-rose-500" />
          Safe · Calm · Empowering · Intelligent
        </span>

        <h1 className="text-4xl md:text-5xl font-black text-rose-900 tracking-tight font-serif max-w-2xl mx-auto leading-tight">
          ರಕ್ಷೋಭ್ಯ — Safe Digital Spaces for Healthy Futures
        </h1>

        <p className="text-slate-600 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed">
          Welcome to your private wellness journal, government welfare connector, and friendly AI mentor—designed specifically for girls in rural and tribal schools across India.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setActiveTab('auth')}
            className="btn-default glow-btn text-xs font-black uppercase"
          >
            <span>Enter Safe Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => setActiveTab('mentor')}
            className="btn-outline text-xs font-black uppercase"
          >
            <span>Talk to AI Saheli</span>
          </button>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 text-center font-serif">
          How Rakshobhya Guides and Protects You
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="custom-card">
            <div className="bg-rose-100 text-rose-700 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
              <CompassIcon className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-800 mb-2">
              AI Mentor Saheli
            </h3>
          </div>

          <div className="custom-card">
            <div className="bg-rose-100 text-rose-700 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
              <Droplet className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-800 mb-2">
              Empathetic Tracker
            </h3>
          </div>

          <div className="custom-card">
            <div className="bg-rose-100 text-rose-700 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
              <AwardIcon className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-800 mb-2">
              Welfare Schemes Finder
            </h3>
          </div>

          <div className="custom-card">
            <div className="bg-rose-100 text-rose-700 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
              <BuildingIcon className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-800 mb-2">
              Sanitation Auditor
            </h3>
          </div>

          <div className="custom-card">
            <div className="bg-rose-100 text-rose-700 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
              <BookIcon className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-800 mb-2">
              Nutrition & Yoga
            </h3>
          </div>

          <div className="custom-card">
            <div className="bg-rose-100 text-rose-700 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-800 mb-2">
              ASHA Crisis SOS
            </h3>
          </div>

        </div>
      </section>
    </div>
  );
}

function CompassIcon(props) {
  return <Compass {...props} />;
}

function AwardIcon(props) {
  return <Award {...props} />;
}

function BuildingIcon(props) {
  return <Building2 {...props} />;
}

function BookIcon(props) {
  return <BookOpen {...props} />;
}