import React from 'react';
import { ArrowLeft, Store, MessageSquare, Handshake, Check, Send } from 'lucide-react';

interface PartnershipPageProps {
  onBack: () => void;
}

export const PartnershipPage: React.FC<PartnershipPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Information */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Parcerias e Publicidade</h1>
              <p className="text-slate-500 text-lg leading-relaxed">
                Seja nosso parceiro e alcance milhares de pessoas interessadas em economizar nas compras de supermercado.
              </p>
            </div>

            {/* Partnership Types */}
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4">
                <div className="bg-purple-100 p-3 rounded-xl h-fit">
                  <Store className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Para Supermercados</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Divulgue suas ofertas e promoções para um público qualificado que está ativamente buscando economizar.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4">
                <div className="bg-blue-100 p-3 rounded-xl h-fit">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Para Anunciantes</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Destaque sua marca em banners e espaços publicitários estratégicos em nossa plataforma.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4">
                <div className="bg-emerald-100 p-3 rounded-xl h-fit">
                  <Handshake className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Parcerias Estratégicas</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Interessado em uma parceria comercial? Entre em contato e vamos conversar sobre as possibilidades.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Advertise Banner */}
            <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-2xl p-8 text-white shadow-lg shadow-fuchsia-500/20">
              <h3 className="font-bold text-lg mb-4">Por que anunciar conosco?</h3>
              <ul className="space-y-3">
                {[
                  "Público segmentado e engajado",
                  "Alta taxa de conversão",
                  "Relatórios detalhados de performance",
                  "Flexibilidade de formatos e campanhas"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-medium text-white/90">
                    <div className="bg-white/20 p-1 rounded-full">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 h-fit">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Entre em Contato</h2>
              <p className="text-slate-500 text-sm">
                Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas.
              </p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Seu nome"
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                  Empresa <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Nome da empresa"
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                  E-mail Corporativo <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  placeholder="seu@empresa.com"
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                  Telefone <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  placeholder="(00) 00000-0000"
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                  Mensagem <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows={4}
                  placeholder="Conte-nos mais sobre seu interesse em fazer parceria..."
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
                />
              </div>

              <button className="w-full bg-[#a855f7] hover:bg-[#9333ea] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-purple-500/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-4">
                <Send className="w-5 h-5" />
                Enviar Proposta
              </button>
            </form>

            <p className="text-xs text-slate-400 mt-6 text-center leading-relaxed">
              Suas informações serão enviadas para <span className="text-slate-500">patriciaryquete@gmail.com</span> e tratadas com confidencialidade.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};