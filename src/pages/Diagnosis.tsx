import diagnosisData from '../data/diagnosis';
import PageTitle from '../components/PageTitle';

export default function Diagnosis() {
  // Use the static data from diagnosis.ts
  const pageData = diagnosisData[0];

  if (!pageData) return null;

  const mainContent = pageData.body[0]; // Main content is mandatory

  return (
    <div>
      <PageTitle title={pageData.heading} />
      <div className="bg-white py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold mb-4">
              איך מתבצע האבחון במרפאה שלנו?
            </h3>
            <p className="text-black text-xl mb-4">{pageData.subheading}</p>
            <ul className="list-none gap-4">
              {pageData.body.map((item, index) => (
                <li
                  key={index}
                  className="bg-orange-400/40 rounded-lg shadow-md mx-4"
                >
                  <span className="mx-0 p-4">
                    <div className="flex items-start">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover mx-4"
                      />
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-green-800">
                          {item.title}
                        </h3>
                        <p className="text-gray-900 text-md md:text-xl">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {pageData.additionalInfo && (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  {pageData.additionalInfo.heading}
                </h2>
                <p className="text-gray-600">
                  {pageData.additionalInfo.description}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
