<script>
  export let projects = [
    {title:'Proyecto A', desc:'Demo proyecto A', href:'/proyectos'},
    {title:'Proyecto B', desc:'Demo proyecto B', href:'/proyectos'},
    {title:'Proyecto C', desc:'Demo proyecto C', href:'/proyectos'}
  ];
</script>

<section class="projects">
  <div class="grid">
    {#each projects as p}
      <a class="card" href={p.href}>
        <div class="thumb"></div>
        <div class="meta">
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
        </div>
      </a>
    {/each}
  </div>
</section>

<style>
  .projects{padding:48px}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:1200px;margin:0 auto}
  .card{display:flex;flex-direction:column;background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.08));padding:18px;border-radius:12px;text-decoration:none;color:var(--text);box-shadow:0 6px 18px rgba(2,6,23,0.5);transition:transform .22s ease,box-shadow .22s ease}
  .card:hover{transform:translateY(-8px);box-shadow:0 20px 40px rgba(2,6,23,0.6)}
  .thumb{height:160px;background:linear-gradient(135deg,#2b6cff,#6bd3ff);border-radius:8px;margin-bottom:12px}
  .meta h3{margin:0 0 6px 0}
  .meta p{margin:0;color:var(--muted)}
</style>
