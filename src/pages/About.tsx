import { useEffect } from 'react';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useTranslations } from '../hooks/useTranslations';
import PageTitle from '../layouts/PageTitle';

export default function About() {
  const { handleError } = useErrorHandler();
  const { t } = useTranslations();

  useEffect(() => {
    handleError(() => { document.documentElement.dir = 'rtl'; });
  }, [handleError]);

  return (
    <div className="bg-white flex-grow pb-0 animate-slide-in">
      <PageTitle title={t('keshevweb.about.title')} />

      <div className="container mx-auto px-8 pb-4 sm:max-w-[90%] lg:max-w-[75%]">
        <h2 className="text-xl md:text-4xl font-bold text-black text-center mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
          {t('keshevweb.about.description')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 items-start mb-0 md:mb-4">
          <div className="order-2 md:order-2 flex justify-center">
            <figure className="flex flex-col items-center">
              <img
                alt={t('keshevweb.about.doctorImageAlt')}
                className="max-w-xs h-auto rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl"
                src="/assets/images/hero-about.jpeg"
              />
            </figure>
          </div>

          <div className="order-1 md:order-1 text-right">
            <div className="mt-4">
              <h3 className="text-black text-xl md:text-3xl relative leading-none md:leading-relaxed">
                <span className="whitespace-pre-line text-green-800 font-semibold mb-2">
                  {t('keshevweb.about.doctor.heading')}
                </span>
              </h3>

              <h3 className="text-black text-xl md:text-2xl relative leading-none md:leading-relaxed">
                <span className="whitespace-pre-line text-green-800 font-semibold mb-2">
                  {t('keshevweb.about.doctor.text')}
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
