import { FocusEvent, FormEvent, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { usePageData } from '../hooks/usePageData';
import PageLayout from '../components/PageLayout';

export default function Contact() {
  const methods = useForm();
  const { data: pageData } = usePageData('contact');
  const { setValue, reset, getValues } = methods;
  const contactFormValues = getValues();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [validFields, setValidFields] = useState<Record<string, boolean>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Load saved form values from localStorage on mount
  useEffect(() => {
    const savedValues = localStorage.getItem('contactFormValues');
    if (savedValues) {
      const parsedValues = JSON.parse(savedValues);
      Object.entries(parsedValues).forEach(([key, value]) =>
        setValue(key, value)
      );
    }

    // Clear localStorage on page unload (browser refresh or close)
    const handleBeforeUnload = () => {
      localStorage.removeItem('contactFormValues');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [setValue]);

  // Save form values to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('contactFormValues', JSON.stringify(contactFormValues));
  }, [contactFormValues]);

  const updateContactFormValues = (values: Record<string, any>) => {
    Object.entries(values).forEach(([key, value]) => setValue(key, value));
  };

  const clearContactFormValues = () => {
    reset();
    localStorage.removeItem('contactFormValues');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateContactFormValues({ [name]: value });

    // Update data-has-value attribute for styling
    e.target.setAttribute('data-has-value', value ? 'true' : 'false');
  };

  const handleValidation = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let isValid = true;
    let errorMessage = '';

    if (name === 'name') {
      isValid = value.trim().length >= 2;
      errorMessage = isValid ? '' : 'השם חייב להכיל לפחות 2 תווים';
    } else if (name === 'email') {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      errorMessage = isValid ? '' : 'אנא הכנס כתובת דוא"ל חוקית';
    } else if (name === 'phone') {
      isValid = /^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/.test(value);
      errorMessage = isValid ? '' : 'נא הכנס מספר טלפון חוקי';
    } else if (name === 'message') {
      isValid = value.trim().length >= 5;
      errorMessage = isValid ? '' : 'ההודעה חייבת להכיל לפחות 5 תווים';
    }

    setValidationErrors((prev) => ({ ...prev, [name]: errorMessage }));
    setValidFields((prev) => ({ ...prev, [name]: isValid }));

    if (!isValid) {
      e.target.classList.add('border-red-700', 'border-2');
      e.target.classList.remove('border-green-500');
    } else {
      e.target.classList.add('border-green-500');
      e.target.classList.remove('border-red-700', 'border-2');
    }

    if (!isValid && !globalError) {
      setGlobalError(errorMessage);
    }
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    if (!validFields[name]) {
      setGlobalError(validationErrors[name]);
    }
  };

  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGlobalError(null);
  };

  function handleSubmit(_event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <FormProvider {...methods}>
      <div className="rtl">
        <PageLayout title={pageData[0]?.heading || ''} children={undefined}>
          {/* Add meaningful content here or leave it empty if no children are needed */}
        </PageLayout>
        <div className="bg-white flex items-center justify-end h-full">
          <div className="container mx-auto md:max-w-[80%]">
            <h3 className="text-2xl md:text-xl font-bold text-green-800 text-right mb-8 transition-transform duration-300 ease-in-out hover:scale-105">
              {pageData[0]?.subheading}
            </h3>

            <form
              className="bg-orange-400/65 p-8 rounded-lg shadow-lg w-full"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-2 pb-8">
                {['name', 'email', 'phone', 'subject'].map((field, index) => (
                  <div key={index} className="relative">
                    <span
                      className={`absolute left-0 text-red-700 font-bold text-sm m-2 ${
                        validationErrors[field] ? 'visible' : 'invisible'
                      }`}
                    >
                      {validationErrors[field]}
                    </span>
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
                      className={`p-4 border rounded-lg w-full peer placeholder-transparent ${
                        validationErrors[field]
                          ? 'border-red-700 border-2'
                          : validFields[field]
                          ? 'border-green-500'
                          : ''
                      }`}
                      value={
                        contactFormValues?.[
                          field as keyof typeof contactFormValues
                        ] || ''
                      }
                      onChange={(e) => {
                        handleInputChange(e);
                        handleValidation(e);
                      }}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
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
                      className={`absolute right-0 pr-4 text-green-950 text-xl transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-27px] peer-focus:text-green-950 peer-focus:text-xl ${
                        contactFormValues[
                          field as keyof typeof contactFormValues
                        ]
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
                  </div>
                ))}
              </div>
              <div className="relative">
                <span
                  className={`absolute left-0 text-red-700 font-bold text-sm m-1 ${
                    validationErrors.message ? 'visible' : 'invisible'
                  }`}
                >
                  {validationErrors.message}
                </span>
                <textarea
                  name="message"
                  placeholder="ההודעה שלך"
                  className={`p-4 border rounded-lg w-full mb-4 peer placeholder-transparent ${
                    validationErrors.message
                      ? 'border-red-700 border-2'
                      : validFields.message
                      ? 'border-green-500'
                      : ''
                  }`}
                  rows={5}
                  value={contactFormValues.message}
                  onChange={(e) => {
                    handleInputChange(e);
                    handleValidation(e);
                  }}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
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
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
