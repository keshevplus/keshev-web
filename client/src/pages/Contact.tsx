import { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import { usePageData } from '../hooks/usePageData';
import BodyContent from '../components/BodyContent';
import { ContentItem } from '../types/content';
import { useFormContext } from '../contexts/FormContext';

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
    if (e.target instanceof HTMLInputElement) {
      e.target.setAttribute('data-has-value', value ? 'true' : 'false');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const sanitizedData = {
      name: formData.get('name')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim(),
      subject: formData.get('subject')?.toString().trim(),
      message: formData.get('message')?.toString().trim(),
    };

    // Save sanitized data to a JSON file (mocked here)
    console.log('Form Data:', sanitizedData);
    alert('הטופס נשלח בהצלחה! נחזור אליכם בהקדם.');

    // Clear form after successful submission
    clearContactFormValues();
  };

  if (isLoading) {
    return (
      <div>
        <div className="container mx-auto max-w-full md:max-w-[75%] py-8 loading"></div>
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  if (!data.length) return null;

  const pageData: ContentItem = data[0];
  const contactData: ContentItem = data[0];

  return (
    <div className="rtl">
      <PageTitle title={contactData.heading} />
      <BodyContent>
        <div className="bg-white flex items-center justify-end h-full">
          <div className="container mx-auto md:max-w-[80%]">
            <h3 className="text-2xl md:text-xl font-bold text-green-800 text-right mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
              {pageData.subheading}
            </h3>
            <form
              className="bg-orange-400/65 p-8 rounded-lg shadow-lg w-full"
              onSubmit={handleSubmit}
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
                        contactFormValues[
                          field as keyof typeof contactFormValues
                        ]
                      }
                      onChange={handleInputChange}
                      data-has-value={
                        contactFormValues[
                          field as keyof typeof contactFormValues
                        ]
                          ? 'true'
                          : 'false'
                      }
                    />
                    <label
                      htmlFor={field}
                      className={`absolute right-0 pr-4 text-green-950 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-27px] peer-focus:text-green-800 peer-focus:text-sm ${
                        contactFormValues[
                          field as keyof typeof contactFormValues
                        ]
                          ? 'top-[-27px] text-green-800 text-sm'
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
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute right-0 pr-4 text-green-950 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-27px] peer-focus:text-green-800 peer-focus:text-sm"
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
            </form>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {pageData.body?.map((item, index) => (
                <li
                  key={index}
                  className="bg-white rounded-2xl shadow-xl p-6 text-center transition-all duration-300 hover:shadow-2xl hover:bg-green-50/40"
                >
                  <div className="text-4xl mb-4 text-green-800">
                    {item.icon}
                  </div>
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
      </BodyContent>
    </div>
  );
}
