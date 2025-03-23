import PageTitle from '../components/PageTitle';

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
    <PageTitle title="מהי הפרעת קשב ופעלתנות יתר?">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center md:text-right">
          <h2 className="text-3xl font-bold mb-4">
            הפרעת קשב ופעלתנות יתר - הידוע גם כ-ADHD
          </h2>
          <p className="text-gray-600 text-lg md:text-lg">
            ההפרעה (ADHD) היא הפרעה נוירולוגית המשפיעה על קשב, ריכוז ופעילות
            גופנית. ההפרעה נפוצה בקרב ילדים ומבוגרים כאחד, ונגרמת משילוב של גנים
            וגורמים סביבתיים.
          </p>
        </div>
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
    </PageTitle>
  );
}
