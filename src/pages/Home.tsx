import { useEffect } from 'react';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useTranslations } from '../hooks/useTranslations';
import { Link } from 'react-router-dom';
import AboutSection from '../components/AboutSection';

export default function Home() {
  const { error, handleError } = useErrorHandler();
  const { t } = useTranslations();
  const title = t('keshevweb.home.title');
  const listItems: string[] = (() => {
    try {
      return JSON.parse(t('keshevweb.home.list.items'));
    } catch {
      return [];
    }
  })();

  useEffect(() => {
    handleError(() => {
      document.documentElement.dir = 'rtl';
    });
  }, [handleError]);

  if (error) {
    return (
      <div className="container mx-auto py-8 error">
        <div className="text-red-500 text-center">
          <p>{t('keshevweb.home.errorPrefix')} {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-0 px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
          >
            {t('keshevweb.home.reload')}
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
                  {title}
                </h1>

                <img
                  src="/assets/images/logo.png"
                  alt={t('keshevweb.home.logoAlt')}
                  className="w-48 sm:w-64 md:w-72 lg:w-72 mb-2 md:mb-2 drop-shadow-lg mx-auto"
                />

                <p className="flex justify-start text-lg sm:text-lg md:text-2xl lg:text-3xl mb-3 md:mb-3 text-gray-700 flex-wrap text-center leading-3">
                  {title}
                  <span className="relative inline-block whitespace-nowrap">
                    {listItems.map((item, index) => (
                      <span
                        key={index}
                        className="absolute top-0 right-0 font-bold opacity-0 animate-typing"
                        style={{
                          animationDelay: `${index * 3000}ms`,
                          animationDuration: `${(listItems.length || 3) * 3000}ms`,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </span>
                </p>

                <p className="whitespace-pre-line text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 text-gray-700 text-center">
                  {t('keshevweb.home.intro.text')}
                </p>

                <p className="font-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl mb-3 text-gray-700 text-center leading-relaxed">
                  {t('keshevweb.home.hero.heading')}
                </p>

                <p className="whitespace-pre-line text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 text-gray-700 text-center">
                  {t('keshevweb.home.hero.text')}
                </p>

                {/* Buttons: stacked on small screens, aligned on tablet+, equal height/width */}
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 w-full mt-4 px-4">
                  <Link
                    to="/contact"
                    className="w-full md:w-1/2 bg-green-800 hover:bg-green-600 text-white px-6 py-4 rounded-md text-xl font-bold text-center transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                  >
                    {t('keshevweb.home.contactCta.heading')}
                  </Link>

                  <Link
                    to="/about"
                    className="w-full md:w-1/2 bg-orange-400 hover:bg-orange-600 hover:text-white text-black px-6 py-4 rounded-md text-xl font-bold text-center transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                  >
                    {t('keshevweb.home.aboutCta.heading')}
                  </Link>
                </div>
              </div>

              <div className="w-full md:w-1/3 lg:w-3/4 order-2 md:order-2 flex justify-center">
                <img
                  src="/assets/images/doctor-hero.png"
                  alt={t('keshevweb.home.hero.imageAlt')}
                  className="w-full max-w-xs sm:max-w-sm md:max-w-[50vw] h-auto rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="pt-4 pb-4 md:pt-10 md:pb-6 bg-gradient-to-b from-green-800 to-green-950 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('keshevweb.home.cta.heading')}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {t('keshevweb.home.cta.text')}
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#F7941D] text-black px-8 py-4 rounded-md text-lg font-bold hover:bg-white hover:text-[#005BAA] transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              {t('keshevweb.home.cta.button')}
            </Link>
          </div>
        </div>
      </div>

      {/* Second section: About, styled to match keshevplus.com's About section */}
      <AboutSection />
    </div>
  );
}
