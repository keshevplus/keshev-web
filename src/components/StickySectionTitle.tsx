import { useState, useEffect, useRef } from 'react';

const NAV_HEIGHT = 80;

// Full-width sticky bar showing the current section's title, so it stays
// visible even after its own green banner scrolls out of view - shown at
// every breakpoint (keshevplus.com's own version is mobile-only; this one
// isn't, per explicit request). Uses a CSS transition instead of
// framer-motion since this stack doesn't include that dependency.
export default function StickySectionTitle() {
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const headers = Array.from(document.querySelectorAll('[data-sticky-title]'));
        let current: string | null = null;
        for (const el of headers) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < NAV_HEIGHT) {
            current = el.getAttribute('data-sticky-title');
          }
        }
        setCurrentTitle(current);
        setVisible(!!current);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-16 lg:top-20 z-[9985] pointer-events-none overflow-hidden"
    >
      <div
        className="bg-gradient-to-b from-green-800 to-green-950 w-full transition-transform duration-200 ease-in-out"
        style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 text-center">
          <span className="text-sm sm:text-base font-bold text-white tracking-wide leading-tight">
            {currentTitle}
          </span>
        </div>
      </div>
    </div>
  );
}
