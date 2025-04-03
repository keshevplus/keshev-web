import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { pagesService, servicesService, formsService } from '../services/api';

// Interfaces for our content types
interface Page {
  id: string;
  slug: string;
  title: string;
  status: string;
  sections?: PageSection[];
}

interface PageSection {
  id: string;
  page_id: string;
  section_type: string;
  title: string;
  content: string;
  content_json: any;
  display_order: number;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image_url: string;
  display_order: number;
}

interface Form {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  file_url: string;
  image_url: string;
  display_order: number;
}

function AdminDashboard() {
  const [stats, setStats] = useState({
    pages: 0,
    services: 0,
    forms: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [pagesRes, servicesRes, formsRes] = await Promise.all([
          pagesService.getAllPages(),
          servicesService.getAllServices(),
          formsService.getAllForms(),
        ]);

        setStats({
          pages: pagesRes.data.length,
          services: servicesRes.data.length,
          forms: formsRes.data.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Pages</h3>
          <p className="text-3xl font-bold">{stats.pages}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Services</h3>
          <p className="text-3xl font-bold">{stats.services}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Forms</h3>
          <p className="text-3xl font-bold">{stats.forms}</p>
        </div>
      </div>
    </div>
  );
}

// Content Editable component for inline editing
function ContentEditable<T extends string | number>({
  content,
  onUpdate,
  className = '',
}: {
  content: T;
  onUpdate: (value: string) => void;
  className?: string;
}) {
  const element = useRef<HTMLDivElement>(null);

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

// Pages Manager Component
function PagesManager() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newPage, setNewPage] = useState({ slug: '', title: '' });

  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    try {
      setIsLoading(true);
      const response = await pagesService.getAllPages();
      setPages(response.data);
    } catch (err) {
      setError('Failed to fetch pages');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function createPage(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await pagesService.createPage(newPage);
      setPages([...pages, response.data]);
      setNewPage({ slug: '', title: '' });
    } catch (err) {
      setError('Failed to create page');
      console.error(err);
    }
  }

  async function updatePage(id: string, field: keyof Page, value: string) {
    try {
      await pagesService.updatePage(id, { [field]: value });
      setPages(
        pages.map((page) =>
          page.id === id ? { ...page, [field]: value } : page
        )
      );
    } catch (err) {
      setError('Failed to update page');
      console.error(err);
    }
  }

  if (isLoading) return <div className="p-6">Loading pages...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Pages</h2>

      {/* Add new page form */}
      <form
        onSubmit={createPage}
        className="mb-8 bg-white p-4 rounded-lg shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-4">Add New Page</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Page Slug
            </label>
            <input
              type="text"
              value={newPage.slug}
              onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. about-us"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Page Title
            </label>
            <input
              type="text"
              value={newPage.title}
              onChange={(e) =>
                setNewPage({ ...newPage, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. About Us"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Create Page
        </button>
      </form>

      {/* Pages list */}
      <div className="grid grid-cols-1 gap-4">
        {pages.map((page) => (
          <div key={page.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="w-1/3">
                <span className="text-sm text-gray-500">Slug:</span>
                <ContentEditable
                  content={page.slug}
                  onUpdate={(value) => updatePage(page.id, 'slug', value)}
                  className="font-mono"
                />
              </div>
              <div className="w-1/3">
                <span className="text-sm text-gray-500">Title:</span>
                <ContentEditable
                  content={page.title}
                  onUpdate={(value) => updatePage(page.id, 'title', value)}
                  className="font-semibold"
                />
              </div>
              <div className="w-1/6">
                <span className="text-sm text-gray-500">Status:</span>
                <select
                  value={page.status}
                  onChange={(e) =>
                    updatePage(page.id, 'status', e.target.value)
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="w-1/6 text-right">
                <Link
                  to={`/admin/pages/${page.id}`}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  Edit Content
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Services Manager Component
function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      setIsLoading(true);
      const response = await servicesService.getAllServices();
      setServices(response.data);
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

  if (isLoading) return <div className="p-6">Loading services...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Services</h2>
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
          <div key={service.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between mb-4">
              <ContentEditable
                content={service.icon}
                onUpdate={(value) => updateService(service.id, 'icon', value)}
                className="text-2xl w-12"
              />
              <button
                onClick={() => deleteService(service.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
            <div className="mb-2">
              <span className="text-sm text-gray-500">Title:</span>
              <ContentEditable
                content={service.title}
                onUpdate={(value) => updateService(service.id, 'title', value)}
                className="font-semibold text-lg"
              />
            </div>
            <div className="mb-2">
              <span className="text-sm text-gray-500">Description:</span>
              <ContentEditable
                content={service.description}
                onUpdate={(value) =>
                  updateService(service.id, 'description', value)
                }
                className="text-gray-700"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">Image URL:</span>
                <ContentEditable
                  content={service.image_url || 'None'}
                  onUpdate={(value) =>
                    updateService(service.id, 'image_url', value)
                  }
                  className="text-sm font-mono"
                />
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Order:</span>
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
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Forms Manager Component
function FormsManager() {
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
      setForms(response.data);
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
          <div key={form.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">
                <ContentEditable
                  content={form.title}
                  onUpdate={(value) => updateForm(form.id, 'title', value)}
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
              <span className="text-sm text-gray-500">Subtitle:</span>
              <ContentEditable
                content={form.subtitle}
                onUpdate={(value) => updateForm(form.id, 'subtitle', value)}
                className="font-medium"
              />
            </div>
            <div className="mb-2">
              <span className="text-sm text-gray-500">Description:</span>
              <ContentEditable
                content={form.description}
                onUpdate={(value) => updateForm(form.id, 'description', value)}
                className="text-gray-700"
              />
            </div>
            <div className="mb-2">
              <span className="text-sm text-gray-500">File URL:</span>
              <ContentEditable
                content={form.file_url || 'None'}
                onUpdate={(value) => updateForm(form.id, 'file_url', value)}
                className="text-sm font-mono"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">Image URL:</span>
                <ContentEditable
                  content={form.image_url || 'None'}
                  onUpdate={(value) => updateForm(form.id, 'image_url', value)}
                  className="text-sm font-mono"
                />
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Order:</span>
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
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <nav className="w-64 bg-white border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
          <div className="mb-6 text-sm">מחובר כ: {user?.username}</div>
          <ul className="space-y-2">
            <li>
              <Link to="/admin" className="block p-2 hover:bg-gray-50 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/pages"
                className="block p-2 hover:bg-gray-50 rounded"
              >
                Pages
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
            <li>
              <Link
                to="/admin/forms"
                className="block p-2 hover:bg-gray-50 rounded"
              >
                Forms
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-600 p-2 hover:bg-gray-50 rounded"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/pages" element={<PagesManager />} />
          <Route path="/services" element={<ServicesManager />} />
          <Route path="/forms" element={<FormsManager />} />
        </Routes>
      </div>
    </div>
  );
}
