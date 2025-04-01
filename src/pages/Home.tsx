import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import homePageData from '../data/homePage';

export default function Home() {
  const [pageData] = useState(homePageData);

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
      <div className="relative min-h-screen">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-green-900/80 via-green-800/70 to-green-950/90 animate-gradient-slow"></div>

        {/* Background video */}
        <div className="bg-white/100 w-full h-full z-10">
          <video
            className="absolute inset-0 w-full h-full object-cover z-[1] opacity-60"
            autoPlay
            loop
            muted
            playsInline
          >
            {/* <source src="/assets/images/bgvideo.mp4" type="video/mp4" /> */}
            <source src="/assets/images/formulas.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-white opacity-80 z-[2]"></div>
        </div>

        {/* Content */}

        <div className="relative z-10">
          <div className="container mx-auto px-4 h-screen flex flex-col justify-center items-center text-center">
            <Link
              to="/"
              className="flex items-center mb-8 hover:scale-105 transition-transform duration-300"
            >
              <img
                src="/assets/images/logo.png"
                alt="קשב פלוס"
                className="h-80 w-auto"
              />
            </Link>
            <p className="text-3xl md:text-5xl text-black mb-12 max-w-2xl">
              {pageData.heroText}
            </p>
            <Link
              to="/contact"
              className="bg-green-800 text-white px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl  hover:bg-orange-400 hover:text-black font-bold transition-all hover:scale-105 hover:shadow-xl"
            >
              {pageData.ctaButtonText || 'צור קשר'}
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:max-w-[70%]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800 transition-transform duration-300 ease-in-out hover:scale-105">
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
                className="bg-white p-8 rounded-2xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl hover:bg-green-50/40"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-green-800">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-md md:text-lg">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-16 md:py-24 bg-green-800">
        <div className="container mx-auto px-4 text-center md:max-w-[70%]">
          <h2 className="text-4xl font-bold text-white mb-6">
            {pageData.ctaHeading}
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            {pageData.ctaSubheading}
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-green-800 px-12 py-5 rounded-full text-xl font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            {pageData.ctaButtonText || 'צור קשר'}
          </Link>
        </div>
      </div>
    </div>
  );
}
