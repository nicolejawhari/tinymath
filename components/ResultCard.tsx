import React from 'react';
import { MathActivity } from '../types';
import { BookOpen, Lightbulb, GraduationCap, ArrowUpRight } from 'lucide-react';

interface ResultCardProps {
  activity: MathActivity;
  index: number;
}

export const ResultCard: React.FC<ResultCardProps> = ({ activity, index }) => {
  const colors = [
    { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600', icon: 'bg-blue-100', accent: 'text-blue-700' },
    { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-600', icon: 'bg-amber-100', accent: 'text-amber-700' },
    { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', icon: 'bg-emerald-100', accent: 'text-emerald-700' },
  ];

  const theme = colors[index % colors.length];

  return (
    <div className={`h-full rounded-2xl border-2 ${theme.border} bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col`}>
      <div className={`p-5 ${theme.bg} border-b ${theme.border} flex justify-between items-start`}>
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
             <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${theme.bg} ${theme.text} border ${theme.border}`}>
               Idea #{index + 1}
             </span>
             <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-white text-slate-500 border border-slate-100">
               {activity.difficulty}
             </span>
          </div>
          <h3 className={`text-xl font-display font-bold ${theme.accent} leading-tight`}>
            {activity.title}
          </h3>
        </div>
        <div className={`p-2 rounded-xl ${theme.icon}`}>
          <Lightbulb className={`w-5 h-5 ${theme.text}`} />
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col gap-6">
        
        {/* Instructions */}
        <div className="space-y-2">
          <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800">
             <BookOpen className="w-4 h-4 text-slate-400" />
             HOW TO DO IT
          </h4>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            {activity.description}
          </p>
        </div>

        {/* The Math Concept */}
        <div className="space-y-2">
          <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800">
             <ArrowUpRight className="w-4 h-4 text-slate-400" />
             MATH FOCUS: <span className={`${theme.text}`}>{activity.mathConcept}</span>
          </h4>
        </div>

        {/* Educational Value - The "Why" */}
        <div className={`mt-auto p-4 rounded-xl ${theme.bg} border ${theme.border}`}>
           <h4 className={`flex items-center gap-2 text-sm font-bold ${theme.accent} mb-1`}>
             <GraduationCap className="w-4 h-4" />
             Expert Insight
          </h4>
          <p className="text-xs md:text-sm text-slate-600 italic">
            "{activity.educationalValue}"
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
            {activity.tags.map(tag => (
                <span key={tag} className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded-full">#{tag}</span>
            ))}
        </div>
      </div>
    </div>
  );
};
