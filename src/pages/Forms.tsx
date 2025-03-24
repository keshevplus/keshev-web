import { useState, useEffect } from 'react';

export default function Forms() {
  const [formsData, setFormsData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      const data = [
        {
          heading: 'שאלונים',
          subheading: 'מגוון שאלונים לאבחון ותמיכה.',
          body: [
            {
              title: 'שאלון NICHQ Vanderbilt',
              description: 'שאלון להערכת קשב וריכוז.',
              image: 'http://localhost:5173/assets/images/icon.png',
            },
            {
              title: 'שאלון התנהגותי',
              description: 'שאלון להערכת התנהגות הילד.',
              image: 'http://localhost:5173/assets/images/icon.png',
            },
          ],
        },
      ];
      setFormsData(data);
    };

    fetchData();
  }, []);

  if (!formsData.length) return <div>Loading...</div>;

  return (
    <div>
      <div className="relative h-[100px] mt-16">
        <div className="text-center py-16 inset-0 bg-gradient-to-b from-transparent bg-green-800 mx-auto px-8 h-full flex flex-col justify-center to-black/80">
          <div className="container py-0 font-bold">
            <h1 className="text-5xl text-white mx-4">{formsData[0].heading}</h1>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-center">
            {formsData[0].subheading}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formsData[0].body.map((form, index) => (
              <li
                key={index}
                className="bg-white rounded-lg shadow-lg min-w-px-100 p-2"
              >
                <div className="flex items-start">
                  <img
                    src={form.image}
                    alt={form.title}
                    className="w-16 h-16 object-cover mx-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{form.title}</h3>
                    <p className="text-gray-600">{form.description}</p>
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
