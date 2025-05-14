// src/routes/api/yugioh/+server.js
// Diese Datei erstellt einen API-Endpunkt in deinem SvelteKit-Projekt

import { json } from '@sveltejs/kit';

/**
 * Holt Kartendaten von der Yu-Gi-Oh! API
 * @param {Request} request
 */
export async function GET({ url, fetch }) {
  try {
    // Parameter aus der URL extrahieren (z.B. /api/yugioh?name=Blue-Eyes)
    const cardName = url.searchParams.get('name') || '';
    const limit = url.searchParams.get('limit') || 10;
    
    // Basis-URL für die YGOPRODeck API
    const apiUrl = new URL('https://db.ygoprodeck.com/api/v7/cardinfo.php');
    
    // Parameter hinzufügen (wenn vorhanden)
    if (cardName) {
      apiUrl.searchParams.append('fname', cardName);
    } else {
      // Wenn kein Name angegeben ist, holen wir einige populäre Karten
      // Die archetype-Parameter filtern nach beliebten Yu-Gi-Oh Archetypen
      apiUrl.searchParams.append('archetype', 'Blue-Eyes');
    }
    
    apiUrl.searchParams.append('num', limit);
    apiUrl.searchParams.append('offset', 0);
    
    console.log(`Anfrage an externe API: ${apiUrl.toString()}`);
    
    // Anfrage an die externe API senden mit erhöhtem Timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 Sekunden Timeout
    
    const response = await fetch(apiUrl.toString(), {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.error(`API-Fehler: ${response.status} ${response.statusText}`);
      throw new Error(`API antwortete mit Status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Wenn keine Daten zurückgegeben wurden, stellen wir sicher, dass wir ein leeres Array zurückgeben
    if (!data || (data.error && data.error.includes("No card matching your query was found"))) {
      return json({ data: [] });
    }
    
    // Erfolgreiche Antwort zurückgeben
    return json(data);
  } catch (error) {
    console.error('API-Fehler:', error.message || error);
    
    // Spezifischere Fehlermeldung zurückgeben
    if (error.name === 'AbortError') {
      return json({ 
        error: 'Die Anfrage hat zu lange gedauert. Bitte versuche es später erneut.',
        details: 'Timeout beim Verbinden mit der Yu-Gi-Oh API'
      }, { status: 504 });
    }
    
    return json({ 
      error: 'Ein Fehler ist beim Abrufen der Kartendaten aufgetreten',
      details: error.message || 'Unbekannter Fehler'
    }, { status: 500 });
  }
}