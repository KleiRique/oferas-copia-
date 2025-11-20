import React from 'react';
import { ShoppingCart, User } from 'lucide-react';

interface HeaderProps {
  onLogin: () => void;
  onAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogin, onAccount }) => {
  return (
    <header className="bg-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-slate-900 tracking-tight">
            As Ofertas da IA
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <button 
            onClick={onAccount}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium text-sm transition-colors"
          >
            <User className="w-5 h-5" />
            Conta
          </button>
          <button 
            onClick={onLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm shadow-blue-200"
          >
            Entrar
          </button>
        </div>
      </div>
    </header>
  );
};