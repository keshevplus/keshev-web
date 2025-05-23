// PagesManager.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pagesService } from '../../services/api';

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

interface PagesManagerProps {
  darkMode?: boolean;
}

const PagesManager: React.FC<PagesManagerProps> = ({ darkMode = false }) => {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newPage, setNewPage] = useState({ slug: '', title: '' });
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'he';

  useEffect(() => {
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
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Manage Pages</h2>

      {/* Add new page form */}
      <form
        onSubmit={createPage}
        className={`mb-8 ${darkMode ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg shadow-sm`}
      >
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Add New Page</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Page Slug
            </label>
            <input
              type="text"
              value={newPage.slug}
              onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              placeholder="e.g. about-us"
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Page Title
            </label>
            <input
              type="text"
              value={newPage.title}
              onChange={(e) =>
                setNewPage({ ...newPage, title: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
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
          <div key={page.id} className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
            <div className="flex justify-between items-center mb-2">
              <div className="w-1/3">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Slug:</span>
                <ContentEditable
                  content={page.slug}
                  onUpdate={(value) => updatePage(page.id, 'slug', value)}
                  className="font-mono"
                />
              </div>
              <div className="w-1/3">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Title:</span>
                <ContentEditable
                  content={page.title}
                  onUpdate={(value) => updatePage(page.id, 'title', value)}
                  className="font-semibold"
                />
              </div>
              <div className="w-1/6">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Status:</span>
                <select
                  value={page.status}
                  onChange={(e) =>
                    updatePage(page.id, 'status', e.target.value)
                  }
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="w-1/6 text-right">
                <Link
                  to={`/admin/pages/${page.id}`}
                  className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'} transition-colors`}
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
};

export default PagesManager;
