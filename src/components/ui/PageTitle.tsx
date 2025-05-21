import { useEffect, useState } from 'react';

export default function PageTitle({ title }: { title: string }) {
  const [isScrolledPast250, setIsScrolledPast250] = useState(false);

  useEffect(() => {
    // Handle scroll event to detect when page is scrolled past 250px
    const handleScroll = () => {
      setIsScrolledPast250(window.scrollY > 250);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="text-center font-bold mb-6">
      <h1
        id="pageTitleBg"
        className={`sm:text-lg md:text-3xl lg:text-4xl bg-gradient-to-b from-green-800 to-green-950 text-white transition-all duration-300 ${
          isScrolledPast250
            ? 'fixed top-[90px] left-0 right-0 w-full px-4 py-2 shadow-md z-40 text-sm md:text-xl lg:text-2xl'
            : 'relative sm:py-6 md:py-8 lg:py-10 px-0 shadow-md'
        }`}
      >
        {title}
      </h1>
    </div>
  );
}
