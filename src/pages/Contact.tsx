import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/ui/PageLayout';
import GoogleMap from '../components/GoogleMap';
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
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
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
        {/* Details and Map */}
        <div className="mb-8 md:mb-0 text-right">
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
          <GoogleMap />
        </div>
        {/* Contact Form */}
        <form
          className="bg-orange-400/65 p-6 rounded-lg shadow-lg w-full"
          onSubmit={(e) => {
            e.preventDefault(); // Explicitly prevent default form submission
            handleSubmit(onSubmit)(e);
          }}
          noValidate
        >
          <div className="grid grid-cols-1 gap-4 mb-4">
            {[{ name: 'name', label: 'שם' }, { name: 'email', label: 'אימייל', type: 'email' }, { name: 'phone', label: 'טלפון', type: 'tel' }, { name: 'subject', label: 'נושא' }].map(({ name, label, type = 'text' }) => (
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
    </PageLayout>
  );
}
