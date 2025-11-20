import { GoogleGenAI } from "@google/genai";

// Initialize Gemini on the server side (Node.js environment)
// Vercel automatically injects process.env.API_KEY safely here
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to parse JSON safely from AI response
const parseJSON = (text: string) => {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error("JSON Parse Error on Server:", e);
      return {};
    }
  }
  return {};
};

export default async function handler(req: any, res: any) {
  // Enable CORS for local testing and production
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { action, state, city, marketName } = req.body;

  if (!state || !city) {
    return res.status(400).json({ error: "Missing city or state" });
  }

  try {
    // ACTION 1: FIND SUPERMARKETS
    if (action === 'find') {
      const prompt = `
        TAREFA CRÍTICA: Identifique os 3 Supermercados MAIS POPULARES e MAIS PESQUISADOS em ${city}, ${state}.
        
        CRITÉRIOS DE SELEÇÃO:
        1. ALTA RELEVÂNCIA: Devem ser as redes onde a maioria da população local faz compras (Líderes de Mercado).
        2. PRESENÇA DIGITAL: Devem ter encartes online, site ou app (essencial para capturar preços).
        3. EXCLUA: Mercadinhos de bairro desconhecidos ou sem site.
        
        Retorne APENAS JSON com nomes e IDs.
        
        JSON:
        {
          "supermarkets": [
            { "id": "1", "name": "Nome do Mercado 1", "products": [] },
            { "id": "2", "name": "Nome do Mercado 2", "products": [] },
            { "id": "3", "name": "Nome do Mercado 3", "products": [] }
          ]
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { tools: [{ googleSearch: {} }] },
      });

      const parsed = parseJSON(response.text || "{}");
      return res.status(200).json({ supermarkets: parsed.supermarkets || [] });
    }

    // ACTION 2: GET DETAILS
    if (action === 'details' && marketName) {
      const today = new Date();
      const todayStr = today.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

      const prompt = `
        DATA DE HOJE: ${todayStr}. LOCAL: ${city}, ${state}.
        MERCADO ALVO: ${marketName}.
        
        TAREFA: Encontrar preços atuais para preencher a tabela comparativa.
        
        FONTES DE BUSCA PRIORITÁRIAS:
        1. Folhetos de ofertas da semana (${todayStr}) ou Tablóides Digitais.
        2. Site oficial ou App de Delivery do ${marketName}.
        3. Sites de comparação (ex: Tiendeo, AondeConvem).
        
        LISTA DE COMPRAS OBRIGATÓRIA (Busque Marcas Conhecidas):
        1. Mercearia: Arroz 5kg (Tipo 1) OU Feijão 1kg OU Café 500g.
        2. Bebidas: Cerveja (lata/garrafa) OU Refrigerante 2L.
        3. Limpeza: Sabão em pó (caixa) OU Detergente líquido.
        4. Hortifruti: Batata (kg) OU Tomate (kg) OU Banana (kg).
        
        REGRAS DE PREENCHIMENTO (FALHA ZERO):
        - OBRIGATÓRIO: Se não encontrar a oferta promocional, PEGUE O PREÇO REGULAR no site.
        - SUBSTITUIÇÃO: Se não tiver a marca específica, pegue a marca destaque da categoria.
        - NUNCA retorne lista vazia.
        
        Retorne APENAS JSON:
        {
          "badgeType": "MEDIUM",
          "badgeText": "Preços Verificados", 
          "savings": "Verificar",
          "validity": "Válido hoje",
          "link": "Link da fonte encontrada",
          "products": [
            { "category": "Mercearia", "name": "Marca + Produto + Peso", "price": "00,00", "oldPrice": "00,00" }
          ]
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { tools: [{ googleSearch: {} }] },
      });

      const parsed = parseJSON(response.text || "{}");
      
      // Fallback simple object if empty
      if (!parsed.products || parsed.products.length === 0) {
         return res.status(200).json({
            badgeType: 'MEDIUM',
            badgeText: 'Verificar no Site',
            savings: '-',
            products: [],
            validity: 'Indisponível'
         });
      }

      return res.status(200).json(parsed);
    }

    return res.status(400).json({ error: "Invalid action" });

  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}