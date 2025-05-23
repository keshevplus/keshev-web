// FormsManager.tsx

import React, { useState, useEffect } from 'react';
import { formsService } from '../../services/api';
import ContentEditable from '../../components/ContentEditable';

interface Form {
  id: string;
  form_type: string;
  fields: FormField[];
  title?: string;
  subtitle?: string;
  description?: string;
  file_url?: string;
  image_url?: string;
  submit_text: string;
  success_message: string;
  display_order: number;
}

interface FormField {
  field_type: string;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  options?: string[];
  display_order: number;
}

interface FormsManagerProps {
  darkMode?: boolean;
}

const FormsManager: React.FC<FormsManagerProps> = ({ darkMode = false }) => {
  const [forms, setForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchForms();
  }, []);

  async function fetchForms() {
    try {
      setIsLoading(true);
      const response = await formsService.getAllForms();
      setForms(response);
    } catch (err) {
      setError('Failed to fetch forms');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function addForm() {
    try {
      // Find highest display order and add 1
      const maxOrder =
        forms.length > 0 ? Math.max(...forms.map((f) => f.display_order)) : 0;

      const newForm = {
        title: 'New Form',
        subtitle: 'Form subtitle',
        description: 'Form description',
        file_url: '',
        image_url: '',
        display_order: maxOrder + 1,
      };

      const response = await formsService.createForm(newForm);
      setForms([...forms, response.data]);
    } catch (err) {
      setError('Failed to add form');
      console.error(err);
    }
  }

  async function updateForm(
    id: string,
    field: keyof Form,
    value: string | number
  ) {
    try {
      await formsService.updateForm(id, { [field]: value });
      setForms(
        forms.map((form) =>
          form.id === id ? { ...form, [field]: value } : form
        )
      );
    } catch (err) {
      setError('Failed to update form');
      console.error(err);
    }
  }

  async function deleteForm(id: string) {
    try {
      await formsService.deleteForm(id);
      setForms(forms.filter((form) => form.id !== id));
    } catch (err) {
      setError('Failed to delete form');
      console.error(err);
    }
  }

  if (isLoading) return <div className="p-6">Loading forms...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Forms</h2>
        <button
          onClick={addForm}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Add New Form
        </button>
      </div>

      {/* Forms list */}
      <div className="grid grid-cols-1 gap-4">
        {forms.map((form) => (
          <div key={form.id} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">
                <ContentEditable
                  content={form.title || 'Untitled Form'}
                  onUpdate={(value: string) => updateForm(form.id, 'title', value)}
                  className="font-semibold"
                />
              </h3>
              <button
                onClick={() => deleteForm(form.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
            <div className="mb-2">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Subtitle:</span>
              <ContentEditable
                content={form.subtitle || ''}
                onUpdate={(value: string) => updateForm(form.id, 'subtitle', value)}
                className="font-medium"
              />
            </div>
            <div className="mb-2">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Description:</span>
              <ContentEditable
                content={form.description || ''}
                onUpdate={(value: string) => updateForm(form.id, 'description', value)}
                className={darkMode ? 'text-gray-300' : 'text-gray-700'}
              />
            </div>
            <div className="mb-2">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>File URL:</span>
              <ContentEditable
                content={form.file_url || 'None'}
                onUpdate={(value: string) => updateForm(form.id, 'file_url', value)}
                className="text-sm font-mono"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Image URL:</span>
                <ContentEditable
                  content={form.image_url || 'None'}
                  onUpdate={(value: string) => updateForm(form.id, 'image_url', value)}
                  className="text-sm font-mono"
                />
              </div>
              <div className="flex items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mr-2`}>Order:</span>
                <input
                  type="number"
                  value={form.display_order}
                  onChange={(e) =>
                    updateForm(
                      form.id,
                      'display_order',
                      parseInt(e.target.value)
                    )
                  }
                  className={`w-16 px-2 py-1 border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormsManager;
