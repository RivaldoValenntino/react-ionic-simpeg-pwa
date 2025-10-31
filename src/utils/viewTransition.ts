// src/utils/viewTransition.ts
export function startViewTransition(callback: () => void) {
  if ("startViewTransition" in document) {
    return document.startViewTransition(callback);
  } else {
    // fallback: jalankan langsung tanpa animasi
    callback();
    return null;
  }
}
