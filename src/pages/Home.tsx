import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { HomePageContent } from '../types/content';
import '../styles/shine.css'; // Import shine effect CSS
import PageLayout from '../components/ui/PageLayout';
// import NeuralBackground from '../components/NeuralBackground';

export default function Home() {
  const [pageData, setPageData] = useState<HomePageContent | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    try {
      // Log to debug
      console.log('Home page initializing');
      document.documentElement.dir = 'rtl';
      import('../data/homePage')
        .then(module => {
          console.log('Home page data loaded successfully');
          setPageData(module.default);
        })
        .catch(error => {
          console.error('Failed to load home page data:', error);
        });
    } catch (error) {
      console.error('Error in Home page useEffect:', error);
    }
  }, []);

  if (!pageData) {
    return (
      <div className="container mx-auto max-w-full md:max-w-[75%] py-4 loading">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <PageLayout title={t('home.title', 'קשב פלוס - אבחון הפרעת קשב')}>
      <div className="relative w-full overflow-x-hidden">
        {/* Neural network animated background - with reduced density and speed */}
        {/* <NeuralBackground density={4} speed={3} opacity={0.3} /> */}
        
        {/* All content positioned with z-index to ensure it stays above background */}
        <div className="relative z-10 w-full overflow-x-hidden">
          {/* Hero Section - New Layout */}
          <div className="container mx-auto px-4 py-4 md:py-4 overflow-hidden">
            {/* On mobile: flex-row puts the image on the left */}
            {/* On desktop (md+): flex-row keeps the normal layout with text on left, image on right */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 flex-wrap">
              {/* Logo Section */}
              <div className="w-full text-center mb-6">
                <img 
                  src="/assets/images/logo.png" 
                  alt="קשב פלוס" 
                  className="w-56 md:w-80 mx-auto drop-shadow-lg"
                />
              </div>
            </div>
            
            {/* For landscape mobile and tablet: flex-row to put image on left */}
            {/* For portrait mobile: flex-col-reverse to put image on top */}
            {/* For desktop: flex-row with normal layout */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 flex-wrap">
              {/* Hero Text Section */}
              <div className="w-full md:w-1/2 mt-6 md:mt-0">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-4 md:mb-6">
                  {t('home.hero.title', 'רוצה להבין מה עובר עליך? בוא לבדוק אם זו הפרעת קשב.')}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-700">
                  {t('home.hero.subtitle', 'בדיקה מקצועית, מהירה ודיסקרטית ל-ADHD - לילדים, בני נוער ומבוגרים.')}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/about"
                    className="inline-block bg-green-800 hover:bg-green-600 text-white px-8 py-4 rounded-md text-xl font-bold transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    {t('home.hero.about', 'קרא עוד עלינו')}
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-block bg-orange-400 hover:bg-orange-600 hover:text-white text-black px-8 py-4 rounded-md text-xl font-bold transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    {t('home.hero.contact', 'התחילו את האבחון שלכם עכשיו')}
                  </Link>
                </div>
              </div>

              {/* Hero Image Section - Positioned based on screen size */}
              <div className="w-full md:w-1/2 flex justify-center items-center">
                <img 
                  src="/assets/images/doctor-hero.png" 
                  alt="רופא מקצועי" 
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded-3xl border-4 border-white"
                />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="pt-16 pb-6 md:pt-20 md:pb-6 bg-gradient-to-b from-green-800 to-green-950 text-white">
            <div className="container mx-auto px-4 text-center max-w-screen-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('home.cta.title', 'מוכנים להתחיל?')}
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                {t('home.cta.subtitle', 'פנה אלינו היום כדי לקבוע את האבחון שלך ולקחת את הצעד הראשון לקראת חיים טובים יותר.')}
              </p>
              
              <div className="shine-text-container text-center">  
                <span className="shine-text text-2xl md:text-3xl text-white whitespace-nowrap bg-transparent hover:text-green-100 transition-all duration-300 font-semibold">
                  055-27-399-27
                </span>
              </div>

              <Link
                to="/contact"
                className="inline-block bg-[#F7941D] text-black px-8 py-4 mt-4 rounded-md text-lg font-bold hover:bg-white hover:text-[#005BAA] transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                {t('home.cta.button', 'צרו קשר עכשיו')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
