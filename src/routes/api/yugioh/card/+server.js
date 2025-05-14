// Endpunkt für einzelne Kartendetails

import { json } from '@sveltejs/kit';

/**
 * Holt Daten einer spezifischen Karte von der Yu-Gi-Oh! API
 * @param {Request} request
 */
export async function GET({ url, fetch, setHeaders }) {
  try {
    // Karten-ID aus der URL extrahieren
    const cardId = url.searchParams.get('id');
    
    if (!cardId) {
      return json({ error: 'Keine Karten-ID angegeben' }, { status: 400 });
    }
    
    // YGOPRODeck API für Kartendetails
    const apiUrl = new URL('https://db.ygoprodeck.com/api/v7/cardinfo.php');
    apiUrl.searchParams.append('id', cardId);
    
    console.log(`Anfrage an externe API für Kartendetails: ${apiUrl.toString()}`);
    
    // Anfrage an die externe API senden mit Timeout
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
    
    // Cache-Header setzen
    setHeaders({
      'Cache-Control': 'max-age=86400', // 24 Stunden cachen (Kartendetails ändern sich selten)
    });
    
    // Wenn keine Daten zurückgegeben wurden oder ein Fehler auftrat
    if (!data || (data.error && typeof data.error === 'string')) {
      if (data && data.error && data.error.includes("No card matching your query was found")) {
        return json({ error: 'Karte nicht gefunden' }, { status: 404 });
      }
      throw new Error(data.error || 'Unbekannter API-Fehler');
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
      error: 'Ein Fehler ist beim Abrufen der Kartendetails aufgetreten',
      details: error.message || 'Unbekannter Fehler'
    }, { status: 500 });
  }
}