// Diese Datei lädt Daten für die Detailseite beim Routing

/**
 * Diese Funktion wird von SvelteKit aufgerufen, wenn die Route aufgerufen wird
 * Sie extrahiert die ID aus den Routenparametern und gibt sie an die Seite weiter
 */
export function load({ params }) {
  return {
    id: params.id
  };
}