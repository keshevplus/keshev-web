import { usePageData } from '../hooks/usePageData';
import { PageContent } from '../types/content';
import PageTitle from '../components/PageTitle';

export default function Forms() {
  const { data, isLoading, error } = usePageData('forms');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return null;

  const pageData: PageContent = data[0];

  return (
    <>
      <PageTitle title={pageData.heading} />
      <div className="bg-white py-16 px-4">
        <div className="container mx-auto md:max-w-[80%]">
          <h3 className="text-xl md:text-4xl font-bold text-black text-center mb-8 transform transition-transform duration-300 ease-in-out hover:scale-120">
            {pageData.subheading}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pageData.body.map((form, index) => (
              <li
                key={index}
                className="bg-orange-400/35 hover:bg-orange-400/100 rounded-2xl shadow-xl rounded-lg shadow-lg p-6"
              >
                <div className="flex flex-row items-start">
                  {form.image && (
                    <img
                      src={form.image}
                      alt={form.title}
                      className="w-16 h-16 object-cover mx-4"
                    />
                  )}
                  <div className="flex-grow text-right">
                    <h3 className="text-2xl md:text-2xl font-bold text-black mb-2">
                      {form.title}
                    </h3>
                    <h4 className="text-md md:text-md font-semibold text-black mb-2">
                      {form.subtitle}
                    </h4>
                    <p className="text-gray-900 text-md md:text-md">
                      {form.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-center ml-4">
                    <a
                      href={`${form.files}.docx`}
                      download
                      className="hover:opacity-80 hover:scale-110 transition-opacity transform transition-transform duration-300 ease-in-out"
                    >
                      <img
                        src="/assets/images/wordicon.svg"
                        alt="Download Word document"
                        className="w-8 h-8 object-cover m-2"
                      />
                    </a>
                    <a
                      href={`${form.files}.pdf`}
                      download
                      className="hover:opacity-80 hover:scale-110 transition-opacity transform transition-transform duration-300 ease-in-out"
                    >
                      <img
                        src="/assets/images/pdficon.svg"
                        alt="Download PDF document"
                        className="w-8 h-8 object-cover m-2"
                      />
                    </a>
                    <p className="font-bold text-green-800 mt-2">להורדה</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
