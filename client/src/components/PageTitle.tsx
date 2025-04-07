import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function PageTitle({ title }: { title: string }) {
  const { isScrolled } = useSelector((state: RootState) => state.sharedState);
  const [animate, setAnimate] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 500); // Start animation after 500ms
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setAnimate(true);
        setIsSticky(true);
      } else {
        setAnimate(false);
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="my-auto text-center lg:text-nowrap py-2 lg:py-4">
      <h1
        id="page-title"
        className={`font-bold md:text-4xl text-3xl transition-all duration-1000 ease-in-out z-[10] ${
          animate
            ? isScrolled
              ? 'bg-gradient-to-b from-green-800 to-green-950 text-white opacity-100 py-1'
              : 'text-green-800 bg-white opacity-50'
            : 'bg-gradient-to-b from-green-800 to-green-950 text-white opacity-100 py-1'
        } ${isScrolled ? 'text-white ' : 'text-green-800 '} ${
          isSticky ? 'fixed top-[90px] w-full px-4' : 'md:text-lg'
        }`}
      >
        {title}
      </h1>
    </div>
  );
}
