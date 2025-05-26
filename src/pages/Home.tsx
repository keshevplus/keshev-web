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
          <div className="flex flex-col md:flex-row items-center  gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {/* Hero Text Section */}
            <div className="xl:w-full md:w-2/7 order-1 px-2 sm:px-4 flex flex-col items-center  text-center whitespace-pre-line">
            <h1 className="lg:text-5xl md:text-4xl sm:text-3xl font-bold text-green-800 mb-4">
                {pageData.heading || 'ברוכים הבאים למרפאת "קשב פלוס"'}
              </h1>
               <img 
                src="/assets/images/logo.png" 
                alt="קשב פלוס" 
                className="w-48  sm:w-64 md:w-72 lg:w-72 mb-6 md:mb-8 drop-shadow-lg mx-auto"
              />
            
              <p className="flex  justify-start text-lg sm:text-lg md:text-2xl lg:text-3xl mb-3 md:mb-3 text-gray-700 flex-wrap text-justify leading-normal ">
                {/*{ pageData.title || 'אבחון וטיפול מקצועי בהפרעות קשב וריכוז'} */}
                { pageData.title || 'אבחון וטיפול מקצועי בהפרעות קשב וריכוז'}
                {/* Animated text cycling through words */}
                <span className="relative inline-block whitespace-nowrap">
                  {Array.isArray(pageData.list) && pageData.list.map((item, index) => (
                    <span 
                      key={`list-item-${index}`}
                      className="absolute top-0 right-0 font-bold opacity-0 animate-typing"
                      style={{ 
                        animationDelay: `${index * 3000}ms`,
                        animationDuration: `${(pageData.list?.length || 3) * 3000}ms`
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </span>
              </p>
              <p className="whitespace-pre-line flex justify-center text-lg sm:text-lg md:text-2xl lg:text-3xl mb-3 md:mb-3 text-gray-700 text-justify leading-relaxed">
                { pageData.subheading || t('home.hero.subheading', 'בקשב פלוס תקבלו אבחון מדויק ותוכנית טיפול אישית')}
              </p>

              <p className="whitespace-pre-line flex justify-center text-lg sm:text-lg md:text-2xl lg:text-3xl mb-3 md:mb-3 text-gray-700 text-justify leading-relaxed ">
              { pageData.subTitle || t('home.hero.subTitle', 'הצעד הראשון מתחיל כאן')}
              </p>

              <p className="whitespace-pre-line flex justify-center text-lg sm:text-lg md:text-2xl lg:text-3xl mb-3 md:mb-3 text-gray-700 text-justify leading-relaxed ">
              { pageData.heroText || t('home.hero.heroText', 'קבעו פגישת ייעוץ - בואו לגלות את הדרך להצלחה')}
              </p>

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
                {t('home.hero.contact', 'התחילו את האבחון עכשיו')}
              </Link>
            </div>

            {/* Hero Image Section */}
            <div className="w-full md:w-1/3 lg:w-3/4 order-2 md:order-2 flex justify-center ">
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
      <div className="pt-4 pb-4 md:pt-10 md:pb-6 bg-gradient-to-b from-green-800 to-green-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('home.cta.title', 'מוכנים להתחיל?')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('home.cta.subtitle', 'פנה/י אלינו היום כדי לקבוע את האבחון שלך ולקחת את הצעד הראשון לקראת חיים טובים יותר.')}
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
