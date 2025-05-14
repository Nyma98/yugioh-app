<svelte:head>
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
    const carouselElements = document.querySelectorAll('.carousel');
    if (carouselElements.length > 0) {
      carouselElements.forEach(carouselEl => {
        new bootstrap.Carousel(carouselEl, {
          interval: 5000,  // Set auto-slide interval (5 seconds)
          wrap: true       // Allow wrapping from last to first slide
        });
      });
    }
  });
</script>

<!-- Enhanced Navbar -->
<div class="page-container">
  <nav class="navbar">
    <div class="navbar-brand">
      <img src="/yugioh-eye.webp" alt="Yu-Gi-Oh Eye" class="navbar-logo" />
    </div>
    <ul class="navbar-links">
      <li><a href="/">Home</a></li>
      <li><a href="#video">Video</a></li>
      <li><a href="/cards">Cards</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>

  <slot />
</div>