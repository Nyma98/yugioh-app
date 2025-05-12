<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  />
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" defer></script>

  <!-- Navigate to the homepage -->
  <script>
    import { goto } from '$app/navigation';
  
    function goToHome() {
      goto('/'); 
    }
  </script>

</svelte:head>

<script>
  import "./styles.css"
</script>

  <slot />

  