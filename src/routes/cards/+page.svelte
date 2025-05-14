<!-- src/routes/cards/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  
  // Zustandsvariablen
  let cards = [];
  let filteredCards = [];
  let searchTerm = '';
  let isLoading = false;
  let error = null;
  
// Kartendaten von der API abrufen
  async function fetchCards() {
    isLoading = true;
    error = null;
    
    try {
      // Füge einen zufälligen Parameter hinzu, um Cache-Probleme zu vermeiden
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/yugioh?limit=20&_=${timestamp}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fehler beim Laden der Karten');
      }
      
      const data = await response.json();
      
      // Prüfen, ob Daten im erwarteten Format sind
      if (data && data.data) {
        cards = data.data;
        filteredCards = [...cards];
        console.log(`${cards.length} Karten geladen`);
      } else {
        console.warn('Unerwartetes Datenformat:', data);
        cards = [];
        filteredCards = [];
        error = 'Die Kartendaten haben ein unerwartetes Format. Bitte kontaktiere den Webmaster.';
      }
    } catch (err) {
      console.error('Fehler beim Laden der Karten:', err);
      error = `Die Karten konnten nicht geladen werden: ${err.message}. Bitte versuche es später erneut.`;
      cards = [];
      filteredCards = [];
    } finally {
      isLoading = false;
    }
  }
  
  // Nach Karten mit dem eingegebenen Begriff suchen
  async function searchCards() {
    if (!searchTerm.trim()) {
      filteredCards = [...cards];
      return;
    }
    
    isLoading = true;
    error = null;
    
    try {
      // Füge einen zufälligen Parameter hinzu, um Cache-Probleme zu vermeiden
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/yugioh?name=${encodeURIComponent(searchTerm)}&limit=20&_=${timestamp}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fehler bei der Suche');
      }
      
      const data = await response.json();
      
      if (data && data.data) {
        filteredCards = data.data;
        console.log(`${filteredCards.length} Karten gefunden für "${searchTerm}"`);
      } else {
        console.warn('Unerwartetes Datenformat bei der Suche:', data);
        filteredCards = [];
        if (data.error) {
          error = data.error;
        }
      }
    } catch (err) {
      console.error('Fehler bei der Suche:', err);
      error = `Bei der Suche ist ein Fehler aufgetreten: ${err.message}. Bitte versuche es später erneut.`;
      filteredCards = [];
    } finally {
      isLoading = false;
    }
  }
  
  // Beim Laden der Komponente Karten abrufen
  onMount(fetchCards);
</script>

<div class="page-container">
  <div class="content">
    <h1 class="welcome-heading">Yu-Gi-Oh! Kartensuche</h1>
    <p class="center-text-start">
      Durchsuche die riesige Sammlung von Yu-Gi-Oh! Karten. Finde deine Lieblingskarten, studiere ihre Effekte und entdecke neue Strategien für dein Deck!
    </p>

    <!-- Suchformular -->
    <div class="search-container">
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Kartenname eingeben..."
        class="search-input"
      />
      <button on:click={searchCards} class="search-button">Suchen</button>
    </div>

    <!-- Lade-Animation -->
    {#if isLoading}
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Karten werden geladen...</p>
      </div>
    {/if}

    <!-- Fehlermeldung -->
    <!-- Fehlermeldung -->
    {#if error && !usingFallbackData}
      <div class="error-message">
        <p>{error}</p>
        <button on:click={fetchCards} class="retry-button">Erneut versuchen</button>
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