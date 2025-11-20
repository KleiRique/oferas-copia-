import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ShoppingCart, Store, Building2, Loader2, ExternalLink, Globe, CalendarClock, RefreshCw, AlertCircle, FileText, Image as ImageIcon, Coffee, Beer, Sparkles, Apple } from 'lucide-react';
import { findSupermarkets, getSupermarketDetails } from '../services/geminiService';
import { SupermarketResult, GroundingSource, ProductOffer } from '../types';

interface SearchResultsPageProps {
  searchLocation?: { state: string; city: string };
  onBack: () => void;
  onViewPlans: () => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ searchLocation, onBack, onViewPlans }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [results, setResults] = useState<SupermarketResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  const startSearch = async () => {
    if (!searchLocation?.city || !searchLocation?.state) {
      setError("Localização inválida.");
      setInitialLoading(false);
      return;
    }

    try {
      setInitialLoading(true);
      setError(null);

      // Phase 1: Quick Discovery
      const { supermarkets } = await findSupermarkets(searchLocation.state, searchLocation.city);
      
      if (supermarkets.length === 0) {
        throw new Error("Nenhum supermercado encontrado.");
      }

      // Set initial "Skeleton" state for these markets
      const marketsWithLoading = supermarkets.map(m => ({
        ...m,
        products: [],
        isLoading: true,
        badgeType: 'MEDIUM' as const,
        badgeText: 'Analisando...',
        savings: '...'
      }));
      
      setResults(marketsWithLoading);
      setInitialLoading(false); // Stop main spinner, switch to card skeletons

      // Phase 2: Parallel Detail Fetching
      marketsWithLoading.forEach(async (market) => {
        const details = await getSupermarketDetails(market.name, searchLocation.state, searchLocation.city);
        
        setResults(prev => prev.map(p => {
          if (p.id === market.id) {
            return {
              ...p,
              ...details,
              // Fallback logic for badge if AI misses it
              badgeType: details.badgeType || 'MEDIUM',
              badgeText: details.badgeText || 'Preço Médio',
              isLoading: false
            };
          }
          return p;
        }));
      });

    } catch (err) {
      console.error(err);
      setError("Não foi possível conectar aos mercados locais.");
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      startSearch();
    }
  }, [searchLocation]);

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center text-center animate-in fade-in duration-500">
          <div className="relative mb-6">
             <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center">
               <ShoppingCart className="w-8 h-8 text-blue-600/80" />
             </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Identificando os Mais Populares...</h2>
          <p className="text-slate-500 max-w-xs leading-relaxed">
            Buscando os supermercados mais pesquisados em <span className="font-semibold text-blue-600">{searchLocation?.city}</span>.
          </p>
        </div>
      </div>
    );
  }

  if (error && results.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 p-8 rounded-2xl max-w-md text-center border border-red-100">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">{error}</h3>
          <div className="flex gap-3 justify-center mt-6">
            <button onClick={onBack} className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg transition-colors">
              Voltar
            </button>
            <button onClick={() => { initialized.current = false; startSearch(); }} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getMarketLink = (market: SupermarketResult) => {
    if (market.link && market.link.startsWith('http')) return market.link;
    const query = `ofertas folheto ${market.name} ${searchLocation?.city || ''} ${searchLocation?.state || ''}`;
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  };

  const ProductSkeleton = () => (
    <div className="space-y-4 animate-pulse">
       {[1, 2, 3, 4].map(i => (
         <div key={i} className="border-b border-slate-50 pb-3">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-slate-200 rounded w-1/3"></div>
         </div>
       ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-lg cursor-pointer" onClick={onBack}>
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-1.5 rounded-lg shadow-md shadow-blue-500/20">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            As Ofertas da IA
          </div>
          <button onClick={onBack} className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Comparativo em {searchLocation?.city}
          </h1>
          <p className="text-slate-500 text-lg">
            Comparando as principais redes em tempo real
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {results.map((market, index) => {
             const isLoading = market.isLoading;

             let badgeColor = "bg-slate-100 text-slate-700";
             let iconColor = "text-slate-500";
             let iconBg = "bg-slate-50";
             
             if (!isLoading) {
               if (market.badgeType === 'CHEAP') {
                 badgeColor = "bg-emerald-100 text-emerald-700";
                 iconColor = "text-emerald-600";
                 iconBg = "bg-emerald-50";
               } else if (market.badgeType === 'MEDIUM') {
                 badgeColor = "bg-amber-100 text-amber-700";
                 iconColor = "text-amber-600";
                 iconBg = "bg-amber-50";
               } else {
                 badgeColor = "bg-red-100 text-red-700";
                 iconColor = "text-red-500";
                 iconBg = "bg-red-50";
               }
             }

             const groupedProducts = market.products.reduce((acc, product) => {
               const cat = product.category || "Outros";
               if (!acc[cat]) acc[cat] = [];
               acc[cat].push(product);
               return acc;
             }, {} as Record<string, ProductOffer[]>);

             const categoryOrder = ["Mercearia", "Bebidas", "Limpeza", "Hortifruti"];

             return (
              <div key={market.id || index} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 p-6 flex flex-col h-full">
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4 w-full">
                    <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center ${iconColor} shadow-sm flex-shrink-0 transition-colors duration-500`}>
                      {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-slate-400" /> : 
                       (market.badgeType === 'CHEAP' ? <ShoppingCart className="w-6 h-6" /> : 
                        market.badgeType === 'MEDIUM' ? <Store className="w-6 h-6" /> : 
                        <Building2 className="w-6 h-6" />)}
                    </div>
                    <div className="w-full">
                      <h3 className="font-bold text-xl text-slate-900 leading-tight truncate">{market.name}</h3>
                      {isLoading ? (
                        <div className="h-4 bg-slate-100 rounded w-24 mt-1 animate-pulse"></div>
                      ) : (
                        <span className="text-sm text-slate-500">Economia média: {market.savings}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  {isLoading ? (
                     <div className="h-6 bg-slate-100 rounded-full w-20 animate-pulse"></div>
                  ) : (
                     <span className={`${badgeColor} text-sm font-bold px-3 py-1 rounded-full transition-colors duration-500`}>
                      {market.badgeText}
                    </span>
                  )}
                  
                  {market.validity && !isLoading && (
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium bg-slate-50 px-2 py-1 rounded-md">
                      <CalendarClock className="w-3.5 h-3.5" />
                      {market.validity}
                    </div>
                  )}
                </div>

                <div className="space-y-8 mb-8 flex-1 min-h-[300px]">
                  {isLoading ? (
                    <ProductSkeleton />
                  ) : (
                    categoryOrder.map(cat => {
                      if (!groupedProducts[cat]) return null;
                      return (
                        <div key={cat} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                           <div className="flex items-center gap-2 mb-3">
                              {cat === "Mercearia" && <Coffee className="w-5 h-5 text-amber-600" />}
                              {cat === "Bebidas" && <Beer className="w-5 h-5 text-blue-500" />}
                              {cat === "Limpeza" && <Sparkles className="w-5 h-5 text-purple-500" />}
                              {cat === "Hortifruti" && <Apple className="w-5 h-5 text-red-500" />}
                              <h4 className="text-sm font-bold text-slate-600 uppercase tracking-wider">{cat}</h4>
                           </div>
                           <div className="space-y-4 pl-2 border-l-2 border-slate-100">
                              {groupedProducts[cat].map((prod, idx) => (
                                <ProductRow 
                                  key={idx}
                                  name={prod.name}
                                  price={prod.price}
                                  oldPrice={prod.oldPrice}
                                  isMedium={market.badgeType === 'MEDIUM'}
                                  isExpensive={market.badgeType === 'EXPENSIVE'}
                                />
                              ))}
                           </div>
                        </div>
                      )
                    })
                  )}
                  {!isLoading && market.products.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                      <AlertCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p>Ofertas indisponíveis online.</p>
                    </div>
                  )}
                </div>

                <a 
                  href={getMarketLink(market)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group/btn text-base ${isLoading ? 'bg-slate-100 text-slate-400 cursor-wait' : 'bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700'}`}
                >
                  <ImageIcon className="w-5 h-5" />
                  Visualizar Folheto
                  {!isLoading && <ExternalLink className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 transition-opacity" />}
                </a>
              </div>
             );
          })}
        </div>
      </div>
    </div>
  );
};

interface ProductRowProps {
  name: string;
  price: string;
  oldPrice?: string;
  isMedium?: boolean;
  isExpensive?: boolean;
}

const ProductRow: React.FC<ProductRowProps> = ({ name, price, oldPrice, isMedium, isExpensive }) => {
  let priceColor = "text-emerald-600";
  if (isMedium) priceColor = "text-emerald-700";
  if (isExpensive) priceColor = "text-emerald-800";

  return (
    <div className="border-b border-slate-50 pb-3 last:border-0 last:pb-0">
      <p className="text-base font-medium text-slate-700 mb-1 line-clamp-2 leading-snug">{name}</p>
      <div className="flex items-baseline gap-2">
        <span className={`font-bold text-lg ${priceColor}`}>R$ {price}</span>
        {oldPrice && <span className="text-sm text-slate-400 line-through decoration-slate-300">R$ {oldPrice}</span>}
      </div>
    </div>
  );
}