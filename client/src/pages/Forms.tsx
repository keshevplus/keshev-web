import { usePageData } from '../hooks/usePageData';
import { ContentItem } from '../types/content';
import PageTitle from '../components/ui/PageTitle';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsScrolled } from '../store/sharedStateSlice';
import Card from '../components/ui/Card';

export default function Forms() {
  const { data, isLoading, error } = usePageData('forms');
  const dispatch = useDispatch();

  // Set RTL direction for the document
  useEffect(() => {
    document.documentElement.dir = 'rtl';

    const handleScroll = () => {
      dispatch(setIsScrolled(window.scrollY > 200)); // Update scroll state if scrolled more than 200px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
  }, [dispatch]);

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

  const pageData: ContentItem = data[0];

  return (
    <div className="rtl">
      <PageTitle title={pageData.heading} />
      <div className="bg-white flex flex-auto items-center justify-center h-full">
        <div className="container mx-auto max-w-[95%] lg:max-w-[80%]">
          <h3 className="text-xl md:text-4xl font-bold text-black text-center mb-8">
            {pageData.subheading}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(pageData.body ?? []).map((form, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Form Details Card */}
                <Card
                  bgcolor="bg-orange-400/35 hover:bg-orange-400/60 col-span-2"
                  textColor="text-black font-bold"
                  textSize="text-xl md:text-2xl"
                  paraSize="text-md md:text-lg"
                  title={form.title}
                  description={`${form.description} ${
                    index === 0
                      ? 'שאלון זה מיועד להורים ומספק תובנות על התנהגות הילד בבית ובסביבה המשפחתית.'
                      : index === 1
                      ? 'שאלון זה מיועד למורים ומספק תובנות על התנהגות הילד בכיתה ובסביבה החינוכית.'
                      : 'שאלון זה מיועד לדיווח עצמי ומספק תובנות על תחושות והתנהגות אישית.'
                  }`}
                  image={form.image}
                />
                {/* File Downloads Card */}
                <Card
                  bgcolor="bg-green-800 hover:bg-green-900 col-span-1"
                  textColor="text-white font-bold"
                  textSize="text-lg md:text-xl"
                  paraSize="text-md md:text-lg"
                  title="קבצים להורדה"
                  description={
                    <>
                      <div className="flex flex-col items-center">
                        {form.file && (
                          <>
                            <a
                              href={`${form.file}.docx`}
                              download
                              className="hover:opacity-80 hover:scale-110 transition-all duration-300"
                            >
                              <img
                                src="/assets/images/wordicon.svg"
                                alt="Download Word document 💾"
                                className="w-8 h-8 object-cover m-2"
                              />
                            </a>
                            <a
                              href={`${form.file}.pdf`}
                              download
                              className="hover:opacity-80 hover:scale-110 transition-all duration-300"
                            >
                              <img
                                src="/assets/images/PDFicon.svg"
                                alt="Download PDF document 💾"
                                className="w-8 h-8 object-cover m-2"
                              />
                            </a>
                          </>
                        )}
                      </div>
                    </>
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
