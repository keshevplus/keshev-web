<<<<<<< HEAD
// This file is not imported by any component.
// → Delete it or add an import/use in your form page if you intended to use it.
=======
// Define the type for the form data
interface FormData {
  [key: string]: any; // Adjust this to match the structure of your form data
}

const handleSubmit = async (formData: FormData): Promise<void> => {
  try {
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error response from server:', {
        status: response.status,
        statusText: response.statusText,
        errorDetails,
      });
      throw new Error(
        `Server responded with status: ${response.status} - ${
          errorDetails.message || 'Unknown error'
        }`
      );
    }

    const data = await response.json();
    console.log('Form submitted successfully:', data);
  } catch (error: any) {
    console.error('Failed to submit the form:', {
      error: error.message,
      formData,
    });
    alert(
      `An error occurred while submitting the form: ${error.message}. Please check your input and try again.`
    );
  }
};

export default handleSubmit;
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
