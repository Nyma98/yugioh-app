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

<div class="page-container">
  <div class="content">
    <!-- Hintergrund-Symbole -->
    <div class="yugioh-symbol millennium-eye"></div>
    <div class="yugioh-symbol millennium-puzzle"></div>

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
              class="form-input"
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
              class="form-input"
              placeholder="z.B. 89631139"
            />
          </div>
          
          <div class="form-group">
            <label for="cardType">Kartentyp:</label>
            <input 
              type="text" 
              id="cardType" 
              name="cardType" 
              class="form-input"
              placeholder="z.B. Normal Monster"
            />
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="cardAtk">ATK:</label>
              <input 
                type="number" 
                id="cardAtk" 
                name="cardAtk" 
                class="form-input"
                placeholder="z.B. 3000"
              />
            </div>
            <div class="form-group">
              <label for="cardDef">DEF:</label>
              <input 
                type="number" 
                id="cardDef" 
                name="cardDef" 
                class="form-input"
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
              class="form-input"
              placeholder="https://images.ygoprodeck.com/images/cards/89631139.jpg"
            />
          </div>
          
          <div class="form-group">
            <label for="cardDesc">Beschreibung:</label>
            <textarea 
              id="cardDesc" 
              name="cardDesc" 
              rows="3" 
              class="form-input"
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
                <div class="no-image-placeholder">
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
                <p class="card-date">
                  Hinzugefügt: {new Date(card.addedDate).toLocaleDateString('de-DE')}
                </p>
              {/if}
              
              <!-- Kommentar anzeigen -->
              {#if card.comment}
                <div class="card-comment">
                  <strong>Mein Kommentar:</strong>
                  <p>{card.comment}</p>
                  {#if card.commentDate}
                    <small class="comment-date">
                      {new Date(card.commentDate).toLocaleDateString('de-DE')}
                    </small>
                  {/if}
                </div>
              {/if}
              
              <!-- Buttons -->
              <div class="card-actions">
                <!-- Kommentar-Button -->
                <button 
                  onclick={() => toggleCommentForm(card.id)} 
                  class="action-button comment-btn"
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
                  <button type="submit" class="action-button remove-btn">
                    Entfernen
                  </button>
                </form>
              </div>
              
              <!-- Kommentar-Formular -->
              {#if showCommentForm === card.id}
                <form method="POST" action="?/addComment" use:enhance class="comment-form">
                  <input type="hidden" name="cardId" value={card.id} />
                  <textarea 
                    name="comment" 
                    rows="3" 
                    placeholder="Schreibe einen Kommentar zu dieser Karte..."
                    required
                    class="form-input"
                    value={card.comment || ''}
                  ></textarea>
                  <div class="comment-actions">
                    <button type="submit" class="cta-button primary small">
                      Speichern
                    </button>
                    <button 
                      type="button" 
                      onclick={() => toggleCommentForm(null)}
                      class="cta-button secondary small"
                    >
                      Abbrechen
                    </button>
                  </div>
                </form>
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
</div>