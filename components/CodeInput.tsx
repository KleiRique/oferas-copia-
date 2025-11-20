import React, { useState } from 'react';
import { Search, ChevronDown, MapPin } from 'lucide-react';

interface SearchCardProps {
  onSearch?: (state: string, city: string) => void;
}

const states = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
];

export const SearchCard: React.FC<SearchCardProps> = ({ onSearch }) => {
  const [selectedState, setSelectedState] = useState('');
  const [city, setCity] = useState('');

  // Verifica se o formulário está válido (ambos os campos preenchidos)
  const isFormValid = selectedState !== '' && city.trim().length > 0;

  const handleSearchClick = () => {
    if (isFormValid && onSearch) {
      onSearch(selectedState, city);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-2 shadow-xl shadow-blue-900/20 max-w-4xl mx-auto mt-12">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* State Input */}
          <div className="space-y-2">
            <label className="text-sm text-slate-500 font-medium ml-1">Estado</label>
            <div className="relative">
              <select 
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-slate-50 hover:bg-slate-100 border-none rounded-xl py-3.5 px-4 text-slate-600 font-medium appearance-none focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer transition-colors"
              >
                <option value="">Selecione o estado</option>
                {states.map((state) => (
                  <option key={state.value} value={state.value}>{state.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* City Input */}
          <div className="space-y-2">
            <label className="text-sm text-slate-500 font-medium ml-1">Cidade</label>
            <div className="relative">
              <input 
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Digite sua cidade..."
                className="w-full bg-slate-50 hover:bg-slate-100 border-none rounded-xl py-3.5 px-4 text-slate-600 font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-colors placeholder:font-normal"
              />
              <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button 
          onClick={handleSearchClick}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg active:scale-[0.99] ${
            isFormValid 
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 cursor-pointer' 
              : 'bg-blue-300 text-white/80 cursor-not-allowed shadow-none'
          }`}
        >
          <Search className="w-5 h-5" />
          Pesquisar Ofertas
        </button>
      </div>
    </div>
  );
};