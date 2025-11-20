import { SupermarketResult } from "../types";

// This service now acts as a client-side fetcher calling your Vercel Backend (api/search)

export const findSupermarkets = async (state: string, city: string): Promise<{ supermarkets: SupermarketResult[] }> => {
  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'find',
        state,
        city
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error finding supermarkets:", error);
    return { supermarkets: [] };
  }
};

export const getSupermarketDetails = async (marketName: string, state: string, city: string): Promise<Partial<SupermarketResult>> => {
  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'details',
        state,
        city,
        marketName
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching details for ${marketName}:`, error);
    return {
      badgeType: 'MEDIUM',
      badgeText: 'Verificar no Site',
      savings: '-',
      products: [],
      validity: 'Indisponível'
    };
  }
};

export const searchSupermarketOffers = async (state: string, city: string) => {
  return { supermarkets: [], sources: [] };
};