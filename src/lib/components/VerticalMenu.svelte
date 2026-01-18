<script>
  import { onMount } from "svelte";
  import { botones, index, menuVisible, exiting, entering, handleMenuKey } from "$lib/stores/menu";
  import { goto } from "$app/navigation";

  const ITEM_HEIGHT = 80;

  onMount(() => {
    window.addEventListener("keydown", handleMenuKey);
    return () => window.removeEventListener("keydown", handleMenuKey);
  });

    function handleTransitionEnd(e) {
    if (e.target !== e.currentTarget) return;

    if ($exiting) {
        const selected = $index;
        menuVisible.set(false);
        exiting.set(false);

        requestAnimationFrame(() => {
        switch (selected) {
            case 0: goto("/"); break;
            case 1: goto("/proyects"); break;
            case 2: goto("/acerca"); break;
            case 3: goto("/contacto"); break;
        }
        });
    }
    }
</script>

<nav class="menu-wrapper" class:hidden={!$menuVisible}>
    <div
        class="menu"
        class:exiting={$exiting}
        class:entering={$entering}
        style="--offset: ${-($index ?? 0) * ITEM_HEIGHT}px"
        on:transitionend={(e) => {
            if (e.target !== e.currentTarget) return;

            if ($exiting) {
            const selected = $index;
            exiting.set(false);
            menuVisible.set(false);

            requestAnimationFrame(() => {
                switch (selected) {
                case 0: goto("/"); break;
                case 1: goto("/proyectS"); break;
                case 2: goto("/acerca"); break;
                case 3: goto("/contacto"); break;
                }
            });
            }
        }}
    >
        {#each botones as btn, i}
        <button
            class="btn"
            class:center={i === $index}
            class:side={i !== $index}
            class:exiting={$exiting}
            style="--btn-index: {i}"
        >
            {btn}
        </button>
        {/each}
    </div>
</nav>

<style>
    .menu-wrapper {
        position: relative;
        z-index: 10;
        height: 100vh;
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

    .menu.exiting {
        transform: translateY(-120vh);
        opacity: 0;
        transition:
            transform 0.35s cubic-bezier(0.4, 0, 1, 1),
            opacity 0.2s linear;
    }

    .menu.entering {
        transform: translateY(-120vh);
        opacity: 0;
        transition:
            transform 0.35s cubic-bezier(0.4, 0, 1, 1),
            opacity 0.2s linear;
    }

    .btn {
        all: unset;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 300px;
        height: 60px;
        margin: 15px 0;
        padding: 10px 50px;
        font-size: 2rem;
        font-weight: 800;
        letter-spacing: 2px;
        color: #fff;
        text-transform: uppercase;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(8px);
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.4s ease, opacity 0.4s ease, filter 0.4s ease, background 0.4s ease;
    }

    .btn.center {
        transform: scale(1.5);
        background: #fff;
        color: #000;
        box-shadow: 0 0 20px #fff, 0 0 60px #4c8bf5;
        border-left: 6px solid #4c8bf5;
    }

    .btn.side {
        transform: scale(0.8);
        opacity: 0.3;
        filter: blur(2px);
    }

    .btn.exiting {
        transform: translate(calc(200px - var(--btn-index)*50px), -300px) rotate(15deg) scale(0.3);
        opacity: 0;
        transition: transform 0.8s ease-in, opacity 0.8s ease-in;
    }
</style>
