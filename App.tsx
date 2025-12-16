import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ResultCard } from './components/ResultCard';
import { generateMathActivities } from './services/geminiService';
import { AgeGroup, MathActivity } from './types';
import { AlertTriangle, BookOpenCheck } from 'lucide-react';

const App: React.FC = () => {
  const [activities, setActivities] = useState<MathActivity[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRoutine, setLastRoutine] = useState<string>('');

  const handleGenerate = async (routine: string, age: AgeGroup) => {
    setLoading(true);
    setError(null);
    setActivities(null);
    setLastRoutine(routine);

    try {
      const result = await generateMathActivities(routine, age);
      setActivities(result.activities);
    } catch (err) {
      setError("We had a little trouble thinking of ideas. Please try again or check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        
        <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-4">
              Math is everywhere.
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Get 3 quick, research-backed ways to build math skills during any household activity. No prep required.
            </p>
        </div>

        <InputSection onGenerate={handleGenerate} isLoading={loading} />

        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {activities && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 mb-8 text-slate-400">
                <div className="h-px bg-slate-200 w-12 sm:w-24"></div>
                <span className="text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
                    <BookOpenCheck className="w-4 h-4 text-brand-500" />
                    Results for "{lastRoutine}"
                </span>
                <div className="h-px bg-slate-200 w-12 sm:w-24"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {activities.map((activity, index) => (
                <ResultCard key={index} activity={activity} index={index} />
              ))}
            </div>

            <div className="mt-12 text-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
                <h4 className="font-bold text-slate-700 mb-2">Why this matters</h4>
                <p className="text-sm text-slate-500">
                    Research from institutions like <strong>Stanford DREME</strong> and <strong>NAEYC</strong> shows that "Math Talk" — talking about numbers, shapes, and patterns during daily routines — is one of the strongest predictors of later school success. It's not about flashcards; it's about conversation.
                </p>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 py-8 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} TinyMath Moments. Designed for families.</p>
        <p className="mt-1 text-xs">
            This tool uses AI to generate educational suggestions. Always supervise activities.
        </p>
      </footer>
    </div>
  );
};

export default App;