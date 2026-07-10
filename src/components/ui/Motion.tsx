'use client';

import { useEffect } from 'react';

/**
 * Progressive-enhancement motion layer. Attaches listeners to already-rendered
 * DOM so server components stay clean:
 *  - ambient blob parallax (mouse + scroll)
 * Fully disabled under `prefers-reduced-motion`. Card hover feedback (corner
 * brackets) is pure CSS — see `.card::after` / `.az-card::after` in globals.css.
 */
export default function Motion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cleanups: Array<() => void> = [];

    // ── Ambient parallax (mouse + scroll) ─────────────────────────
    const ambient = document.querySelector<HTMLElement>('.ambient');
    if (ambient) {
      let mx = 0;
      let my = 0;
      let sy = 0;
      const apply = () => {
        ambient.style.transform = `translate(calc(-50% + ${mx}px), ${sy + my}px)`;
      };
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 44;
        my = (e.clientY / window.innerHeight - 0.5) * 30;
        apply();
      };
      const onScroll = () => {
        sy = window.scrollY * 0.14;
        apply();
      };
      window.addEventListener('mousemove', onMouse);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      cleanups.push(() => {
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('scroll', onScroll);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
