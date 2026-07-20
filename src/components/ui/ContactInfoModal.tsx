import React from 'react';
import { Link } from 'react-router-dom';

interface ContactInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactInfoModal: React.FC<ContactInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-green-800 mb-4 text-right">
          דרכי הגעה ואפשרויות חניה
        </h2>
        <div className="space-y-6 text-right">

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 flex items-center">
              <span className="ml-2">🚗</span> אפשרויות חניה באזור:
            </h3>
            <ul className="space-y-3 mt-2">
              <li>
                <strong>חניון אורחים מגדלי אלון</strong> - כניסה דרך מגדל אלון 1 בצד הצפוני
                <p className="text-sm mt-1">חניות אורחים מסומנות באור ירוק ושלט מגדל&quot;הראל</p>
                <Link to="https://waze.com/ul/hsv8wrvb38" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">מגדלי אלון- כניסה צפונית Waze
                </Link>
              </li>
              <li>
                <strong>חניון &quot;אושר עד&quot;</strong> - ממש ברחוב המקביל אלינו
                <br />
                <Link to="https://waze.com/ul/hsv8wrv8y2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                  Waze לחניון אושר עד
                </Link>
              </li>
              <li>
                <strong>חניון אחוזת חוף</strong> - ליד מגדל טויוטה (חניון הסינרמה, יגאל אלון 63)
                <p className="text-sm mt-1">כניסה מהצד הדרומי</p>
                <Link to="https://waze.com/ul/hsv8wrtx41" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Waze לחניון אחוזת חוף</Link>
              </li>
              <li>
                <strong>כחול לבן</strong> באזור (זמין בעיקר בבוקר ובערב)
              </li>
            </ul>

            <div className="mt-0">
              <p className="flex items-center">
                <span className="ml-2">🚌</span>
                <strong>לבאים ברכבת</strong> - מרחק הליכה מתחנת השלום (עזריאלי)
              </p>
            </div>
            {/* // Tip section */}
            {/* <div className="mt-4 bg-yellow-50 p-2 rounded">
              <p className="flex-row items-center justify-end font-medium">
                <strong>טיפ:</strong>
                <span className="mr-2">💡</span>
              </p>
              <p className="font-medium">
                אפשר להימנע מכניסה עם רכב לת"א ולחנות בחינם בחניון הנתיב המהיר, ולהגיע עם שאטל לתחנת רכבת השלום ללא עלות!
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoModal;
