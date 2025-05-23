// Admin.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { pagesService, servicesService, formsService, contentService, leadsService, messagesService } from '../../services/api';
import TranslationsManager from './TranslationsManager';
import LanguageSwitcher from '../../components/LanguageSwitcher';
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

interface Content {
  id: string;
  title: string;
  content_type: string;
  content_data: any;
  status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
  date_received: string;
}

export interface AuthContextType {
  user: { username: string } | null;
  logout: () => void;
}

function AdminDashboard() {
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

function ContentEditable<T extends string | number>({
  content,
  onUpdate,
  className = '',
}: {
  content: T;
  onUpdate: (value: string) => void;
  className?: string;
}) {
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

function ContentManager() {
  const [content, setContent] = React.useState<Content[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [filter, setFilter] = React.useState('');

  React.useEffect(() => {
    fetchContent();
  }, [page, filter]);

  async function fetchContent() {
    try {
      const data = await contentService.getAllContent(page, 10, filter);
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await contentService.deleteContent(id);
        fetchContent();
      } catch (error) {
        console.error('Error deleting content:', error);
      }
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search content..."
            className="px-4 py-2 border rounded-lg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Link
            to="/admin/content/new"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add New Content
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {content.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.content_type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/admin/content/${item.id}`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={content.length < 10}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function LeadsManager({ darkMode = false }: { darkMode?: boolean }) {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [filter, setFilter] = React.useState('');
  const [pagination, setPagination] = React.useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  });
  const [expandedRowId, setExpandedRowId] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchLeads();
  }, [page, filter]);

  async function fetchLeads() {
    try {
      setLoading(true);
      const response = await leadsService.getAllLeads(page, 10, filter);
      setLeads(response.leads);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await leadsService.deleteLead(id);
        fetchLeads();
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  }
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'he';

  if (loading && leads.length === 0) {
    return (
      <div className={`p-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Leads Management</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          value={filter}
          onChange={handleFilterChange}
          className={`w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800'
          }`}
        />
      </div>

      <div className={`rounded-lg shadow overflow-hidden overflow-x-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ maxWidth: '100%', width: '100%' }}>
        <table className="w-full" style={{ borderSpacing: '0', borderCollapse: 'separate' }}>
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Name</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Phone</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Subject</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Message</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Created At</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actions</th>
            </tr>
          </thead>
          <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className={`px-6 py-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {filter ? 'No leads match your search' : 'No leads found'}
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <React.Fragment key={lead.id}>
                  <tr className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                    <td className={`px-4 py-2 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{lead.name}</td>
                    <td className={`px-4 py-2 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{lead.email}</td>
                    <td className={`px-4 py-2 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{lead.phone}</td>
                    <td className={`px-4 py-2 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{lead.subject}</td>
                    <td className={`px-4 py-2 text-sm break-words ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {lead.message.length > 50 ? `${lead.message.substring(0, 50)}...` : lead.message}
                    </td>
                    <td className={`px-4 py-2 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {lead.date_received ? new Date(lead.date_received).toLocaleString('en-US') : 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-sm whitespace-nowrap">
                      <button
                        className={`mr-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                        onClick={() => setExpandedRowId(lead.id)}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {expandedRowId === lead.id && (
                    <tr>
                      <td colSpan={7} className={`p-4 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div><strong>Name:</strong> {lead.name}</div>
                          <div><strong>Email:</strong> {lead.email}</div>
                          <div><strong>Phone:</strong> {lead.phone}</div>
                          <div><strong>Subject:</strong> {lead.subject}</div>
                          <div className="col-span-2"><strong>Message:</strong> {lead.message}</div>
                          <div><strong>Received:</strong> {lead.date_received ? new Date(lead.date_received).toLocaleString('en-US') : 'N/A'}</div>
                        </div>
                        <button
                          className={`mt-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                          onClick={() => setExpandedRowId(null)}
                        >
                          Close details
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg disabled:opacity-50 ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Previous
          </button>
          <span className={darkMode ? 'text-gray-200' : 'text-gray-600'}>
            Page {pagination.page} of {pagination.totalPages} 
            {pagination.total > 0 && <span className="text-sm ml-2">({pagination.total} leads total)</span>}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= pagination.totalPages}
            className={`px-4 py-2 rounded-lg disabled:opacity-50 ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Next
          </button>
        </div>
                        onClick={() => setExpandedRowId(message.id)}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(message.id)}
                        className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {expandedRowId === message.id && (
                    <tr>
                      <td colSpan={6} className={`p-4 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div><strong>Name:</strong> {message.name}</div>
                          <div><strong>Email:</strong> {message.email}</div>
                          <div><strong>Subject:</strong> {message.subject}</div>
                          <div className="col-span-2"><strong>Message:</strong> {message.message}</div>
                          <div><strong>Received:</strong> {message.created_at ? new Date(message.created_at).toLocaleString('en-US') : 'N/A'}</div>
                        </div>
                        <button
                          className={`mt-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                          onClick={() => setExpandedRowId(null)}
                        >
                          Close details
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg disabled:opacity-50 ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Previous
          </button>
          <span className={darkMode ? 'text-gray-200' : 'text-gray-600'}>
            Page {pagination.page} of {pagination.totalPages} 
            {pagination.total > 0 && <span className="text-sm ml-2">({pagination.total} messages total)</span>}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= pagination.totalPages}
            className={`px-4 py-2 rounded-lg disabled:opacity-50 ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function Admin() {
  const { user: authUser, logout } = useAuth() as AuthContextType;
  const navigate = useNavigate();
  
  // Create a fallback dev user if authentication fails
  const [devFallbackActive, setDevFallbackActive] = React.useState(false);
  const [user, setUser] = React.useState(authUser);

  // If in development mode and no auth user, create a fallback
  React.useEffect(() => {
    if (authUser) {
      setUser(authUser);
      setDevFallbackActive(false);
    } else if (import.meta.env.DEV && !devFallbackActive) {
      console.log('[Admin] Creating development fallback user');
      const fallbackUser = {
        username: 'Development Admin (Fallback)',
        email: 'dev@example.com',
        role: 'admin'
      };
      setUser(fallbackUser);
      setDevFallbackActive(true);
    }
  }, [authUser, devFallbackActive]);

  // State to track the authentication check status
  const [authChecked, setAuthChecked] = React.useState(false);

  // First useEffect - just check localStorage directly and log what's there
  React.useEffect(() => {
    const tokenCheck = localStorage.getItem('token');
    const userCheck = localStorage.getItem('user');
    console.log('[Admin] Initial localStorage check:', { 
      hasToken: !!tokenCheck, 
      hasUserData: !!userCheck,
      userData: userCheck ? JSON.parse(userCheck) : null
    });
  }, []);

  // Second useEffect - handle authentication status with a longer delay
  React.useEffect(() => {
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
  }, [user, navigate]);

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

  if (!user) return null;

  // State for theme toggle (light/dark mode)
  const [darkMode, setDarkMode] = useState(false);
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'he';
  
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

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} flex`} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      {/* Sidebar - positioned based on language direction */}
      <div className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg fixed inset-y-0 ${isRtl ? 'right-0' : 'left-0'} z-10`}>
        <div className="flex flex-col h-full">
          {/* Logo and admin panel title */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/admin" className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center justify-between`}>
              Admin Panel
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
            </Link>
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-2 space-y-1">
              <Link
                to="/admin"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Dashboard
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
            <div className="flex flex-col space-y-3">
              <LanguageSwitcher />
              <div className="flex items-center justify-between">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {user.username}
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
      </div>

      {/* Main content - with padding to avoid sidebar overlap */}
      <div className={`flex-1 ${isRtl ? 'mr-64' : 'ml-64'} p-6`}>
        <Routes>
          <Route path="/" element={<AdminDashboard darkMode={darkMode} />} />
          <Route path="/content" element={<ContentManager />} />
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
