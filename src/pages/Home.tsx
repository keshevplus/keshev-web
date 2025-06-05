import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import type { HomePageContent } from '../types/content';
import { usePageData } from '../hooks/usePageData';

export default function Home() {
  const { data: pages, isLoading } = usePageData<HomePageContent>('home');
  const pageData = pages?.[0] || null;

  useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  if (isLoading || !pageData) {
    return (
      <div className="container mx-auto max-w-full md:max-w-[75%] py-4 loading">
        <div className="animate-pulse">Loading...</div>
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
                <h1 className="text-2xl md:text-4xl font-bold text-green-800 mb-4 whitespace-pre-line ">
                  {pageData.title || 'ברוכים הבאים לקשב פלוס'}
                </h1>

                <img
                  src="/assets/images/logo.png"
                  alt="קשב פלוס"
                  className="w-48 sm:w-64 md:w-72 lg:w-72 mb-2 md:mb-2 drop-shadow-lg mx-auto"
                />

                <p className="flex justify-start text-lg sm:text-lg md:text-2xl lg:text-3xl mb-3 md:mb-3 text-gray-700 flex-wrap text-center leading-3 ">
                  {pageData.title || 'אבחון וטיפול מקצועי בהפרעות קשב וריכוז'}
                  <span className="relative inline-block whitespace-nowrap">
                    {Array.isArray(pageData.list) &&
                      pageData.list.map((item, index) => (
                        <span
                          key={`list-item-${index}`}
                          className="absolute top-0 right-0 font-bold opacity-0 animate-typing"
                          style={{
                            animationDelay: `${index * 3000}ms`,
                            animationDuration: `${(pageData.list?.length || 3) * 3000}ms`,
                          }}
                        >
                          {item}
                        </span>
                      ))}
                  </span>
                </p>

                <p className="whitespace-pre-line text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 text-gray-700 text-center">
                  {pageData.subheading ||
                    'בקשב פלוס תקבלו אבחון מדויק ותוכנית טיפול אישית'}
                </p>

                <p className="font-bold text-xl sm:text-2xl md:text-2xl lg:text-3xl mb-3 text-gray-700 text-center leading-relaxed">
                  {pageData.subTitle || 'הצעד הראשון מתחיל כאן'}
                </p>

                <p className="whitespace-pre-line text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 text-gray-700 text-center ">
                  {pageData.heroText ||
                    'קבעו פגישת ייעוץ - בואו לגלות את הדרך להצלחה'}
                </p>

                {/* Buttons: stacked on small screens, aligned on tablet+, equal height/width */}
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 w-full mt-4 px-4">
                  <Link
                    to="/contact"
                    className="w-full md:w-1/2 bg-green-800 hover:bg-green-600 text-white px-6 py-4 rounded-md text-xl font-bold text-center transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                  >
                    {'התחל/י את האבחון עכשיו'}
                  </Link>

                  <Link
                    to="/about"
                    className="w-full md:w-1/2 bg-orange-400 hover:bg-orange-600 hover:text-white text-black px-6 py-4 rounded-md text-xl font-bold text-center transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                  >
                    {'קראו עוד עלינו'}
                  </Link>
                </div>
              </div>

              <div className="w-full md:w-1/3 lg:w-3/4 order-2 md:order-2 flex justify-center">
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
              {'מוכנים להתחיל?'}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {'פנה/י אלינו היום כדי לקבוע את האבחון שלך ולקחת את הצעד הראשון לקראת חיים טובים יותר.'}
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#F7941D] text-black px-8 py-4 rounded-md text-lg font-bold hover:bg-white hover:text-[#005BAA] transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              {'צרו קשר עכשיו'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}