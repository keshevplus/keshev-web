import { useState, useEffect } from 'react';

export default function Services() {
  const [servicesData, setServicesData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      const data = [
        {
          heading: 'שירותינו במרפאה',
          subheading:
            'אנו מציעים מגוון רחב של שירותים מקצועיים בתחום אבחון וטיפול בהפרעות קשב.',
          body: [
            {
              title: 'אבחון מקיף של הפרעות קשב ופעלתנות יתר',
              description:
                'הליך האבחון במרפאה מתבצע ביסודיות ומותאם באופן אישי לכל מטופל/ת.',
              image: 'http://localhost:5173/assets/images/icon.png',
            },
            {
              title: 'התאמת טיפול תרופתי אישי',
              description:
                'על בסיס האבחון, אנו מתאימים תוכנית טיפול תרופתי ייחודית.',
              image: 'http://localhost:5173/assets/images/icon.png',
            },
            // ...other services
          ],
        },
      ];
      setServicesData(data);
    };

    fetchData();
  }, []);

  if (!servicesData.length) return <div>Loading...</div>;

  return (
    <div>
      <div className="relative h-[100px] mt-16">
        <div className="text-center py-16 inset-0 bg-gradient-to-b from-transparent bg-green-800 mx-auto px-8 h-full flex flex-col justify-center to-black/80">
          <div className="container py-0 font-bold">
            <h1 className="text-5xl text-white mx-4">
              {servicesData[0].heading}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-center">
            {servicesData[0].subheading}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData[0].body.map((service, index) => (
              <li
                key={index}
                className="bg-white rounded-lg shadow-lg min-w-px-100 p-2"
              >
                <div className="flex items-start">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-16 h-16 object-cover mx-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
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
