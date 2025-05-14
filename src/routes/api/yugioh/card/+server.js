// src/routes/api/yugioh/card/+server.js
// Endpunkt für einzelne Kartendetails

import { json } from '@sveltejs/kit';

/**
 * Holt Daten einer spezifischen Karte von der Yu-Gi-Oh! API
 * @param {Request} request
 */
export async function GET({ url }) {
  try {
    // Karten-ID aus der URL extrahieren
    const cardId = url.searchParams.get('id');
    
    if (!cardId) {
      return json({ error: 'Keine Karten-ID angegeben' }, { status: 400 });
    }
    
    // YGOPRODeck API für Kartendetails
    const apiUrl = new URL('https://db.ygoprodeck.com/api/v7/cardinfo.php');
    apiUrl.searchParams.append('id', cardId);
    
    // Anfrage an die externe API senden
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      return json({ error: 'Fehler beim Abrufen der Kartendetails' }, { status: 500 });
    }
    
    const data = await response.json();
    
    // Erfolgreiche Antwort zurückgeben
    return json(data);
  } catch (error) {
    console.error('API-Fehler:', error);
    return json({ error: 'Ein Fehler ist aufgetreten' }, { status: 500 });
  }
}