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
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
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
    <div className="my-auto text-center lg:text-nowrap font-bold mb-8">
      <h1
        id="page-title"
        className={`md:text-3xl lg:text-4xl bg-gradient-to-b from-green-800 to-green-950 text-white opacity-100 transition-all duration-500 ${
          animate ? (isScrolled ? 'py-1' : 'py-8') : 'py-1'
        } ${isSticky ? 'fixed top-[70px] w-full px-4' : 'md:text-lg'}`}
      >
        {title}
      </h1>
    </div>
  );
}
