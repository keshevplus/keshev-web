import React from 'react';
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
  message: z.string().min(10, 'ההודעה חייבת להכיל לפחות 10 תווים'),
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
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('שגיאה בשליחת הטופס');
      }

      toast.success('הטופס נשלח בהצלחה!');
      reset();
      setTimeout(() => {
        navigate('/');
      }, 1500); // Wait for 1.5 seconds so the user can see the success message
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('שגיאה בשליחת הטופס, אנא נסה שוב');
    }
  };

  return (
    <div className="rtl">
      <PageLayout title={pageData[0]?.heading || ''}>
        <div className="bg-white flex items-center justify-end h-full">
          <div className="container mx-auto md:max-w-[80%]">
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
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
