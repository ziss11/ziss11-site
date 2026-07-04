'use client';

import { useEffect } from 'react';

/**
 * Progressive-enhancement motion layer. Attaches listeners to already-rendered
 * DOM so server components stay clean:
 *  - cursor spotlight on `.card` / `.az-card`
 *  - subtle 3D tilt on `.tilt`
 *  - ambient blob parallax (mouse + scroll)
 * Fully disabled under `prefers-reduced-motion`.
 */
export default function Motion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cleanups: Array<() => void> = [];

    // ── Cursor spotlight ──────────────────────────────────────────
    const lit = Array.from(
      document.querySelectorAll<HTMLElement>('.card, .az-card')
    );
    lit.forEach((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
        el.classList.add('is-lit');
      };
      const leave = () => el.classList.remove('is-lit');
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      });
    });

    // ── 3D tilt ───────────────────────────────────────────────────
    const tilts = Array.from(document.querySelectorAll<HTMLElement>('.tilt'));
    tilts.forEach((el) => {
      // pointermove is already coalesced to the frame rate by the browser,
      // so applying directly stays smooth without an extra rAF hop.
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1000px) rotateY(${px * 5}deg) rotateX(${
          -py * 5
        }deg)`;
      };
      const leave = () => {
        el.style.transform = '';
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      });
    });

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
