<!-- Navbar -->
<div class="page-container">
  <nav class="navbar">
    <!-- Yu-Gi-Oh! Eye Symbol -->
    <img src="/yugioh-eye.webp" alt="Yu-Gi-Oh Eye" class="navbar-logo" />
    <!-- Navigation Links -->
    <ul class="navbar-links">
      <li><a href="/" on:click|preventDefault={goToHome}>Home</a></li>
      <li><a href="#video">Video</a></li>
      <li><a href="/cards">Cards</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>

  <!-- At the top -->
  <div class="content">
    <h1 class="center-text">Welcome to Yugioh-App</h1>
    <p class="center-text-start">Welcome to DuelZone – Your Ultimate Yu-Gi-Oh! Hub!
      Dive into the world of Yu-Gi-Oh! with card guides, deck strategies, tournament news, and everything you need to become a true Duelist. Whether you’re a beginner or a pro, you’ll find the tools to sharpen your skills and master the heart of the cards.</p>

    <h2 id="video" class="center-text">Yu-Gi-Oh Opening from the Anime</h2>
    <video class="video-container" autoplay muted loop>
      <source src="/YugiohVideo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <h2 class="center-text">Popular Yugioh Cards</h2>

    <!-- Carousel of Cards -->
    <div class="container mt-5">
      <div id="carouselBeispiel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <!-- Carousel items -->
          <!-- Each item represents a card with an image and description -->
          <div class="carousel-item active">
            <img src="/BlueEyesWhiteDragon.jpg" class="d-block w-100" alt="Blue Eyes White Dragon" />
            <div class="carousel-caption-text">
              <h5>Blue Eyes White Dragon</h5>
              <p>Blue-Eyes White Dragon is one of the most iconic and powerful monsters in the Yu-Gi-Oh! trading card game and anime. With 3000 attack points, this legendary dragon is known for its overwhelming strength and majestic design. Often associated with the character Seto Kaiba, it symbolizes raw power and dominance on the battlefield. Its popularity has led to many variations, including fusion monsters like Blue-Eyes Ultimate Dragon and support cards that make it a staple in dragon-themed decks.</p>
            </div>
          </div>
    
          <div class="carousel-item">
            <img src="/DarkMagician.jpg" class="d-block w-100" alt="Dark Magician" />
            <div class="carousel-caption-text">
              <h5>Dark Magician</h5>
              <p>Dark Magician is the signature monster of Yugi Muto in the Yu-Gi-Oh! series and represents the pinnacle of magical power. With 2500 attack points and a sleek, mysterious design, it’s a symbol of strategy and wisdom rather than brute force. Often paired with support cards like Dark Magical Circle or Magician’s Rod, the Dark Magician is central to spellcaster decks and has remained a fan favorite since the game’s beginning.</p>
            </div>
          </div>
    
          <div class="carousel-item">
            <img src="/RedEyesBlackDragon.jpg" class="d-block w-100" alt="Bild 3" />
            <div class="carousel-caption-text">
              <h5>Red Eyes Black Dragon</h5>
              <p>Red-Eyes Black Dragon is a legendary monster in the Yu-Gi-Oh! universe, known for its fierce appearance and potential for powerful evolutions. Used by Joey Wheeler, it symbolizes growth, perseverance, and untapped strength. With 2400 attack points, it may seem weaker than other iconic dragons, but its true value lies in its vast support cards and fusion options like Red-Eyes Darkness Dragon and Red-Eyes Slash Dragon, making it a cornerstone of many fiery and aggressive deck strategies.
              </p>
            </div>
          </div>

          <div class="carousel-item">
            <img src="/Exodia.jpg" class="d-block w-100" alt="Bild 3" />
            <div class="carousel-caption-text">
              <h5>Exodia The Forbidden One</h5>
              <p>Exodia the Forbidden One is one of the most legendary and feared monsters in the Yu-Gi-Oh! universe. Unlike other cards, Exodia is summoned by collecting all five of its pieces—head, arms, and legs—in your hand. When assembled, Exodia triggers an automatic win, making it a symbol of ultimate power and destiny. First used by Yugi Muto in a dramatic duel, Exodia represents the triumph of strategy and heart over brute force.
              </p>
            </div>
          </div>

          <div class="carousel-item">
            <img src="/DarkMagicianGirl.webp" class="d-block w-100" alt="Bild 3" />
            <div class="carousel-caption-text">
              <h5>Dark Magician Girl</h5>
              <p>Dark Magician Girl is a beloved and powerful spellcaster in the Yu-Gi-Oh! series, known for her charming design and magical strength. As the apprentice of the Dark Magician, she gains additional power based on the number of Dark Magician or Magician of Black Chaos cards in the graveyard. Frequently used by Yugi Muto and featured in many themed decks, Dark Magician Girl has become an iconic fan-favorite, representing both elegance and magical potential on the battlefield.
              </p>
            </div>
          </div>
        </div>
    
        <!-- Navigation für Carousel of Cards -->
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselBeispiel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Zurück</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselBeispiel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Weiter</span>
        </button>
      </div>
    </div>
    <!-- Footer -->
    <p class="center-text-start">Visit <a href="https://www.db.yugioh-card.com/yugiohdb/?request_locale=en">Yugioh Neuron</a> to read more about yugioh cards</p>
  </div>
</div>