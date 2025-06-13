import { useEffect, useRef, useState } from 'react';

export interface IPageTitleProps {
  title: string;
  className?: string;
  isHomePage?: boolean;
}

/**
 * PageTitle component with scroll animation for all pages
 * Shows a gradient title bar with green background and white text for non-homepage pages
 */
export default function PageTitle({ title, isHomePage = false, className = '' }: IPageTitleProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      // Use a lower threshold for the homepage to make the title appear earlier
      const maxScroll = isHomePage ? 1 : 300;
      const percentage = Math.min(scrolled / maxScroll, 1);
      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to get the initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Calculate styles based on scroll percentage
  const headerHeight = 0 - (scrollPercentage * 40); // shrink from 120px to 80px
  const fontSize = 2.5 - (scrollPercentage * 0.5); // shrink from 3rem to 2.5rem
  const opacity = Math.max(1 - scrollPercentage * 1.5, 0.7); // fade a bit on scroll

  // Different background for homepage vs other pages
  const backgroundClass = isHomePage
    ? 'bg-white'
    : 'bg-gradient-to-r from-green-800 to-green-700';

  const textColorClass = isHomePage ? 'text-green-800' : 'text-white';
  const leafBrightness = isHomePage ? '' : 'brightness-0 invert';

  return (
    <div
      ref={titleRef}
      className={`text-center w-full ${backgroundClass} relative z-40 left-0 right-0 transition-all duration-300 ${className}`}
      style={{
        height: `${headerHeight}px`,
        transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: scrollPercentage > 0.1 ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
        width: '100vw' // Ensure it spans full width
      }}
    >
      <div className="max-w-full h-full flex items-center justify-center px-6">
        <div className="flex items-center rtl:space-x-reverse">
          {/* Leaf icon that rotates slightly on scroll */}
          <img
            src="/assets/images/leaf.png"
            alt=""
            className={`h-8 w-auto ${leafBrightness} opacity-90 ml-0 mr-3 rtl:mr-0 rtl:ml-3`}
            style={{
              transform: `rotate(${scrollPercentage * 20}deg)`,
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />

          {/* Title and subtitle with smooth transitions */}
          <div className="flex flex-col items-start rtl:items-start">
            <h1
              className={`${textColorClass} font-bold leading-tight`}
              style={{
                fontSize: `${fontSize}rem`,
                opacity,
                transition: 'font-size 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {title}
            </h1>
          </div>
          {/* */}
        </div>
      </div>
    </div>

  );
}

