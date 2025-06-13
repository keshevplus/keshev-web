import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { servicesService } from '../../services/api';
import { Link } from 'react-router-dom';

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    image_url: string;
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

interface AdminServicesManagerProps {
    darkMode?: boolean;
}

const AdminServicesManager: React.FC<AdminServicesManagerProps> = ({ darkMode = false }) => {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { i18n } = useTranslation();
    const isRtl = i18n.language === 'he';
    const [expandedService, setExpandedService] = useState<string | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        try {
            setIsLoading(true);
            const response = await servicesService.getAllServices();

            if (response && Array.isArray(response)) {
                setServices(response as Service[]);
            } else {
                console.warn('Invalid response format from API:', response);
                setServices([]);
            }
        } catch (err) {
            setError('Failed to fetch services');
            console.error(err);
            setServices([]);
        } finally {
            setIsLoading(false);
        }
    }

    async function addService() {
        try {
            const maxOrder =
                services.length > 0
                    ? Math.max(...services.map((s) => s.display_order || 0))
                    : 0;

            const newService = {
                title: 'New Service',
                description: 'Service description',
                icon: '🔧',
                image_url: '',
                display_order: maxOrder + 1,
            };

            const response = await servicesService.createService(newService) as { data: Service };
            if (response && response.data) {
                setServices([...services, response.data]);
            }
        } catch (err) {
            setError('Failed to add service');
            console.error(err);
        }
    }

    async function updateService(
        id: string,
        field: keyof Service,
        value: string | number
    ) {
        try {
            await servicesService.updateService(id, { [field]: value });
            setServices(
                services.map((service) =>
                    service.id === id ? { ...service, [field]: value } : service
                )
            );
        } catch (err) {
            setError('Failed to update service');
            console.error(err);
        }
    }

    async function deleteService(id: string) {
        try {
            await servicesService.deleteService(id);
            setServices(services.filter((service) => service.id !== id));
        } catch (err) {
            setError('Failed to delete service');
            console.error(err);
        }
    }

    const toggleServicePreview = (serviceId: string) => {
        if (expandedService === serviceId) {
            setExpandedService(null);
        } else {
            setExpandedService(serviceId);
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
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Manage Services</h2>
                <button
                    onClick={addService}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                    Add New Service
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {services.map((service) => (
                    <div key={service.id} className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
                        <div className="flex justify-between mb-4">
                            <ContentEditable
                                content={service.icon}
                                onUpdate={(value) => updateService(service.id, 'icon', value)}
                                className="text-2xl w-12"
                            />
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => toggleServicePreview(service.id)}
                                    className={`px-2 py-1 text-xs font-medium rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                                >
                                    {expandedService === service.id ? 'Hide Preview' : 'Preview'}
                                </button>
                                <button
                                    onClick={() => deleteService(service.id)}
                                    className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'} transition-colors`}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="mb-2">
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Title:</span>
                            <ContentEditable
                                content={service.title}
                                onUpdate={(value) => updateService(service.id, 'title', value)}
                                className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}
                            />
                        </div>
                        <div className="mb-2">
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Description:</span>
                            <ContentEditable
                                content={service.description}
                                onUpdate={(value) => updateService(service.id, 'description', value)}
                                className={darkMode ? 'text-gray-200' : 'text-gray-700'}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Image URL:</span>
                                <ContentEditable
                                    content={service.image_url || 'None'}
                                    onUpdate={(value) => updateService(service.id, 'image_url', value)}
                                    className={`text-sm font-mono ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                                />
                            </div>
                            <div className="flex items-center">
                                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'} mr-2`}>Order:</span>
                                <input
                                    type="number"
                                    value={service.display_order}
                                    onChange={(e) => updateService(service.id, 'display_order', parseInt(e.target.value))}
                                    className={`w-16 px-2 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                                />
                            </div>
                        </div>

                        {expandedService === service.id && (
                            <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
                                <h3 className="text-lg font-semibold mb-2">Service Preview: {service.title}</h3>

                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">{service.icon}</span>
                                    <h4 className="text-xl font-bold">{service.title}</h4>
                                </div>

                                <p className="mb-6">{service.description}</p>

                                {service.image_url && service.image_url !== 'None' && (
                                    <img
                                        src={service.image_url}
                                        alt={service.title}
                                        className="w-full h-auto max-h-60 object-contain mb-6 rounded"
                                    />
                                )}

                                <div className="flex flex-wrap gap-3 mt-6">
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
                                        to="/services"
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

export default AdminServicesManager;