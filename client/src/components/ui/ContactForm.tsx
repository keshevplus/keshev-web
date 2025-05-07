// import { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { toast } from 'react-toastify';

// export const contactFormSchema = z.object({
//   name: z.string().min(2, 'השם חייב להכיל לפחות 2 תווים'),
//   email: z.string().email('אנא הכנס כתובת דוא"ל חוקית'),
//   phone: z.string().regex(/^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/, 'נא הכנס מספר טלפון חוקי'),
//   subject: z.string().optional(),
//   message: z.string().min(5, 'ההודעה חייבת להכיל לפחות 5 תווים')
// });

// export type ContactFormValues = z.infer<typeof contactFormSchema>;

// interface ContactFormProps {
//   onSubmitSuccess?: () => void;
// }

// const ContactForm: React.FC<ContactFormProps> = ({ onSubmitSuccess }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors, isSubmitting }
//   } = useForm<ContactFormValues>({
//     resolver: zodResolver(contactFormSchema)
//   });

//   useEffect(() => {
//     const savedValues = localStorage.getItem('contactFormValues');
//     if (savedValues) {
//       const parsedValues = JSON.parse(savedValues);
//       Object.entries(parsedValues).forEach(([key, value]) => setValue(key, value));
//     }

//     return () => localStorage.removeItem('contactFormValues');
//   }, [setValue]);

//   const onSubmit = async (data: ContactFormValues) => {
//     // Show submitting toast
//     const submittingToast = toast.loading('שולח את הטופס...', {
//       position: 'top-center'
//     });

//     try {
//       console.log('Submitting form data to contact API:', data);
      
//       // Try multiple endpoints with fallback logic
//       let response;
//       let endpointUsed = '';
      
//       try {
//         // First try the main contact endpoint
//         endpointUsed = '/api/contact';
//         response = await fetch('/api/contact', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(data)
//         });
//       } catch (contactError) {
//         console.error('Error with contact endpoint:', contactError);
//         // If first endpoint fails, try direct API
//         endpointUsed = '/api/neon/leads';
//         response = await fetch('/api/neon/leads', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(data)
//         });
//       }

//       console.log(`Response from ${endpointUsed}:`, response.status);
      
//       const result = await response.json();

//       // Always dismiss the submitting toast before showing the result
//       toast.dismiss(submittingToast);

//       if (!response.ok) {
//         // Handle validation errors
//         if (response.status === 400 && result.errors) {
//           // Create a single toast with all validation errors
//           const errorMessages = result.errors
//             .map((error: { field: string; message: string }) => {
//               const fieldNames: Record<string, string> = {
//                 name: 'שם',
//                 email: 'אימייל',
//                 phone: 'טלפון',
//                 subject: 'נושא',
//                 message: 'הודעה'
//               };
//               return `${fieldNames[error.field] || error.field}: ${error.message}`;
//             })
//             .join('\n');

//           toast.error(errorMessages, {
//             position: 'top-center',
//             autoClose: 6000,
//             style: { whiteSpace: 'pre-line' }
//           });
//           return;
//         }

//         // Handle duplicate submission
//         if (response.status === 409) {
//           toast.warning('הטופס כבר נשלח למערכת', {
//             position: 'top-center',
//             autoClose: 5000
//           });
//           return;
//         }

//         throw new Error(result.message || 'שגיאה בשליחת הטופס');
//       }

//       // Success case
//       toast.success('הטופס נשלח בהצלחה! נחזור אליך בהקדם', {
//         position: 'top-center',
//         autoClose: 5000
//       });

//       reset();
//       localStorage.removeItem('contactFormValues');
//       onSubmitSuccess?.();
//     } catch (error) {
//       // Dismiss the submitting toast
//       toast.dismiss(submittingToast);
      
//       console.error('Form submission error:', error);
      
//       // Network or unexpected errors
//       toast.error(
//         'מצטערים, אירעה שגיאה בשליחת הטופס. אנא נסה שוב או צור קשר בטלפון.',
//         {
//           position: 'top-center',
//           autoClose: 6000
//         }
//       );
//     }
//   };

//   // Show validation errors when form is submitted with errors
//   const onError = () => {
//     const errorFields = Object.keys(errors).map(field => {
//       const fieldNames: Record<string, string> = {
//         name: 'שם',
//         email: 'אימייל',
//         phone: 'טלפון',
//         subject: 'נושא',
//         message: 'הודעה'
//       };
//       return fieldNames[field] || field;
//     });

//     toast.error(`אנא תקן את השדות הבאים:\n${errorFields.join(', ')}`, {
//       position: 'top-center',
//       autoClose: 6000,
//       style: { whiteSpace: 'pre-line' }
//     });
//   };

//   return (
//     <form
//       className="bg-orange-400/65 p-8 rounded-lg shadow-lg w-full"
//       onSubmit={handleSubmit(onSubmit, onError)}
//       noValidate
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-2 pb-8">
//         {[
//           { name: 'name', label: 'שם' },
//           { name: 'email', label: 'אימייל', type: 'email' },
//           { name: 'phone', label: 'טלפון', type: 'tel' },
//           { name: 'subject', label: 'נושא' }
//         ].map(({ name, label, type = 'text' }) => (
//           <div key={name} className="relative">
//             <input
//               {...register(name as keyof ContactFormValues)}
//               type={type}
//               placeholder={label}
//               className={`w-full p-3 rounded-lg border ${
//                 errors[name as keyof ContactFormValues]
//                   ? 'border-red-700 border-2'
//                   : 'border-gray-300 focus:border-green-500'
//               }`}
//               onChange={(e) => {
//                 register(name as keyof ContactFormValues).onChange(e);
//                 const formData = JSON.parse(localStorage.getItem('contactFormValues') || '{}');
//                 localStorage.setItem(
//                   'contactFormValues',
//                   JSON.stringify({ ...formData, [name]: e.target.value })
//                 );
//               }}
//             />
//             {errors[name as keyof ContactFormValues] && (
//               <span className="absolute left-0 text-red-700 font-bold text-sm m-2">
//                 {errors[name as keyof ContactFormValues]?.message}
//               </span>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="relative mb-6">
//         <textarea
//           {...register('message')}
//           placeholder="הודעה"
//           rows={4}
//           className={`w-full p-3 rounded-lg border ${
//             errors.message
//               ? 'border-red-700 border-2'
//               : 'border-gray-300 focus:border-green-500'
//           }`}
//           onChange={(e) => {
//             register('message').onChange(e);
//             const formData = JSON.parse(localStorage.getItem('contactFormValues') || '{}');
//             localStorage.setItem(
//               'contactFormValues',
//               JSON.stringify({ ...formData, message: e.target.value })
//             );
//           }}
//         />
//         {errors.message && (
//           <span className="absolute left-0 text-red-700 font-bold text-sm m-2">
//             {errors.message.message}
//           </span>
//         )}
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
//       >
//         {isSubmitting ? 'שולח...' : 'שלח טופס'}
//       </button>
//     </form>
//   );
// };

// export default ContactForm;
