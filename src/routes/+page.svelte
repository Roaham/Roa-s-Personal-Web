<script>
  import { onMount } from "svelte";

  let botones = ["INICIO", "PARTIDA", "AJUSTES", "GALERÍA", "SALIR"];
  let index = 0;

  // Ajustado para el nuevo tamaño de los botones (altura + margen)
  const ITEM_HEIGHT = 80; 

  function handleKey(e) {
    if (e.key === "ArrowUp") {
      index = index > 0 ? index - 1 : botones.length - 1;
    } else if (e.key === "ArrowDown") {
      index = (index + 1) % botones.length;
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });
</script>

<main>
  <video class="bg-video" autoplay muted loop playsinline>
    <source src="/bg.mp4" type="video/mp4">
  </video>
  
  <div class="bg-overlay"></div>

  <nav class="menu-wrapper">
    <div class="menu" style="--offset: {-index * ITEM_HEIGHT}px">
      {#each botones as btn, i}
        <button 
          class="btn"
          class:center={i === index}
          class:side={i !== index}
        >
          {btn}
        </button>
      {/each}
    </div>
  </nav>
</main>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    height: 100%;
    background: black;
    overflow: hidden;
    font-family: 'Segoe UI', Roboto, sans-serif;
  }

  main {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Capas de fondo */
  .bg-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .bg-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: radial-gradient(circle, rgba(0,0,0,0) 20%, rgba(0,0,0,0.8) 100%);
  }

  /* Contenedor del Menú */
  .menu-wrapper {
    position: relative;
    z-index: 10;
    height: 100px; /* Ventana de visualización */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(var(--offset));
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
  }

  .btn {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Tamaño aumentado */
    min-width: 280px;
    height: 50px;
    margin: 15px 0; /* Espaciado entre botones */
    padding: 10px 40px;
    
    font-size: 1.8rem;
    font-weight: 800;
    letter-spacing: 2px;
    text-align: center;
    color: white;
    text-transform: uppercase;
    
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 4px;
    border-left: 0px solid #fff;
    
    transition: all 0.4s ease;
  }

  /* Botón enfocado (Centro) */
  .btn.center {
    transform: scale(1.5);
    background: #ffffff;
    color: #000;
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
    border-left: 8px solid #4c8bf5;
  }

  /* Botones no enfocados */
  .btn.side {
    transform: scale(0.8);
    opacity: 0.3;
    filter: blur(2px);
  }
</style>