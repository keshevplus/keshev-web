import { useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { usePageData } from '../hooks/usePageData';
import { ContentItem } from '../types/content';
import { useFormContext } from '../contexts/FormContext';
import { z } from 'zod';

export default function Contact() {
  const { data, isLoading, error } = usePageData('contact');
  const { contactFormValues, updateContactFormValues, clearContactFormValues } =
    useFormContext();

  // Set RTL direction for the document
  useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateContactFormValues({ [name]: value });

    // Update data-has-value attribute for styling
    e.target.setAttribute('data-has-value', value ? 'true' : 'false');
  };

  if (isLoading) {
    return (
      <div>
        <div className="container mx-auto max-w-full md:max-w-[75%] py-8 loading"></div>
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const validateFormData = (data: Record<string, any>) => {
    const schema = z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email address'),
      phone: z.string().min(1, 'Phone number is required'),
      subject: z.string().optional(),
      message: z.string().min(1, 'Message is required'),
    });

    return schema.safeParse(data);
  };

  const saveContactDetails = async (formData: any) => {
    try {
      const response = await fetch('/api/save-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          data: formData,
        }),
      });

      if (!response.ok) {
        console.error('Failed to save contact details to file');
      }
    } catch (error) {
      console.error('Error saving contact details:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      name: formData.get('name')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim(),
      subject: formData.get('subject')?.toString().trim(),
      message: formData.get('message')?.toString().trim(),
    };

    const validation = validateFormData(data);

    if (!validation.success) {
      console.error('Validation errors:', validation.error.errors);
      alert('Please fix the errors in the form.');
      return;
    }

    // Always save contact details to the file
    await saveContactDetails(validation.data);

    try {
      let response;
      try {
        response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(validation.data),
        });
      } catch (networkError) {
        console.error('Network error:', networkError);
        alert(
          'Unable to connect to the server. Your details have been saved locally.'
        );
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      alert('Form submitted successfully!');
      clearContactFormValues();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!data.length) return null;

  const pageData: ContentItem = data[0];

  return (
    <div className="rtl">
      <PageLayout title={pageData.heading} children={undefined}>
        {/* Add meaningful content here or leave it empty if no children are needed */}
      </PageLayout>
      <div className="bg-white flex items-center justify-end h-full">
        <div className="container mx-auto md:max-w-[80%]">
          <h3 className="text-2xl md:text-xl font-bold text-green-800 text-right mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
            {pageData.subheading}
          </h3>
          <form
            className="bg-orange-400/65 p-8 rounded-lg shadow-lg w-full"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-2  pb-8">
              {['name', 'email', 'phone', 'subject'].map((field, index) => (
                <div key={index} className="relative">
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    placeholder={
                      field === 'name'
                        ? 'שם מלא'
                        : field === 'email'
                        ? 'מייל'
                        : field === 'phone'
                        ? 'מספר טלפון'
                        : 'הנושא'
                    }
                    required={field === 'name' || field === 'phone'}
                    className="p-4 border rounded-lg w-full peer placeholder-transparent"
                    value={
                      contactFormValues[field as keyof typeof contactFormValues]
                    }
                    onChange={handleInputChange}
                    data-has-value={
                      contactFormValues[field as keyof typeof contactFormValues]
                        ? 'true'
                        : 'false'
                    }
                  />
                  <label
                    htmlFor={field}
                    className={`absolute right-0 pr-4 text-green-950 text-xl transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-27px] peer-focus:text-green-950 peer-focus:text-xl ${
                      contactFormValues[field as keyof typeof contactFormValues]
                        ? 'top-[-27px] text-green-950 text-xl'
                        : 'top-4'
                    }`}
                  >
                    {field === 'name'
                      ? 'שם מלא'
                      : field === 'email'
                      ? 'מייל'
                      : field === 'phone'
                      ? 'מספר טלפון'
                      : 'הנושא'}
                  </label>
                  <script>
                    {`
                      window.addEventListener('beforeunload', () => {
                      localStorage.removeItem('contactFormValues');
                      });
                    `}
                  </script>
                </div>
              ))}
            </div>
            <div className="relative">
              <textarea
                name="message"
                placeholder="ההודעה שלך"
                className="p-4 border rounded-lg w-full mb-4 peer placeholder-transparent"
                rows={5}
                value={contactFormValues.message}
                onChange={handleInputChange}
                data-has-value={contactFormValues.message ? 'true' : 'false'}
                required
              ></textarea>
              <label
                htmlFor="message"
                className={`absolute right-0 pr-4 text-green-950 text-xl transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-27px] peer-focus:text-green-800 peer-focus:text-xl ${
                  contactFormValues.message
                    ? 'top-[-27px] text-green-800 text-sm'
                    : 'top-4'
                }`}
              >
                ההודעה שלך
              </label>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-green-800 text-white px-8 py-4 rounded-lg text-lg hover:bg-green-700 transition"
                >
                  שלח
                </button>
                <button
                  type="button"
                  onClick={clearContactFormValues}
                  className="bg-gray-400 text-white px-8 py-4 rounded-lg text-lg hover:bg-gray-500 transition"
                >
                  איפוס שדות
                </button>
              </div>
            </div>
            <h4
              id="form-error-message"
              className="text-red-600 text-lg mt-4 hidden"
            >
              אירעה שגיאה בעת שליחת הטופס. אנא נסה שוב.
            </h4>
          </form>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {pageData.body?.map((item, index) => (
              <li
                key={index}
                className="bg-white rounded-2xl shadow-xl p-6 text-center transition-all duration-300 hover:shadow-2xl hover:bg-green-50/40"
              >
                <div className="text-4xl mb-4 text-green-800">{item.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-md md:text-lg">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
