import { useEffect } from 'react';

export default function PageTitle({ title }: { title: string }) {
  useEffect(() => {
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
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="mb-4 text-center lg:text-nowrap py-8">
      <h1
        id="page-title"
        className="font-bold md:text-4xl text-3xl text-green-800"
      >
        {title}
      </h1>
    </div>
  );
}
