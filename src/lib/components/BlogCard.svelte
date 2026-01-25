<script>
  import { goto } from '$app/navigation';

  export let title = "Sin título";
  export let content = "";
  export let image = null;
  export let tags = [];
  export let slug = null;

  function open() {
    if (slug) goto(`/blog/${slug}`);
  }
</script>

<a class="card" href="#" on:click|preventDefault={open}>
  {#if image}
    <img src={image} alt={title} class="card-image" />
  {/if}

  <div class="card-body">
    <h3>{title}</h3>
    <p>{content}</p>
    
    <div class="tags">
      {#each tags as tag}
        <span>#{tag}</span>
      {/each}
    </div>
  </div>
</a>

<style>
    h3 {
        font-family: var(--display);
    }

    .card {
        font-family: var(--ui);
        background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.08));
        padding: 18px;
        border-radius: 12px;
        text-decoration: none;
        color:var(--text);
        box-shadow:0 6px 18px rgba(2,6,23,0.5);
        height: fit-content; 
        display: flex;
        flex-direction: column;
        gap: 1rem;
        transition:transform .22s ease,box-shadow .22s ease
    }

    .card:hover {
        transform:translateY(-8px);
        box-shadow:0 20px 40px rgba(2,6,23,0.6)
    }

    p {
        color: var(--text);
        line-height: 1.5;
        margin: 0;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        font-size: 0.8rem;
        color:var(--text);
        text-shadow: 
            0 0 5px #ffffff,
            0 0 15px #ffffff,
            0 0 30px #4c8bf5,
            0 0 50px #4c8bf5,
            0 0 100px rgb(140, 0, 255);
    }

    .card-image {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 0.5rem;
    }

    .card-body {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }
</style>
