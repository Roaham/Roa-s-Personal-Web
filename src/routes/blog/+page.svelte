<script>
    import { onMount } from 'svelte';
    export let data; // Aquí vienen los posts del server
    import BlogCard from '$lib/components/BlogCard.svelte';

    const posts = data?.posts ?? [];

    let container;
    let page = 0;
    let itemsPerPage = 6;
    let visible = [];

    function updateVisible() {
        visible = posts.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
    }

    function computeItemsPerPage() {
        if (!container) return;

        // base column width from CSS minmax(280px)
        const containerWidth = container.clientWidth || window.innerWidth;
        const columnMin = 280;
        const columns = Math.max(1, Math.floor(containerWidth / columnMin));

        // estimate card height (including gap); we'll use 320px as safe default
        const availableHeight = Math.max(200, window.innerHeight - 180); // leave space for header/title
        const cardHeight = 320;
        const rows = Math.max(1, Math.floor(availableHeight / cardHeight));

        itemsPerPage = Math.max(1, columns * rows);
        page = Math.min(page, Math.floor(Math.max(0, posts.length - 1) / itemsPerPage));
        updateVisible();
    }

    function gotoPage(p) {
        page = Math.max(0, Math.min(p, Math.ceil(posts.length / itemsPerPage) - 1));
        updateVisible();
        // scroll top of container when changing page
        container?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    onMount(() => {
        computeItemsPerPage();
        window.addEventListener('resize', computeItemsPerPage);
        return () => window.removeEventListener('resize', computeItemsPerPage);
    });

    $: updateVisible();
</script>

<main>
  <h1>EL RINCON DE ROAHAM</h1>

  <div bind:this={container} class="grid-viewport">
    <div class="grid">
      {#each visible as post}
        <BlogCard {...post} slug={post.slug} />
      {/each}
    </div>
  </div>

  {#if posts.length > itemsPerPage}
    <div class="pagination">
      <button on:click={() => gotoPage(page - 1)} disabled={page === 0}>Anterior</button>
      {#each Array(Math.ceil(posts.length / itemsPerPage)) as _, i}
        <button
          class:active={i === page}
          on:click={() => gotoPage(i)}
        >{i + 1}</button>
      {/each}
      <button on:click={() => gotoPage(page + 1)} disabled={page >= Math.ceil(posts.length / itemsPerPage) - 1}>Siguiente</button>
    </div>
  {/if}
</main>

<style>
    main {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      overflow: visible;
    }

    .grid {
        display: grid;
        /* Define columnas responsivas */
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        /* Alineación para que no todas midan lo mismo en la misma fila */
        align-items: start; 
        gap: 1.5rem;
    }

    .grid-viewport {
      height: calc(100vh - 180px);
      padding: 1.5rem 0;
    }

    .pagination {
      display: flex;
      gap: 8px;
      justify-content: center;
      padding: 16px 0 48px;
    }

    .pagination button {
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.06);
      background: transparent;
      color: var(--text);
      cursor: pointer;
    }

    .pagination button[disabled] {
      opacity: 0.4;
      cursor: default;
    }

    .pagination button.active {
      background: linear-gradient(180deg,#ffffff, #dfefff);
      color: #001018;
      border-color: rgba(0,0,0,0.12);
    }
</style>