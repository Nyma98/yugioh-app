<script>
  // Importiere Svelte-Funktionen
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  
  // FAQ-Daten mit Fragen und Antworten
  const faqItems = [
    {
      question: "Was ist Yu-Gi-Oh?",
      answer: `<p>Yu-Gi-Oh! ist ursprünglich ein <strong>Manga</strong>, der von Kazuki Takahashi geschaffen wurde. Daraus entwickelte sich ein weltweites Franchise mit:</p>
      <ul>
        <li>Einer erfolgreichen Anime-Serie</li>
        <li>Mehreren Kinofilmen</li>
        <li>Einem beliebten Sammelkartenspiel</li>
      </ul>
      <p>Die Geschichte folgt Yugi Muto, der durch ein antikes ägyptisches Puzzle (das "Millennium Puzzle") mit dem Geist eines Pharaos verbunden wird. Gemeinsam bestreiten sie Duelle mit dem Kartenspiel "Duel Monsters".</p>`
    },
    {
      question: "Wie spielt man das Yu-Gi-Oh! Sammelkartenspiel?",
      answer: `<p><strong>Grundprinzip:</strong> Zwei Spieler duellieren sich mit ihren Decks, die jeweils aus mindestens 40 Karten bestehen.</p>
      
      <p><strong>Spielablauf:</strong></p>
      <ul>
        <li>Jeder Spieler startet mit 8000 Lebenspunkten</li>
        <li>Ziel ist es, die Lebenspunkte des Gegners auf 0 zu reduzieren oder ihn spielunfähig zu machen</li>
        <li>Das Spiel verwendet verschiedene Kartentypen: Monster-, Zauber- und Fallenkarten</li>
      </ul>
      
      <p><strong>Monsterkarten</strong> können in Angriffs- oder Verteidigungsposition gespielt werden. Sie können gegnerische Monster angreifen oder direkt den Spieler, wenn keine Verteidigung vorhanden ist.</p>`
    },
    {
      question: "Was sind die verschiedenen Kartentypen im Spiel?",
      answer: `<p>Yu-Gi-Oh! verfügt über drei Hauptkartentypen, die alle eigene Untertypen haben:</p>
      
      <h4>1. Monsterkarten</h4>
      <ul>
        <li><strong>Normal:</strong> Ohne spezielle Effekte</li>
        <li><strong>Effekt:</strong> Mit besonderen Fähigkeiten</li>
        <li><strong>Spezialtypen:</strong> Ritual, Fusion, Synchro, Xyz, Pendel und Link</li>
      </ul>
      
      <h4>2. Zauberkarten</h4>
      <ul>
        <li><strong>Normal:</strong> Einmal nutzbar, dann abgelegt</li>
        <li><strong>Schnell:</strong> Können wie Fallen aktiviert werden</li>
        <li><strong>Weitere Typen:</strong> Ausrüstung, Permanent, Feld und Ritual</li>
      </ul>
      
      <h4>3. Fallenkarten</h4>
      <ul>
        <li><strong>Normal:</strong> Einmalig aktivierbare Reaktionen</li>  
        <li><strong>Permanent:</strong> Bleiben im Spiel</li>
        <li><strong>Konter:</strong> Können andere Karten negieren</li>
      </ul>
      
      <p>Jeder Typ hat einzigartige Eigenschaften und Spielmechaniken.</p>`
    },
    {
      question: "Was bedeuten die Sternchen auf den Monsterkarten?",
      answer: `<p>Die Sternchen (auch als "Level" bezeichnet) auf Monsterkarten repräsentieren die Stärke und den Aufwand, um sie zu beschwören:</p>
      
      <ul>
        <li><strong>Level 1-4:</strong> Können direkt gespielt werden</li>
        <li><strong>Level 5-6:</strong> Benötigen ein Tribut (ein Monster muss geopfert werden)</li>
        <li><strong>Level 7+:</strong> Benötigen zwei Tribute (zwei Monster müssen geopfert werden)</li>
      </ul>
      
      <p>Als Faustregel gilt: Je höher das Level, desto stärker ist in der Regel das Monster hinsichtlich seiner Angriffs- und Verteidigungswerte.</p>`
    },
    {
      question: "Was sind Meta-Decks?",
      answer: `<p>"Meta-Decks" sind die aktuell stärksten und effektivsten Decks im Wettbewerbsumfeld.</p>
      
      <p><strong>Eigenschaften von Meta-Decks:</strong></p>
      <ul>
        <li>Nutzen die besten verfügbaren Karten und Strategien</li>
        <li>Sind auf Turniererfolg optimiert</li>
        <li>Ändern sich regelmäßig mit neuen Kartenerweiterungen und Verbotslisten</li>
      </ul>
      
      <p>"Meta" ist eine Abkürzung für "Metagame" und bezieht sich auf die dominanten Spielstrategien in der Wettbewerbsszene. Diese Decks werden von erfahrenen Spielern entwickelt und oft in Turnieren getestet.</p>`
    },
    {
      question: "Wie funktioniert die Bannliste und warum gibt es sie?",
      answer: `<p>Die Bannliste (auch Verbotsliste genannt) ist ein offizielles Regelwerk, das regelmäßig vom Spielehersteller aktualisiert wird. Sie reguliert, welche Karten im offiziellen Spiel verwendet werden dürfen.</p>
      
      <h4>Kategorien:</h4>
      <ul>
        <li><strong>Verbotene Karten:</strong> Dürfen nicht gespielt werden</li>
        <li><strong>Limitierte Karten:</strong> Auf 1 Exemplar pro Deck beschränkt</li>
        <li><strong>Semi-limitierte Karten:</strong> Auf 2 Exemplare beschränkt</li>
        <li><strong>Unbeschränkte Karten:</strong> Bis zu 3 Exemplare erlaubt</li>
      </ul>
      
      <h4>Zweck:</h4>
      <p>Die Liste soll das Spielgleichgewicht bewahren, indem sie zu mächtige Karten oder problematische Kombinationen einschränkt. Dies sorgt für ein ausgeglicheneres und abwechslungsreicheres Spielerlebnis.</p>`
    },
    {
      question: "Was ist der Unterschied zwischen dem OCG und TCG?",
      answer: `<p>Yu-Gi-Oh! wird in zwei Hauptversionen weltweit veröffentlicht:</p>
      
      <h4>OCG (Original Card Game)</h4>
      <ul>
        <li>Wird in Japan, Korea und anderen asiatischen Ländern gespielt</li>
        <li>Erhält in der Regel neue Karten früher</li>
        <li>Hat eine eigene Bannliste</li>
      </ul>
      
      <h4>TCG (Trading Card Game)</h4>
      <ul>
        <li>Wird in Nordamerika, Europa und Ozeanien gespielt</li>
        <li>Erhält Karten meist 3-6 Monate nach dem OCG</li>
        <li>Hat teilweise exklusive Karten, die nicht im OCG verfügbar sind</li>
        <li>Eigene, separate Bannliste</li>
      </ul>
      
      <p>Beide Versionen können teilweise unterschiedliche Karteneffekte und Übersetzungen haben.</p>`
    },
    {
      question: "Wie erkenne ich, ob eine Karte selten oder wertvoll ist?",
      answer: `<p>Die Seltenheit einer Karte kann an verschiedenen Merkmalen erkannt werden:</p>
      
      <h4>Seltenheitsstufen (von häufig zu selten):</h4>
      <ul>
        <li><strong>Common:</strong> Normaler Druck, keine besonderen Merkmale</li>
        <li><strong>Rare:</strong> Silberner Name</li>
        <li><strong>Super Rare:</strong> Glänzendes Bild</li>
        <li><strong>Ultra Rare:</strong> Goldener Name und glänzendes Bild</li>
        <li><strong>Secret Rare:</strong> Regenbogenfarbener Name und Bild</li>
        <li>Und weitere spezielle Raritäten...</li>
      </ul>
      
      <h4>Wertvolle Karten sind oft:</h4>
      <ul>
        <li>Sehr alte Karten in gutem Zustand</li>
        <li>Karten mit limitierter Auflage oder aus Turnierpreisen</li>
        <li>Karten, die im aktuellen Meta-Spiel stark sind</li>
      </ul>
      
      <p>Der Wert kann auf spezialisierten Marktplätzen oder in Fachgeschäften überprüft werden.</p>`
    },
    {
      question: "Wie erstelle ich ein gutes Deck?",
      answer: `<p>Ein erfolgreiches Deck basiert auf mehreren wichtigen Faktoren:</p>
      
      <h4>Grundlegende Elemente:</h4>
      <ul>
        <li><strong>Klarer Fokus:</strong> Wähle eine Hauptstrategie oder einen Archetyp</li>
        <li><strong>Ausgewogenheit:</strong> Etwa 20-22 Monster, 10-12 Zauber und 8-10 Fallen</li>
        <li><strong>Konsistenz:</strong> Mehrfache Kopien wichtiger Karten (2-3 Stück)</li>
        <li><strong>Karten ziehen:</strong> Möglichkeiten zum Nachziehen von Karten</li>
        <li><strong>Gegnerische Strategien:</strong> Antworten auf häufige Taktiken</li>
      </ul>
      
      <h4>Tipps für Einsteiger:</h4>
      <p>Beginne mit einem bekannten Archetyp (eine Monstergruppe mit gemeinsamen Eigenschaften). Teste dein Deck regelmäßig und passe es an deinen Spielstil an. Fürchte dich nicht davor, Änderungen vorzunehmen!</p>`
    },
    {
      question: "Was ist das Extra-Deck und wozu dient es?",
      answer: `<p>Das Extra-Deck ist ein spezieller Bereich, der zusätzlich zum Hauptdeck existiert.</p>
      
      <h4>Wichtige Merkmale:</h4>
      <ul>
        <li>Enthält bis zu 15 Karten</li>
        <li>Karten werden nicht gemischt oder gezogen</li>
        <li>Enthält spezielle Monstertypen, die unter bestimmten Bedingungen beschworen werden</li>
      </ul>
      
      <h4>Kartentypen im Extra-Deck:</h4>
      <ul>
        <li><strong>Fusionsmonster:</strong> Benötigen "Polymerization" oder ähnliche Karten</li>
        <li><strong>Synchromonster:</strong> Benötigen Tuner + Nicht-Tuner-Monster</li>
        <li><strong>Xyz-Monster:</strong> Benötigen Monster mit gleichem Level</li>
        <li><strong>Link-Monster:</strong> Benötigen spezifizierte Monster als Material</li>
      </ul>
      
      <p>Diese Monster bilden oft das Rückgrat moderner Strategien und haben typischerweise mächtige Effekte, die den Spielverlauf entscheidend beeinflussen können.</p>`
    }
  ];
  
  // Zustand für aktuell geöffnete FAQ-Items
  let openItems = new Set();
  
  // Funktion zum Umschalten des Zustands eines FAQ-Items
  function toggleItem(index) {
    if (openItems.has(index)) {
      openItems.delete(index);
    } else {
      openItems.add(index);
    }
    openItems = openItems; // Svelte reaktiven Update auslösen
  }
</script>

<div class="page-container">
  <div class="content">
    <!-- Background effects -->
    <div class="bg-effect"></div>
    <div class="yugioh-symbol millennium-eye"></div>
    <div class="yugioh-symbol millennium-puzzle"></div>
    
    <h1 class="welcome-heading">Häufig gestellte Fragen</h1>
    <p class="center-text-start">
      Hier findest du Antworten auf die häufigsten Fragen rund um Yu-Gi-Oh! und das Sammelkartenspiel. 
      Von grundlegenden Spielregeln bis hin zu fortgeschrittenen Strategien - Hier sind die wichtigsten 
      Informationen für dich zusammengestellt.
    </p>
    
    <div class="faq-container">
      <!-- FAQ Liste -->
      <div class="faq-list">
        {#each faqItems as item, index}
          <div class="faq-item">
            <div 
              class="faq-question" 
              class:active={openItems.has(index)}
              on:click={() => toggleItem(index)}
            >
              <span>{item.question}</span>
              <span class="faq-icon">{openItems.has(index) ? '−' : '+'}</span>
            </div>
            {#if openItems.has(index)}
              <div class="faq-answer" transition:slide={{ duration: 400, easing: quintOut }}>
                {@html item.answer}
              </div>
            {/if}
          </div>
        {/each}
      </div>
      
      <!-- Noch Fragen? Sektion -->
      <div class="more-questions">
        <h2>Noch Fragen?</h2>
        <p>
          Falls deine Frage hier nicht beantwortet wurde, kannst du gerne meine
          <a href="/about">About-Seite</a> besuchen oder mehr über die 
          <a href="/cards">Yu-Gi-Oh! Karten</a> erfahren. 
        </p>
        <p>
          Für offizielle Regelfragen empfehle ich die 
          <a href="https://www.yugioh-card.com/en/rulebook/" target="_blank" rel="noopener noreferrer">offizielle Yu-Gi-Oh! Regelseite</a>.
        </p>
      </div>
    </div>
  </div>
</div>