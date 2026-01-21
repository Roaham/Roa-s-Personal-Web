import { writable, get } from "svelte/store";

export const botones = ["HOME", "PROYECTOS", "GAMES", "REDES"];
export const index = writable(0);

export const menuVisible = writable(true);
export const exiting = writable(false);
export const entering = writable(false);

export function handleMenuKey(e) {
  if (["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(e.key)) {
    e.preventDefault();
  }

  if (e.key === "Enter") {
    if (get(menuVisible)) {
      exiting.set(true);
    }
    return;
  }

  if (e.key === "Escape") {
    // Toggle menu: if open -> close, if closed -> open with entering animation
    menuVisible.update((v) => {
      if (v) {
        // close
        exiting.set(false);
        return false;
      } else {
        // open with entering animation
        entering.set(true);
        requestAnimationFrame(() => entering.set(false));
        return true;
      }
    });

    return;
  }

  index.update((i) => {
    if (e.key === "ArrowUp") return i > 0 ? i - 1 : botones.length - 1;
    if (e.key === "ArrowDown") return (i + 1) % botones.length;
    return i;
  });
}
