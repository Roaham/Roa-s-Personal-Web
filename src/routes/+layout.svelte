<script>
	import { goto } from '$app/navigation';
	import { menuVisible } from '$lib/stores/menu';
	import '$lib/styles/global.css';
	import favicon from '$lib/assets/favicon.svg';

	function handleGlobalKey(e) {
		if (e.key === 'Escape') {
			e.preventDefault();
			menuVisible.set(true);
			goto('/');
		}
	}
</script>

<svelte:window onkeydown={handleGlobalKey} />

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<main>
	<video class="bg-video" autoplay muted loop playsinline>
		<source src="/bg.mp4" type="video/mp4" />
	</video>

	<div class="bg-overlay"></div>

	<div class="content">
		<slot />
	</div>
</main>

<style>
	main {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

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
		background: radial-gradient(
			circle,
			rgba(0, 0, 0, 0) 20%,
			rgba(0, 0, 0, 0.8) 100%
		);
	}

	.content {
		position: relative;
		z-index: 10;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
