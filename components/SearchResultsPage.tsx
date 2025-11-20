import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Store, Building2, Loader2, ExternalLink, Globe, CalendarClock, RefreshCw, AlertCircle, FileText, Image as ImageIcon, Coffee, Beer, Sparkles, Apple } from 'lucide-react';
import { searchSupermarketOffers } from '../services/geminiService';
import { SupermarketResult, GroundingSource, ProductOffer } from '../types';

interface SearchResultsPageProps {
  searchLocation?: { state: string; city: string };
  onBack: () => void;
  onViewPlans: () => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ searchLocation, onBack, onViewPlans }) => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<SupermarketResult[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (searchLocation?.city && searchLocation?.state) {
        const data = await searchSupermarketOffers(searchLocation.state, searchLocation.city);
        setResults(data.supermarkets);
        setSources(data.sources);
      } else {
         setError("Localização não informada.");
      }
    } catch (err) {
      console.error(err);
      setError("Ops! Nossos robôs não conseguiram ler os folhetos desta região agora.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center text-center animate-in fade-in duration-500">
          <div className="relative mb-6">
             <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center">
               <ShoppingCart className="w-8 h-8 text-blue-600/80" />
             </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Analisando o Mercado...</h2>
          <p className="text-slate-500 max-w-xs leading-relaxed">
            Identificando os supermercados mais populares em <span className="font-semibold text-blue-600">{searchLocation?.city}</span> e comparando marcas líderes.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 p-8 rounded-2xl max-w-md text-center border border-red-100">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">{error}</h3>
          <p className="text-slate-500 mb-6 text-sm">
            Às vezes os sites dos supermercados estão instáveis ou fora do ar. Tente novamente em alguns instantes.
          </p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={onBack} 
              className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg transition-colors"
            >
              Voltar
            </button>
            <button 
              onClick={fetchData} 
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to generate a Google Search link
  const getMarketLink = (market: SupermarketResult) => {
    if (market.link && market.link.startsWith('http')) {
      return market.link;
    }
    const query = `ofertas folheto ${market.name} ${searchLocation?.city || ''} ${searchLocation?.state || ''}`;
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header / Nav */}
      <div className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-lg cursor-pointer" onClick={onBack}>
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-1.5 rounded-lg shadow-md shadow-blue-500/20">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            As Ofertas da IA
          </div>
          <button 
            onClick={onBack}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
          >
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
            Separamos as ofertas por categoria para facilitar sua economia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {results.map((market, index) => {
             let badgeColor = "bg-slate-100 text-slate-700";
             let iconColor = "text-slate-500";
             let iconBg = "bg-slate-50";
             
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

             // Group products by category
             const groupedProducts = market.products.reduce((acc, product) => {
               const cat = product.category || "Outros";
               if (!acc[cat]) acc[cat] = [];
               acc[cat].push(product);
               return acc;
             }, {} as Record<string, ProductOffer[]>);

             const categoryOrder = ["Mercearia", "Bebidas", "Limpeza", "Hortifruti", "Outros"];

             return (
              <div key={market.id || index} className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 p-6 flex flex-col h-full group">
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center ${iconColor} shadow-sm`}>
                      {market.badgeType === 'CHEAP' ? <ShoppingCart className="w-6 h-6" /> : 
                       market.badgeType === 'MEDIUM' ? <Store className="w-6 h-6" /> : 
                       <Building2 className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 leading-tight">{market.name}</h3>
                      <span className="text-xs text-slate-500">Economia média: {market.savings}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                   <span className={`${badgeColor} text-xs font-bold px-3 py-1 rounded-full`}>
                    {market.badgeText}
                  </span>
                  {market.validity && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-50 px-2 py-1 rounded-md">
                      <CalendarClock className="w-3 h-3" />
                      {market.validity}
                    </div>
                  )}
                </div>

                <div className="space-y-6 mb-8 flex-1">
                  {categoryOrder.map(cat => {
                    if (!groupedProducts[cat]) return null;
                    return (
                      <div key={cat}>
                         <div className="flex items-center gap-2 mb-2">
                            {cat === "Mercearia" && <Coffee className="w-4 h-4 text-amber-600" />}
                            {cat === "Bebidas" && <Beer className="w-4 h-4 text-blue-500" />}
                            {cat === "Limpeza" && <Sparkles className="w-4 h-4 text-purple-500" />}
                            {cat === "Hortifruti" && <Apple className="w-4 h-4 text-red-500" />}
                            {(cat === "Outros" || !["Mercearia", "Bebidas", "Limpeza", "Hortifruti"].includes(cat)) && <FileText className="w-4 h-4 text-slate-400" />}
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{cat}</h4>
                         </div>
                         <div className="space-y-3 pl-2 border-l-2 border-slate-100">
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
                  })}
                </div>

                <a 
                  href={getMarketLink(market)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <ImageIcon className="w-4 h-4" />
                  Visualizar Folheto
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                </a>
              </div>
             );
          })}

        </div>

        {/* Grounding Sources Section */}
        {sources.length > 0 && (
          <div className="mt-12 max-w-4xl mx-auto border-t border-slate-100 pt-8 pb-12">
             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
               <Globe className="w-4 h-4" />
               Fontes dos dados
             </h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
               {sources.map((source, idx) => (
                 <a 
                   key={idx} 
                   href={source.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center justify-between bg-white hover:bg-slate-50 p-3 rounded-lg transition-colors border border-slate-200 group"
                 >
                   <span className="text-sm text-slate-600 truncate pr-4 font-medium">{source.title}</span>
                   <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-blue-500 transition-colors" />
                 </a>
               ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

const ProductRow = ({ name, price, oldPrice, isMedium, isExpensive }: { name: string, price: string, oldPrice?: string, isMedium?: boolean, isExpensive?: boolean }) => {
  let priceColor = "text-emerald-600";
  if (isMedium) priceColor = "text-emerald-700";
  if (isExpensive) priceColor = "text-emerald-800";

  return (
    <div className="border-b border-slate-50 pb-2 last:border-0 last:pb-0">
      <p className="text-sm font-medium text-slate-700 mb-0.5 line-clamp-2 leading-snug">{name}</p>
      <div className="flex items-baseline gap-2">
        <span className={`font-bold text-base ${priceColor}`}>R$ {price}</span>
        {oldPrice && <span className="text-xs text-slate-400 line-through decoration-slate-300">R$ {oldPrice}</span>}
      </div>
    </div>
  );
}