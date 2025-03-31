import { usePageData } from '../hooks/usePageData';
import { PageContent } from '../types/content';
import PageTitle from '../components/PageTitle';
import { useEffect } from 'react';

export default function Forms() {
  const { data, isLoading, error } = usePageData('forms');

  // Set RTL direction for the document
  useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  if (isLoading)
    return (
      <div className="container mx-auto max-w-full md:max-w-[75%] py-8 loading">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto max-w-full md:max-w-[75%] py-8 error">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  if (!data.length) return null;

  const pageData: PageContent = data[0];

  return (
    <div className="rtl">
      <PageTitle title={pageData.heading} />
      <div className="bg-white flex items-center justify-end h-full">
        <div className="container mx-auto md:max-w-[70%]">
          <h3 className="text-xl md:text-4xl font-bold text-black text-center mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
            {pageData.subheading}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pageData.body.map((form, index) => (
              <li
                key={index}
                className="bg-orange-400/35 hover:bg-orange-400/60 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="flex flex-row items-start">
                  {form.image && (
                    <img
                      src={form.image}
                      alt={form.title}
                      className="w-16 h-16 object-cover ms-4"
                    />
                  )}
                  <div className="flex-grow text-right">
                    <h3 className="text-2xl font-bold text-black m-2">
                      {form.title}
                    </h3>
                    {form.subtitle && (
                      <h4 className="text-md font-semibold text-black mb-2">
                        {form.subtitle}
                      </h4>
                    )}
                    <p className="text-gray-700 text-md md:text-lg">
                      {form.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-center ms-4">
                    {form.file && (
                      <>
                        <a
                          href={`${form.file}.docx`}
                          download
                          className="hover:opacity-80 hover:scale-110 transition-all duration-300"
                        >
                          <img
                            src="/assets/images/wordicon.svg"
                            alt="Download Word document"
                            className="w-8 h-8 object-cover m-2"
                          />
                        </a>
                        <a
                          href={`${form.file}.pdf`}
                          download
                          className="hover:opacity-80 hover:scale-110 transition-all duration-300"
                        >
                          <img
                            src="/assets/images/pdficon.svg"
                            alt="Download PDF document"
                            className="w-8 h-8 object-cover m-2"
                          />
                        </a>
                        <p className="font-bold text-green-800 mt-2">להורדה</p>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
