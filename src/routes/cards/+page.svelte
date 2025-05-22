<script>
  import { onMount } from 'svelte';
  import { fallbackcards } from '$lib/fallbackcards.js';
  
  // Zustandsvariablen
  let cards = [];
  let filteredCards = $state([]);
  let searchTerm = $state('');
  let isLoading = $state(false);
  let error = $state(null);
  let usingFallbackData = $state(false);
  
  // Kartendaten von der API abrufen
  async function fetchCards() {
    isLoading = true;
    error = null;
    usingFallbackData = false;
    
    try {
      // Füge einen zufälligen Parameter hinzu, um Cache-Probleme zu vermeiden
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/yugioh?limit=20&_=${timestamp}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(e => ({ error: 'Fehler beim Parsen der API-Antwort' }));
        throw new Error(errorData.error || `HTTP Fehler: ${response.status}`);
      }
      
      const data = await response.json().catch(e => {
        console.error('JSON-Parse-Fehler:', e);
        throw new Error('Fehler beim Parsen der API-Antwort');
      });
      
      // Prüfen, ob Daten im erwarteten Format sind
      if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
        cards = data.data;
        filteredCards = [...cards];
        console.log(`${cards.length} Karten geladen`);
      } else {
        console.warn('Keine Karten gefunden oder unerwartetes Datenformat:', data);
        useFallbackData();
      }
    } catch (err) {
      console.error('Fehler beim Laden der Karten:', err);
      error = `Die Karten konnten nicht von der API geladen werden: ${err.message}`;
      useFallbackData();
    } finally {
      isLoading = false;
    }
  }
  
  // Fallback-Kartendaten verwenden
  function useFallbackData() {
    cards = [...fallbackcards];
    filteredCards = [...fallbackcards];
    usingFallbackData = true;
    console.log('Verwende Fallback-Kartendaten');
  }
  
  // Nach Karten mit dem eingegebenen Begriff suchen
  async function searchCards() {
    if (!searchTerm.trim()) {
      filteredCards = [...cards];
      return;
    }
    
    // Wenn wir Fallback-Daten verwenden, filtern wir lokal
    if (usingFallbackData) {
      filteredCards = cards.filter(card => 
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return;
    }
    
    isLoading = true;
    error = null;
    
    try {
      // Füge einen zufälligen Parameter hinzu, um Cache-Probleme zu vermeiden
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/yugioh?name=${encodeURIComponent(searchTerm)}&limit=20&_=${timestamp}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(e => ({ error: 'Fehler beim Parsen der API-Antwort' }));
        throw new Error(errorData.error || `HTTP Fehler: ${response.status}`);
      }
      
      const data = await response.json().catch(e => {
        console.error('JSON-Parse-Fehler:', e);
        throw new Error('Fehler beim Parsen der API-Antwort');
      });
      
      if (data && data.data && Array.isArray(data.data)) {
        filteredCards = data.data;
        console.log(`${filteredCards.length} Karten gefunden für "${searchTerm}"`);
      } else {
        console.warn('Keine Karten gefunden oder unerwartetes Datenformat bei der Suche:', data);
        filteredCards = [];
        // Keine Karten gefunden ist kein Fehler
        if (data && data.error) {
          error = data.error;
        }
      }
    } catch (err) {
      console.error('Fehler bei der Suche:', err);
      error = `Bei der Suche ist ein Fehler aufgetreten: ${err.message}. Lokale Suche wird verwendet.`;
      
      // Wenn die API-Suche fehlschlägt, versuchen wir eine lokale Suche in den bereits geladenen Karten
      filteredCards = cards.filter(card => 
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } finally {
      isLoading = false;
    }
  }
  
  // Bei Enter-Taste die Suche ausführen
  function handleKeydown(event) {
    if (event.key === 'Enter') {
      searchCards();
    }
  }
  
  // Beim Laden der Komponente Karten abrufen
  onMount(fetchCards);
</script>

<div class="page-container">
  <div class="content">
    <!-- Symbole im Hintergrund -->
    <div class="yugioh-symbol millennium-eye"></div>
    <div class="yugioh-symbol millennium-puzzle"></div>

    <h1 class="welcome-heading">Yu-Gi-Oh! Kartensuche</h1>
    <p class=" center-text-start">
      Durchsuche die riesige Sammlung von Yu-Gi-Oh! Karten. Finde deine Lieblingskarten, studiere ihre Effekte und entdecke neue Strategien für dein Deck! 
    </p>
    <p class="center-text-start">
      Bitte beachtet, dass die Karten in der Kartensuche alle auf Englisch sind, da die API nur englische Daten bereitstellt. Daher ist die Suche auch nur auf englische Kartennamen ausgelegt.
    </p>

    <!-- Suchformular -->
    <div class="search-container">
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Kartenname eingeben..."
        class="search-input"
        onkeydown={handleKeydown}
      />
      <button onclick={searchCards} class="search-button">Suchen</button>
    </div>

    <!-- Lade-Animation -->
    {#if isLoading}
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Karten werden geladen...</p>
      </div>
    {/if}

    <!-- Fehlermeldung -->
    {#if error && !usingFallbackData}
      <div class="error-message">
        <p>{error}</p>
        <button onclick={fetchCards} class="retry-button">Erneut versuchen</button>
      </div>
    {/if}
    
    <!-- Fallback-Hinweis -->
    {#if usingFallbackData}
      <div class="fallback-notice">
        <p>
          <span class="fallback-icon">ℹ️</span> 
          Die API konnte nicht erreicht werden. Es werden lokale Beispieldaten angezeigt.
        </p>
      </div>
    {/if}

    <!-- Kartenanzeige -->
    <div class="cards-grid">
      {#each filteredCards as card}
        <div class="card-item">
          <div class="card-image">
            <img src={card.card_images?.[0]?.image_url} alt={card.name} />
          </div>
          <div class="card-details">
            <h3>{card.name}</h3>
            <p class="card-type">{card.type}</p>
            {#if card.atk !== undefined && card.def !== undefined}
              <p class="card-stats">ATK: {card.atk} / DEF: {card.def}</p>
            {/if}
            {#if card.level}
              <p class="card-level">Level: {card.level} ★</p>
            {/if}
            <p class="card-desc">{card.desc}</p>
          </div>
        </div>
      {:else}
        {#if !isLoading && !error}
          <div class="no-results">
            <p>Keine Karten gefunden. Versuche einen anderen Suchbegriff.</p>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>