import React from 'react';
import { ArrowLeft, Shield, FileText, HelpCircle, Mail, Cookie } from 'lucide-react';

export interface LegalPageContent {
  type: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface LegalPageProps {
  data: LegalPageContent;
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ data, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 p-8 md:p-12 text-center">
            <div className="bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-700">
              {data.icon}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{data.title}</h1>
            <p className="text-slate-400">Última atualização: 19 de Novembro de 2025</p>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 prose prose-slate max-w-none">
            {data.content}
          </div>
        </div>
      </div>
    </div>
  );
};