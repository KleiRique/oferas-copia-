import React from 'react';

interface AdsBannerProps {
  onPartnerClick?: () => void;
}

export const AdsBanner: React.FC<AdsBannerProps> = ({ onPartnerClick }) => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-3xl p-12 md:py-20 text-center shadow-2xl shadow-fuchsia-500/20 relative overflow-hidden">
          {/* Decorative blurred circles background */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-900 opacity-10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
            <div className="space-y-2">
              <p className="text-white/80 text-sm font-bold tracking-[0.2em] uppercase">
                Espaço Publicitário
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm">
                Anuncie Aqui
              </h2>
            </div>
            
            <p className="text-white/95 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm">
              Alcance milhares de pessoas que buscam economizar nas compras de supermercado
            </p>

            <button 
              onClick={onPartnerClick}
              className="bg-white text-fuchsia-600 hover:bg-fuchsia-50 transition-all transform hover:scale-105 px-8 py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl"
            >
              Parcerias
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};