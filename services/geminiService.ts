import { GoogleGenAI } from "@google/genai";
import { SupermarketResult, ProductOffer, GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to parse JSON safely
const parseJSON = (text: string) => {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  throw new Error("Invalid JSON format");
};

// STEP 1: Fast discovery of supermarkets
export const findSupermarkets = async (state: string, city: string): Promise<{ supermarkets: SupermarketResult[] }> => {
  const prompt = `
    TAREFA CRÍTICA: Identifique os 3 Supermercados MAIS POPULARES e MAIS PESQUISADOS em ${city}, ${state}.
    
    CRITÉRIOS DE SELEÇÃO:
    1. ALTA RELEVÂNCIA: Devem ser as redes onde a maioria da população local faz compras (Líderes de Mercado).
    2. PRESENÇA DIGITAL: Devem ter encartes online, site ou app (essencial para capturar preços).
    3. EXCLUA: Mercadinhos de bairro desconhecidos ou sem site.
    
    Exemplos de redes nacionais e regionais fortes a considerar (se atuarem na cidade): Carrefour, Assaí, Atacadão, Pão de Açúcar, Grupo Mateus, Supermercados BH, Condor, Zaffari, Angeloni, Savegnago, etc.
    
    Retorne APENAS JSON com nomes e IDs.
    
    JSON:
    {
      "supermarkets": [
        { "id": "1", "name": "Nome do Líder de Mercado 1", "products": [] },
        { "id": "2", "name": "Nome do Líder de Mercado 2", "products": [] },
        { "id": "3", "name": "Nome do Líder de Mercado 3", "products": [] }
      ]
    }
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: { tools: [{ googleSearch: {} }] },
  });

  const parsed = parseJSON(response.text || "{}");
  return { supermarkets: parsed.supermarkets || [] };
};

// STEP 2: Detailed fetch for a single supermarket (Parallelizable)
export const getSupermarketDetails = async (marketName: string, state: string, city: string): Promise<Partial<SupermarketResult>> => {
  try {
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
      - NUNCA retorne lista vazia. O usuário prefere um preço regular a "indisponível".
      
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
      
      * badgeType pode ser CHEAP (se tiver muitas ofertas), MEDIUM ou EXPENSIVE.
      * Formato Preço: "00,00".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { tools: [{ googleSearch: {} }] },
    });

    const parsed = parseJSON(response.text || "{}");
    
    // Validar se veio vazio e tentar um fallback manual simples se necessário
    if (!parsed.products || parsed.products.length === 0) {
       // Se falhar, tenta uma segunda chance pedindo explicitamente "preço regular"
       throw new Error("Lista vazia retornada pela IA");
    }

    return parsed;
  } catch (error) {
    console.error(`Error fetching details for ${marketName}:`, error);
    // Return fallback data indicating unavailability but keeping the card structure
    return {
      badgeType: 'MEDIUM',
      badgeText: 'Verificar no Site',
      savings: '-',
      products: [],
      validity: 'Indisponível'
    };
  }
};

// Legacy function kept for compatibility
export const searchSupermarketOffers = async (state: string, city: string) => {
  return { supermarkets: [], sources: [] };
};