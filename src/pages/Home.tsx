import { useEffect } from 'react';
import { usePageData } from '../hooks/usePageData';
import { useErrorHandler } from '../hooks/useErrorHandler';
import type { HomePageContent } from '../types/content';
import homePageData from '../data/homePage';
import { mapSectionsById, getSectionById } from '../utils/sectionUtils';
import { Link } from 'react-router-dom';
import AboutSection from '../components/AboutSection';

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
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative z-10">
        <div className="rtl">
          <div className="container mx-auto py-0 md:py-0">
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              <div className="xl:w-full md:w-2/7 order-1 px-2 sm:px-4 flex flex-col items-center text-center">
                <h1 className="text-2xl md:text-4xl font-bold text-green-800 mb-4 whitespace-pre-line">
                  {pd.title}
                </h1>

                <img
                  src="/assets/images/logo.png"
                  alt="קשב פלוס"
                  className="w-48 sm:w-64 md:w-72 lg:w-72 mb-2 md:mb-2 drop-shadow-lg mx-auto"
                />

                <p className="flex justify-start text-lg sm:text-lg md:text-2xl lg:text-3xl mb-3 md:mb-3 text-gray-700 flex-wrap text-center leading-3">
                  {pd.title}
                  <span className="relative inline-block whitespace-nowrap">
                    {Array.isArray(list?.content) &&
                      list.content.map((item, index) => (
                        <span
                          key={index}
                          className="absolute top-0 right-0 font-bold opacity-0 animate-typing"
                          style={{
                            animationDelay: `${index * 3000}ms`,
                            animationDuration: `${(list?.content?.length ?? 3) * 3000}ms`,
                          }}
                        >
                          {item}
                        </span>
                      ))}
                  </span>
                </p>

                {intro?.text && (
                  <p className="whitespace-pre-line text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 text-gray-700 text-center">
                    {intro.text}
                  </p>
                )}

                {hero?.heading && (
                  <p className="font-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl mb-3 text-gray-700 text-center leading-relaxed">
                    {hero.heading}
                  </p>
                )}

                {hero?.text && (
                  <p className="whitespace-pre-line text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 text-gray-700 text-center">
                    {hero.text}
                  </p>
                )}

                {/* Buttons: stacked on small screens, aligned on tablet+, equal height/width */}
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 w-full mt-4 px-4">
                  {contactCta && (
                    <Link
                      to="/contact"
                      className="w-full md:w-1/2 bg-green-800 hover:bg-green-600 text-white px-6 py-4 rounded-md text-xl font-bold text-center transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                      {contactCta.heading}
                    </Link>
                  )}

                  {aboutCta && (
                    <Link
                      to="/about"
                      className="w-full md:w-1/2 bg-orange-400 hover:bg-orange-600 hover:text-white text-black px-6 py-4 rounded-md text-xl font-bold text-center transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                      {aboutCta.heading}
                    </Link>
                  )}
                </div>
              </div>

              <div className="w-full md:w-1/3 lg:w-3/4 order-2 md:order-2 flex justify-center">
                {hero?.image && (
                  <img
                    src={hero.image}
                    alt="רופא מקצועי"
                    className="w-full max-w-xs sm:max-w-sm md:max-w-[50vw] h-auto rounded-3xl"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="pt-4 pb-4 md:pt-10 md:pb-6 bg-gradient-to-b from-green-800 to-green-950 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">מוכנים להתחיל?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              פנה/י אלינו היום כדי לקבוע את האבחון שלך ולקחת את הצעד הראשון לקראת חיים טובים יותר.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#F7941D] text-black px-8 py-4 rounded-md text-lg font-bold hover:bg-white hover:text-[#005BAA] transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              צרו קשר עכשיו
            </Link>
          </div>
        </div>
      </div>

      {/* Second section: About, styled to match keshevplus.com's About section */}
      <AboutSection />

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
    </div>
  );
}
