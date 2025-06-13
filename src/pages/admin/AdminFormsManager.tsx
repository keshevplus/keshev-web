import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formsService } from '../../services/api';
import { Link } from 'react-router-dom';

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

interface ContentEditableProps<T extends string | number> {
    content: T;
    onUpdate: (value: string) => void;
    className?: string;
}

function ContentEditable<T extends string | number>({
    content,
    onUpdate,
    className = '',
}: ContentEditableProps<T>) {
    const element = React.useRef<HTMLDivElement>(null);

    const handleBlur = () => {
        if (element.current) {
            const newContent = element.current.innerText;
            if (newContent !== String(content)) {
                onUpdate(newContent);
            }
        }
    };

    return (
        <div
            ref={element}
            contentEditable
            onBlur={handleBlur}
            className={`focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 ${className}`}
            suppressContentEditableWarning
        >
            {String(content)}
        </div>
    );
}

interface AdminFormsManagerProps {
    darkMode?: boolean;
}

const AdminFormsManager: React.FC<AdminFormsManagerProps> = ({ darkMode = false }) => {
    const [forms, setForms] = useState<Form[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { i18n } = useTranslation();
    const isRtl = i18n.language === 'he';
    const [expandedForm, setExpandedForm] = useState<string | null>(null);

    useEffect(() => {
        fetchForms();
    }, []);

    async function fetchForms() {
        try {
            setIsLoading(true);
            const response = await formsService.getAllForms();

            if (response && Array.isArray(response)) {
                setForms(response as Form[]);
            } else {
                console.warn('Invalid response format from API:', response);
                setForms([]);
            }
        } catch (err) {
            setError('Failed to fetch forms');
            console.error(err);
            setForms([]);
        } finally {
            setIsLoading(false);
        }
    }

    async function addForm() {
        try {
            const maxOrder =
                forms.length > 0 ? Math.max(...forms.map((f) => f.display_order)) : 0;

            const newForm = {
                title: 'New Form',
                subtitle: 'Form subtitle',
                description: 'Form description',
                file_url: '',
                image_url: '',
                form_type: 'contact',
                submit_text: 'Submit',
                success_message: 'Thank you for your submission!',
                fields: [
                    {
                        field_type: 'text',
                        name: 'name',
                        label: 'Name',
                        placeholder: 'Enter your name',
                        required: true,
                        display_order: 0
                    },
                    {
                        field_type: 'email',
                        name: 'email',
                        label: 'Email',
                        placeholder: 'Enter your email',
                        required: true,
                        display_order: 1
                    }
                ],
                display_order: maxOrder + 1,
            };

            const response = await formsService.createForm(newForm) as { data: Form };
            if (response && response.data) {
                setForms([...forms, response.data]);
            }
        } catch (err) {
            setError('Failed to add form');
            console.error(err);
        }
    }

    async function updateForm(
        id: string,
        field: keyof Form,
        value: string | number | FormField[]
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
        if (window.confirm('Are you sure you want to delete this form?')) {
            try {
                await formsService.deleteForm(id);
                setForms(forms.filter((form) => form.id !== id));
            } catch (err) {
                setError('Failed to delete form');
                console.error(err);
            }
        }
    }

    const toggleFormPreview = (formId: string) => {
        if (expandedForm === formId) {
            setExpandedForm(null);
        } else {
            setExpandedForm(formId);
        }
    };

    if (isLoading) {
        return (
            <div className={`p-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
            <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Manage Forms</h2>
                <button
                    onClick={addForm}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                    Add New Form
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {forms.map((form) => (
                    <div key={form.id} className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'} mr-2`}>Type:</span>
                                <span className="font-medium">{form.form_type}</span>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => toggleFormPreview(form.id)}
                                    className={`px-2 py-1 text-xs font-medium rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                                >
                                    {expandedForm === form.id ? 'Hide Preview' : 'Preview'}
                                </button>
                                <button
                                    onClick={() => deleteForm(form.id)}
                                    className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'} transition-colors`}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="mb-2">
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Title:</span>
                            <ContentEditable
                                content={form.title || ''}
                                onUpdate={(value) => updateForm(form.id, 'title', value)}
                                className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}
                            />
                        </div>

                        <div className="mb-2">
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Subtitle:</span>
                            <ContentEditable
                                content={form.subtitle || ''}
                                onUpdate={(value) => updateForm(form.id, 'subtitle', value)}
                                className={darkMode ? 'text-gray-200' : 'text-gray-700'}
                            />
                        </div>

                        <div className="mb-2">
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Description:</span>
                            <ContentEditable
                                content={form.description || ''}
                                onUpdate={(value) => updateForm(form.id, 'description', value)}
                                className={darkMode ? 'text-gray-200' : 'text-gray-700'}
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Submit Button Text:</span>
                                <ContentEditable
                                    content={form.submit_text || 'Submit'}
                                    onUpdate={(value) => updateForm(form.id, 'submit_text', value)}
                                    className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                />
                            </div>
                            <div className="flex items-center">
                                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'} mr-2`}>Order:</span>
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
                                    className={`w-16 px-2 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                                />
                            </div>
                        </div>

                        {expandedForm === form.id && (
                            <div className="mt-4">
                                <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Form Fields</h3>

                                <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} p-4 rounded-md mb-4`}>
                                    <div className="mb-2 font-medium">{form.title}</div>
                                    {form.subtitle && <div className="mb-2 text-sm">{form.subtitle}</div>}
                                    {form.description && <div className="mb-4 text-sm">{form.description}</div>}

                                    {form.fields && form.fields.length > 0 ? (
                                        <div className="space-y-3">
                                            {form.fields.sort((a, b) => a.display_order - b.display_order).map((field, index) => (
                                                <div key={index} className="flex flex-col">
                                                    <label className="block text-sm font-medium mb-1">
                                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                                    </label>

                                                    {field.field_type === 'text' && (
                                                        <input
                                                            type="text"
                                                            placeholder={field.placeholder}
                                                            disabled
                                                            className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                                                        />
                                                    )}

                                                    {field.field_type === 'email' && (
                                                        <input
                                                            type="email"
                                                            placeholder={field.placeholder}
                                                            disabled
                                                            className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                                                        />
                                                    )}

                                                    {field.field_type === 'textarea' && (
                                                        <textarea
                                                            placeholder={field.placeholder}
                                                            disabled
                                                            rows={3}
                                                            className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                                                        />
                                                    )}

                                                    {field.field_type === 'select' && (
                                                        <select
                                                            disabled
                                                            className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                                                        >
                                                            <option value="">{field.placeholder}</option>
                                                            {field.options?.map((option, idx) => (
                                                                <option key={idx} value={option}>{option}</option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </div>
                                            ))}

                                            <button
                                                disabled
                                                className="bg-green-600 text-white px-4 py-2 rounded mt-2"
                                            >
                                                {form.submit_text || 'Submit'}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-gray-500">No form fields defined.</div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-3 mt-4">
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full shadow-md font-medium transition"
                                    >
                                        צור קשר לייעוץ
                                        <img
                                            src="/assets/images/leafinverse.png"
                                            alt=""
                                            className="h-4 w-auto"
                                        />
                                    </Link>

                                    <Link
                                        to="/about"
                                        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full shadow-md font-medium transition"
                                    >
                                        קרא/י עוד
                                        <img
                                            src="/assets/images/leaf.png"
                                            alt=""
                                            className="h-4 w-auto"
                                        />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminFormsManager;