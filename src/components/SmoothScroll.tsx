import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useStore } from '../store';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const setScrollProgress = useStore((state) => state.setScrollProgress);

  useEffect(() => {
    // Disable heavy smooth scroll on mobile devices with touch to preserve native 120Hz scrolling
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    const lenis = new Lenis({
      duration: isTouch ? 0.8 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', (e: any) => {
      setScrollProgress(e.progress);
    });

    let rafId: number;
    function raf(time: number) {
      if (!document.hidden) {
        lenis.raf(time);
      }
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      lenis.destroy();
    };
  }, [setScrollProgress]);

  return <>{children}</>;
}
