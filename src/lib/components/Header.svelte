<script>
  export let siteTitle = 'Roaham';
</script>

<header class="site-header">
    <div class="brand">
        <div class="logo" aria-hidden="true"></div>
        <h1>{siteTitle}</h1>
    </div>
    <nav class="site-nav">
        <a href="/proyectos">Proyectos</a>
        <a href="/blog">Blog</a>
        <a href="/intereses">Mis Intereses</a>
    </nav>
</header>

<style>
    .site-header {
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:28px 48px;
        box-sizing:border-box;
        color:var(--muted);
    }

    .brand {
        display:flex;
        align-items:center;
        gap:18px;
    }

    .logo {
        width:48px;
        height:48px;
        border-radius:8px;
        background:linear-gradient(135deg,#2b6cff,#6bd3ff);
        box-shadow:0 6px 24px rgba(43,108,255,0.18)
    }

    h1 {
        font-family:var(--display);
        font-weight:700;
        font-size:20px;
        margin:0;
        color:var(--text)
    }

    .site-nav {
        display: flex;
        flex-direction: column; 
        gap: 30px; 
    }

    .site-nav a {
        display: grid;
        color:var(--muted);
        text-decoration:none;
        transition: 0.2s;
        margin-left:20px;
        font-weight:600
    }

    .site-nav a:hover {
        color:var(--text);
        transform: scale(1.1);
        text-shadow: 
            0 0 5px #ffffff,
            0 0 15px #ffffff,
            0 0 30px #4c8bf5,
            0 0 50px #4c8bf5,
            0 0 100px rgb(140, 0, 255);
    }
</style>
