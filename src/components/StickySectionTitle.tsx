import { useState, useEffect, useRef } from 'react';

const FALLBACK_NAV_HEIGHT = 80;

function getNavHeight() {
  if (typeof document === 'undefined') return FALLBACK_NAV_HEIGHT;
  const nav = document.querySelector<HTMLElement>('[data-site-navbar]');
  return nav?.getBoundingClientRect().height || FALLBACK_NAV_HEIGHT;
}

// Full-width sticky bar showing the current section's title on mobile and
// tablet, so it stays visible after its own green banner scrolls out of view.
// Uses a CSS transition instead of framer-motion since this stack doesn't
// include that dependency.
export default function StickySectionTitle() {
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [navHeight, setNavHeight] = useState(FALLBACK_NAV_HEIGHT);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const currentNavHeight = getNavHeight();
        setNavHeight(currentNavHeight);
        const headers = Array.from(document.querySelectorAll('[data-sticky-title]'));
        let current: string | null = null;
        for (const el of headers) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < currentNavHeight) {
            current = el.getAttribute('data-sticky-title');
          }
        }
        setCurrentTitle(current);
        setVisible(!!current);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 z-[9985] pointer-events-none overflow-hidden lg:hidden"
      style={{ top: navHeight }}
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
