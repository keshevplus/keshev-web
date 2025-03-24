import React from 'react';

interface BodyItem {
  title: string;
  description: string;
  image: string;
}

interface PageData {
  heading: string;
  subheading: string;
  body: BodyItem[];
}

interface DynamicPageLayoutProps {
  data: PageData[];
}

const DynamicPageLayout: React.FC<DynamicPageLayoutProps> = ({ data }) => {
  return (
    <div>
      <div className="relative h-[100px] mt-16">
        <div className="text-center py-16 inset-0 bg-gradient-to-b from-transparent bg-green-800 mx-auto px-8 h-full flex flex-col justify-center to-black/80">
          <div className="container py-0 font-bold">
            <h1 className="text-5xl text-white mx-4">{data[0].heading}</h1>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold mb-4">
              איך מתבצע האבחון במרפאה שלנו?
            </h3>
            <p className="text-black text-xl mb-4">{data[0].subheading}</p>
            <ul className="list-none gap-4">
              {data[0].body.map((item, index) => (
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
            <h2 className="text-2xl font-bold mb-4">למה חשוב לאבחן מוקדם?</h2>
            <p className="text-gray-600">
              אבחון מוקדם של ADHD יכול לסייע במתן כלים ותמיכה מתאימים להתמודדות
              עם האתגרים היומיומיים. טיפול מותאם יכול לשפר את איכות החיים של
              ילדים ומבוגרים עם ההפרעה, ולמנוע קשיים נוספים בעתיד.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicPageLayout;
