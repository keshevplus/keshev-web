import { useState, useEffect } from 'react';

export default function Diagnosis() {
  const [diagnosisData, setDiagnosisData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      const data = [
        {
          heading: 'תהליך האבחון',
          subheading:
            'במרפאתנו אנו מקפידים על תהליך אבחון יסודי ומעמיק, המאפשר זיהוי מדויק של הצרכים האישיים של כל ילד. התהליך כולל מספר שלבים:',
          body: [
            {
              title: 'שיחה ראשונית',
              description:
                'מפגש אישי עם ההורים והילד להבנת ההיסטוריה ההתפתחותית והתנהגותו.',
              image: 'http://localhost:5173/assets/images/icon.png',
            },
            {
              title: 'שאלונים מובנים',
              description:
                'שימוש בכלים אבחוניים בינלאומיים, כמו סולם הערכה ע"ש NICHQ Vanderbilt.',
              image: 'http://localhost:5173/assets/images/icon.png',
            },
            {
              title: 'תצפיות ובדיקות נוספות',
              description: 'בהתאם לצורך, אנו מבצעים תצפיות והערכות נוספות.',
              image: 'http://localhost:5173/assets/images/icon.png',
            },
            {
              title: 'דו"ח אבחון מקצועי',
              description:
                'תוצאות מפורטות לצד המלצות מותאמות אישית להמשך הדרך.',
              image: 'http://localhost:5173/assets/images/icon.png',
            },
          ],
        },
        {
          heading: 'תהליך הטיפול',
          subheading:
            'לאחר האבחון, אנו מציעים תוכנית טיפול מותאמת אישית לצרכי הילד והמשפחה. התהליך כולל:',
          body: [
            {
              title: 'בניית תוכנית טיפול',
              description:
                'יצירת תוכנית טיפולית מותאמת אישית המבוססת על תוצאות האבחון.',
              image: 'http://localhost:5173/assets/images/icon.png',
            },
            {
              title: 'מעקב שוטף',
              description: 'מעקב אחר התקדמות הילד והתאמת התוכנית לפי הצורך.',
              image: 'http://localhost:5173/assets/images/icon.png',
            },
            {
              title: 'שיתוף פעולה עם גורמים נוספים',
              description:
                'עבודה משותפת עם צוותי חינוך, מטפלים ואנשי מקצוע נוספים.',
              image: 'http://localhost:5173/assets/images/icon.png',
            },
            {
              title: 'תמיכה למשפחה',
              description: 'הדרכה וליווי להורים לאורך כל התהליך.',
              image: 'http://localhost:5173/assets/images/icon.png',
            },
          ],
          additionalInfo: {
            heading: 'חשיבות התמדה בתהליך',
            description:
              'תהליך הטיפול דורש סבלנות והתמדה, ואנו כאן כדי לתמוך בכם בכל שלב.',
          },
        },
        {
          heading: 'וב לאבחן מוקדםלמה חש?',
          subheading:
            'אבחון מוקדם של ADHD יכול לסייע במתן כלים ותמיכה מתאימים להתמודדות עם האתגרים היומיומיים. טיפול מותאם יכול לשפר את איכות החיים של ילדים ומבוגרים עם ההפרעה, ולמנוע קשיים נוספים בעתיד.',
          body: [],
        },
      ];
      setDiagnosisData(data);
    };

    fetchData();
  }, []);

  if (!diagnosisData.length) return <div>Loading...</div>;
  const renderSection = (section: any) => (
    <div className="bg-white py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4">{section.heading}</h2>
        <p className="text-xl mb-8">{section.subheading}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ul className="list-none gap-4">
              {section.body.map((item: any, index: number) => (
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
                        <h3 className="text-2xl font-semibold">{item.title}</h3>
                        <p className="text-xl mb-4">{item.description}</p>
                      </div>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {section.additionalInfo?.heading}
            </h2>
            <p className="text-gray-600">
              {section.additionalInfo?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="relative h-[100px] mt-16">
        <div className="text-center py-16 inset-0 bg-gradient-to-b from-transparent bg-green-800 mx-auto px-8 h-full flex flex-col justify-center to-black/80">
          <div className="container py-0 font-bold">
            <h1 className="text-5xl text-white mx-4">
              {diagnosisData[0].heading}
            </h1>
          </div>
        </div>
      </div>
      {diagnosisData.map((section, index) => (
        <div key={index}>{renderSection(section)}</div>
      ))}
    </div>
  );
  return (
    <div>
      <div className="relative h-[100px] mt-16">
        <div className="text-center py-16 inset-0 bg-gradient-to-b from-transparent bg-green-800 mx-auto px-8 h-full flex flex-col justify-center to-black/80">
          <div className="container py-0 font-bold">
            <h1 className="text-5xl text-white mx-4">
              {diagnosisData[0].heading}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold mb-4">
              איך מתבצע האבחון במרפאה שלנו?
            </h3>
            <p className="text-black text-xl mb-4">
              {diagnosisData[0].subheading}
            </p>
            <ul className="list-none gap-4">
              {diagnosisData[0].body.map((item, index) => (
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
                        <h3 className="text-2xl font-semibold">{item.title}</h3>
                        <p className="text-xl mb-4">{item.description}</p>
                      </div>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {diagnosisData[0].additionalInfo.heading}
            </h2>
            <p className="text-gray-600">
              {diagnosisData[0].additionalInfo.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
