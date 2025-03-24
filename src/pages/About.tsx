import { useState, useEffect } from 'react';

export default function About() {
  const [aboutData, setAboutData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      const data = [
        {
          heading: 'אודותינו',
          subheading: 'קשב פלוס, נעים מאוד',
          body: [
            {
              title: "דר' איירין כוכב-רייפמן",
              description: `
        רופאה מומחית לאבחון וטיפול בהפרעות קשב ופעלתנות יתר (ADHD/ADD) בילדים, בנוער ובמבוגרים.
        בעלת ניסיון רב בתחום הטיפולי, מאבחנת ומטפלת תוך שימוש בגישות טיפוליות מגוונות ומתקדמות.
        בוגרת לימודי רפואה באוניברסיטת בולוניה שבאיטליה, לאחר מכן סטאג' בתל השומר, התמחות ברפואת משפחה בקופ"ח מאוחדת, הסמכה לאבחון וטיפול בהפרעות קשב ופעלתנות יתר של משרד הבריאות.
          `,
              image: '/assets/images/hero-about.jpeg',
            },
          ],
        },
      ];
      setAboutData(data);
    };

    fetchData();
  }, []);

  if (!aboutData.length) return <div>Loading...</div>;

  return (
    <div>
      <div className="relative h-[100px] mt-16">
        <div className="text-justify py-16 inset-0 bg-gradient-to-b from-transparent bg-green-800 mx-auto px-8 h-full flex flex-col justify-center to-black/80">
          <div className="container py-0 font-extrabold">
            <h1 className="text-center text-5xl text-white mx-4">
              {aboutData[0].heading}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap- items-center">
          <div className="order-first md:order-last flex justify-center">
            <img
              src={aboutData[0].body[0].image}
              alt={aboutData[0].body[0].title}
              className="w-full max-w-sm md:max-w-md h-auto rounded-full"
            />
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-6xl font-bold mb-4">
              {aboutData[0].subheading}
            </h3>
            <h4 className="text-2xl md:text-4xl font-semibold mb-4 text-green-950 text-center ">
              {aboutData[0].body[0].title}
            </h4>
            <p className="text-gray-600 text-lg md:text-2xl mt-4">
              {aboutData[0].body[0].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
