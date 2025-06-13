import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/landing-page.css'; // We'll create this file for the shaking animation

const LandingPage: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Set the document direction based on language
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';

    // Add shake animation every 10 seconds
    const interval = setInterval(() => {
      const ctaButton = document.getElementById('cta-button');
      if (ctaButton) {
        ctaButton.classList.add('shake-animation');
        setTimeout(() => {
          ctaButton.classList.remove('shake-animation');
        }, 1000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [i18n.language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Determine if we're in development or production
      const isProduction = import.meta.env.PROD;
      const apiBaseUrl = isProduction
        ? (import.meta.env.VITE_API_BASE_URL || 'https://api.keshevplus.co.il/api')
        : 'http://localhost:3001/api';

      // Submit as a message
      await fetch(`${apiBaseUrl}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: 'פנייה מדף נחיתה',
          message: 'לקוח השאיר פרטים בדף הנחיתה שלנו. נא ליצור קשר בהקדם!',
        }),
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/contact');
      }, 3001);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-950 text-white flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-2xl">
          <div className="text-5xl text-green-600 mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">תודה על פנייתך!</h2>
          <p className="text-gray-700 mb-6">קיבלנו את פרטיך ואנו ניצור איתך קשר בהקדם.</p>
          <p className="text-gray-700">מעבירים אותך לדף הקשר שלנו...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen rtl">
      {/* Hero Section with Background */}
      <div className="bg-gradient-to-b from-green-800 to-green-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Hero Text Section */}
            <div className="w-full md:w-1/2 order-1">
              <img
                src="/assets/images/logo.png"
                alt="קשב פלוס"
                className="w-56 md:w-64 mb-8 mx-auto md:mx-0 drop-shadow-lg"
              />
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center md:text-right">
                הפרעת קשב גורמת לבעיות בחיים שלך?
              </h1>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-8">
                <p className="text-xl mb-4">
                  הגעת למקום הנכון - הצעד הראשון לשינוי מתחיל באבחון מקצועי!
                </p>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center">
                    <span className="text-orange-400 text-2xl ml-2">✓</span> אבחון מקצועי ומהיר על ידי מומחים
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-400 text-2xl ml-2">✓</span> מגוון טיפולים מותאמים אישית
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-400 text-2xl ml-2">✓</span> ייעוץ והכוונה לאורך כל התהליך
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-400 text-2xl ml-2">✓</span> תוצאות ראשוניות תוך 7 ימים
                  </li>
                </ul>
              </div>
            </div>

            {/* Message Form Section */}
            <div className="w-full md:w-5/12 order-2">
              <div className="bg-white text-gray-800 p-6 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
                  השאירו פרטים לאבחון מקצועי
                </h2>
                <h3 className="text-center mb-6 text-gray-600 font-semibold">
                  <span className="text-orange-500">30% הנחה</span> לנרשמים עכשיו!
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">שם מלא</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">אימייל</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">טלפון</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <button
                    id="cta-button"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden"
                  >
                    {isSubmitting ? 'שולח...' : 'קבל שיחת ייעוץ חינם עכשיו!'}
                    <div className="absolute inset-0 bg-white opacity-20 animate-pulse-slow"></div>
                  </button>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    * לאחר השארת הפרטים נציג מטעמנו יחזור אליכם בהקדם לתיאום אבחון
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">למה לבחור בקשב פלוס?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl text-orange-500 mb-4 text-center">🔍</div>
              {/* <h3 className="text-xl font-bold text-green-800 mb-3 text-center">אבחון מקצועי</h3>
              <p className="text-gray-600 text-center">
                שיטות אבחון מתקדמות ומקיפות בהתאם לסטנדרטים הבינלאומיים המובילים
              </p> */}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl text-orange-500 mb-4 text-center">👨‍⚕️</div>
              <h3 className="text-xl font-bold text-green-800 mb-3 text-center">צוות מומחים</h3>
              {/* <p className="text-gray-600 text-center">
                רופאים ומטפלים בעלי ניסיון רב בטיפול בהפרעות קשב וריכוז
              </p> */}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl text-orange-500 mb-4 text-center">🛠️</div>
              <h3 className="text-xl font-bold text-green-800 mb-3 text-center">פתרונות מותאמים אישית</h3>
              {/* <p className="text-gray-600 text-center">
                תוכנית טיפול אישית המותאמת בדיוק לצרכים ולאתגרים הספציפיים שלך
              </p> */}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">מה לקוחותינו אומרים</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="text-orange-400 text-2xl mb-2">★★★★★</div>
              <p className="mb-4 text-lg">"הגעתי לקשב פלוס אחרי שנים של התמודדות עם קשיי ריכוז. האבחון היה מקיף והמקצועי, והטיפול שקיבלתי שינה את חיי לחלוטין. היום אני מסוגל להתמקד בעבודה ובלימודים כפי שמעולם לא יכולתי."</p>
              <div className="font-bold">- יוסי כהן</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="text-orange-400 text-2xl mb-2">★★★★★</div>
              <p className="mb-4 text-lg">"בתור הורים היינו מודאגים מאוד לגבי הקשיים של הבן שלנו בבית הספר. בקשב פלוס קיבלנו הבנה עמוקה של האתגרים שלו ותוכנית טיפול מקיפה. התוצאות לא איחרו לבוא, והשיפור בציונים ובביטחון העצמי שלו היה משמעותי."</p>
              <div className="font-bold">- משפחת לוי</div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/about"
              className="inline-block bg-white text-green-800 px-6 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors duration-300"
            >
              קרא עוד חוות דעת
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">שאלות נפוצות</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-2">כמה זמן אורך האבחון?</h3>
              <p className="text-gray-600">האבחון הבסיסי אורך כשעתיים, וכולל שיחה מקיפה ומספר מבחנים מקצועיים. אבחון מעמיק יותר עשוי להימשך מספר פגישות.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-2">האם האבחון מוכר על ידי קופות החולים?</h3>
              <p className="text-gray-600">כן, האבחון שלנו מוכר על ידי כל קופות החולים וחברות הביטוח המובילות בישראל.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-2">האם מתאים גם למבוגרים?</h3>
              <p className="text-gray-600">בהחלט! אנחנו מספקים אבחון וטיפול לכל הגילאים - ילדים, מתבגרים ומבוגרים. לעולם לא מאוחר מדי לאבחן ולטפל בהפרעת קשב.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-800 mb-2">מה ההבדל בין ADHD ל-ADD?</h3>
              <p className="text-gray-600">ADHD (הפרעת קשב והיפראקטיביות) ו-ADD (הפרעת קשב ללא היפראקטיביות) הם שני סוגים של הפרעת קשב. ההבדל העיקרי הוא שב-ADHD קיים גם מרכיב של היפראקטיביות ואימפולסיביות, בעוד שב-ADD הקושי העיקרי הוא בריכוז ובקשב.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-16 bg-gradient-to-b from-green-800 to-green-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            מוכנים לצעד הראשון לשינוי?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            השאירו פרטים עכשיו וקבלו שיחת ייעוץ חינם עם אחד המומחים שלנו!<br />
            <span className="text-orange-400 font-bold">מבצע מיוחד: 30% הנחה על האבחון המקיף</span>
          </p>

          <button
            onClick={() => navigate('/diagnosis')}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            אני רוצה לקבוע אבחון עכשיו!
          </button>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-lg">
            <div className="flex items-center">
              <span className="text-orange-400 text-2xl ml-2">📞</span> חייגו עכשיו: 055-27-399-27
            </div>
            <div className="flex items-center">
              <span className="text-orange-400 text-2xl ml-2">📍</span> יגאל אלון 94, תל אביב
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
