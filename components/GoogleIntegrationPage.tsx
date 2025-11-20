import React, { useState } from 'react';
import { ArrowLeft, Key, Globe, CheckCircle2, RefreshCw } from 'lucide-react';

interface GoogleIntegrationPageProps {
  onBack: () => void;
}

export const GoogleIntegrationPage: React.FC<GoogleIntegrationPageProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [apiKey, setApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    if (apiKey) {
      // Simulate connection
      setStep(2);
      setTimeout(() => {
        setIsConnected(true);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
        
        {/* Header */}
        <div className="bg-white p-8 border-b border-slate-100 relative">
           <button 
            onClick={onBack}
            className="absolute left-8 top-8 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center mt-2">
             <div className="w-16 h-16 bg-white rounded-full shadow-md mx-auto mb-4 flex items-center justify-center border border-slate-100 p-3">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
             </div>
             <h1 className="text-xl font-bold text-slate-900">Integração Google</h1>
             <p className="text-slate-500 text-sm mt-1">Conecte sua conta para ativar a IA</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {isConnected ? (
            <div className="text-center py-8 animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Conta Conectada!</h2>
              <p className="text-slate-500 mb-8">Sua integração com o Google Gemini está ativa e pronta para uso.</p>
              <button 
                onClick={onBack}
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold"
              >
                Voltar para o App
              </button>
            </div>
          ) : step === 2 ? (
            <div className="text-center py-12">
               <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
               <p className="text-slate-600 font-medium">Verificando credenciais...</p>
            </div>
          ) : (
            <div className="space-y-6">
               <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                 <div className="flex gap-3">
                   <Globe className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                   <p className="text-sm text-blue-800">
                     Para realizar buscas em tempo real, precisamos conectar sua conta ao serviço <strong>Google Gemini API</strong>.
                   </p>
                 </div>
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Chave de API (Opcional)
                  </label>
                  <input 
                    type="text" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Cole sua API Key aqui..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                  />
                  <p className="text-xs text-slate-400">
                    Se não tiver uma chave, nós usaremos a chave de demonstração.
                  </p>
               </div>

               <button 
                  onClick={() => {
                    if (!apiKey) setApiKey('demo-key'); // Force connect for demo
                    handleConnect();
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.99]"
                >
                  Conectar Conta Google
                </button>
            </div>
          )}
          
        </div>

        {!isConnected && (
          <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
            <p className="text-xs text-slate-400">
              Ao conectar, você aceita os termos de serviço da Google Cloud Platform.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};