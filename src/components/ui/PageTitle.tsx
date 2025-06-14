import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function PageTitle({ title }: { title: string }) {
  const { isScrolled } = useSelector((state: RootState) => state.sharedState);
  const [, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="text-center font-bold mb-6">
      <h1
        id="page-title"
        className={`sm:text-lg md:text-3xl lg:text-4xl bg-gradient-to-b from-green-800 to-green-950 text-white transition-all duration-300 ${
          isScrolled
            ? 'fixed top-[5rem] sm:top-[5rem] md:sm:top-[0.5rem] w-full px-4 py-2 shadow-md z-40'
            : 'relative  sm:py-6 px-0 shadow-md'
        }`}
      >
        {title}
      </h1>
    </div>
  );
}
