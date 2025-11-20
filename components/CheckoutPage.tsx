import React, { useState } from 'react';
import { ArrowLeft, QrCode, CreditCard, Check, PartyPopper } from 'lucide-react';
import { Plan } from '../types';

interface CheckoutPageProps {
  plan: Plan;
  onBack: () => void;
  onSuccess: (userName: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ plan, onBack, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Por favor, informe seu nome completo.');
      return;
    }
    onSuccess(name);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <h1 className="text-2xl font-semibold text-slate-800 mb-8">Finalizar Assinatura</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal Data */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Dados Pessoais</h2>
              
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Nome Completo</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError('');
                    }}
                    placeholder="Seu nome completo" 
                    className={`w-full bg-slate-50 border ${error ? 'border-red-300 ring-2 ring-red-100' : 'border-none'} rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                  />
                  {error && <p className="text-xs text-red-500 font-medium ml-1">{error}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">E-mail</label>
                  <input 
                    type="email" 
                    placeholder="seu@email.com" 
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Senha</label>
                  <input 
                    type="password" 
                    placeholder="Mínimo 6 caracteres" 
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Forma de Pagamento</h2>

              <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
                <button 
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${
                    paymentMethod === 'pix' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  PIX <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full ml-1">Recomendado</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${
                    paymentMethod === 'card' 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  Cartão
                </button>
              </div>

              {paymentMethod === 'pix' ? (
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-8 text-center animate-in fade-in duration-300">
                  <div className="bg-white p-4 rounded-xl inline-block mb-4 shadow-sm">
                    <QrCode className="w-24 h-24 text-slate-800" />
                  </div>
                  <p className="text-slate-700 font-medium mb-2">Pagamento via PIX</p>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    Após clicar em "Concluir Pagamento", você receberá o QR Code para realizar o pagamento
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4 text-emerald-600 text-sm font-medium">
                    <Check className="w-4 h-4" />
                    Confirmação instantânea
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-8 text-center animate-in fade-in duration-300">
                    <p className="text-slate-500">Formulário de cartão indisponível no modo demonstração.</p>
                </div>
              )}
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.99]"
            >
              Concluir Pagamento
            </button>

            <p className="text-center text-xs text-slate-400">
              Ao finalizar, você concorda com nossos <a href="#" className="text-blue-600 hover:underline">Termos de Uso</a> e <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>
            </p>

          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">Resumo do Pedido</h2>

              <div className="space-y-4 pb-6 border-b border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Plano</span>
                  <span className="text-slate-900 font-medium">{plan.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Período</span>
                  <span className="text-slate-900 font-medium">{plan.period}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-900 font-medium">Total</span>
                  <span className="text-2xl font-bold text-blue-600">R$ {plan.price}</span>
                </div>
              </div>

              <div className="py-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="bg-emerald-100 p-0.5 rounded-full">
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  </div>
                  7 dias de garantia
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="bg-emerald-100 p-0.5 rounded-full">
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  </div>
                  Cancele quando quiser
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                   <div className="bg-emerald-100 p-0.5 rounded-full">
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  </div>
                  Acesso imediato
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex gap-3">
                  <PartyPopper className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <p className="text-sm text-blue-700 leading-relaxed">
                    <span className="font-bold">Promoção:</span> Primeiros 100 usuários ganham 1 mês extra grátis!
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};