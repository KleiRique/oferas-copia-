import React from 'react';
import { Check } from 'lucide-react';
import { Plan } from '../types';

interface PlanCardProps extends Plan {
  buttonText?: string;
  onSelect: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, price, period, features, isPopular = false, buttonText = "Assinar Agora", onSelect }) => {
  return (
    <div className={`relative bg-white rounded-2xl p-8 flex flex-col h-full transition-all duration-300 ${
      isPopular 
        ? 'border-2 border-blue-600 shadow-xl shadow-blue-900/10 scale-105 z-10' 
        : 'border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
          Mais Popular
        </div>
      )}

      <div className="text-center mb-8 mt-2">
        <h3 className={`text-lg font-medium mb-4 ${isPopular ? 'text-blue-600' : 'text-slate-600'}`}>
          {title}
        </h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-sm text-slate-500 align-top mt-2">R$</span>
          <span className="text-5xl font-bold text-slate-900 tracking-tight">{price}</span>
        </div>
        <p className="text-slate-400 text-sm mt-2">{period}</p>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
            <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${isPopular ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="leading-tight">{feature}</span>
          </li>
        ))}
      </ul>

      <button 
        onClick={onSelect}
        className={`w-full py-3 rounded-xl font-semibold transition-colors duration-200 ${
          isPopular 
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200' 
            : 'bg-slate-900 hover:bg-slate-800 text-white'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

interface PricingSectionProps {
  onSelectPlan: (plan: Plan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const plans: Plan[] = [
    {
      title: "Básico",
      price: "4,90",
      period: "por mês",
      features: [
        "4 consultas mensais",
        "Comparação de 3 supermercados"
      ]
    },
    {
      title: "Premium",
      price: "9,90",
      period: "por mês",
      isPopular: true,
      features: [
        "Comparação ilimitada",
        "Ofertas em tempo real"
      ]
    },
    {
      title: "Anual",
      price: "79,90",
      period: "por ano",
      features: [
        "Tudo do Premium",
        "Economia de 33%"
      ]
    }
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Planos e Preços
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Escolha o plano ideal para começar a economizar hoje mesmo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, idx) => (
            <PlanCard 
              key={idx} 
              {...plan} 
              onSelect={() => onSelectPlan(plan)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm">
            Todos os planos incluem 7 dias de garantia. Cancele quando quiser.
          </p>
        </div>
      </div>
    </section>
  );
};