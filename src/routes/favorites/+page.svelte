<script>
  import { enhance } from '$app/forms';
  
  // Props von der load-Funktion
  let { data, form } = $props();
  
  // Lokale Zustandsvariablen
  let showAddForm = $state(false);
  let showCommentForm = $state(null);
  
  // Formular für neue Karte anzeigen/verstecken
  function toggleAddForm() {
    showAddForm = !showAddForm;
  }
  
  // Kommentar-Formular anzeigen/verstecken
  function toggleCommentForm(cardId) {
    showCommentForm = showCommentForm === cardId ? null : cardId;
  }
</script>

<!-- Symbole im Hintergrund -->
<div class="yugioh-symbol millennium-eye"></div>
<div class="yugioh-symbol millennium-puzzle"></div>

<div class="content">
  <h1 class="welcome-heading">Meine Lieblingskarten</h1>
  
  <p class="center-text-start">
    Hier kannst du deine Lieblings-Yu-Gi-Oh! Karten sammeln und verwalten. 
    Füge Karten hinzu, schreibe Kommentare und organisiere deine Sammlung!
  </p>

  <!-- Erfolgs- oder Fehlermeldungen -->
  {#if form}
    <div class={form.type === 'success' ? 'success-message' : 'error-message'}>
      <p>{form.message}</p>
    </div>
  {/if}

  <!-- Button zum Hinzufügen neuer Karten -->
  <div style="text-align: center; margin: 30px 0;">
    <button onclick={toggleAddForm} class="cta-button primary">
      {showAddForm ? 'Formular schließen' : 'Neue Karte hinzufügen'}
    </button>
  </div>

  <!-- Formular zum Hinzufügen neuer Karten -->
  {#if showAddForm}
    <div class="intro-section" style="max-width: 600px; margin: 30px auto;">
      <h2 class="section-title">Karte zu Favoriten hinzufügen</h2>
      
      <form method="POST" action="?/addFavorite" use:enhance>
        <div class="form-group">
          <label for="cardName">Kartenname:</label>
          <input 
            type="text" 
            id="cardName" 
            name="cardName" 
            required 
            class="search-input"
            style="width: 100%; border-radius: 6px;"
            placeholder="z.B. Blue-Eyes White Dragon"
          />
        </div>
        
        <div class="form-group">
          <label for="cardId">Karten-ID:</label>
          <input 
            type="number" 
            id="cardId" 
            name="cardId" 
            required 
            class="search-input"
            style="width: 100%; border-radius: 6px;"
            placeholder="z.B. 89631139"
          />
        </div>
        
        <div class="form-group">
          <label for="cardType">Kartentyp:</label>
          <input 
            type="text" 
            id="cardType" 
            name="cardType" 
            class="search-input"
            style="width: 100%; border-radius: 6px;"
            placeholder="z.B. Normal Monster"
          />
        </div>
        
        <!-- ATK und DEF nebeneinander mit flexbox -->
        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
          <div class="form-group" style="flex: 1; margin-bottom: 0;">
            <label for="cardAtk">ATK:</label>
            <input 
              type="number" 
              id="cardAtk" 
              name="cardAtk" 
              class="search-input"
              style="width: 100%; border-radius: 6px;"
              placeholder="z.B. 3000"
            />
          </div>
          <div class="form-group" style="flex: 1; margin-bottom: 0;">
            <label for="cardDef">DEF:</label>
            <input 
              type="number" 
              id="cardDef" 
              name="cardDef" 
              class="search-input"
              style="width: 100%; border-radius: 6px;"
              placeholder="z.B. 2500"
            />
          </div>
        </div>
        
        <div class="form-group">
          <label for="cardImage">Bild-URL:</label>
          <input 
            type="url" 
            id="cardImage" 
            name="cardImage" 
            class="search-input"
            style="width: 100%; border-radius: 6px;"
            placeholder="https://images.ygoprodeck.com/images/cards/89631139.jpg"
          />
        </div>
        
        <div class="form-group">
          <label for="cardDesc">Beschreibung:</label>
          <textarea 
            id="cardDesc" 
            name="cardDesc" 
            rows="3" 
            class="search-input"
            style="width: 100%; border-radius: 6px; resize: vertical;"
            placeholder="Beschreibung der Karte..."
          ></textarea>
        </div>
        
        <div style="text-align: center;">
          <button type="submit" class="cta-button primary">Karte hinzufügen</button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Lieblingskarten anzeigen -->
  {#if data.favoriteCards && data.favoriteCards.length > 0}
    <h2 class="section-title">Deine Lieblingskarten ({data.favoriteCards.length})</h2>
    
    <div class="cards-grid">
      {#each data.favoriteCards as card}
        <div class="card-item">
          <!-- Karten-Bild -->
          <div class="card-image">
            {#if card.image_url}
              <img src={card.image_url} alt={card.name} />
            {:else}
              <div style="width: 100%; height: 200px; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; color: #aaa; border: 2px dashed rgba(255, 255, 255, 0.3); border-radius: 5px;">
                <span>Kein Bild</span>
              </div>
            {/if}
          </div>
          
          <!-- Karten-Details -->
          <div class="card-details">
            <h3>{card.name}</h3>
            <p class="card-type">{card.type}</p>
            
            {#if card.atk !== null && card.def !== null}
              <p class="card-stats">ATK: {card.atk} / DEF: {card.def}</p>
            {/if}
            
            {#if card.desc}
              <p class="card-desc">{card.desc}</p>
            {/if}
            
            {#if card.addedDate}
              <p style="color: #aaa; font-size: 0.9rem; margin-top: 10px; font-style: italic;">
                Hinzugefügt: {new Date(card.addedDate).toLocaleDateString('de-DE')}
              </p>
            {/if}
            
            <!-- Kommentar anzeigen -->
            {#if card.comment}
              <div style="margin-top: 15px; padding: 15px; background: rgba(255, 215, 0, 0.1); border-radius: 8px; border-left: 4px solid #ffd700;">
                <strong style="color: #ffd700; display: block; margin-bottom: 8px; font-family: 'Cinzel', serif;">Mein Kommentar:</strong>
                <p style="margin: 0; color: #e0e0e0; line-height: 1.5;">{card.comment}</p>
                {#if card.commentDate}
                  <small style="color: #aaa; font-size: 0.8rem; margin-top: 8px; display: block;">
                    {new Date(card.commentDate).toLocaleDateString('de-DE')}
                  </small>
                {/if}
              </div>
            {/if}
            
            <!-- Buttons mit vorhandenen Klassen -->
            <div style="display: flex; gap: 10px; justify-content: center; margin-top: 15px; flex-wrap: wrap;">
              <!-- Kommentar-Button -->
              <button 
                onclick={() => toggleCommentForm(card.id)} 
                class="feature-link"
                style="padding: 8px 16px; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;"
              >
                {card.comment ? 'Kommentar bearbeiten' : 'Kommentar hinzufügen'}
              </button>
              
              <!-- Entfernen-Button -->
              <form method="POST" action="?/removeFavorite" use:enhance={() => {
                return ({ cancel }) => {
                  if (!confirm('Möchtest du diese Karte wirklich aus deinen Favoriten entfernen?')) {
                    cancel();
                  }
                };
              }} style="display: inline;">
                <input type="hidden" name="cardId" value={card.id} />
                <button type="submit" class="cta-button secondary" style="padding: 8px 16px; font-size: 0.9rem;">
                  Entfernen
                </button>
              </form>
            </div>
            
            <!-- Kommentar-Formular -->
            {#if showCommentForm === card.id}
              <div style="margin-top: 15px; padding: 15px; background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 215, 0, 0.2);">
                <form method="POST" action="?/addComment" use:enhance>
                  <input type="hidden" name="cardId" value={card.id} />
                  <textarea 
                    name="comment" 
                    rows="3" 
                    placeholder="Schreibe einen Kommentar zu dieser Karte..."
                    required
                    class="search-input"
                    style="width: 100%; border-radius: 6px; resize: vertical; margin-bottom: 10px;"
                    value={card.comment || ''}
                  ></textarea>
                  <div style="display: flex; gap: 10px; justify-content: center;">
                    <button type="submit" class="cta-button primary" style="padding: 8px 20px; font-size: 0.9rem;">
                      Speichern
                    </button>
                    <button 
                      type="button" 
                      onclick={() => toggleCommentForm(null)}
                      class="cta-button secondary"
                      style="padding: 8px 20px; font-size: 0.9rem;"
                    >
                      Abbrechen
                    </button>
                  </div>
                </form>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <!-- Keine Lieblingskarten vorhanden -->
    <div class="intro-section" style="text-align: center; max-width: 600px; margin: 40px auto;">
      <h2 class="section-title">Keine Lieblingskarten vorhanden</h2>
      <p>Du hast noch keine Karten zu deinen Favoriten hinzugefügt.</p>
      <p>Klicke auf "Neue Karte hinzufügen", um deine erste Lieblingskarte zu speichern!</p>
    </div>
  {/if}
</div>