import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/ui/PageLayout';
import GoogleMap from '../components/GoogleMap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';


const formSchema = z.object({
  name: z.string().min(2, 'השם חייב להכיל לפחות 2 תווים'),
  email: z.string().email('אנא הכנס כתובת דוא"ל חוקית'),
  phone: z
    .string()
    .regex(/^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/, 'מספר טלפון לא תקין'),
  subject: z.string().min(1, 'אנא בחר נושא פנייה'),
  message: z.string().min(2, 'ההודעה חייבת להכיל לפחות 2 תווים'),
});

type FormValues = z.infer<typeof formSchema>;


// Modal component for displaying additional contact information
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
        
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-right">פרטי התקשרות נוספים</h2>
        
        <div className="space-y-6 text-right">
          <div>
          <div>
            <h3 className="text-lg font-semibold text-green-700">מידע נוסף:</h3>
            <p>לקביעת פגישות יש להתקשר מראש</p>
          </div> 
            <h3 className="text-lg font-semibold text-green-700">שעות פעילות:</h3>
            <p>ימים א'-ה': 9:00-18:00</p>
            <p>יום ו': 9:00-13:00</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700 flex items-center">
              <span className="ml-2">🚗</span> אפשרויות חניה באזור:
            </h3>
            <ul className="space-y-3 mt-2">
              <li>
                <strong>חניון אורחים מגדלי אלון</strong> - כניסה דרך מגדל אלון 1 בצד הצפוני
                <p className="text-sm mt-1">חניות אורחים מסומנות באור ירוק ושלט מגדל"הראל</p>
                <a href="https://waze.com/ul/hsv8wrvb38" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">מגדלי אלון- כניסה צפונית Waze</a>
              </li>
              <li>
                <strong>חניון אושר"עד"</strong> - ממש ברחוב המקביל אלינו
                <a href="https://waze.com/ul/hsv8wrv8y2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Waze לחניון אושר עד</a>
              </li>
              <li>
                <strong>חניון אחוזת חוף</strong> - ליד מגדל טויוטה (חניון הסינרמה, יגאל אלון 63)
                <p className="text-sm mt-1">כניסה מהצד הדרומי</p>
                <a href="https://waze.com/ul/hsv8wrtx41" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Waze לחניון אחוזת חוף</a>
              </li>
              <li>
                <strong>כחול לבן</strong> באזור (זמין בעיקר בבוקר ובערב)
              </li>
            </ul>
            
            <div className="mt-4">
              <p className="flex items-center">
                <span className="ml-2">🚌</span>
                <strong>לבאים ברכבת</strong> - מרחק הליכה מתחנת השלום (עזריאלי)
              </p>
            </div>
            
            <div className="mt-4 bg-yellow-50 p-2 rounded">
              <p className="flex-row items-center justify-end font-medium">
                <strong>טיפ:</strong>
                <span className="mr-2">💡</span>
              </p>
              <p className="font-medium">
                אפשר להימנע מכניסה עם רכב לת"א ולחנות בחינם בחניון הנתיב המהיר, ולהגיע עם שאטל לתחנת רכבת השלום ללא עלות!
              </p>
            </div>
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default function Contact() {
  const { data: pageData } = usePageData('contact');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  // --- LocalStorage queue helpers ---
  const LOCAL_STORAGE_KEY = 'unsentContactMessages';
  function saveMessageLocally(message: FormValues) {
    const queue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    queue.push(message);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(queue));
  }
  function getUnsentMessages(): FormValues[] {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  }
  function removeSentMessage(index: number) {
    const queue = getUnsentMessages();
    queue.splice(index, 1);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(queue));
  }

  // --- On submit ---
const onSubmit = async (data: FormValues, event: any) => {
    event?.preventDefault?.();
    const loadingToastId = toast.loading('שולח את הטופס...', { position: 'top-center' });
    try {
      // Use the proxy server for development, or direct API for production
      const isProduction = import.meta.env.PROD;
      const apiUrl = isProduction 
        ? `${import.meta.env.VITE_API_BASE_URL}/api/contact`
        : 'http://localhost:3001/api/contact';
      
      console.log('Submitting form to:', apiUrl);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        // Save locally if server error (including DB down)
        saveMessageLocally(data);
        toast.dismiss(loadingToastId);
        toast.error('השרת אינו זמין. ההודעה נשמרה ותישלח אוטומטית כשתהיה אפשרות.');
        return;
      }
      toast.dismiss(loadingToastId);
      toast.success('הטופס נשלח בהצלחה!');
      reset();
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      // Network or CORS error: Save locally
      saveMessageLocally(data);
      toast.dismiss(loadingToastId);
      toast.error('השרת אינו זמין. ההודעה נשמרה ותישלח אוטומטית כשתהיה אפשרות.');
      console.error('Contact form error:', err);
    }
  };

  // --- On mount: resend unsent messages ---
  React.useEffect(() => {
    const tryResend = async () => {
      const queue = getUnsentMessages();
      if (queue.length === 0) return;
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      for (let i = 0; i < queue.length; i++) {
        try {
          const response = await fetch(`${apiBaseUrl}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(queue[i]),
          });
          if (response.ok) {
            removeSentMessage(i);
            i--; // adjust index after removal
            toast.success('הודעה שנשמרה נשלחה בהצלחה!');
          }
        } catch (err) {
          // Still failing, keep in queue
        }
      }
    };
    tryResend();
  }, []);

  return (
    <PageLayout title={pageData[0]?.heading || ''} background="bg-white" maxWidth="md:max-w-3xl">
      <h3 className="text-2xl md:text-xl font-bold text-green-800 text-right mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
        {pageData[0]?.subheading}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Form - Now first */}
        <form
          className="bg-orange-400/65 p-6 rounded-lg shadow-lg w-full"
          onSubmit={(e) => {
            e.preventDefault(); // Explicitly prevent default form submission
            handleSubmit(onSubmit)(e);
          }}
          noValidate
        >
          <div className="grid grid-cols-1 gap-4 mb-4">
            {/* Name, Email, Phone fields */}
            {[{ name: 'name', label: 'שם' }, { name: 'email', label: 'אימייל', type: 'email' }, { name: 'phone', label: 'טלפון', type: 'tel' }].map(({ name, label, type = 'text' }) => (
              <div key={name} className="relative">
                <input
                  {...register(name as keyof FormValues)}
                  type={type}
                  placeholder={label}
                  className={`w-full p-3 rounded-lg border text-right ${errors[name as keyof FormValues] ? 'border-red-700 border-2' : 'border-gray-300 focus:border-green-500'}`}
                />
                {errors[name as keyof FormValues] && (
                  <span className="absolute left-0 text-red-700 font-bold text-sm m-2">
                    {errors[name as keyof FormValues]?.message}
                  </span>
                )}
              </div>
            ))}
            
            {/* Subject dropdown */}
            <div className="relative">
              <select
                {...register('subject')}
                className={`w-full p-3 rounded-lg border text-right ${errors.subject ? 'border-red-700 border-2' : 'border-gray-300 focus:border-green-500'}`}
                defaultValue=""
              >
                <option value="" disabled>אנא בחר נושא פנייה</option>
                <option value="זימון תור">זימון תור</option>
                <option value="שאלות כלליות">שאלות כלליות</option>
                <option value="המלצה">המלצה</option>
                <option value="בדיקות MOXO">מידע על בדיקות MOXO</option>
                <option value="אבחון">אבחון</option>
                <option value="תרפיה">תרפיה</option>
                <option value="אחר">אחר</option>
              </select>
              {errors.subject && (
                <span className="absolute left-0 text-red-700 font-bold text-sm m-2">
                  {errors.subject.message}
                </span>
              )}
            </div>
          </div>
          <div className="relative mb-4">
            <textarea
              {...register('message')}
              rows={3}
              placeholder="הודעה"
              className={`w-full p-3 rounded-lg border text-right ${errors.message ? 'border-red-700 border-2' : 'border-gray-300 focus:border-green-500'}`}
            />
            {errors.message && (
              <span className="absolute left-0 text-red-700 font-bold text-sm m-2">
                {errors.message.message}
              </span>
            )}
          </div>
          <div className="flex justify-between mt-4">
  <button
    type="submit"
    disabled={isSubmitting}
    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-400"
  >
    {isSubmitting ? 'שולח...' : 'שלח הודעה'}
  </button>
  <button
    type="button"
    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300 mr-2"
    onClick={() => reset()}
  >
    ניקוי טופס
  </button>
</div>
        </form>
        
        {/* Contact Details - Now second */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-right">
          <h3 className="text-xl font-bold text-green-800 mb-4">פרטי התקשרות</h3>
          
          <div className="mb-4">
            <div className="font-bold text-lg">כתובת:</div>
            <div className="mb-2">יגאל אלון 94, תל אביב (וויביז)</div>
            <a
              href="https://maps.google.com/?q=יגאל אלון 94 תל אביב"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 underline hover:text-green-900"
            >
              פתח במפות גוגל
            </a>
          </div>
          
          <div className="mb-4">
            <div className="font-bold text-lg">טלפון:</div>
            <a href="tel:055-27-399-27" className="text-green-700 hover:text-green-900">
              055-27-399-27
            </a>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors mt-2 mb-4"
          >
            לפרטים נוספים
          </button>
          
          <div className="mt-4">
            <GoogleMap />
          </div>
        </div>
      </div>
      
      {/* Modal */}
      <ContactInfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageLayout>
  );
}
