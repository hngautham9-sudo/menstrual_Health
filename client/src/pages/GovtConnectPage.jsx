import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { Award, CheckCircle, Search, HelpCircle, Check, Loader } from 'lucide-react';

export default function GovtConnectPage() {
  const { language, matchedSchemes, appliedSchemes, matchSchemes, applyScheme } = useStore();
  const t = translations[language];

  const [age, setAge] = useState(14);
  const [schoolStatus, setSchoolStatus] = useState('studying');
  const [region, setRegion] = useState('rural');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    await matchSchemes({
      age: Number(age),
      schoolStatus,
      region,
      state: 'Karnataka'
    });

    setTimeout(() => {
      setIsLoading(false);
      setHasSearched(true);
    }, 800);
  };

  const handleApply = (schemeId) => {
    applyScheme(schemeId);
  };

  const schemesToDisplay = categoryFilter === 'all' 
    ? matchedSchemes 
    : matchedSchemes.filter(s => s.category === categoryFilter);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-800 font-serif tracking-tight">{t.schemesTitle}</h2>
        <p className="text-sm text-slate-500 font-medium">{t.schemesSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Demographic match form */}
        <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-soft h-fit space-y-6">
          <h3 className="font-serif text-sm font-black text-rose-800 uppercase tracking-wider border-b border-rose-100 pb-3 flex items-center gap-1.5">
            <Search className="h-4.5 w-4.5 text-rose-500" />
            {language === 'kn' ? "ಅರ್ಹತೆ ಪರೀಕ್ಷೆ" : "Eligibility Quiz"}
          </h3>

          <form onSubmit={handleSearch} className="space-y-4">
            {/* Age */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">{t.quizAge}</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="5"
                max="25"
                className="w-full custom-input text-xs font-bold"
                required
              />
            </div>

            {/* School */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">{t.quizSchool}</label>
              <div className="grid grid-cols-1 gap-2">
                <label className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                  schoolStatus === 'studying' 
                    ? 'bg-rose-50 border-rose-300 text-rose-700' 
                    : 'bg-white border-rose-100 text-slate-600'
                }`}>
                  <input
                    type="radio"
                    name="schoolStatus"
                    value="studying"
                    checked={schoolStatus === 'studying'}
                    onChange={() => setSchoolStatus('studying')}
                    className="accent-rose-500"
                  />
                  <span>{t.quizSchoolStudying}</span>
                </label>

                <label className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                  schoolStatus === 'left' 
                    ? 'bg-rose-50 border-rose-300 text-rose-700' 
                    : 'bg-white border-rose-100 text-slate-600'
                }`}>
                  <input
                    type="radio"
                    name="schoolStatus"
                    value="left"
                    checked={schoolStatus === 'left'}
                    onChange={() => setSchoolStatus('left')}
                    className="accent-rose-500"
                  />
                  <span>{t.quizSchoolLeft}</span>
                </label>
              </div>
            </div>

            {/* Region */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">{t.quizRegion}</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-rose-100 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                <option value="rural">{t.quizRegionRural}</option>
                <option value="tribal">{t.quizRegionTribal}</option>
                <option value="urban">{t.quizRegionUrban}</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-default text-xs font-black uppercase tracking-wider"
            >
              {isLoading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>{t.loading}</span>
                </>
              ) : (
                <span>{t.quizFind}</span>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Search Results Feed */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: language === 'kn' ? 'ಎಲ್ಲಾ ಸೌಲಭ್ಯಗಳು' : 'All Category' },
              { id: 'hygiene', label: language === 'kn' ? 'ಸ್ಯಾನಿಟರಿ ಪ್ಯಾಡ್‌ಗಳು' : 'Hygiene' },
              { id: 'education', label: language === 'kn' ? 'ಶಿಕ್ಷಣ' : 'Education' },
              { id: 'health', label: language === 'kn' ? 'ಆರೋಗ್ಯ' : 'Nutrition & Health' },
              { id: 'finance', label: language === 'kn' ? 'ಆರ್ಥಿಕ ಸಹಾಯ' : 'Finance' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  categoryFilter === cat.id
                    ? 'bg-rose-500 text-white border-rose-500 shadow-soft'
                    : 'bg-white text-slate-600 border-rose-100 hover:bg-rose-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results list */}
          {hasSearched && (
            <div className="space-y-4">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block pl-1">
                {t.resultsFound} ({schemesToDisplay.length})
              </span>

              {schemesToDisplay.length === 0 ? (
                <div className="bg-white border border-rose-100 rounded-3xl p-8 text-center space-y-2">
                  <HelpCircle className="h-8 w-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 font-medium">{t.noSchemes}</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {schemesToDisplay.map(scheme => {
                    const isApplied = appliedSchemes.includes(scheme.id);

                    return (
                      <div 
                        key={scheme.id}
                        className="bg-white border border-rose-100 rounded-3xl p-5 shadow-soft hover:scale-[1.01] transition-all duration-300 space-y-4 relative overflow-hidden"
                      >
                        {/* Upper category */}
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="badge-health">
                              {scheme.category}
                            </span>
                            <h4 className="text-base font-bold text-rose-950 mt-2 font-serif">
                              {language !== 'en' && scheme.nameLocal ? scheme.nameLocal : scheme.name}
                            </h4>
                          </div>

                          <div className="bg-gradient-to-tr from-rose-500 to-rose-300 text-white w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                            <Award className="h-5 w-5" />
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                          {language !== 'en' && scheme.descriptionLocal ? scheme.descriptionLocal : scheme.description}
                        </p>

                        {/* Benefits */}
                        <div className="bg-[#FDF6F8] p-3.5 rounded-2xl border border-rose-100/50">
                          <h5 className="text-[11px] font-black text-rose-800 mb-1.5 uppercase tracking-wider">{t.schemeBenefits}</h5>
                          <p className="text-xs text-slate-700 font-bold leading-relaxed">
                            {language !== 'en' && scheme.benefitsLocal ? scheme.benefitsLocal : scheme.benefits}
                          </p>
                        </div>

                        {/* Guidelines steps */}
                        <div className="space-y-2">
                          <h5 className="text-[11px] font-black text-rose-800 uppercase tracking-wider">{t.schemeSteps}</h5>
                          <ol className="list-decimal list-inside text-xs text-slate-500 space-y-1.5 font-semibold pl-1">
                            {scheme.applicationSteps.map((step, idx) => (
                              <li key={idx} className="leading-snug">{step}</li>
                            ))}
                          </ol>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2 border-t border-rose-100/60 flex items-center justify-between gap-4 flex-wrap">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">
                            Administered: {scheme.state}
                          </span>

                          {isApplied ? (
                            <div className="bg-[#EAF7ED] text-green-800 border border-sage/50 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                              <Check className="h-4 w-4 text-green-700" />
                              <span>{language === 'kn' ? "ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ ✓" : "Applied ✓"}</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleApply(scheme.id)}
                              className="btn-default !py-2 text-xs font-black uppercase tracking-wider glow-btn"
                            >
                              {t.applyNow}
                            </button>
                          )}
                        </div>

                        {isApplied && (
                          <div className="mt-3 bg-[#EAF7ED]/40 border border-sage/10 p-3 rounded-xl text-[10px] text-slate-600 font-semibold leading-snug animate-slide-up">
                            {t.appliedSuccess}
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
