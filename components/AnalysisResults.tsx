import React from 'react';
import { AnalysisResult, Severity } from '../types';
import { CheckCircle, AlertTriangle, XOctagon, Info, Activity } from 'lucide-react';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10';
    if (score >= 70) return 'text-indigo-400 border-indigo-500/50 bg-indigo-500/10';
    if (score >= 50) return 'text-amber-400 border-amber-500/50 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/50 bg-rose-500/10';
  };

  const getSeverityIcon = (severity: Severity) => {
    switch (severity) {
      case Severity.CRITICAL: return <XOctagon className="w-5 h-5 text-rose-500" />;
      case Severity.HIGH: return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case Severity.MEDIUM: return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case Severity.LOW: return <Info className="w-5 h-5 text-blue-500" />;
      default: return <Info className="w-5 h-5 text-slate-500" />;
    }
  };

  const getSeverityBadge = (severity: Severity) => {
    switch (severity) {
      case Severity.CRITICAL: return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case Severity.HIGH: return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case Severity.MEDIUM: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case Severity.LOW: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-slate-400 text-sm font-medium mb-1">Quality Score</p>
            <div className={`text-5xl font-mono font-bold ${getScoreColor(result.score).split(' ')[0]}`}>
              {result.score}
              <span className="text-2xl text-slate-600">/100</span>
            </div>
          </div>
          <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-20 blur-2xl ${getScoreColor(result.score).split(' ')[2]}`}></div>
        </div>

        <div className="md:col-span-2 bg-slate-900 p-6 rounded-xl border border-slate-800">
           <p className="text-slate-400 text-sm font-medium mb-2 flex items-center gap-2">
             <Activity className="w-4 h-4" />
             Executive Summary
           </p>
           <p className="text-slate-200 leading-relaxed">
             {result.summary}
           </p>
           <div className="mt-4 flex gap-3">
              <span className="text-xs px-2 py-1 rounded border border-slate-700 bg-slate-800 text-slate-300 uppercase tracking-wider font-mono">
                {result.language}
              </span>
              <span className="text-xs px-2 py-1 rounded border border-slate-700 bg-slate-800 text-slate-300">
                {result.issues.length} Issues Found
              </span>
           </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-950/30">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Detected Issues
          </h3>
        </div>
        <div className="divide-y divide-slate-800">
          {result.issues.length === 0 ? (
             <div className="p-8 text-center text-slate-500">
               <CheckCircle className="w-12 h-12 mx-auto mb-3 text-emerald-500/50" />
               <p>No issues detected. Good job!</p>
             </div>
          ) : (
            result.issues.map((issue, idx) => (
              <div key={idx} className="p-6 hover:bg-slate-800/30 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 p-2 rounded-lg ${getSeverityBadge(issue.severity).split(' ')[0]}`}>
                    {getSeverityIcon(issue.severity)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded border ${getSeverityBadge(issue.severity)}`}>
                        {issue.severity}
                      </span>
                      {issue.line && (
                        <span className="text-xs font-mono text-slate-500">
                          Line {issue.line}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-200 font-medium mb-2">{issue.description}</p>
                    <div className="bg-slate-950 rounded-md p-3 border border-slate-800">
                      <p className="text-sm text-slate-400 flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">Fix:</span>
                        {issue.suggestion}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Refactored Code Snippet (if available) */}
      {result.refactoredSnippet && (
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-950/30">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-500" />
              Suggested Refactor
            </h3>
          </div>
          <div className="p-0">
            <pre className="p-6 bg-slate-950 overflow-x-auto text-sm font-mono text-emerald-300 leading-relaxed">
              {result.refactoredSnippet}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for icon
const Code = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);