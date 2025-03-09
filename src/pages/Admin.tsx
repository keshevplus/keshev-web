import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
}

function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    testimonials: 0,
    team: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStats() {
      const [services, testimonials, team] = await Promise.all([
        supabase.from('services').select('id', { count: 'exact' }),
        supabase.from('testimonials').select('id', { count: 'exact' }),
        supabase.from('team').select('id', { count: 'exact' }),
      ]);

      setStats({
        services: services.count || 0,
        testimonials: testimonials.count || 0,
        team: team.count || 0,
      });
    }

    fetchStats();
  }, [navigate]);

  useEffect(() => {
    async function fetchStats() {
      const [services, testimonials, team] = await Promise.all([
        supabase.from('services').select('id', { count: 'exact' }),
        supabase.from('testimonials').select('id', { count: 'exact' }),
        supabase.from('team').select('id', { count: 'exact' }),
      ]);

      setStats({
        services: services.count || 0,
        testimonials: testimonials.count || 0,
        team: team.count || 0,
      });
    }

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Services</h3>
          <p className="text-3xl font-bold">{stats.services}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Testimonials</h3>
          <p className="text-3xl font-bold">{stats.testimonials}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Team Members</h3>
          <p className="text-3xl font-bold">{stats.team}</p>
        </div>
      </div>
    </div>
  );
}

function ContentEditable({
  content,
  onUpdate,
  className = '',
}: {
  content: string;
  onUpdate: (value: string) => void;
  className?: string;
}) {
  const element = useRef<HTMLDivElement>(null);

  const handleBlur = () => {
    if (element.current) {
      const newContent = element.current.innerText;
      if (newContent !== content) {
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
      {content}
    </div>
  );
}

function ServicePreview({ services }: { services: Service[] }) {
  return (
    <div className="bg-gray-50 p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-red-500 font-semibold">{service.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceEditor() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from('services').select('*');
      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
    } finally {
      setIsLoading(false);
    }
  }

  async function updateService(
    id: string,
    field: keyof Service,
    value: string
  ) {
    try {
      const { error } = await supabase
        .from('services')
        .update({ [field]: value })
        .eq('id', id);

      if (error) throw error;

      setServices(
        services.map((service) =>
          service.id === id ? { ...service, [field]: value } : service
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update service');
    }
  }

  async function addNewService() {
    try {
      const newService = {
        title: 'New Service',
        description: 'Service description',
        icon: '🔧',
        price: 'From $0',
      };

      const { data, error } = await supabase
        .from('services')
        .insert([newService])
        .select();

      if (error) throw error;
      if (data) {
        setServices([...services, ...data]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add service');
    }
  }

  async function deleteService(id: string) {
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);

      if (error) throw error;
      setServices(services.filter((service) => service.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete service');
    }
  }

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Services</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button
            onClick={addNewService}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Add New Service
          </button>
        </div>
      </div>

      {showPreview && (
        <div className="mb-8">
          <ServicePreview services={services} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <ContentEditable
                  content={service.icon}
                  onUpdate={(value) => updateService(service.id, 'icon', value)}
                  className="text-2xl mb-2"
                />
                <ContentEditable
                  content={service.title}
                  onUpdate={(value) =>
                    updateService(service.id, 'title', value)
                  }
                  className="text-xl font-semibold mb-2"
                />
                <ContentEditable
                  content={service.description}
                  onUpdate={(value) =>
                    updateService(service.id, 'description', value)
                  }
                  className="text-gray-600 mb-2"
                />
                <ContentEditable
                  content={service.price}
                  onUpdate={(value) =>
                    updateService(service.id, 'price', value)
                  }
                  className="text-blue-600"
                />
              </div>
              <button
                onClick={() => deleteService(service.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) navigate('/admin/login');
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate('/admin/login');
    });
  }, [navigate]);

  if (!session) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <nav className="w-64 bg-white border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/admin" className="block p-2 hover:bg-gray-50 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/services"
                className="block p-2 hover:bg-gray-50 rounded"
              >
                Services
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/services" element={<ServiceEditor />} />
        </Routes>
      </div>
    </div>
  );
}
