// Admin.tsx

import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

// Import individual admin components
import LeadsManager from './LeadsManager';
import MessagesManager from './MessagesManager';
import PagesManager from './PagesManager';
import ServicesManager from './ServicesManager';
import AdminDashboard from './AdminDashboard';
import ContentManager from './ContentManager';
import LanguageSwitcher from '../../components/LanguageSwitcher';

interface Form {
  id: string;
  form_type: string;
  fields: FormField[];
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

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: { username: string } | null;
  logout: () => void;
}

function AdminDashboard({ darkMode = false }: { darkMode?: boolean }) {
  const [stats, setStats] = React.useState({
    pages: 0,
    services: 0,
    forms: 0,
  });

  React.useEffect(() => {
    async function fetchStats() {
      try {
        const [pagesRes, servicesRes, formsRes] = await Promise.all([
          pagesService.getAllPages(),
          servicesService.getAllServices(),
          formsService.getAllForms(),
        ]);

        setStats({
          pages: pagesRes.length,
          services: servicesRes.length,
          forms: formsRes.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h3 className="text-lg font-semibold mb-2">Pages</h3>
          <p className="text-3xl font-bold">{stats.pages}</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h3 className="text-lg font-semibold mb-2">Services</h3>
          <p className="text-3xl font-bold">{stats.services}</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h3 className="text-lg font-semibold mb-2">Forms</h3>
          <p className="text-3xl font-bold">{stats.forms}</p>
        </div>
      </div>
    </div>
  );
}

// Removed duplicate implementations since we're now importing external components

function PagesManager() {
  const [pages, setPages] = React.useState<Page[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [newPage, setNewPage] = React.useState({ slug: '', title: '' });

  React.useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    try {
      setIsLoading(true);
      const response = await pagesService.getAllPages();
      setPages(response);
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

function ServicesManager() {
  const [services, setServices] = React.useState<Service[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
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

function FormsManager() {
  const [forms, setForms] = React.useState<Form[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
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

const Admin: React.FC = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const isRtl = i18n.language === 'he';

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/admin/login');
    }
  }, [auth, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} flex`} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      {/* Mobile hamburger button */}
      <button
        className={`lg:hidden fixed z-20 p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg ${isRtl ? 'right-5' : 'left-5'} top-5`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={t('admin.menu')}
      >
        {isMobileMenuOpen ? (
          // X icon for closing
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      
      {/* Sidebar - positioned based on language direction and responsive */}
      <div className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg fixed inset-y-0 ${isRtl ? 'right-0' : 'left-0'} z-10 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isMobileMenuOpen 
          ? 'translate-x-0' 
          : isRtl 
            ? 'translate-x-full' 
            : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header section with language switcher and theme toggle */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              <Link to="/admin" className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {t('admin.admin_panel')}
              </Link>
              
              <div className="flex items-center space-x-2">
                {/* Show language switcher first in RTL mode */}
                {isRtl && <LanguageSwitcher />}
                
                {/* Light/Dark mode toggle */}
                <button
                  onClick={toggleDarkMode}
                  className={`${darkMode ? 'text-yellow-300 hover:text-yellow-100' : 'text-gray-600 hover:text-gray-800'} p-2 rounded-full focus:outline-none`}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                      <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 fill-current">
                      <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
                    </svg>
                  )}
                </button>
                
                {/* Show language switcher after toggle in LTR mode */}
                {!isRtl && <LanguageSwitcher />}
              </div>
            </div>
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-2 space-y-1">
              <Link
                to="/admin"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {t('admin.dashboard')}
              </Link>
              <Link
                to="/admin/content"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Content
              </Link>
              <Link
                to="/admin/translations"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Translations
              </Link>
              <Link
                to="/admin/leads"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Leads
              </Link>
              <Link
                to="/admin/messages"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Messages
              </Link>
              <Link
                to="/admin/pages"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Pages
              </Link>
              <Link
                to="/admin/services"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Services
              </Link>
              <Link
                to="/admin/forms"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Forms
              </Link>
            </div>
          </nav>
          
          {/* User info and logout at bottom of sidebar */}
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {auth.username}
              </span>
              <button
                onClick={handleLogout}
                className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content - with responsive padding */}
      <div className={`flex-1 p-6 transition-all duration-300 ${
        // On large screens, always use margin
        // On small screens, only use margin when menu is open
        isMobileMenuOpen
          ? isRtl ? 'mr-64' : 'ml-64'  // Mobile with open menu
          : isRtl 
            ? 'lg:mr-64' : 'lg:ml-64'  // Desktop or mobile with closed menu
      }`}>
        <Routes>
          <Route path="/" element={<AdminDashboard darkMode={darkMode} />} />
          <Route path="/messages" element={<MessagesManager darkMode={darkMode} />} />
          <Route path="/leads" element={<LeadsManager darkMode={darkMode} />} />
          <Route path="/pages" element={<PagesManager darkMode={darkMode} />} />
          <Route path="/services" element={<ServicesManager darkMode={darkMode} />} />
          <Route path="/forms" element={<FormsManager darkMode={darkMode} />} />
        </Routes>
      </div>
    </div>
  );
}

function Admin() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [devFallbackActive, setDevFallbackActive] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'he';

  // Use dev fallback user in development if needed
  useEffect(() => {
    if (!user && process.env.NODE_ENV === 'development' && !devFallbackActive) {
      console.log('[Admin] Using development fallback user');
      const fallbackUser = {
        username: 'Development Admin (Fallback)',
        email: 'dev@example.com',
        role: 'admin'
      };
      setUser(fallbackUser);
      setDevFallbackActive(true);
    }
  }, [user, devFallbackActive]);

  // First useEffect - just check localStorage directly and log what's there
  useEffect(() => {
    const tokenCheck = localStorage.getItem('token');
    const userCheck = localStorage.getItem('user');
    console.log('[Admin] Initial localStorage check:', { 
      hasToken: !!tokenCheck, 
      hasUserData: !!userCheck,
      userData: userCheck ? JSON.parse(userCheck) : null
    });
  }, []);

  // Second useEffect - handle authentication status with a longer delay
  useEffect(() => {
    console.log('[Admin] Checking user authentication state:', user ? user.username : 'No user');
    
    if (!user && !authChecked) {
      console.log('[Admin] No user found in context, preparing delayed check');
      
      // Give a longer delay to see if auth state updates
      const timer = setTimeout(() => {
        // Check localStorage directly in case the context hasn't updated yet
        const tokenCheck = localStorage.getItem('token');
        const userCheck = localStorage.getItem('user');
        
        console.log('[Admin] Delayed auth check:', { hasToken: !!tokenCheck, hasUserData: !!userCheck });
        
        if (!tokenCheck || !userCheck) {
          console.log('[Admin] Still no authentication after delay, redirecting to login');
          navigate('/admin/login');
        } else {
          console.log('[Admin] Authentication found in localStorage, staying on admin page');
          // Force a page reload to ensure the auth context picks up the stored credentials
          window.location.reload();
        }
        setAuthChecked(true);
      }, 1500); // Increased from 500ms to 1500ms
      
      return () => clearTimeout(timer);
    }
  }, [user, navigate, authChecked]);

  const handleLogout = () => {
    // Only call the real logout if not using the fallback
    if (!devFallbackActive) {
      logout();
    } else {
      console.log('[Admin] Logging out fallback dev user');
      setDevFallbackActive(false);
      setUser(null);
    }
    navigate('/admin/login');
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    // Apply dark mode class to document body
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  if (!user) return null;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} flex`} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      {/* Mobile hamburger button */}
      <button
        className={`lg:hidden fixed z-20 p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg ${isRtl ? 'right-5' : 'left-5'} top-5`}
        onClick={toggleMobileMenu}
        aria-label={t('admin.menu')}
      >
        {mobileMenuOpen ? (
          // X icon for closing
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      
      {/* Sidebar - positioned based on language direction and responsive */}
      <div className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg fixed inset-y-0 ${isRtl ? 'right-0' : 'left-0'} z-10 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        mobileMenuOpen 
          ? 'translate-x-0' 
          : isRtl 
            ? 'translate-x-full' 
            : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header section with language switcher and theme toggle */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              <Link to="/admin" className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {t('admin.admin_panel')}
              </Link>
              
              <div className="flex items-center space-x-2">
                {/* Show language switcher first in RTL mode */}
                {isRtl && <LanguageSwitcher />}
                
                {/* Light/Dark mode toggle */}
                <button
                  onClick={toggleDarkMode}
                  className={`${darkMode ? 'text-yellow-300 hover:text-yellow-100' : 'text-gray-600 hover:text-gray-800'} p-2 rounded-full focus:outline-none`}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                      <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 fill-current">
                      <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
                    </svg>
                  )}
                </button>
                
                {/* Show language switcher after toggle in LTR mode */}
                {!isRtl && <LanguageSwitcher />}
              </div>
            </div>
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-2 space-y-1">
              <Link
                to="/admin"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {t('admin.dashboard')}
              </Link>
              <Link
                to="/admin/content"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Content
              </Link>
              <Link
                to="/admin/translations"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Translations
              </Link>
              <Link
                to="/admin/leads"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Leads
              </Link>
              <Link
                to="/admin/messages"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Messages
              </Link>
              <Link
                to="/admin/pages"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Pages
              </Link>
              <Link
                to="/admin/services"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Services
              </Link>
              <Link
                to="/admin/forms"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Forms
              </Link>
            </div>
          </nav>
          
          {/* User info and logout at bottom of sidebar */}
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {user.username}
              </span>
              <button
                onClick={handleLogout}
                className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {t('navigation.logout')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content - with responsive padding */}
      <div className={`flex-1 p-6 transition-all duration-300 ${
        // On large screens, always use margin
        // On small screens, only use margin when menu is open
        mobileMenuOpen
          ? isRtl ? 'mr-64' : 'ml-64'  // Mobile with open menu
          : isRtl 
            ? 'lg:mr-64' : 'lg:ml-64'  // Desktop or mobile with closed menu
      }`}>
        <Routes>
          <Route path="/" element={<AdminDashboard darkMode={darkMode} />} />
          <Route path="/content" element={<ContentManager darkMode={darkMode} />} />
          <Route path="/translations" element={<TranslationsManager />} />
          <Route path="/leads" element={<LeadsManager darkMode={darkMode} />} />
          <Route path="/messages" element={<MessagesManager darkMode={darkMode} />} />
          <Route path="/pages" element={<PagesManager />} />
          <Route path="/services" element={<ServicesManager />} />
          <Route path="/forms" element={<FormsManager />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
