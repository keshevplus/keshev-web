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

  const onSubmit = async (data: FormValues, event: any) => {
    try {
      // Prevent default form submission
      event?.preventDefault?.();
      
      console.log('Contact page - Submitting form data:', data);

      // Add a loading toast that will be dismissed when we get a response
      const loadingToastId = toast.loading('שולח את הטופס...', {
        position: 'top-center',
      });

      // Using EmailJS to send email notifications
      try {
        console.log('Sending form via EmailJS');
        
        // 1. Send email to admin (dr@keshevplus.co.il)
        const adminEmailParams = {
          to_email: 'dr@keshevplus.co.il',
          from_name: data.name,
          reply_to: data.email,
          phone: data.phone,
          subject: data.subject || 'פנייה חדשה מהאתר',
          message: data.message,
          site_url: window.location.hostname,
        };
        
        const adminResult = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          adminEmailParams
        );
        
        console.log('Admin email result:', adminResult);

        // 2. Send confirmation email to the user
        if (data.email) {
          const userEmailParams = {
            to_email: data.email,
            to_name: data.name,
            subject: 'תודה על הפנייה לקשב פלוס',
            message: 'תודה רבה על הפנייה. נציגנו יחזור אליך בהקדם.',
            site_url: window.location.hostname,
          };
          
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            'user_confirmation_template',
            userEmailParams
          );
        }

        // 3. Save form data to Neon database using API endpoint
        try {
          const saveToDbResponse = await fetch('/api/contact-save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              phone: data.phone,
              subject: data.subject || 'פנייה חדשה מהאתר',
              message: data.message,
              createdAt: new Date().toISOString(),
            }),
          });

          if (!saveToDbResponse.ok) {
            // Log DB save error but don't fail the whole submission
            console.error('Error saving to database:', await saveToDbResponse.text());
          }
        } catch (dbError: any) {
          // Log DB save error but don't fail the whole submission
          console.error('Failed to save to database:', dbError);
        }

        // 4. Send SMS if phone number is provided (not implemented yet - would require SMS service)
        // This would be implemented with a service like Twilio

        toast.dismiss(loadingToastId);
        toast.success('הטופס נשלח בהצלחה!');
        reset();
        setTimeout(() => navigate('/'), 1500);
        return;
        
      } catch (err: any) {
        console.error('Error sending via EmailJS:', err);
        // Handle specific EmailJS errors
        let errorMessage = 'שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.';
        
        if (err.message) {
          console.log('EmailJS error message:', err.message);
          if (err.message.includes('Network Error')) {
            errorMessage = 'בעיית תקשורת. אנא בדוק את החיבור לאינטרנט שלך ונסה שוב.';
          }
        }
        
        toast.dismiss(loadingToastId);
        toast.error(errorMessage);
        return;
      }

      // If we get here, EmailJS didn't throw but also didn't return a successful status
      toast.dismiss(loadingToastId);
      toast.error('שגיאה בשליחת הטופס. אנא נסה שוב או צור קשר בטלפון');
    } catch (error: any) {
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
        onSubmit={(e) => {
          e.preventDefault(); // Explicitly prevent default form submission
          handleSubmit(onSubmit)(e);
        }}
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
