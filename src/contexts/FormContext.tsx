import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface FormValues {
  name: string;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string;
}

interface FormContextType {
  contactFormValues: FormValues;
  updateContactFormValues: (values: Partial<FormValues>) => void;
  clearContactFormValues: () => void;
}

const initialFormValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [contactFormValues, setContactFormValues] = useState<FormValues>(() => {
    // Initialize with stored values from localStorage or default values
    const storedValues = localStorage.getItem('contactFormValues');
    return storedValues ? JSON.parse(storedValues) : initialFormValues;
  });

  // Update localStorage whenever form values change
  useEffect(() => {
    localStorage.setItem(
      'contactFormValues',
      JSON.stringify(contactFormValues)
    );
  }, [contactFormValues]);

  const updateContactFormValues = (values: Partial<FormValues>) => {
    setContactFormValues((prev) => ({ ...prev, ...values }));
  };

  const clearContactFormValues = () => {
    setContactFormValues(initialFormValues);
    localStorage.removeItem('contactFormValues');
  };

  return (
    <FormContext.Provider
      value={{
        contactFormValues,
        updateContactFormValues,
        clearContactFormValues,
      }}
    >
      {children}
    </FormContext.Provider>
  );

  useEffect(() => {
    const handleBeforeUnload = () => {
      clearContactFormValues();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}
