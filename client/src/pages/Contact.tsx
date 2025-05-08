import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/ui/PageLayout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';
import { useEffect } from 'react';

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

// Define EmailJS constants - Use your actual values here
const EMAILJS_SERVICE_ID = 'keshev_service';
const EMAILJS_TEMPLATE_ID = 'keshev_contact';
const EMAILJS_PUBLIC_KEY = 'BRyv-hQs8PSYU-vKq';
// Private key is used on server side only and shouldn't be exposed in client code

export default function Contact() {
  const { data: pageData } = usePageData('contact');
  const navigate = useNavigate();
  
  // Initialize EmailJS within the component's effect
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

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
        
        // Create form parameters
        const emailParams = {
          from_name: data.name,
          to_email: 'dr@keshevplus.co.il', // Main recipient
          reply_to: data.email,
          phone: data.phone,
          subject: data.subject || 'פנייה חדשה מהאתר',
          message: data.message,
          site_url: window.location.hostname,
        };
        
        // Send email - with try/catch to handle failures gracefully
        const emailResult = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          emailParams
        ).catch(err => {
          console.error('EmailJS send error:', err);
          // Return null to indicate failure but continue execution
          return null;
        });
        
        // Log the result for debugging
        if (emailResult) {
          console.log('Email sent successfully:', emailResult.status);
        } else {
          console.warn('Email sending failed but continuing with form submission');
        }
        
        // Send confirmation email to the user if we have their email
        if (data.email) {
          try {
            await emailjs.send(
              EMAILJS_SERVICE_ID,
              'user_confirmation',
              {
                to_email: data.email,
                to_name: data.name,
                subject: 'תודה על הפנייה לקשב פלוס',
                message: 'תודה רבה על הפנייה. נציגנו יחזור אליך בהקדם.',
              }
            );
          } catch (confirmError) {
            console.warn('Failed to send confirmation email', confirmError);
            // Don't fail the whole submission if just the confirmation email fails
          }
        }

        // Always save to the database even if EmailJS partially fails
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
            console.error('Error saving to database:', await saveToDbResponse.text());
          }
        } catch (dbError) {
          console.error('Failed to save to database:', dbError);
        }

        // Show success even if some parts failed - as long as we tried our best
        toast.dismiss(loadingToastId);
        toast.success('הטופס נשלח בהצלחה!');
        reset();
        setTimeout(() => navigate('/'), 1500);
        
      } catch (err) {
        // This handles the overall EmailJS failures
        console.error('Error sending via EmailJS:', err);
        toast.dismiss(loadingToastId);
        toast.error('שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.');
      }
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
