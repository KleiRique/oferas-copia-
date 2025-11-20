import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchCard } from './components/CodeInput';
import { BlogSection } from './components/BlogSection';
import { AdsBanner } from './components/AdsBanner';
import { Footer } from './components/Footer';
import { CheckoutPage } from './components/CheckoutPage';
import { BlogPostPage } from './components/BlogPostPage';
import { SubscriptionStatusPage } from './components/SubscriptionStatusPage';
import { LoginPage } from './components/LoginPage';
import { PartnershipPage } from './components/PartnershipPage';
import { SearchResultsPage } from './components/SearchResultsPage';
import { GoogleIntegrationPage } from './components/GoogleIntegrationPage';
import { LegalPage, LegalPageContent } from './components/LegalPage';
import { GoogleLoginCTA } from './components/GoogleLoginCTA';
import { Check, Shield, FileText, Cookie, HelpCircle, Mail, ShoppingCart } from 'lucide-react';
import { Plan, BlogPost } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'checkout' | 'blog-post' | 'subscription-status' | 'login' | 'partnerships' | 'legal' | 'search-results' | 'google-integration'>('landing');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [legalContent, setLegalContent] = useState<LegalPageContent | null>(null);
  
  // User State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  // Search State
  const [searchLocation, setSearchLocation] = useState({ state: '', city: '' });

  // Navigation Handlers
  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setCurrentPage('checkout');
    window.scrollTo(0, 0);
  };

  const handleSelectBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setCurrentPage('blog-post');
    window.scrollTo(0, 0);
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    setSelectedBlogPost(null);
    window.scrollTo(0, 0);
  };

  const handleSearch = (state: string, city: string) => {
    setSearchLocation({ state, city });
    setCurrentPage('search-results');
    window.scrollTo(0, 0);
  };

  const handlePartnershipClick = () => {
    setCurrentPage('partnerships');
    window.scrollTo(0, 0);
  };

  const handleFooterNavigate = (page: string) => {
    const contentMap: Record<string, LegalPageContent> = {
      'privacy': {
        type: 'privacy',
        title: 'Política de Privacidade',
        icon: <Shield className="w-8 h-8 text-emerald-400" />,
        content: (
          <div className="space-y-6 text-slate-600">
            <p>A sua privacidade é importante para nós. É política do "As Ofertas da IA" respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site As Ofertas da IA, e outros sites que possuímos e operamos.</p>
            <h3 className="text-xl font-bold text-slate-800">1. Informações que coletamos</h3>
            <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>
            <h3 className="text-xl font-bold text-slate-800">2. Uso de dados</h3>
            <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
            <h3 className="text-xl font-bold text-slate-800">3. Compartilhamento</h3>
            <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
          </div>
        )
      },
      'terms': {
        type: 'terms',
        title: 'Termos de Uso',
        icon: <FileText className="w-8 h-8 text-blue-400" />,
        content: (
          <div className="space-y-6 text-slate-600">
            <h3 className="text-xl font-bold text-slate-800">1. Termos</h3>
            <p>Ao acessar ao site As Ofertas da IA, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.</p>
            <h3 className="text-xl font-bold text-slate-800">2. Uso de Licença</h3>
            <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site As Ofertas da IA , apenas para visualização transitória pessoal e não comercial.</p>
            <h3 className="text-xl font-bold text-slate-800">3. Isenção de responsabilidade</h3>
            <p>Os materiais no site da As Ofertas da IA são fornecidos 'como estão'. As Ofertas da IA não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias.</p>
          </div>
        )
      },
      'cookies': {
        type: 'cookies',
        title: 'Política de Cookies',
        icon: <Cookie className="w-8 h-8 text-amber-400" />,
        content: (
          <div className="space-y-6 text-slate-600">
            <p>Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar sua experiência.</p>
            <h3 className="text-xl font-bold text-slate-800">Cookies que definimos</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Cookies relacionados à conta:</strong> Se você criar uma conta conosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral.</li>
              <li><strong>Cookies relacionados ao login:</strong> Utilizamos cookies quando você está logado, para que possamos lembrar dessa ação. Isso evita que você precise fazer login sempre que visitar uma nova página.</li>
              <li><strong>Cookies relacionados a formulários:</strong> Quando você envia dados por meio de um formulário como os encontrados nas páginas de contato, os cookies podem ser configurados para lembrar os detalhes do usuário para correspondência futura.</li>
            </ul>
          </div>
        )
      },
      'help': {
        type: 'help',
        title: 'Central de Ajuda',
        icon: <HelpCircle className="w-8 h-8 text-purple-400" />,
        content: (
          <div className="space-y-6 text-slate-600">
            <h3 className="text-xl font-bold text-slate-800">Perguntas Frequentes</h3>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-1">Como cancelo minha assinatura?</h4>
                <p>Você pode cancelar sua assinatura a qualquer momento acessando a página "Conta" e clicando em "Gerenciar Assinatura".</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-1">Os preços são atualizados com que frequência?</h4>
                <p>Nossos robôs de IA verificam os preços diariamente. O plano Premium oferece atualizações em tempo real.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-1">Funciona em qualquer cidade?</h4>
                <p>Atualmente operamos nas principais capitais e regiões metropolitanas do Brasil. Estamos expandindo constantemente.</p>
              </div>
            </div>
          </div>
        )
      },
      'contact': {
        type: 'contact',
        title: 'Contato',
        icon: <Mail className="w-8 h-8 text-indigo-400" />,
        content: (
          <div className="space-y-6 text-slate-600">
            <p>Estamos aqui para ajudar! Se você tiver alguma dúvida, sugestão ou problema, entre em contato conosco pelos canais abaixo.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="border border-slate-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors">
                <h3 className="font-bold text-slate-900 mb-2">Suporte Geral</h3>
                <p className="text-sm mb-4">Para dúvidas sobre sua conta ou uso do app.</p>
                <a href="mailto:suporte@asofertasdaia.com.br" className="text-blue-600 font-bold hover:underline">suporte@asofertasdaia.com.br</a>
              </div>
              <div className="border border-slate-200 rounded-xl p-6 text-center hover:border-purple-300 transition-colors">
                <h3 className="font-bold text-slate-900 mb-2">Parcerias</h3>
                <p className="text-sm mb-4">Para supermercados e anunciantes.</p>
                <a href="mailto:parcerias@asofertasdaia.com.br" className="text-purple-600 font-bold hover:underline">parcerias@asofertasdaia.com.br</a>
              </div>
            </div>
          </div>
        )
      }
    };

    const content = contentMap[page];
    if (content) {
      setLegalContent(content);
      setCurrentPage('legal');
      window.scrollTo(0, 0);
    }
  };

  const handleSubscriptionSuccess = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
    
    // Calculate expiry date
    const date = new Date();
    if (selectedPlan?.period.includes('ano')) {
      date.setFullYear(date.getFullYear() + 1);
    } else {
      date.setDate(date.getDate() + 30);
    }
    
    // Format for Brazil locale
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);

    setExpiryDate(formattedDate);
    setCurrentPage('subscription-status');
    window.scrollTo(0, 0);
  };

  const handleLoginClick = () => {
    setCurrentPage('login');
    window.scrollTo(0, 0);
  };

  const handleGoogleLogin = () => {
    setCurrentPage('google-integration');
    window.scrollTo(0, 0);
  };

  const handleAccountClick = () => {
    if (isLoggedIn) {
      // If logged in but no plan selected, mock a free plan for display
      if (!selectedPlan) {
        setSelectedPlan({
          title: "Plano Gratuito",
          price: "0,00",
          period: "vitalício",
          features: ["Consultas limitadas"]
        });
        setExpiryDate("Indeterminado");
        if (!userName) setUserName("Visitante");
      }
      setCurrentPage('subscription-status');
    } else {
      setCurrentPage('login');
    }
    window.scrollTo(0, 0);
  };

  const handlePerformLogin = (email: string) => {
    setIsLoggedIn(true);
    // Simulate getting name from email
    const simulatedName = email.split('@')[0];
    setUserName(simulatedName.charAt(0).toUpperCase() + simulatedName.slice(1));
    
    // Redirect to home after login
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Header is hidden on specific full-screen pages like Login or Status to focus attention, 
          but shown on others.
      */}
      {currentPage !== 'login' && currentPage !== 'subscription-status' && currentPage !== 'google-integration' && (
        <Header onLogin={handleLoginClick} onAccount={handleAccountClick} />
      )}

      {currentPage === 'landing' && (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 relative overflow-hidden">
            {/* Watermark Logo */}
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
              <ShoppingCart className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] text-white opacity-10 transform -rotate-3" />
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative z-10">
              <div className="text-center space-y-6 mb-12">
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-sm">
                  Encontre as Melhores<br />
                  Ofertas da Semana
                </h1>
                <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                  Compare preços dos principais supermercados da sua cidade e economize nas suas compras com inteligência artificial.
                </p>
              </div>

              {/* Search Card Component */}
              <SearchCard onSearch={handleSearch} />

              {/* Features / Trust Signals */}
              <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12">
                <FeatureItem text="Atualizado semanalmente" />
                <FeatureItem text="Comparação em tempo real" />
                <FeatureItem text="Sem taxas escondidas" />
              </div>
            </div>
          </section>

          {/* Google Login CTA Section (Replaces Pricing) */}
          <GoogleLoginCTA onGoogleLogin={handleGoogleLogin} />

          {/* Blog Section */}
          <BlogSection onReadPost={handleSelectBlogPost} />

          {/* Ads Banner Section */}
          <AdsBanner onPartnerClick={handlePartnershipClick} />

          {/* Footer */}
          <Footer onNavigate={handleFooterNavigate} />
          
          {/* Help Button (Floating) */}
          <button className="fixed bottom-6 right-6 bg-slate-900 hover:bg-slate-800 text-white w-12 h-12 rounded-full shadow-lg transition-colors z-50 flex items-center justify-center" aria-label="Ajuda">
            <span className="text-xl font-bold">?</span>
          </button>
        </>
      )}

      {currentPage === 'login' && (
        <LoginPage 
          onLogin={handlePerformLogin}
          onGoogleLogin={handleGoogleLogin}
          onBack={handleBackToLanding}
        />
      )}

      {currentPage === 'google-integration' && (
        <GoogleIntegrationPage onBack={handleBackToLanding} />
      )}

      {currentPage === 'checkout' && selectedPlan && (
        <CheckoutPage 
          plan={selectedPlan} 
          onBack={handleBackToLanding}
          onSuccess={handleSubscriptionSuccess}
        />
      )}

      {currentPage === 'blog-post' && selectedBlogPost && (
        <BlogPostPage 
          post={selectedBlogPost}
          onBack={handleBackToLanding}
        />
      )}

      {currentPage === 'partnerships' && (
        <PartnershipPage onBack={handleBackToLanding} />
      )}

      {currentPage === 'subscription-status' && selectedPlan && (
        <SubscriptionStatusPage 
          plan={selectedPlan}
          userName={userName}
          expiryDate={expiryDate}
          onHome={handleBackToLanding}
        />
      )}

      {currentPage === 'legal' && legalContent && (
        <LegalPage 
          data={legalContent}
          onBack={handleBackToLanding}
        />
      )}

      {currentPage === 'search-results' && (
        <SearchResultsPage 
          searchLocation={searchLocation}
          onBack={handleBackToLanding}
          onViewPlans={handleBackToLanding}
        />
      )}
    </div>
  );
}

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="bg-blue-500 rounded-full p-1">
      <Check className="w-3 h-3 text-white stroke-[3]" />
    </div>
    <span className="text-white font-medium text-sm md:text-base shadow-black/5 drop-shadow-sm">
      {text}
    </span>
  </div>
);