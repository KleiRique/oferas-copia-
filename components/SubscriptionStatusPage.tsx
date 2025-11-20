import React from 'react';
import { CheckCircle, Calendar, CreditCard, Home, ShieldCheck } from 'lucide-react';
import { Plan } from '../types';

interface SubscriptionStatusPageProps {
  plan: Plan;
  userName: string;
  expiryDate: string;
  onHome: () => void;
}

export const SubscriptionStatusPage: React.FC<SubscriptionStatusPageProps> = ({ plan, userName, expiryDate, onHome }) => {
  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        
        {/* Success Animation/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Parabéns, {userName.split(' ')[0]}!</h1>
          <p className="text-slate-500">Sua assinatura foi ativada com sucesso.</p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Plano Atual</p>
                <h2 className="text-2xl font-bold">{plan.title}</h2>
              </div>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                ATIVO
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 space-y-6">
            
            <div className="flex items-center justify-between py-3 border-b border-slate-50">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-slate-400" />
                </div>
                <span className="text-sm font-medium">Próxima renovação</span>
              </div>
              <span className="text-slate-900 font-semibold">{expiryDate}</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-50">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <CreditCard className="w-5 h-5 text-slate-400" />
                </div>
                <span className="text-sm font-medium">Valor da renovação</span>
              </div>
              <span className="text-slate-900 font-semibold">R$ {plan.price}</span>
            </div>

            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mt-4">
              <p className="text-emerald-700 text-sm text-center font-medium">
                Você já tem acesso a todos os benefícios premium!
              </p>
            </div>

          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={onHome}
          className="w-full mt-8 bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
        >
          <Home className="w-5 h-5" />
          Voltar para o Início
        </button>

      </div>
    </div>
  );
};