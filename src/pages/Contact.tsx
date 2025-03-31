import { useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import { usePageData } from '../hooks/usePageData';
import { LocalPageContent } from '../types/content';

export default function Contact() {
  const { data, isLoading, error } = usePageData('contact');

  // Set RTL direction for the document
  useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  if (isLoading) {
    return (
      <div>
        <div className="container mx-auto max-w-full md:max-w-[75%] py-8 loading"></div>
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  if (!data.length) return null;

  const contactData: LocalPageContent = data[0];

  return (
    <div className="rtl">
      <PageTitle title={contactData.heading} />

      <div className="bg-white flex items-center justify-end h-full">
        <div className="container mx-auto md:max-w-[70%]">
          <h3 className="text-xl md:text-4xl font-bold text-black text-center mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
            {contactData.subheading}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactData.body.map((item, index) => (
              <li
                key={index}
                className="bg-white rounded-2xl shadow-xl p-6 text-center transition-all duration-300 hover:shadow-2xl hover:bg-green-50/40"
              >
                <div className="text-4xl mb-4 text-green-800">{item.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-md md:text-lg">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
