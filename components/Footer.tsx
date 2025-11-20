import React from 'react';
import { Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-4 max-w-xs">
            <h3 className="text-lg font-bold">
              As Ofertas da IA
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Compare ofertas dos principais supermercados da sua região e economize.
            </p>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-semibold mb-6 text-base">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigate('privacy')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('terms')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Termos de Uso
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('cookies')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Política de Cookies
                </button>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-semibold mb-6 text-base">Suporte</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigate('help')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Central de Ajuda
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

           {/* Social Media Column */}
          <div>
            <h4 className="font-semibold mb-6 text-base">Redes Sociais</h4>
            <a 
              href="https://instagram.com/asofertasdaia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group w-fit"
            >
              <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-slate-800 transition-colors">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="text-sm">@asofertasdaia</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-900 text-center">
          <p className="text-slate-500 text-sm">
            © 2025 As Ofertas da IA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};