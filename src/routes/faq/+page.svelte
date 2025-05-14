<script>
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  
  // FAQ-Daten mit Fragen und Antworten
  const faqItems = [
    {
      question: "Was ist Yu-Gi-Oh?",
      answer: "Yu-Gi-Oh! ist ursprünglich ein Manga, der von Kazuki Takahashi geschaffen wurde. Daraus entwickelte sich ein Anime, Filme und ein Sammelkartenspiel, das weltweit populär ist. Die Geschichte folgt Yugi Muto, der durch ein antikes Puzzle mit dem Geist eines Pharaos verbunden wird. Gemeinsam bestreiten sie Duelle mit dem Kartenspiel 'Duel Monsters'."
    },
    {
      question: "Wie spielt man das Yu-Gi-Oh! Sammelkartenspiel?",
      answer: "Das Grundprinzip: Zwei Spieler duellieren sich mit ihren Decks, die jeweils aus mindestens 40 Karten bestehen. Jeder Spieler startet mit 8000 Lebenspunkten. Ziel ist es, die Lebenspunkte des Gegners auf 0 zu reduzieren oder ihn spielunfähig zu machen. Das Spiel nutzt Monster-, Zauber- und Fallenkarten mit verschiedenen Effekten. Monster werden in Angriffs- oder Verteidigungsposition gespielt und können gegnerische Monster angreifen oder direkt den Spieler, wenn keine Verteidigung vorhanden ist."
    },
    {
      question: "Was sind die verschiedenen Kartentypen im Spiel?",
      answer: "Yu-Gi-Oh! hat mehrere Kartentypen: Monsterkarten (Normal, Effekt, Ritual, Fusion, Synchro, Xyz, Pendel und Link), Zauberkarten (Normal, Schnell, Ausrüstung, Permanent, Feld und Ritual) und Fallenkarten (Normal, Permanent und Konter). Jeder Typ hat einzigartige Eigenschaften und Spielmechaniken."
    },
    {
      question: "Was bedeuten die Sternchen auf den Monsterkarten?",
      answer: "Die Sternchen (Level) auf Monsterkarten repräsentieren die Stärke und den Aufwand, um sie zu beschwören. Monster mit Level 1-4 können direkt gespielt werden. Monster mit Level 5-6 benötigen ein Tribute (Opfer), und Monster mit Level 7 oder höher benötigen zwei Tribute. Je höher das Level, desto stärker ist in der Regel das Monster."
    },
    {
      question: "Was sind Meta-Decks?",
      answer: "Meta-Decks sind Kartendecks, die im aktuellen Wettbewerbsumfeld als die stärksten und effektivsten gelten. Sie nutzen die besten verfügbaren Karten und Strategien, um in Turnieren erfolgreich zu sein. Diese Decks ändern sich regelmäßig mit neuen Kartenerweiterungen und Verbotslisten. Meta ist eine Abkürzung für 'metagame', was sich auf die dominanten Spielstrategien in der Wettbewerbsszene bezieht."
    },
    {
      question: "Wie funktioniert die Bannliste und warum gibt es sie?",
      answer: "Die Bannliste (auch Verbotsliste genannt) ist eine offizielle Liste, die vom Spielehersteller regelmäßig aktualisiert wird. Sie reguliert, welche Karten im offiziellen Spiel verwendet werden dürfen. Es gibt drei Kategorien: Verbotene Karten (dürfen nicht gespielt werden), Limitierte Karten (auf 1 Exemplar pro Deck beschränkt) und Semi-limitierte Karten (auf 2 Exemplare beschränkt). Die Liste soll das Spielgleichgewicht bewahren, indem sie zu mächtige Karten oder problematische Kombinationen einschränkt."
    },
    {
      question: "Was ist der Unterschied zwischen dem OCG und TCG?",
      answer: "OCG (Original Card Game) ist die Version von Yu-Gi-Oh!, die in Japan, Korea und anderen asiatischen Ländern gespielt wird. TCG (Trading Card Game) ist die Version für Nordamerika, Europa und Ozeanien. Beide haben unterschiedliche Bannlisten, Kartenveröffentlichungstermine und manchmal sogar verschiedene Karteneffekte. OCG erhält in der Regel neue Karten früher als TCG, während TCG einige exklusive Karten hat, die nicht im OCG verfügbar sind."
    },
    {
      question: "Wie erkenne ich, ob eine Karte selten oder wertvoll ist?",
      answer: "Die Seltenheit einer Karte wird durch verschiedene Merkmale angezeigt: Common (normaler Druck), Rare (silberner Name), Super Rare (glänzendes Bild), Ultra Rare (goldener Name und glänzendes Bild), Secret Rare (regenbogenfarbener Name und Bild) und viele weitere spezielle Raritäten. Wertvolle Karten sind oft: sehr alte Karten in gutem Zustand, Karten mit limitierter Auflage, Turnier-Preis-Karten, und Karten, die im Meta-Spiel stark sind. Der Wert kann online auf spezialisierten Marktplätzen überprüft werden."
    },
    {
      question: "Wie erstelle ich ein gutes Deck?",
      answer: "Ein gutes Deck hat in der Regel: 1) Einen klaren Fokus oder eine Strategie, 2) Ausgewogene Monster-, Zauber- und Fallenkarten (ca. 20-22 Monster, 10-12 Zauber, 8-10 Fallen als Richtwert), 3) Konsistenz durch mehrfache Kopien wichtiger Karten, 4) Möglichkeiten zum Kartenziehen und Ressourcenmanagement, 5) Antworten auf gegnerische Strategien. Beginne mit einem bekannten Archetyp (Monstergruppe mit gemeinsamen Eigenschaften), baue darauf auf und passe es deinem Spielstil an. Teste dein Deck oft und nimm Anpassungen vor, wenn nötig."
    },
    {
      question: "Was ist das Extra-Deck und wozu dient es?",
      answer: "Das Extra-Deck enthält spezielle Monsterkarten, die nicht im Hauptdeck enthalten sind, sondern unter bestimmten Bedingungen während des Spiels beschworen werden können. Es kann bis zu 15 Karten enthalten und umfasst Fusion-, Synchro-, Xyz- und Link-Monster. Diese Monster haben oft mächtige Effekte und bilden das Rückgrat vieler moderner Strategien. Um sie zu beschwören, müssen bestimmte Materialien oder Bedingungen erfüllt werden, die auf den jeweiligen Karten angegeben sind."
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
      Von grundlegenden Spielregeln bis hin zu fortgeschrittenen Strategien - wir haben die wichtigsten 
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
                <p>{item.answer}</p>
              </div>
            {/if}
          </div>
        {/each}
      </div>
      
      <!-- Noch Fragen? Sektion -->
      <div class="more-questions">
        <h2>Noch Fragen?</h2>
        <p>
          Falls deine Frage hier nicht beantwortet wurde, kannst du gerne unsere 
          <a href="/about">About-Seite</a> besuchen oder mehr über die 
          <a href="/cards">Yu-Gi-Oh! Karten</a> erfahren. 
        </p>
        <p>
          Für offizielle Regelfragen empfehlen wir die 
          <a href="https://www.yugioh-card.com/en/rulebook/" target="_blank" rel="noopener noreferrer">offizielle Yu-Gi-Oh! Regelseite</a>.
        </p>
      </div>
    </div>
  </div>
</div>