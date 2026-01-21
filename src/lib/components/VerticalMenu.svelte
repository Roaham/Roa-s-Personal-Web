<script>
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import { botones, index, menuVisible, exiting, entering, handleMenuKey } from "$lib/stores/menu";
    import { goto } from "$app/navigation";

    const ITEM_HEIGHT = 90;

    let bounce = false;
    let _bounceTimeout;

    // Manual subscriptions should be guarded or handled via reactive statements
    const unsubscribe = index.subscribe((v) => {
        if (!browser) return;
        bounce = true;
        clearTimeout(_bounceTimeout);
        _bounceTimeout = setTimeout(() => (bounce = false), 420);
    });

    onMount(() => {
        // This ONLY runs in the browser
        window.addEventListener("keydown", handleMenuKey);
        
        // Clean up inside onMount is safer
        return () => {
            window.removeEventListener("keydown", handleMenuKey);
        };
    });

    onDestroy(() => {
        unsubscribe();
        if (browser) {
            clearTimeout(_bounceTimeout);
        }
    });

    function handleTransitionEnd(e) {
        if (e.target !== e.currentTarget) return;

        if ($exiting) {
            const selected = $index;
            menuVisible.set(false);
            exiting.set(false);

            if (browser) {
                requestAnimationFrame(() => {
                    switch (selected) {
                        case 0: goto("/home"); break;
                        case 1: goto("/proyectos"); break;
                        case 2: goto("/games"); break;
                        case 3: goto("/redes"); break;
                    }
                });
            }
        }
    }
</script>

<nav class="menu-wrapper" class:hidden={!$menuVisible}>
    <div
        class="menu"
        class:exiting={$exiting}
        class:entering={$entering}
        style="--offset: ${-($index ?? 0) * ITEM_HEIGHT}px"
        on:transitionend={handleTransitionEnd}
    >
        {#each botones as btn, i}
        <button
            class="btn"
            class:center={i === $index}
            class:side={i !== $index}
            class:exiting={$exiting}
            style="--btn-index: {i}"
            on:mouseenter={() => index.set(i)}
            on:focus={() => index.set(i)}
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

    .btn {
        all: unset;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        min-width: 360px;
        height: 68px;
        margin: 14px 0;
        padding: 10px 40px;
        font-size: 1.9rem;
        font-weight: 800;
        letter-spacing: 2px;
        color: #dfefff;
        text-transform: uppercase;
        background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.12));
        border-radius: 10px;
        cursor: pointer;
        transition: transform 0.35s ease, opacity 0.35s ease, filter 0.35s ease, box-shadow 0.35s ease;
        box-shadow: inset 0 -2px 0 rgba(0,0,0,0.3);
    }

    .btn.center {
        transform: scale(1.28);
        background: linear-gradient(180deg, #ffffff, #dfefff);
        color: #001018;
        box-shadow: 0 0 30px rgba(76,139,245,0.45), inset 0 -4px 12px rgba(0,0,0,0.25);
        border-left: 8px solid #3aa0ff;
    }

    .btn.side {
        transform: scale(0.86);
        opacity: 0.22;
        filter: blur(1.4px);
    }
</style>
