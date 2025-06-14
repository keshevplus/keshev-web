<<<<<<< HEAD
import { useEffect } from 'react';
import { usePageData } from '../hooks/usePageData';
import { useErrorHandler } from '../hooks/useErrorHandler';
import type { HomePageContent } from '../types/content';
import homePageData from '../data/homePage';
import { mapSectionsById, getSectionById } from '../utils/sectionUtils';
import { Link } from 'react-router-dom';
import PageTitle from '../layouts/PageTitle';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function Home() {
  const { data: pageData, isLoading } = usePageData<HomePageContent>('home');
  const { error, handleError } = useErrorHandler();
  const pd = Array.isArray(pageData) ? homePageData : pageData || homePageData;

  // Create a map of sections by ID for easy access
  const sectionsMap = mapSectionsById(pd.sections);

  // Get specific sections by ID
  const hero = getSectionById(sectionsMap, 'hero');
  const list = getSectionById(sectionsMap, 'list');
  const intro = getSectionById(sectionsMap, 'intro');
  const contactCta = getSectionById(sectionsMap, 'contact-cta');
  const aboutCta = getSectionById(sectionsMap, 'about-cta');

  // Access isScrolled from global state
  const { isScrolled } = useSelector((state: RootState) => state.sharedState);

  useEffect(() => {
    handleError(() => {
      document.documentElement.dir = 'rtl';
    });
  }, [handleError]);

  if (isLoading && !pd) {
    return (
      <div className="container mx-auto py-8 loading">
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-800"></div>
          <span className="mr-4 text-lg text-gray-700">טוען...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 error">
        <div className="text-red-500 text-center">
          <p>שגיאה: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-0 px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
          >
            טען מחדש
          </button>
        </div>
=======
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { HomePageContent } from '../types/content';

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
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <section className="w-full bg-white/50 rtl">

      {/* Hero section with improved layout for RTL */}
      <div className={`max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8 items-center justify-between pt-0 transition-all duration-300`}>
        {/* Text content container - right-aligned in RTL */}
        <div className="flex flex-col w-full md:w-[55%] order-2 md:order-1 text-center md:text-right">
          {/* Page Title - only show when not scrolled */}
          {!isScrolled && (
            <PageTitle title={pd.title} isHomePage={true} />
          )}


          {/* Introduction content */}
          {intro?.heading && <p className="text-2xl font-bold mb-4 text-green-800">{intro.heading}</p>}
          {intro?.text && <p className="text-lg mb-6">{intro.text}</p>}

          {/* Hero content */}
          {hero?.heading && <p className="text-xl font-semibold mb-4">{hero.heading}</p>}
          {hero?.text && <p className="text-lg mb-6">{hero.text}</p>}

          {/* Rotating list with "plus" styling */}
          {Array.isArray(list?.content) && (
            <div className="mb-6 flex flex-wrap justify-center md:justify-end gap-2 rtl:space-x-reverse">
              {list.content.map((item, idx) => (
                <span
                  key={idx}
                  className="opacity-0 animate-typing inline-flex items-center"
                  style={{
                    animationDelay: `${idx * 3000}ms`,
                    animationDuration: `${(list?.content?.length ?? 0) * 3000}ms`
                  }}
                >
                  <span className="text-lg">{item}</span>
                  {idx < (list?.content ?? []).length - 1 && (
                    <span className="text-green-600 font-bold mx-2">+</span>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* CTA Buttons with leaf icons */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-2">
            {contactCta && (
              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 ${contactCta.bgColor || 'bg-green-700'} ${contactCta.textColor || 'text-white'} px-6 py-3 rounded-full shadow-md font-semibold transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]`}
              >
                {contactCta.heading}
                <img
                  src="/assets/images/leafinverse.png"
                  alt=""
                  className="h-4 w-auto"
                />
              </Link>
            )}

            {aboutCta && (
              <Link
                to="/about"
                className={`inline-flex items-center gap-2 ${aboutCta.bgColor || 'bg-orange-400'} ${aboutCta.textColor || 'text-white'} px-6 py-3 rounded-full shadow-md font-semibold transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]`}
              >
                {aboutCta.heading}
                <img
                  src="/assets/images/leaf.png"
                  alt=""
                  className="h-4 w-auto"
                />
              </Link>
            )}
          </div>
        </div>

        {/* Doctor-hero image - positioned on left in RTL mode */}
        {hero?.image && (
          <div className="w-full md:w-[45%] flex justify-center md:justify-start order-1 md:order-2">
            <img
              src={hero.image}
              alt="רופאה מומחית לקשב וריכוז"
              id="home__hero_image"
              className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 hover:shadow-2xl"
            />
          </div>
        )}
      </div>

      {/* Content sections with alternating backgrounds */}
      {pd.sections.filter(section =>
        section.id !== 'intro' &&
        section.id !== 'hero' &&
        section.id !== 'list' &&
        section.id !== 'contact-cta' &&
        section.id !== 'about-cta'
      ).map((section, index) => (
        <div
          key={section.id}
          className={` ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white/80'}`}
        >
          <div className="max-w-4xl mx-auto px-4">

            <h2 className="text-3xl font-bold mb-6 text-green-800 text-right">{section.heading}</h2>
            {section.text && <p className="text-lg mb-8 text-right">{section.text}</p>}
            {/* Conditionally render PageTitle only if not scrolled */}
            {/* This ensures the title is not duplicated when scrolling */}
            {!isScrolled && <PageTitle title={pd.title} isHomePage={true} />}
            {/* Content list */}
            {section.content && Array.isArray(section.content) && (

              <ul className="mb-8 space-y-3 text-right">
                {section.content && section.content.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-end">
                    <span>{item}</span>
                    <span className="text-orange-500 mr-2 ml-2">•</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Add CTA buttons at the bottom of each section */}
            <div className="flex flex-wrap justify-end gap-4 ">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-md font-semibold transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]"
              >
                צור קשר לייעוץ
                <img
                  src="/assets/images/leafinverse.png"
                  alt=""
                  className="h-4 w-auto"
                />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-full shadow-md font-semibold transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]"
              >
                קרא/י עוד
                <img
                  src="/assets/images/leaf.png"
                  alt=""
                  className="h-4 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
=======
    <div>
      <div> 
    <div className="rtl">
      {/* Hero Section - New Layout */}
      
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Hero Text Section */}
            <div className="w-full md:w-1/2 order-1 md:order-1">
              <img 
                src="/assets/images/logo.png" 
                alt="קשב פלוס" 
                className="w-56 md:w-96 mb-8 mx-auto drop-shadow-lg"
              />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-4 md:mb-6">
                {t('home.hero.title', 'רוצה להבין מה עובר עליך? בוא לבדוק אם זו הפרעת קשב.')}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700">
                {t('home.hero.subtitle', 'בדיקה מקצועית, מהירה ודיסקרטית ל-ADHD - לילדים, בני נוער ומבוגרים.')}
              </p>
              <Link
                to="/about"
                className="inline-block bg-green-800 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-[#e78200] transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                {t('home.hero.cta', 'קרא עוד עלינו')}
              </Link>
              <Link
                to="/contact"
                className="inline-block bg-[#F7941D] text-black px-8 py-4 rounded-md text-lg font-medium hover:bg-[#e78200] transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                {t('home.hero.cta', 'התחילו את האבחון שלכם עכשיו')}
              </Link>
            </div>

            {/* Hero Image Section */}
            <div className="w-full md:w-1/2 order-2 md:order-2 flex justify-center items-center">
              <img 
                src="/assets/images/doctor-hero.png" 
                alt="רופא מקצועי" 
                className="w-full max-w-xs sm:max-w-sm md:max-w-[50vw] h-auto rounded-3xl border-4 border-white"
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
            className="inline-block bg-[#F7941D] text-black px-8 py-4 rounded-md text-lg font-bold hover:bg-white hover:text-[#005BAA] transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            {t('home.cta.button', 'צור קשר עכשיו')}
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
