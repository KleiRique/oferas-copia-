import { GoogleGenAI } from "@google/genai";
import { SearchResponse, SupermarketResult, GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchSupermarketOffers = async (state: string, city: string): Promise<SearchResponse> => {
  try {
    // Injetar a data atual para que a IA possa calcular datas relativas
    const today = new Date();
    const todayStr = today.toLocaleDateString('pt-BR');
    
    const prompt = `
      DATA DE HOJE: ${todayStr}.
      LOCALIZAÇÃO: ${city}, ${state}.
      
      Atue como um motor de busca de ofertas de varejo extremamente resiliente.
      
      MISSÃO CRÍTICA:
      Encontrar ofertas reais em 3 supermercados locais. NÃO PODE FALHAR.
      
      PASSO A PASSO:
      1. Encontre 3 grandes supermercados em ${city} com folhetos online recentes.
      2. Para CADA mercado, você DEVE encontrar pelo menos 1 produto para cada uma das 4 categorias abaixo.
      
      CATEGORIAS OBRIGATÓRIAS:
      1. Mercearia (Ex: Arroz 5kg, Café 500g, Feijão 1kg - o que estiver em destaque)
      2. Bebidas (Ex: Cerveja, Refrigerante ou Suco)
      3. Limpeza (Ex: Sabão em pó, Amaciante ou Detergente)
      4. Hortifruti (Ex: O item de sacolão mais barato da capa)
      
      REGRAS DE OURO (ANTI-ERRO):
      - PREENCHIMENTO OBRIGATÓRIO: Se não encontrar "Arroz Camil", PEQUE QUALQUER ARROZ QUE ESTEJA NO FOLHETO.
      - NUNCA retorne "Preço indisponível" ou "Não encontrado". Se o mercado existe, ele vende arroz. Encontre o preço do arroz dele.
      - PARIDADE PREFERENCIAL, NÃO OBRIGATÓRIA: Tente comparar marcas iguais, mas se não der, compare "Arroz X" com "Arroz Y". O importante é ter o preço.
      - NOME DO PRODUTO: Sempre inclua a MARCA e o PESO/MEDIDA (Ex: "Arroz Tio João 5kg").
      
      Estrutura de Saída (JSON JSON APENAS):
      {
        "supermarkets": [
          {
            "id": "1",
            "name": "Nome do Mercado",
            "badgeType": "CHEAP", 
            "badgeText": "Melhor Preço",
            "savings": "Estimativa %",
            "validity": "Validade encontrada",
            "link": "Link direto ou de busca",
            "products": [
              { "category": "Mercearia", "name": "Arroz [Marca] 5kg", "price": "00,00", "oldPrice": "00,00" }
            ]
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    let jsonText = response.text || "";
    
    // 1. Robust JSON Extraction
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    } else {
      jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '');
      if (!jsonText.trim().startsWith('{')) {
         console.error("Raw response invalid:", jsonText);
         // Fallback manual para evitar erro fatal na UI
         throw new Error("Não foi possível ler as ofertas. Tente novamente.");
      }
    }
    
    let parsedData: { supermarkets: SupermarketResult[] };
    try {
      parsedData = JSON.parse(jsonText);
    } catch (e) {
      console.error("JSON Parse Error. Text:", jsonText);
      throw new Error("Erro ao processar os dados. Tente novamente.");
    }

    // 2. Extract Sources (Grounding)
    const sources: GroundingSource[] = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || "Fonte Web",
            url: chunk.web.uri
          });
        }
      });
    }

    return {
      supermarkets: parsedData.supermarkets || [],
      sources: sources
    };

  } catch (error) {
    console.error("Gemini Search Service Error:", error);
    throw error;
  }
};