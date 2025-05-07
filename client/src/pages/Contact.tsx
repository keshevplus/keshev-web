import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/ui/PageLayout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

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

  const onSubmit = async (data: FormValues) => {
    try {
      console.log('Contact page - Submitting form data:', data);
      
      // Try multiple endpoints with detailed error logging
      let response;
      let endpoint = '';
      let error = null;
      
      // First attempt - Try contact endpoint
      try {
        endpoint = '/api/contact';
        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        // If response is ok, we have a successful submission
        if (response.ok) {
          const result = await response.json();
          console.log('Successful form submission via /api/contact:', result);
          toast.success('הטופס נשלח בהצלחה!');
          console.log(result);
          reset();
          setTimeout(() => navigate('/'), 1500);
          return; // Exit early on success
        }
        
        console.warn(`${endpoint} returned status ${response.status}`);
      } catch (err) {
        console.error(`Error with ${endpoint}:`, err);
        error = err;
        console.log(error);

      }
      
      // Second attempt - Try neon/leads endpoint directly
      try {
        endpoint = '/api/neon/leads';
        console.log('Trying fallback endpoint:', endpoint);
        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('Successful form submission via fallback:', result);
          toast.success('הטופס נשלח בהצלחה!');
          reset();
          setTimeout(() => navigate('/'), 1500);
          return; // Exit early on success
        }
        
        console.warn(`${endpoint} returned status ${response.status}`);
      } catch (err) {
        console.error(`Error with ${endpoint}:`, err);
        error = err;
        console.log(error);
      }
      
      // If we get here, both attempts failed
      console.error('All submission attempts failed');
      toast.error('שגיאה בשליחת הטופס, אנא נסה שוב או צור קשר בטלפון');
    } catch (error) {
      console.error('Unhandled error in form submission:', error);
      toast.error('שגיאה בשליחת הטופס, אנא נסה שוב');
      console.log(error);
   
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
            placeholder="הודעה"
            rows={4}
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

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
          >
            {isSubmitting ? 'שולח...' : 'שלח טופס'}
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
          >
            נקה טופס
          </button>
        </div>
      </form>
    </PageLayout>
  );
}
