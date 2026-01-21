<script>
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import ProjectsGrid from '$lib/components/ProjectsGrid.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<Header siteTitle="Roaham" />
<main>
  <Hero title="Hiiiii! --- I'm Roaham" subtitle="I am a web developer :D" />
  <section class="container">
    <ProjectsGrid />
  </section>
</main>
<Footer />
