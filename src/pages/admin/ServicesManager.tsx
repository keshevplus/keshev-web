// ServicesManager.tsx

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { servicesService } from '../../services/api';

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

interface ServicesManagerProps {
  darkMode?: boolean;
}

const ServicesManager: React.FC<ServicesManagerProps> = ({ darkMode = false }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'he';

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      setIsLoading(true);
      const response = await servicesService.getAllServices();
      setServices(response);
    } catch (err) {
      setError('Failed to fetch services');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function addService() {
    try {
      // Find highest display order and add 1
      const maxOrder =
        services.length > 0
          ? Math.max(...services.map((s) => s.display_order))
          : 0;

      const newService = {
        title: 'New Service',
        description: 'Service description',
        icon: '🔧',
        image_url: '',
        display_order: maxOrder + 1,
      };

      const response = await servicesService.createService(newService);
      setServices([...services, response.data]);
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

      {/* Services list */}
      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <div key={service.id} className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
            <div className="flex justify-between mb-4">
              <ContentEditable
                content={service.icon}
                onUpdate={(value) => updateService(service.id, 'icon', value)}
                className="text-2xl w-12"
              />
              <button
                onClick={() => deleteService(service.id)}
                className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'} transition-colors`}
              >
                Delete
              </button>
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
                onUpdate={(value) =>
                  updateService(service.id, 'description', value)
                }
                className={darkMode ? 'text-gray-200' : 'text-gray-700'}
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Image URL:</span>
                <ContentEditable
                  content={service.image_url || 'None'}
                  onUpdate={(value) =>
                    updateService(service.id, 'image_url', value)
                  }
                  className={`text-sm font-mono ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                />
              </div>
              <div className="flex items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'} mr-2`}>Order:</span>
                <input
                  type="number"
                  value={service.display_order}
                  onChange={(e) =>
                    updateService(
                      service.id,
                      'display_order',
                      parseInt(e.target.value)
                    )
                  }
                  className={`w-16 px-2 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesManager;
