import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import homePageData from '../data/homePage';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const [pageData] = useState(homePageData);
  const { t } = useTranslation();

  // Set RTL direction for the document
  useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  if (!pageData) {
    return (
      <div className="container mx-auto max-w-full md:max-w-[75%] py-8 loading">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="rtl">
      {/* Hero Section - New Layout */}
      <div className="bg-[#F5F5F5]">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Hero Text Section */}
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <img 
                src="/assets/images/logo.png" 
                alt="קשב פלוס" 
                className="w-40 md:w-56 mb-8 mx-auto drop-shadow-lg"
              />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-4 md:mb-6">
                {t('home.hero.title', 'רוצה להבין מה עובר עליך? בוא לבדוק אם זו הפרעת קשב.')}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700">
                {t('home.hero.subtitle', 'בדיקה מקצועית, מהירה ודיסקרטית ל-ADHD – לילדים, בני נוער ומבוגרים. בלי לצאת מהבית, בלי סיבוך.')}
              </p>
              <Link
                to="/contact"
                className="inline-block bg-[#F7941D] text-black px-8 py-4 rounded-md text-lg font-medium hover:bg-[#e78200] transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                {t('home.hero.cta', 'התחילו את האבחון שלכם עכשיו')}
              </Link>
            </div>

            {/* Hero Image Section */}
            <div className="px-6 w-full md:w-1/2 order-1 md:order-2 flex justify-center items-center">
              <img 
                src="/assets/images/doctor-hero.png" 
                alt="רופא מקצועי" 
                className="w-64 md:w-80 h-auto rounded-3xl shadow-xl border-4 border-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-20 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('home.cta.title', 'מוכנים להתחיל?')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('home.cta.subtitle', 'פנה אלינו היום כדי לקבוע את האבחון שלך ולקחת את הצעד הראשון לקראת חיים טובים יותר.')}
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[#F7941D] text-white px-8 py-4 rounded-md text-lg font-bold hover:bg-white hover:text-[#005BAA] transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            {t('home.cta.button', 'צור קשר עכשיו')}
          </Link>
        </div>
      </div>
    </div>
  );
}
