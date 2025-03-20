export default function ADHD() {
  const ADHD = [
    {
      title: 'קשיי קשב וריכוז',
      description: 'קושי להתרכז במשימות לאורך זמן, נטייה להתפזר ולשכוח',
      image: 'http://localhost:5173/assets/images/icon.png',
    },
    {
      title: 'פעלתנות יתר',
      description: 'קושי לשבת במקום, תחושת תזזיתיות תמידית.',
      image: 'http://localhost:5173/assets/images/icon.png',
    },
    {
      title: 'אימפולסיביות',
      description: 'נטייה לפעול ללא מחשבה, להתפרץ לשיחות ולהתקשות להמתין לתור',
      image: 'http://localhost:5173/assets/images/icon.png',
    },
  ];

  return (
    <div>
      <div className="relative h-[100px] mt-16">
        <div className="absolute text-center py-16 inset-0 bg-gradient-to-b from-transparent bg-green-800 mx-auto px-8 h-full flex flex-col justify-center to-black/80">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-white mx-4">
              מהי הפרעת קשב ופעלתנות יתר?
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center md:text-right">
            <h2 className="text-2xl font-bold mb-4">
              הפרעת קשב ופעלתנות יתר - הידוע גם כ-ADHD - (ראשי תיבות של
              <span className=" text-2xl text-black">A</span>
              <span className="text-xl text-gray-600">ttention </span>
              <span className=" text-2xl text-black">D</span>
              <span className="text-xl text-gray-600">eficit </span>
              <span className=" text-2xl text-black">H</span>
              <span className="text-xl text-gray-600">yperactivity </span>
              <span className=" text-2xl text-black">D</span>
              <span className="text-xl text-gray-600">isorder </span>)
            </h2>
            <p className="text-black">
              ההפרעה (ADHD) היא הפרעה נוירולוגית המשפיעה על קשב, ריכוז ופעילות
              גופנית. ההפרעה נפוצה בקרב ילדים ומבוגרים כאחד, ונגרמת משילוב של
              גנים וגורמים סביבתיים.
              <br />
              היא הפרעה נוירו-התפתחותית המתבטאת בקשיים בריכוז, בשליטה על דחפים
              ובניהול התנהגות.
              <br />
              ילדים ומבוגרים עם ADHD נאבקים לעתים קרובות עם קשיים בביצוע משימות
              של קשב וריכוז, ונטייה להתפזר ולהתפרץ. טיפול מותאם יכול לעזור להם
              להתמודד עם האתגרים היומיומיים.
            </p>
            <div>
              <h2 className="text-2xl font-bold mb-4">
                המאפיינים העיקריים של ADHD הם:
              </h2>
              <ul className="grid grid-cols-1 gap-4">
                {ADHD.map((item, index) => (
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
          <div>
            <h2 className="text-2xl font-bold mb-4">למה חשוב לאבחן מוקדם?</h2>
            <p className="text-gray-600">
              אבחון מוקדם של ADHD יכול לסייע במתן כלים ותמיכה מתאימים להתמודדות
              עם האתגרים היומיומיים. טיפול מותאם יכול לשפר את איכות החיים של
              ילדים ומבוגרים עם ההפרעה, ולמנוע קשיים נוספים בעתיד.
            </p>
            <ul className="grid grid-cols-1 gap-4">
              {ADHD.map((item, index) => (
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
