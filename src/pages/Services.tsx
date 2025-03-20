import React from 'react';

export default function Services() {
  const services = [
    {
      title: 'אבחון מקיף של הפרעות קשב ופעלתנות יתר',
      description: `הליך האבחון במרפאה מתבצע ביסודיות ומותאם באופן אישי לכל מטופל/ת.
                אנו משתמשים בכלים מתקדמים ומקיפים, כולל שיחות מעמיקות ובדיקות
                מקצועיות, כדי לספק תובנות מדויקות על מצבו של המטופל.`,
      image: 'http://localhost:5173/assets/images/icon.png',
    },
    {
      title: 'התאמת טיפול תרופתי אישי',
      description:
        'על בסיס האבחון, אנו מתאימים תוכנית טיפול תרופתי ייחודית שמתאימה לצרכיו של כל מטופל. הליווי שלנו כולל התאמות מתמשכות עד למציאת הטיפול האופטימלי, תוך שימת דגש על בטיחות ויעילות. ',
      image: 'http://localhost:5173/assets/images/icon.png',
    },
    {
      title: 'מתן ייעוץ ומעקב אחר מטופלים מאובחנים',
      description:
        'מטופלינו זוכים לליווי רציף שמאפשר מעקב אחרי השפעת הטיפול, שיפור תפקודים והתאמות נדרשות לאורך הדרך. אנחנו כאן כדי לוודא שכל מטופל ימצא את הדרך הנכונה להצלחה אישית ומקצועי',
      image: 'http://localhost:5173/assets/images/icon.png',
    },
    {
      title: 'סדנאות הדרכת הורים',
      description:
        'סדנאות הדרכת ההורים שלנו מיועדות להקנות כלים פרקטיים ומעשיים להתמודדות עם אתגרי הפרעת קשב וריכוז במשפחה. באמצעות הדרכה מקצועית, ההורים מקבלים תמיכה ולומדים כיצד לנהל שגרה בריאה ומותאמת.',
      image: 'http://localhost:5173/assets/images/icon.png',
    },
    {
      title: ' הפניות לטיפולים משלימים ',
      description:
        'במידת הצורך, אנו מפנים את המטופלים שלנו לטיפולים משלימים כגון ריפוי בעיסוק, טיפול רגשי או פסיכולוגי, וטיפולים נוספים שיכולים לתרום לשיפור איכות החיים.',
      image: 'http://localhost:5173/assets/images/icon.png',
    },
    {
      title: ' חוות דעת רפואיות למוסדות שונים  ',
      description:
        'המרפאה מספקת חוות דעת רפואיות מקצועיות ומפורטות עבור מוסדות חינוך, ביטוח לאומי, צבא ועוד. אנו מקפידים על הכנת מסמכים מדויקים שמספקים תמונה ברורה ואמינה של מצבו של המטופל.',
      image: 'http://localhost:5173/assets/images/icon.png',
    },
  ];

  return (
    <div>
      <div className="relative h-[100px] mt-16">
        <div className="absolute text-center py-16 inset-0 bg-gradient-to-b from-transparent bg-green-800 mx-auto px-8 h-full flex flex-col justify-center to-black/80">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-white mx-4">
              שירותינו במרפאה
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
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
