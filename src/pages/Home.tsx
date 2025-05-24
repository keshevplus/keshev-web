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
      {/* Neural network animated background - with reduced density and speed */}
      {/* <NeuralBackground density={4} speed={3} opacity={0.3} /> */}
      
      {/* All content positioned with z-index to ensure it stays above background */}
      <div className="relative z-10"> 
    <div className="rtl">
      {/* Hero Section - New Layout */}
      
        <div className="container mx-auto px-4 py-0 md:py-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Hero Text Section */}
            <div className="w-full md:w-1/2 order-1 md:order-1">
              <img 
                src="/assets/images/logo.png" 
                alt="קשב פלוס" 
                className="w-56 md:w-96 mb-8 mx-auto drop-shadow-lg"
              />
              <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-green-800 mb-4 md:mb-6">
                {t('home.hero.title', 'ברוכים הבאים למרפאת "\קשב פלוס\"')}
              </h1>
              <p className="text-2xl md:text-2xl mb-8 text-gray-700">
                { pageData.body?.[0]?.heading || t('home.hero.subtitle', 'אבחון וטיפול מקצועי בהפרעות קשב וריכוז')}
              </p>
              <ul className="flex-row text-3xl md:text-3xl mb-8 text-green-800">
                {Array.isArray(pageData.body?.[0]?.body) && pageData.body[0].body.map((item, index) => (
                  <li key={`body-item-${index}`} 
                      className="inline mr-6 font-bold animate-pulse transition-opacity duration-500 ease-in-out hover:animate-none hover:opacity-100"
                      style={{ animationDelay: `${index * 300}ms` }}
                  >
                    {item.title || t(`home.hero[${index}]`, index === 0 ? 'ילדים' : index === 1 ? 'בני נוער' : 'מבוגרים')}
                  </li>
                ))}
              </ul>
                               
              <Link
                to="/about"
                className="inline-block bg-green-800 hover:bg-green-600 text-white px-8 py-4 rounded-md text-xl font-bold transition-colors duration-300 shadow-md hover:shadow-lg mx-4"
              >
                {t('home.hero.about', 'קראו עוד עלינו')}
              </Link>
              <Link
                to="/contact"
                className="inline-block bg-orange-400 hover:bg-orange-600 hover:text-white text-black px-8 py-4 rounded-md text-xl font-bold  transition-colors duration-300 shadow-md hover:shadow-lg mx-4"
              >
                {t('home.hero.contact', 'התחילו את האבחון שלכם עכשיו')}
              </Link>
            </div>

            {/* Hero Image Section */}
            <div className="w-full md:w-1/2 order-2 md:order-2 flex justify-center items-center">
              <img 
                src="/assets/images/doctor-hero.png" 
                alt="רופא מקצועי" 
                className="w-full max-w-xs sm:max-w-sm md:max-w-[50vw] h-auto rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="pt-16 pb-6 md:pt-20 md:pb-6 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('home.cta.title', 'מוכנים להתחיל?')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('home.cta.subtitle', 'פנה אלינו היום כדי לקבוע את האבחון שלך ולקחת את הצעד הראשון לקראת חיים טובים יותר.')}
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[#F7941D] text-black px-8 py-4 rounded-md text-lg font-bold hover:bg-white hover:text-[#005BAA] transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            {t('home.cta.button', 'צרו קשר עכשיו')}
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
