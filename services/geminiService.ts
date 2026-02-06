import { GoogleGenAI, Chat } from "@google/genai";
import { MOCK_PRODUCTS } from "../constants";

let aiInstance: GoogleGenAI | null = null;

// Initialize AI lazily to ensure environment variables are ready if simulated
const getAI = () => {
  if (!aiInstance) {
    // Note: In a real production app, ensure your API key is secure.
    // For this generated code, we rely on process.env.API_KEY being injected.
    aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiInstance;
};

export const createShoppingAssistantChat = (): Chat => {
  const ai = getAI();
  
  const systemInstruction = `
    Vous êtes Alex, l'assistant virtuel expert de RS Phone.
    Votre rôle est d'aider les clients à choisir des téléphones et accessoires vendus par RS Phone.
    Soyez courtois, concis, professionnel et utile. Répondez toujours en français.
    
    Voici le catalogue actuel des produits (utilisez ces informations pour répondre de manière précise) :
    ${JSON.stringify(MOCK_PRODUCTS)}
    
    Instructions de comportement :
    1. Si un utilisateur demande un produit qui n'est pas dans cette liste, suggérez poliment une alternative proche du catalogue RS Phone.
    2. Ne mentionnez pas de produits hors catalogue.
    3. Mettez en avant les caractéristiques techniques (specs) pour aider au choix.
    4. Si l'utilisateur demande le statut d'une commande, expliquez-lui comment utiliser la page "Suivi de commande" du site.
  `;

  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.7,
    },
  });
};