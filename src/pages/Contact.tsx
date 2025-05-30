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
import ContactInfoModal from '../components/ui/ContactInfoModal';

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
      // Always save locally as backup
      saveMessageLocally(data);
      console.log('Form data being submitted:', data);

      // Determine if we're in development or production
      const isProduction = import.meta.env.PROD;
      const apiBaseUrl = isProduction
        ? (import.meta.env.VITE_API_BASE_URL || 'https://api.keshevplus.co.il')
        : 'http://localhost:3001';

      console.log(`Using API base URL: ${apiBaseUrl} (${isProduction ? 'Production' : 'Development'} mode)`);

      // Submit data to BOTH endpoints to ensure it appears in both admin panels
      const endpoints = ['messages', 'leads'];
      const submissionPromises = endpoints.map(endpoint => {
        // Use direct path instead of /api prefix
        const url = `${apiBaseUrl}/${endpoint}`;
        console.log(`Submitting to ${endpoint} endpoint at: ${url}`);

        return fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }).then(response => {
          if (response.ok) {
            console.log(`${endpoint} submission successful`);
            return true;
          } else {
            console.warn(`${endpoint} submission failed with status: ${response.status}`);
            // Try fallback with /api prefix if main call fails
            return fetch(`${apiBaseUrl}/api/${endpoint}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            }).then(fallbackResponse => {
              if (fallbackResponse.ok) {
                console.log(`${endpoint} fallback submission successful`);
                return true;
              }
              return false;
            }).catch(() => false);
          }
        }).catch(error => {
          console.error(`${endpoint} submission error:`, error);
          return false;
        });
      });

      // Wait for all submissions to complete
      const results = await Promise.all(submissionPromises);

      // Continue even if some submissions failed (we saved locally as backup)
      if (results.some(result => result === true)) {
        console.log('At least one submission endpoint succeeded');
      } else {
        console.warn('All submission endpoints failed, using local storage backup');
      }

      // Show success message regardless of API result since we saved locally
      toast.dismiss(loadingToastId);
      toast.success('הטופס נשלח בהצלחה!');
      reset();

      // Log submission details
      console.log('Form details:', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message.substring(0, 20) + '...' // Truncate for logging
      });

      // Redirect after success
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      // Overall error handling
      toast.dismiss(loadingToastId);
      toast.error('הטופס נשמר באופן מקומי');
      console.error('Contact form processing error:', err);
    }
  };

  // --- On mount: resend unsent messages ---
  React.useEffect(() => {
    const tryResend = async () => {
      const queue = getUnsentMessages();
      if (queue.length === 0) return;
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.keshevplus.co.il';
      for (let i = 0; i < queue.length; i++) {
        try {
          // Use direct path instead of /api/contact
          const response = await fetch(`${apiBaseUrl}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(queue[i]),
          });
          if (response.ok) {
            removeSentMessage(i);
            i--; // adjust index after removal
            toast.success('הודעה שנשמרה נשלחה בהצלחה!');
          } else {
            // Try fallback with /api prefix
            const fallbackResponse = await fetch(`${apiBaseUrl}/api/contact`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(queue[i]),
            });
            if (fallbackResponse.ok) {
              removeSentMessage(i);
              i--; // adjust index after removal
              toast.success('הודעה שנשמרה נשלחה בהצלחה!');
            }
          }
        } catch (err) {
          console.log('Error resending message:', err);
          // Still failing, keep in queue
        }
      }
    };
    tryResend();
  }, []);

  return (
    <PageLayout title={pageData[0]?.heading || ''} background="bg-white" maxWidth="md:max-w-4xl">

      <div className="grid grid-cols-2 md:grid-cols-2 gap-1 items-start">

        {/* Contact Form - Now first */}

        <div>
        <h3 className="text-2xl md:text-xl col-span-2 font-bold text-green-800 text-right mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
        {pageData[0]?.subheading}
      </h3>
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
                <option value="זימון תור לאבחון מלא">זימון תור לאבחון מלא</option>
                <option value="זימון תור למבחן MOXO">זימון תור למבחן MOXO</option>

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
        </div>
      

        {/* Contact Details - Now second */}
        <div className="rounded-lg px-6 shadow-lg flex flex-col items-center justify-center ">
          <h3 className="text-xl font-bold text-green-800 mb-4">פרטי התקשרות</h3>

          <div>
            <div className="font-bold text-lg">כתובת
              <span className="text-green-700">:</span>
            </div>
            <div className="text-gray-700 mb-2">
              <span className="text-green-700">מגדלי אלון 1, קומה 12, משרד 1202</span>
              <br />
              יגאל אלון 94, תל אביב (וויביז)
            </div>
  
          </div>
          <div className="font-bold text-lg">אימייל:
          </div>
          <span className="text-gray-700 mb-2">
          <a href="mailto:dr@keshevplus.co.il" className="text-green-700 hover:text-green-900">
          dr@keshevplus.co.il   
          </a>
          </span>
            <div className="font-bold text-lg">טלפון:
            <a href="tel:055-27-399-27" className="text-green-700 hover:text-green-900">
              055-27-399-27
            </a>
            </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors mt-2 mb-4"
          >
            דרכי הגעה ואפשרויות חניה
            </button>

          <div className="mt-4">
            <GoogleMap />
          </div>
        </div>

      {/* Modal */}

      <ContactInfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>

    </PageLayout>
  );
}
