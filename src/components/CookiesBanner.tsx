import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IoShieldOutline, IoInformationCircleOutline } from 'react-icons/io5';

const STORAGE_KEY = 'kp_cookies_accepted';

export default function CookiesBanner() {
  const location = useLocation();
  const [accepted, setAccepted] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setAccepted(false);
      }
    } catch {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // localStorage unavailable; still dismiss for this session
    }
    setAccepted(true);
  };

  if (accepted || location.pathname.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-4" dir="rtl">
      <div className="max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl shadow-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <IoShieldOutline className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-2 text-right">
              <p className="text-sm leading-relaxed text-gray-800">
                אתר זה משתמש בעוגיות (cookies) לשיפור חווית הגלישה ולמטרות סטטיסטיות. בהמשך הגלישה באתר, הנך מסכים/ה לשימוש בעוגיות בהתאם למדיניות הפרטיות שלנו.
              </p>
              {showDetails && (
                <div className="text-xs text-gray-500 space-y-1 border-t pt-2">
                  <p>העוגיות המשמשות באתר זה כוללות:</p>
                  <ul className="list-disc pr-4 space-y-0.5">
                    <li>עוגיות הכרחיות - לתפקוד תקין של האתר</li>
                    <li>עוגיות סטטיסטיות - לניתוח שימוש ושיפור השירות</li>
                    <li>עוגיות העדפות - לשמירת העדפות המשתמש</li>
                  </ul>
                  <p>בהתאם לחוק הגנת הפרטיות, אנו מיידעים אותך על השימוש בעוגיות ומבקשים את הסכמתך.</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-start">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg transition-colors"
            >
              <IoInformationCircleOutline className="h-4 w-4" />
              {showDetails ? 'הסתר פרטים' : 'מידע נוסף'}
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="text-sm bg-green-700 text-white hover:bg-green-800 px-4 py-1.5 rounded-lg transition-colors"
            >
              אני מסכים/ה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
