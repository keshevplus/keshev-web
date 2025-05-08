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
                className="w-32 md:w-40 mb-6"
              />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#005BAA] mb-4 md:mb-6">
                {t('home.hero.title', 'קבל בהירות. קח שליטה. אבחן ADHD היום.')}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700">
                {t('home.hero.subtitle', 'אבחונים מקצועיים, מהירים וחסויים של ADHD לכל הגילאים. הזמן את ההערכה המקוונת שלך עכשיו.')}
              </p>
              <Link
                to="/contact"
                className="inline-block bg-[#F7941D] text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-[#e78200] transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                {t('home.hero.cta', 'התחל את האבחון שלי')}
              </Link>
            </div>

            {/* Hero Image Section */}
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <img 
                src="/assets/images/doctor-hero.jpg" 
                alt="רופא מקצועי" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:max-w-[80%]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#005BAA] transition-transform duration-300 ease-in-out hover:scale-105">
              {pageData.servicesHeading}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              {pageData.servicesSubheading}
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pageData.services.map((service, index) => (
              <div
                key={index}
                className="bg-[#F5F5F5] p-8 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]"
              >
                <div className="text-5xl mb-6 text-[#F7941D]">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-[#005BAA]">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-md md:text-lg mb-6">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="inline-block text-[#F7941D] hover:text-[#e78200] font-medium transition-colors duration-300"
                >
                  קרא עוד →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-16 md:py-24 bg-[#F5F5F5]">
        <div className="container mx-auto px-4 md:max-w-[80%]">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#005BAA]">
                {pageData.aboutHeading}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                {pageData.aboutText}
              </p>
              <Link
                to="/about"
                className="inline-block bg-[#F7941D] text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-[#e78200] transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                {t('home.about.cta', 'קרא עוד')}
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/assets/images/about-image.jpg" 
                alt="קשב פלוס מרכז אבחון" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-4 md:py-24 bg-green-800">
        <div className="container mx-auto px-4 text-center md:max-w-[70%]">
          <h2 className="text-4xl font-bold text-white mb-6">
            {pageData.ctaHeading}
          </h2>
          <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto">
            {pageData.ctaSubheading}
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-green-800 px-12 md:py-0 rounded-full text-xl font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {pageData.ctaButtonText || 'צור קשר'}
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-20 bg-[#005BAA] text-white">
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
