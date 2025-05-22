<!-- Einfache Version des Yu-Gi-Oh Layouts ohne Hintergrundsymbole -->

<script>
  // Importiere Bootstrap CSS und JS
  import "./styles.css";

  // Importiere Bootstrap CSS und JS
  import { onMount } from "svelte";
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props();

  // Initialisiere Bootstrap Carousel
  // und füge Auto-Slide und Wrap-Effekt hinzu
  onMount(() => {
    try {
      const carouselElements = document.querySelectorAll(".carousel");
      if (carouselElements.length > 0 && typeof bootstrap !== "undefined") {
        carouselElements.forEach((carouselEl) => {
          try {
            new bootstrap.Carousel(carouselEl, {
              interval: 5000, // Auto-Slide alle 5 Sekunden
              wrap: true, // Wrap-Effekt aktivieren
            });
          } catch (e) {
            console.error("Fehler beim Initialisieren des Carousels:", e);
          }
        });
      }
    } catch (e) {
      console.error("Bootstrap-Fehler:", e);
    }
  });
</script>

<!-- Navbar und Seiteninhalt -->
<div class="page-container">
  <nav class="navbar">
    <div class="navbar-brand">
      <a href="/" class="logo-link">
        <img
          src="/yugioh-eye.webp"
          alt="Yu-Gi-Oh Eye - Home"
          class="navbar-logo"
        />
      </a>
    </div>
    <ul class="navbar-links">
      <li><a href="/">Home</a></li>
      <li><a href="/cards">Cards</a></li>
      <li><a href="/favorites">Favorites</a></li>
      <li><a href="/faq">FAQ</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>

  {@render children?.()}
</div>