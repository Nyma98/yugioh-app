<script>
  import { goto } from '$app/navigation';

  function goToHome() {
    goto('/'); // Navigate to the homepage
  }
</script>

<div class="page-container">
  <nav class="navbar">
    <ul>
      <li><a href="/" on:click|preventDefault={goToHome}>Home</a></li> <!-- Refresh the page if already on Home -->
      <li><a href="#video">Video</a></li>
      <li><a href="/cards">Cards</a></li>
      <li><a href="/about">About</a></li> <!-- Link to the About page -->
    </ul>
  </nav>

  <div class="content">
    <h1 class="center-text">Welcome to Yugioh-App</h1>
    <p class="center-text-start">This is a SvelteKit app that provides information about Yugioh cards.</p>

    <h2 id="video" class="center-text">Yu-Gi-Oh Opening from the Anime</h2>
    <video class="video-container" autoplay muted loop>
      <source src="/YugiohVideo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <p class="center-text-start">Visit <a href="https://www.db.yugioh-card.com/yugiohdb/?request_locale=en">Yugioh Neuron</a> to read more about yugioh cards</p>

    <div id="cards" class="card-container">
      <h2 class="center-text">Popular Yugioh Cards</h2>
      <img src="/BlueEyesWhiteDragon.jpg" alt="BlueEyesWhiteDragon" width="200" />
      <p class="center-text">Blue Eyes White Dragon</p>
      <p class="center-text">Blue-Eyes White Dragon is one of the most iconic and powerful monsters in the Yu-Gi-Oh! trading card game and anime. With 3000 attack points, this legendary dragon is known for its overwhelming strength and majestic design. Often associated with the character Seto Kaiba, it symbolizes raw power and dominance on the battlefield. Its popularity has led to many variations, including fusion monsters like Blue-Eyes Ultimate Dragon and support cards that make it a staple in dragon-themed decks.
      </p>

      <img src="/DarkMagician.jpg" alt="DarkMagician" width="200" />
      <p class="center-text">Dark Magician</p>
      <p class="center-text">Dark Magician is the signature monster of Yugi Muto in the Yu-Gi-Oh! series and represents the pinnacle of magical power. With 2500 attack points and a sleek, mysterious design, it’s a symbol of strategy and wisdom rather than brute force. Often paired with support cards like Dark Magical Circle or Magician’s Rod, the Dark Magician is central to spellcaster decks and has remained a fan favorite since the game’s beginning.
      </p>

      <img src="/RedEyesBlackDragon.jpg" alt="RedEyesBlackDragon" width="200" />
      <p class="center-text">Red Eyes Black Dragon</p>
      <p class="center-text">Red-Eyes Black Dragon is a legendary monster in the Yu-Gi-Oh! universe, known for its fierce appearance and potential for powerful evolutions. Used by Joey Wheeler, it symbolizes growth, perseverance, and untapped strength. With 2400 attack points, it may seem weaker than other iconic dragons, but its true value lies in its vast support cards and fusion options like Red-Eyes Darkness Dragon and Red-Eyes Slash Dragon, making it a cornerstone of many fiery and aggressive deck strategies.
      </p>

      <img src="/Exodia.jpg" alt="Exodia" width="200" />
      <p class="center-text">Exodia The Forbidden One</p>
      <p class="center-text">Exodia the Forbidden One is one of the most legendary and feared monsters in the Yu-Gi-Oh! universe. Unlike other cards, Exodia is summoned by collecting all five of its pieces—head, arms, and legs—in your hand. When assembled, Exodia triggers an automatic win, making it a symbol of ultimate power and destiny. First used by Yugi Muto in a dramatic duel, Exodia represents the triumph of strategy and heart over brute force.
      </p>

      <img src="/DarkMagicianGirl.webp" alt="DarkMagicianGirl" width="200" />
      <p class="center-text">Dark Magician Girl</p>
      <p class="center-text">Dark Magician Girl is a beloved and powerful spellcaster in the Yu-Gi-Oh! series, known for her charming design and magical strength. As the apprentice of the Dark Magician, she gains additional power based on the number of Dark Magician or Magician of Black Chaos cards in the graveyard. Frequently used by Yugi Muto and featured in many themed decks, Dark Magician Girl has become an iconic fan-favorite, representing both elegance and magical potential on the battlefield.
      </p>

      <img src="/GaiaKnight.webp" alt="GaiaKnight" width="200" />
      <p class="center-text">Gaia The Fierce Knight</p>
      <p class="center-text">Gaia the Fierce Knight is a classic warrior monster from the Yu-Gi-Oh! series, known for his noble appearance and powerful cavalry charge. With 2300 attack points, he was one of Yugi Muto’s earliest strong monsters and remains a symbol of valor and determination. Gaia has inspired many upgraded forms, such as Gaia the Dragon Champion and Gaia the Magical Knight of Dragons, making him a versatile and respected figure in both lore and gameplay.
      </p>

      <p class="center-text-last">created by Nyma</p>
    </div>
  </div>
</div>



