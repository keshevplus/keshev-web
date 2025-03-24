import { useState, useEffect } from 'react';

export default function Contact() {
  const [contactData, setContactData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      const data = [
        {
          heading: 'יצירת קשר',
          subheading: 'צוות המומחים שלנו ישמח לעמוד לרשותכם ולסייע בכל שאלה.',
          body: [
            {
              title: 'כתובת',
              description: 'רמת גן, ישראל',
              icon: '📍',
            },
            {
              title: 'טלפון',
              description: '054-4777469',
              icon: '📞',
            },
            {
              title: 'אימייל',
              description: 'dr@keshevplus.co.il',
              icon: '✉️',
            },
          ],
        },
      ];
      setContactData(data);
    };

    fetchData();
  }, []);

  if (!contactData.length) return <div>Loading...</div>;

  return (
    <div>
      <div className="relative h-[100px] mt-16">
        <div className="text-center py-16 inset-0 bg-gradient-to-b from-transparent bg-green-800 mx-auto px-8 h-full flex flex-col justify-center to-black/80">
          <div className="container py-0 font-bold">
            <h1 className="text-5xl text-white mx-4">
              {contactData[0].heading}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-center">
            {contactData[0].subheading}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactData[0].body.map((item, index) => (
              <li
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
