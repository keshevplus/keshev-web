import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const phoneRegex = /^(0\d{8,9}|\+972\d{8,9})$/;

const contactFormSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Invalid email address').optional(),
  phone: z
    .string()
    .regex(phoneRegex, 'Phone must be 9 or 10 digits starting with 0 or +972')
    .nonempty('Phone is required'),
  subject: z.string().optional(),
  message: z.string().nonempty('Message is required'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm: React.FC = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    setFormError(null); // Clear any previous error
    try {
      console.log('Form submitted successfully:', data);
      // Handle form submission logic here
    } catch (error) {
      setFormError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <h2>Contact Us</h2>
      {formError && <p style={{ color: 'red' }}>{formError}</p>}

      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input id="phone" {...register('phone')} />
        {errors.phone && <p style={{ color: 'red' }}>{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="subject">Subject</label>
        <input id="subject" {...register('subject')} />
        {errors.subject && (
          <p style={{ color: 'red' }}>{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" {...register('message')} />
        {errors.message && (
          <p style={{ color: 'red' }}>{errors.message.message}</p>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
