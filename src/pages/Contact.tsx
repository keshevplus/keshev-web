import type { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PageLayout from '../components/ui/PageLayout';
import GoogleMap from '../components/GoogleMap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../config/constants';
import { useCmsTranslations } from '../hooks/useCmsTranslations';

function buildFormSchema(t: (key: string, fallback: string) => string) {
  return z.object({
    name: z.string().min(2, t('contact.validation_name_min', 'השם חייב להכיל לפחות 2 תווים')),
    email: z.string().email(t('contact.validation_email_invalid', 'אנא הכנס כתובת דוא"ל חוקית')),
    phone: z
      .string()
      .regex(/^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/, t('contact.validation_phone_invalid', 'מספר טלפון לא תקין')),
    subject: z.string().optional(),
    message: z.string().min(2, t('contact.validation_message_min', 'ההודעה חייבת להכיל לפחות 2 תווים')),
  });
}

type FormValues = z.infer<ReturnType<typeof buildFormSchema>>;

export default function Contact() {
  const { t } = useCmsTranslations();
  const navigate = useNavigate();
  const address = t('contact.address_line1', 'יגאל אלון 94, תל אביב');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(buildFormSchema(t)),
  });

  const onSubmit = async (data: FormValues, event: BaseSyntheticEvent | undefined) => {
    event?.preventDefault?.();
    const loadingToastId = toast.loading(t('contact.toast_sending', 'שולח את הטופס...'), { position: 'top-center' });
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.dismiss(loadingToastId);
        toast.error(errorData.message || t('contact.toast_error', 'אירעה שגיאה בשליחת הטופס.'));
        return;
      }

      toast.dismiss(loadingToastId);
      toast.success(t('contact.toast_success', 'הטופס נשלח בהצלחה!'));
      reset();
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      toast.dismiss(loadingToastId);
      toast.error(t('contact.toast_error', 'אירעה שגיאה בשליחת הטופס.'));
      console.error('Contact form error:', err);
    }
  };

  const fields: { name: keyof FormValues; label: string; type?: string }[] = [
    { name: 'name', label: t('contact.full_name', 'שם מלא') },
    { name: 'email', label: t('contact.email_placeholder', 'דוא"ל'), type: 'email' },
    { name: 'phone', label: t('contact.phone_placeholder', 'מספר טלפון'), type: 'tel' },
    { name: 'subject', label: t('contact.topic_label', 'נושא') },
  ];

  return (
    <PageLayout title={t('contact.title', 'יצירת קשר')} background="bg-white" maxWidth="md:max-w-3xl">
      <h3 className="text-2xl md:text-xl font-bold text-green-800 text-right mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
        {t('contact.subtitle', 'נשמח לענות על כל שאלה ולעזור לכם בכל נושא')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Details and Map */}
        <div className="mb-8 md:mb-0 text-right">
          <div className="font-bold text-lg">{t('contact.address_label', 'כתובת:')}</div>
          <div className="mb-2">{address}</div>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 underline hover:text-green-900"
          >
            {t('contact.navigate_google_maps', 'פתח במפות גוגל')}
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
            {fields.map(({ name, label, type = 'text' }) => (
              <div key={name} className="relative">
                <input
                  {...register(name)}
                  type={type}
                  placeholder={label}
                  className={`w-full p-3 rounded-lg border text-right ${errors[name] ? 'border-red-700 border-2' : 'border-gray-300 focus:border-green-500'}`}
                />
                {errors[name] && (
                  <span className="absolute left-0 text-red-700 font-bold text-sm m-2">
                    {errors[name]?.message}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="relative mb-4">
            <textarea
              {...register('message')}
              rows={3}
              placeholder={t('contact.message_placeholder', 'ספרו לנו במה נוכל לעזור...')}
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
              type="button"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-300 mr-2"
              onClick={() => reset()}
            >
              {t('contact.clear_form', 'נקה טופס')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300 disabled:bg-gray-400"
            >
              {isSubmitting ? t('contact.sending', 'שולח...') : t('contact.send_message', 'שלח הודעה')}
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
