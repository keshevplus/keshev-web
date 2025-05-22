import { useEffect, useState } from 'react';

export default function PageTitle({ title }: { title: string }) {
  // Track both scroll state (for animation) and scroll percentage (for smooth transition)
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile based on screen width
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Standard mobile breakpoint
    };
    
    // Initial check
    checkIfMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    // Handle scroll event with viewport percentage-based thresholds
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Use a very small threshold - just enough to detect intentional scrolling
      const threshold = 50; // Fixed at 50px regardless of device
      const transitionRange = 100; // Short transition range for quick effect
      
      // Calculate scroll percentage for smooth transitions (0 to 1)
      let percentage = 0;
      if (scrollPosition > threshold) {
        percentage = Math.min((scrollPosition - threshold) / transitionRange, 1);
        setIsScrolledPast(true);
      } else {
        setIsScrolledPast(false);
      }
      setScrollPercentage(percentage);
      
      console.log(`[PageTitle] Scroll: ${scrollPosition}px, Mobile: ${isMobile}, Threshold: ${threshold}px, Percentage: ${(percentage * 100).toFixed(0)}%, Shrunk: ${scrollPosition > threshold}`);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check on mount
    handleScroll();
    
    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate styles based on scroll percentage for smooth transitions
  const navbarHeight = 70; // Approximate height of navbar in pixels
  
  // Calculate styles based on scroll percentage and device type
  // Use fixed height with flexbox for vertical centering instead of padding
  const heightValue = isScrolledPast
    ? isMobile ? '50px' : '50px' // Fixed height when scrolled (smaller)
    : isMobile ? '80px' : '100px'; // Fixed height when not scrolled (larger)
    
  // Text size should be one level smaller when shrunk
  const fontSize = isScrolledPast
    ? isMobile ? '0.9rem' : '1.5rem' // Fixed smaller size when scrolled (down one level)
    : isMobile ? '1.5rem' : '2.2rem';
    
  // Always position right below the navbar to ensure phone number visibility
  const top = isScrolledPast
    ? `${navbarHeight + 5}px` // Add 5px extra padding at the top when fixed
    : '0';
  
  return (
    <div className="text-center font-bold mb-6 relative">
      {/* Placeholder div to prevent content jump when title becomes fixed */}
      <div
        className={`w-full transition-all duration-300`}
        style={{ height: isScrolledPast ? `${navbarHeight + (isMobile ? 50 : 80)}px` : '0' }}
      />
      
      <h1
        id="pageTitleBg"
        style={{
          height: heightValue,
          fontSize: fontSize,
          top: top,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className={`bg-gradient-to-b from-green-800 to-green-950 text-white transition-all duration-300 ease-in-out ${
          isScrolledPast
            ? 'fixed left-0 right-0 w-full shadow-md z-40 mt-3' // Added mt-4 to create top margin when shrunk
            : 'relative shadow-md'
        }`}
      >
        {title}
      </h1>
    </div>
  );
}
