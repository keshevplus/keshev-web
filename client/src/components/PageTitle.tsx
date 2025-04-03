import { useEffect, useState } from 'react';

export default function PageTitle({ title }: { title: string }) {
  const [animate, setAnimate] = useState(false);
  const [secondAnimate, setSecondAnimate] = useState(false);

  useEffect(() => {
    const firstTimeout = setTimeout(() => setAnimate(true), 1000); // Trigger first animation after 1 second
    const secondTimeout = setTimeout(() => setSecondAnimate(true), 2000); // Trigger second animation after 2 seconds
    const resetTimeout = setTimeout(() => {
      setAnimate(false);
      setSecondAnimate(false);
    }, 4000); // Reset animation after 4 seconds to loop

    const handleScroll = () => {
      const pageTitle = document.getElementById('page-title');
      if (pageTitle) {
        if (window.scrollY > 10) {
          pageTitle.classList.add('relative', 'top-0', 'z-50');
        } else {
          pageTitle.classList.remove('relative', 'top-0', 'z-50');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
      clearTimeout(resetTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`mb-4 text-center transition-all duration-[1000ms] bounce lg:text-nowrap ${
        animate ? 'bg-gradient-to-b from-green-800 to-green-950' : 'bg-white'
      } ${secondAnimate ? 'px-72 py-8 text-center' : 'py-8'}`}
    >
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-[1000ms] ease-in-out ${
          animate ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
      <h1
        id="page-title"
        className={`font-bold transition-transform duration-[3000ms] ease-in-out ${
          animate ? 'text-white' : 'text-green-800'
        } ${
          secondAnimate
            ? 'md:text-4xl text-3xl translate-x-0'
            : 'md:text-3xl text-2xl md:translate-x-[calc(50%-4rem)]'
        }`}
      >
        {title}
      </h1>
    </div>
  );
}
