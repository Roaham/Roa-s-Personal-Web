<script>
  export let title = "Hiiiii!, I'm Roaham";
  export let subtitle = "I made some webs d:";
</script>

<section class="hero">
    <div class="hero-inner">
        <h2 class="hero-title">{title}</h2>
        <p class="hero-sub">{subtitle}</p>
    </div>
</section>

<style>
  .hero{width:100%;padding:64px 48px;box-sizing:border-box;display:flex;align-items:center;justify-content:center}
  .hero-inner{max-width:1100px}
  .hero-title{font-family:var(--display);font-size:64px;line-height:0.95;margin:0;color:var(--text)}
  .hero-sub{margin-top:18px;font-size:18px;color:var(--muted);max-width:70%}
</style>
