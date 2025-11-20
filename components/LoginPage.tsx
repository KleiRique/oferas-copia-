import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string) => void;
  onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
        
        <div className="p-8 pt-12">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Bem-vindo de volta</h1>
            <p className="text-slate-500">Acesse sua conta para ver suas ofertas</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">E-mail</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">Senha</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Esqueceu a senha?
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              Entrar
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500">
              Ainda não tem uma conta?{' '}
              <button className="text-blue-600 font-bold hover:underline">
                Cadastre-se
              </button>
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <button 
            onClick={onBack}
            className="text-slate-500 hover:text-slate-800 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o início
          </button>
        </div>

      </div>
    </div>
  );
};