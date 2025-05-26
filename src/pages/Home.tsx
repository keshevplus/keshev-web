import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { HomePageContent } from '../types/content';
// import NeuralBackground from '../components/NeuralBackground';

export default function Home() {
  const [pageData, setPageData] = useState<HomePageContent | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    import('../data/homePage').then(module => {
      setPageData(module.default);
    });
  }, []);

  if (!pageData) {
    return (
      <div className="container mx-auto max-w-full md:max-w-[75%] py-4 loading">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* <NeuralBackground density={4} speed={3} opacity={0.3} /> */}
      <div className="relative z-10">
        <div className="rtl">
          <div className="container mx-auto px-4 py-0 md:py-0">
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              <div className="xl:w-full md:w-2/7 order-1 px-2 sm:px-4 flex flex-col items-center text-center whitespace-pre-line">
 