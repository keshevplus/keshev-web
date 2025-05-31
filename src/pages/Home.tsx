import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPageContent } from '../services/contentService';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch content when component mounts
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        // Add a timeout to limit how long we wait
        const content = await getPageContent('home');
        setPageData(content);
      } catch (err) {
        console.error('Failed to load home page content:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        // Always stop loading, even if there was an error
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Hardcoded fallback content if there's an error or API fails
  const fallbackContent = {
    hero: {
      title: "ברוכים הבאים למרפאת 'קשב פלוס'",
      subtitle: "אבחון וטיפול בהפרעות קשב וריכוז",
      description: "במרפאת קשב פלוס תקבלו אבחון מקצועי ותוכנית טיפול מותאמת אישית",
      cta: "צרו קשר"
    }
  };

  // Use fallback content if needed
  const content = pageData || fallbackContent;

  if (loading) {
    // Show skeleton loader while content is loading
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
        <div className="h-8 bg-gray-200 rounded-lg w-1/2 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="h-48 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-r from-blue-50 to-green-50 py-12 md:py-24 rounded-lg mb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-6">
                {content.hero.subtitle}
              </p>
              <p className="text-gray-700 mb-8">
                {content.hero.description}
              </p>
              <Link
                to="/contact"
                className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                {content.hero.cta || "צרו קשר"}
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/assets/images/hero-image.jpg"
                alt="אבחון וטיפול בהפרעות קשב"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
            {t('home.services.title', 'השירותים שלנו')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Use static fallback services if API services aren't available */}
            {(content.services || [
              {
                id: 1,
                title: 'אבחון מקיף',
                description: 'אבחון מקצועי הכולל הערכה מקיפה של היכולות והקשיים',
                icon: '🔍'
              },
              {
                id: 2,
                title: 'טיפול תרופתי',
                description: 'טיפול תרופתי מותאם אישית בליווי רופא מומחה',
                icon: '💊'
              },
              {
                id: 3,
                title: 'הדרכת הורים',
                description: 'ליווי והדרכה להורים להתמודדות עם אתגרי הפרעות קשב',
                icon: '👨‍👩‍👧‍👦'
              }
            ]).map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="bg-green-700 text-white py-12 rounded-lg mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">מוכנים להתחיל?</h2>
          <p className="mb-6">צרו איתנו קשר עוד היום ונשמח לעזור לכם בדרך לטיפול נכון ויעיל.</p>
          <Link 
            to="/contact"
            className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition"
          >
            צור קשר
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;