import React, { useState } from 'react';
import { AgeGroup } from '../types';
import { ArrowRight, Sparkles, Home, Baby } from 'lucide-react';

interface InputSectionProps {
  onGenerate: (routine: string, age: AgeGroup) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onGenerate, isLoading }) => {
  const [routine, setRoutine] = useState('');
  const [age, setAge] = useState<AgeGroup>(AgeGroup.PRESCHOOL);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (routine.trim()) {
      onGenerate(routine, age);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="bg-white rounded-3xl shadow-xl shadow-brand-100/50 overflow-hidden border border-brand-100 p-1">
        <div className="p-6 md:p-8 bg-gradient-to-br from-white to-brand-50/50 rounded-[1.4rem]">
          <h2 className="text-xl md:text-2xl font-display font-bold text-slate-800 mb-6 text-center">
            Turn a chore into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-purple">math adventure</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Routine Input */}
            <div className="space-y-2">
              <label htmlFor="routine" className="flex items-center gap-2 text-sm font-bold text-slate-600 ml-1">
                <Home className="w-4 h-4 text-brand-500" />
                WHAT ROUTINE ARE YOU DOING?
              </label>
              <input
                id="routine"
                type="text"
                value={routine}
                onChange={(e) => setRoutine(e.target.value)}
                placeholder="e.g., Loading the dishwasher, Folding laundry, Grocery shopping..."
                className="w-full px-5 py-4 text-lg rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100 transition-all outline-none"
                disabled={isLoading}
                required
              />
            </div>

            {/* Age Selection */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-600 ml-1">
                <Baby className="w-4 h-4 text-brand-500" />
                WHO IS THIS FOR?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.values(AgeGroup).map((group) => (
                  <button
                    key={group}
                    type="button"
                    onClick={() => setAge(group)}
                    className={`
                      px-3 py-2 rounded-xl text-sm font-bold border-2 transition-all duration-200
                      ${age === group 
                        ? 'border-brand-500 bg-brand-500 text-white shadow-md shadow-brand-200 transform scale-[1.02]' 
                        : 'border-slate-100 bg-white text-slate-500 hover:border-brand-200 hover:bg-brand-50'
                      }
                    `}
                    disabled={isLoading}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !routine.trim()}
              className={`
                w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-3 font-display font-bold text-lg text-white shadow-lg transition-all duration-300
                ${isLoading || !routine.trim()
                  ? 'bg-slate-300 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 shadow-brand-300/50 hover:shadow-brand-300/70 hover:-translate-y-1'
                }
              `}
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Consulting the Experts...
                </>
              ) : (
                <>
                  Generate Ideas <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      
      <p className="text-center text-xs text-slate-400 mt-4">
        Powered by AI trained on guidelines from Stanford DREME & NAEYC.
      </p>
    </div>
  );
};
