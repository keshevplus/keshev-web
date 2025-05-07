import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/ui/PageLayout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

const formSchema = z.object({
  name: z.string().min(2, 'השם חייב להכיל לפחות 2 תווים'),
  email: z.string().email('אנא הכנס כתובת דוא"ל חוקית'),
  phone: z
    .string()
    .regex(/^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/, 'מספר טלפון לא תקין'),
  subject: z.string().optional(),
  message: z.string().min(2, 'ההודעה חייבת להכיל לפחות 2 תווים'),
});

type FormValues = z.infer<typeof formSchema>;

// Initialize EmailJS
const EMAILJS_SERVICE_ID = 'keshev_service';
const EMAILJS_TEMPLATE_ID = 'keshev_contact';
const EMAILJS_PUBLIC_KEY = 'pYsMwQqlsNLh7j6L-'; // This is safe to include as it's a public key

export default function Contact() {
  const { data: pageData } = usePageData('contact');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      console.log('Contact page - Submitting form data:', data);

      // Add a loading toast that will be dismissed when we get a response
      const loadingToastId = toast.loading('שולח את הטופס...', {
        position: 'top-center',
      });

      try {
        // Try sending via EmailJS - this works regardless of domain
        const result = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: data.name,
            reply_to: data.email,
            phone: data.phone,
            subject: data.subject || 'פנייה חדשה מהאתר',
            message: data.message,
            site_url: window.location.hostname,
          }
        );

        console.log('EmailJS result:', result);
        
        if (result.status === 200) {
          toast.dismiss(loadingToastId);
          toast.success('הטופס נשלח בהצלחה!');
          reset();
          setTimeout(() => navigate('/'), 1500);
          return;
        }
      } catch (err) {
        console.error('Error sending via EmailJS:', err);
      }

      // Fallback to API attempt if EmailJS failed
      try {
        // Get current domain for proper API routing
        const isProduction = window.location.hostname === 'www.keshevplus.co.il' || 
                            window.location.hostname === 'keshevplus.co.il';
        const baseUrl = isProduction ? 'https://www.keshevplus.co.il' : '';
        const endpoint = `${baseUrl}/api/contact`;
        
        console.log(`Using ${isProduction ? 'production' : 'development'} endpoint: ${endpoint}`);
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Successful form submission via API:', result);
          toast.dismiss(loadingToastId);
          toast.success('הטופס נשלח בהצלחה!');
          reset();
          setTimeout(() => navigate('/'), 1500);
          return;
        }
        
        console.warn(`API returned status ${response.status}`);
        
        // Try to parse the error response
        try {
          const errorText = await response.text();
          console.log('Error response:', errorText);
        } catch (parseErr) {
          console.log('Could not read error response');
        }
      } catch (apiErr) {
        console.error('Error with API submission:', apiErr);
      }

      // If we get here, all attempts failed
      toast.dismiss(loadingToastId);
      console.error('All submission attempts failed');
      toast.error('שגיאה בשליחת הטופס, אנא נסה שוב או צור קשר בטלפון');
    } catch (error) {
      console.error('Unhandled error in form submission:', error);
      toast.error('שגיאה בשליחת הטופס, אנא נסה שוב');
    }
  };

  return (
    <PageLayout title={pageData[0]?.heading || ''} background="bg-white" maxWidth="md:max-w-[80%]">
      <h3 className="text-2xl md:text-xl font-bold text-green-800 text-right mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
        {pageData[0]?.subheading}
      </h3>

      <form
        className="bg-orange-400/65 p-8 rounded-lg shadow-lg w-full"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-2 pb-8">
          {[
            { name: 'name', label: 'שם' },
            { name: 'email', label: 'אימייל', type: 'email' },
            { name: 'phone', label: 'טלפון', type: 'tel' },
            { name: 'subject', label: 'נושא' },
          ].map(({ name, label, type = 'text' }) => (
            <div key={name} className="relative">
              <input
                {...register(name as keyof FormValues)}
                type={type}
                placeholder={label}
                className={`w-full p-3 rounded-lg border text-right ${
                  errors[name as keyof FormValues]
                    ? 'border-red-700 border-2'
                    : 'border-gray-300 focus:border-green-500'
                }`}
              />
              {errors[name as keyof FormValues] && (
                <span className="absolute left-0 text-red-700 font-bold text-sm m-2">
                  {errors[name as keyof FormValues]?.message}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="relative mb-6">
          <textarea
            {...register('message')}
            rows={4}
            placeholder="הודעה"
            className={`w-full p-3 rounded-lg border text-right ${
              errors.message
                ? 'border-red-700 border-2'
                : 'border-gray-300 focus:border-green-500'
            }`}
          />
          {errors.message && (
            <span className="absolute left-0 text-red-700 font-bold text-sm m-2">
              {errors.message.message}
            </span>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300 disabled:bg-gray-400"
          >
            {isSubmitting ? 'שולח...' : 'שלח הודעה'}
          </button>
        </div>
      </form>
    </PageLayout>
  );
}
