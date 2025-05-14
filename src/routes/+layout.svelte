<svelte:head>
  <title>Yu-Gi-Oh! Fan Portal</title>
  <meta name="description" content="Entdecke die Welt von Yu-Gi-Oh! mit Karten, Strategien und mehr" />
  <link rel="stylesheet" href="/src/routes/styles.css" />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" defer></script>
</svelte:head>

<script>
  import "./styles.css";

  // Initialize Bootstrap components after the page loads
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Initialize carousels if any exist on the page
    try {
      const carouselElements = document.querySelectorAll('.carousel');
      if (carouselElements.length > 0 && typeof bootstrap !== 'undefined') {
        carouselElements.forEach(carouselEl => {
          try {
            new bootstrap.Carousel(carouselEl, {
              interval: 5000,  // Set auto-slide interval (5 seconds)
              wrap: true       // Allow wrapping from last to first slide
            });
          } catch (e) {
            console.error('Fehler beim Initialisieren des Carousels:', e);
          }
        });
      }
    } catch (e) {
      console.error('Bootstrap-Fehler:', e);
    }
  });
</script>

<!-- Enhanced Navbar -->
<div class="page-container">
  <nav class="navbar">
    <div class="navbar-brand">
      <a href="/" class="logo-link">
        <img src="/yugioh-eye.webp" alt="Yu-Gi-Oh Eye - Home" class="navbar-logo" />
      </a>
    </div>
    <ul class="navbar-links">
      <li><a href="/">Home</a></li>
      <li><a href="/#video">Video</a></li>
      <li><a href="/cards">Cards</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>

  <slot />
</div>