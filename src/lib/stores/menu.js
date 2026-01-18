import { writable } from "svelte/store";

export const botones = ["INICIO", "PROYECTOS", "ACERCA", "CONTACTO"];
export const index = writable(0);

export const menuVisible = writable(true);
export const exiting = writable(false);
export const entering = writable(false);

export function handleMenuKey(e) {
  if (["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(e.key)) {
    e.preventDefault();
  }

  if (e.key === "Enter") {
    exiting.set(true);
    return;
  }

  if (e.key === "Escape") {
    menuVisible.update((v) => {
      if (v) return v;

      entering.set(true);
      requestAnimationFrame(() => entering.set(false));
      return true;
    });

    exiting.set(false);
    return;
  }

  index.update((i) => {
    if (e.key === "ArrowUp") return i > 0 ? i - 1 : botones.length - 1;
    if (e.key === "ArrowDown") return (i + 1) % botones.length;
    return i;
  });
}
