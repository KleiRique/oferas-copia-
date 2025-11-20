import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1580913428706-c311ab527ebc?auto=format&fit=crop&q=80&w=800", // Shopping carts
    category: "Dicas",
    date: "15 Nov 2025",
    title: "Como Economizar até 40% nas Compras do Mês",
    excerpt: "Descubra estratégias inteligentes para reduzir o valor da sua conta do supermercado sem abrir mão da qualidade.",
    content: (
      <>
        <p className="mb-4">
          Economizar no supermercado não significa apenas comprar as marcas mais baratas. Trata-se de planejar e usar a inteligência a seu favor.
        </p>
        <h3 className="text-lg font-bold text-slate-800 mb-2">1. Faça uma lista (e siga-a!)</h3>
        <p className="mb-4">
          Parece óbvio, mas ir ao mercado sem lista é o erro número um. Nossa IA ajuda você a montar listas baseadas no que está em oferta real na sua região, evitando compras por impulso.
        </p>
        <h3 className="text-lg font-bold text-slate-800 mb-2">2. Evite horários de pico</h3>
        <p className="mb-4">
          Fazer compras com pressa ou em horários lotados aumenta a ansiedade e a chance de pegar o primeiro item que vê pela frente.
        </p>
        <h3 className="text-lg font-bold text-slate-800 mb-2">3. Compare preços unitários</h3>
        <p>
          Muitas vezes o pacote maior não é o mais barato. Sempre verifique o preço por quilo ou litro, uma funcionalidade que nosso app calcula automaticamente para você.
        </p>
      </>
    )
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800", // Fresh produce
    category: "Guias",
    date: "12 Nov 2025",
    title: "Os Melhores Dias para Ir ao Supermercado",
    excerpt: "Saiba quais são os dias da semana com mais promoções e como aproveitar as ofertas relâmpago.",
    content: (
      <>
        <p className="mb-4">
          Você sabia que cada dia da semana tem um tipo específico de oferta nos grandes supermercados? Saber o dia certo de ir pode representar uma economia gigante no final do mês.
        </p>
        <h3 className="text-lg font-bold text-slate-800 mb-2">Terça e Quarta: Hortifruti</h3>
        <p className="mb-4">
          Tradicionalmente, os dias de feira nos supermercados. É quando chegam as reposições frescas de frutas e legumes e os preços tendem a cair para evitar perdas.
        </p>
        <h3 className="text-lg font-bold text-slate-800 mb-2">Quinta e Sexta: Carnes e Bebidas</h3>
        <p className="mb-4">
          Preparando para o churrasco do fim de semana, os mercados costumam baixar o preço das carnes nesses dias para atrair o consumidor que fará a compra grande.
        </p>
        <p>
          Use nosso aplicativo para configurar alertas. Assim, quando o seu item favorito entrar em promoção relâmpago, você será o primeiro a saber!
        </p>
      </>
    )
  }
];

interface BlogSectionProps {
  onReadPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onReadPost }) => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Blog e Dicas
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Confira nossos artigos e aprenda a economizar ainda mais
          </p>
        </div>

        {/* Grid - Centered 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {post.category}
                  </span>
                  <span className="text-slate-400 text-sm">
                    {post.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>

                <button 
                  onClick={() => onReadPost(post)}
                  className="flex items-center gap-2 text-blue-600 font-semibold text-sm group/btn w-fit"
                >
                  Ler mais 
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};