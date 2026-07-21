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
import { useTranslations } from '../hooks/useTranslations';

function buildFormSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(2, t('keshevweb.contact.validation.nameMin')),
    email: z.string().email(t('keshevweb.contact.validation.emailInvalid')),
    phone: z
      .string()
      .regex(/^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/, t('keshevweb.contact.validation.phoneInvalid')),
    subject: z.string().optional(),
    message: z.string().min(2, t('keshevweb.contact.validation.messageMin')),
  });
}

type FormValues = z.infer<ReturnType<typeof buildFormSchema>>;

export default function Contact() {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const address = t('keshevweb.contactInfo.address');

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
    const loadingToastId = toast.loading(t('keshevweb.contact.toast.sending'), { position: 'top-center' });
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.dismiss(loadingToastId);
        toast.error(errorData.message || t('keshevweb.contact.toast.error'));
        return;
      }

      toast.dismiss(loadingToastId);
      toast.success(t('keshevweb.contact.toast.success'));
      reset();
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      toast.dismiss(loadingToastId);
      toast.error(t('keshevweb.contact.toast.error'));
      console.error('Contact form error:', err);
    }
  };

  const fields: { name: keyof FormValues; label: string; type?: string }[] = [
    { name: 'name', label: t('keshevweb.contact.form.nameLabel') },
    { name: 'email', label: t('keshevweb.contact.form.emailLabel'), type: 'email' },
    { name: 'phone', label: t('keshevweb.contact.form.phoneLabel'), type: 'tel' },
    { name: 'subject', label: t('keshevweb.contact.form.subjectLabel') },
  ];

  return (
    <PageLayout title={t('keshevweb.contact.title')} background="bg-white" maxWidth="md:max-w-3xl">
      <h3 className="text-2xl md:text-xl font-bold text-green-800 text-right mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
        {t('keshevweb.contact.subheading')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Details and Map */}
        <div className="mb-8 md:mb-0 text-right">
          <div className="font-bold text-lg">{t('keshevweb.contact.addressLabel')}</div>
          <div className="mb-2">{address}</div>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 underline hover:text-green-900"
          >
            {t('keshevweb.contact.mapLink')}
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
              placeholder={t('keshevweb.contact.form.messageLabel')}
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
              {t('keshevweb.contact.form.clearButton')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300 disabled:bg-gray-400"
            >
              {isSubmitting ? t('keshevweb.contact.form.sending') : t('keshevweb.contact.form.sendButton')}
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
