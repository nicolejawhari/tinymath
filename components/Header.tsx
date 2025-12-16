import React from 'react';
import { Calculator, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-brand-100 py-6 px-4 md:px-8 shadow-sm relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-accent-yellow rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 left-0 -ml-4 -mt-4 w-24 h-24 bg-brand-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-5xl mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-brand-500 p-2.5 rounded-xl shadow-brand-200 shadow-md transform -rotate-3">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-800 tracking-tight">
              TinyMath <span className="text-brand-600">Moments</span>
            </h1>
            <p className="text-sm text-slate-500 font-medium hidden sm:block">
              Everyday routines, extraordinary learning.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-700 bg-brand-50 px-3 py-1.5 rounded-full border border-brand-100">
          <Sparkles className="w-3.5 h-3.5 text-accent-orange" />
          <span>ECE Expert Backed</span>
        </div>
      </div>
    </header>
  );
};
