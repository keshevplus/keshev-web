import type { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useCmsTranslations } from '../hooks/useCmsTranslations';
import { useSectionId } from '../lib/sectionSlugs';
import { API_URL } from '../config/constants';
import SectionHeader from './SectionHeader';
import GoogleMap from './GoogleMap';

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

// Holds the real, working contact form directly (rather than a preview card
// linking to a separate /contact page) since every section route now
// renders this same homepage and just scrolls to its anchor.
export default function ContactSection() {
  const { t } = useCmsTranslations();
  const sectionId = useSectionId('contact');
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
    <section id={sectionId} className="w-full bg-gray-50 rtl">
      <SectionHeader
        title={t('nav.contact', 'יצירת קשר')}
        subtitle={t('contact.subtitle', 'השאירו פרטים ונחזור אליכם בהקדם האפשרי')}
      />
      <div className="max-w-6xl mx-auto px-4 pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <form
            className="bg-white rounded-xl shadow-lg p-6"
            onSubmit={(e) => {
              e.preventDefault();
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
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                onClick={() => reset()}
              >
                {t('contact.clear_form', 'נקה טופס')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-bold transition-colors duration-300"
              >
                {isSubmitting ? t('contact.sending', 'שולח...') : t('contact.send_message', 'שליחת הודעה')}
              </button>
            </div>
          </form>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-green-800 text-center">
              {t('contact.details_title', 'פרטי התקשרות')}
            </h3>

            <div className="space-y-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <p className="font-bold text-xl text-gray-900">{t('contact.address_label', 'כתובת:')}</p>
                <p className="text-green-800 font-bold text-lg leading-tight">{address}</p>
                <p className="text-green-800 font-bold text-lg leading-tight">
                  {t('contact.address_line2', 'מגדלי אלון 1, קומה 12, משרד 1202')}
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="font-bold text-xl text-gray-900">{t('contact.email_label', 'דוא"ל:')}</p>
                <a href="mailto:dr@keshevplus.co.il" className="text-green-700 font-bold text-lg hover:underline">
                  dr@keshevplus.co.il
                </a>
              </div>

              <div className="flex flex-col items-center gap-1">
                <p className="font-bold text-xl text-gray-900">{t('contact.phone_label', 'טלפון')}</p>
                <a href="tel:055-27-399-27" className="text-gray-900 font-bold text-lg hover:underline">
                  055-27-399-27
                </a>
              </div>
            </div>

            <GoogleMap />
          </div>
        </div>
      </div>
    </section>
  );
}
