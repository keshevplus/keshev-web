import { useState, useEffect } from 'react';

export default function ADHD() {
  const [adhdData, setAdhdData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      const data = [
        {
          heading: 'מהי הפרעת קשב ופעלתנות יתר?',
          subheading:
            'ההפרעה (ADHD) היא הפרעה נוירולוגית המשפיעה על קשב, ריכוז ופעילות גופנית.',
          body: [
            {
              title: 'קשיי קשב וריכוז',
              description:
                'קושי להתרכז במשימות לאורך זמן, נטייה להתפזר ולשכוח.',
              image: 'http://localhost:5173/assets/images/icon.png',
            },
            {
              title: 'פעלתנות יתר',
              description: 'קושי לשבת במקום, תחושת תזזיתיות תמידית.',
              image: 'http://localhost:5173/assets/images/icon.png',
            },
            {
              title: 'אימפולסיביות',
              description:
                'נטייה לפעול ללא מחשבה, להתפרץ לשיחות ולהתקשות להמתין לתור.',
              image: 'http://localhost:5173/assets/images/icon.png',
            },
          ],
        },
      ];
      setAdhdData(data);
    };

    fetchData();
  }, []);

  if (!adhdData.length) return <div>Loading...</div>;

  return (
    <div>
      <div className="relative h-[100px] mt-16">
        <div className="text-center py-16 inset-0 bg-gradient-to-b from-transparent bg-green-800 mx-auto px-8 h-full flex flex-col justify-center to-black/80">
          <div className="container py-0 font-bold">
            <h1 className="text-5xl text-white mx-4">{adhdData[0].heading}</h1>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold mb-4">
              {adhdData[0].subheading}
            </h3>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">
              המאפיינים העיקריים של ADHD הם:
            </h2>
            <ul className="grid grid-cols-1 gap-4">
              {adhdData[0].body.map((item, index) => (
                <li
                  key={index}
                  className="bg-orange-400/40 rounded-lg shadow-md p-4"
                >
                  <div className="flex items-start">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover mx-4"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
