import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface Language {
  id: string;
  code: string;
  name: string;
  native_name: string;
  rtl: boolean;
  is_default: boolean;
}

interface TranslationKey {
  id: string;
  namespace: string;
  key: string;
  translations: {
    [languageCode: string]: string;
  };
}

const namespaces = [
  'common',
  'home',
  'about',
  'services',
  'contact',
  'forms',
  'navigation',
  'footer'
];

export default function TranslationsManager() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [translationKeys, setTranslationKeys] = useState<TranslationKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNamespace, setSelectedNamespace] = useState('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [newKey, setNewKey] = useState<{ namespace: string; key: string; translations: Record<string, string> }>({ namespace: 'common', key: '', translations: {} });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isAddingKey, setIsAddingKey] = useState(false);

  // Load languages
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/translations/languages`);
        setLanguages(response.data);
      } catch (error) {
        console.error('Error fetching languages:', error);
        setError('Failed to load languages');
      }
    };
    
    fetchLanguages();
  }, []);

  // Load translations for selected namespace
  useEffect(() => {
    const fetchTranslations = async () => {
      if (!selectedNamespace || !languages.length) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Prepare an array to hold all translation keys with their translations
        const keys: TranslationKey[] = [];
        
        // Fetch translations for each language for the selected namespace
        const translationsByLanguage: { [language: string]: { [key: string]: string } } = {};
        
        // Fetch all translations for all languages for the selected namespace
        await Promise.all(
          languages.map(async (language) => {
            try {
              const response = await axios.get(
                `${API_BASE_URL}/translations/resources/${language.code}/${selectedNamespace}`
              );
              translationsByLanguage[language.code] = response.data;
            } catch (error) {
              console.error(`Error fetching translations for ${language.code}:`, error);
              // Initialize with empty object if fetch fails
              translationsByLanguage[language.code] = {};
            }
          })
        );
        
        // Consolidate all keys across all languages
        const allKeys = new Set<string>();
        
        // Add all keys from all languages
        Object.values(translationsByLanguage).forEach((translations) => {
          Object.keys(translations).forEach((key) => allKeys.add(key));
        });
        
        // Create TranslationKey objects for each key
        allKeys.forEach((key) => {
          const translationKey: TranslationKey = {
            id: key, // Using key as id for simplicity
            namespace: selectedNamespace,
            key,
            translations: {}
          };
          
          // Add translations for each language
          languages.forEach((language) => {
            translationKey.translations[language.code] = 
              translationsByLanguage[language.code]?.[key] || '';
          });
          
          keys.push(translationKey);
        });
        
        setTranslationKeys(keys);
      } catch (error) {
        console.error('Error fetching translations:', error);
        setError('Failed to load translations');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTranslations();
  }, [selectedNamespace, languages]);

  // Filter translations by search query
  const filteredTranslationKeys = translationKeys.filter((translationKey) => {
    if (!searchQuery) return true;
    
    const lowerCaseQuery = searchQuery.toLowerCase();
    
    // Check if key contains search query
    if (translationKey.key.toLowerCase().includes(lowerCaseQuery)) return true;
    
    // Check if any translation contains search query
    return Object.values(translationKey.translations).some(
      (translation) => translation.toLowerCase().includes(lowerCaseQuery)
    );
  });

  // Handle translation update
  const handleTranslationChange = (
    keyId: string,
    languageCode: string,
    value: string
  ) => {
    setTranslationKeys((prevKeys) =>
      prevKeys.map((key) =>
        key.id === keyId
          ? {
              ...key,
              translations: {
                ...key.translations,
                [languageCode]: value
              }
            }
          : key
      )
    );
  };

  // Save translation
  const saveTranslation = async (key: TranslationKey, languageCode: string) => {
    try {
      setError(null);
      await axios.post(`${API_BASE_URL}/translations/update`, {
        languageCode,
        namespace: key.namespace,
        key: key.key,
        translation: key.translations[languageCode]
      });
      
      setSuccess(`Translation for "${key.key}" in ${languageCode} saved successfully.`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error saving translation:', error);
      setError(`Failed to save translation for "${key.key}" in ${languageCode}.`);
    }
  };

  // Add new translation key
  const addNewKey = async () => {
    if (!newKey.key.trim()) {
      setError('Key name cannot be empty');
      return;
    }
    
    setError(null);
    
    try {
      // Create a new translation for each language
      await Promise.all(
        languages.map(async (language) => {
          const translation = newKey.translations[language.code] || '';
          await axios.post(`${API_BASE_URL}/translations/update`, {
            languageCode: language.code,
            namespace: newKey.namespace,
            key: newKey.key,
            translation
          });
        })
      );
      
      // Update local state with the new key
      setTranslationKeys([...translationKeys, {
        id: newKey.key,
        namespace: newKey.namespace,
        key: newKey.key,
        translations: {...newKey.translations}
      }]);
      
      // Reset form
      setNewKey({ namespace: selectedNamespace, key: '', translations: {} });
      setIsAddingKey(false);
      setSuccess('New translation key added successfully.');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error adding new key:', error);
      setError('Failed to add new translation key.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Translations Manager</h1>
      
      {/* Namespace selector and search */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex items-center">
          <label htmlFor="namespace" className="mr-2 font-medium">Namespace:</label>
          <select
            id="namespace"
            value={selectedNamespace}
            onChange={(e) => setSelectedNamespace(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {namespaces.map((namespace) => (
              <option key={namespace} value={namespace}>
                {namespace}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search translations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          onClick={() => setIsAddingKey(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add New Translation
        </button>
      </div>
      
      {/* Error and success messages */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      {/* Add new translation form */}
      {isAddingKey && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Add New Translation</h3>
          
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Namespace
              </label>
              <select
                value={newKey.namespace}
                onChange={(e) => setNewKey({ ...newKey, namespace: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {namespaces.map((namespace) => (
                  <option key={namespace} value={namespace}>
                    {namespace}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key
              </label>
              <input
                type="text"
                value={newKey.key}
                onChange={(e) => setNewKey({ ...newKey, key: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Enter translation key"
              />
            </div>
            
            {languages.map((language) => (
              <div key={language.code}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language.name} ({language.native_name})
                </label>
                <textarea
                  value={newKey.translations[language.code] || ''}
                  onChange={(e) =>
                    setNewKey({
                      ...newKey,
                      translations: {
                        ...newKey.translations,
                        [language.code]: e.target.value
                      }
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  rows={3}
                  placeholder={`Enter ${language.name} translation`}
                  dir={language.rtl ? 'rtl' : 'ltr'}
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsAddingKey(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={addNewKey}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      )}
      
      {/* Translations table */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Key
                </th>
                {languages.map((language) => (
                  <th 
                    key={language.code} 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {language.name} ({language.native_name})
                  </th>
                ))}
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTranslationKeys.length === 0 ? (
                <tr>
                  <td 
                    colSpan={languages.length + 2} 
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    {searchQuery 
                      ? 'No translations match your search' 
                      : 'No translations found in this namespace'}
                  </td>
                </tr>
              ) : (
                filteredTranslationKeys.map((translationKey) => (
                  <tr key={translationKey.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {translationKey.key}
                    </td>
                    {languages.map((language) => (
                      <td key={language.code} className="px-6 py-4 text-sm text-gray-500">
                        <div className="relative">
                          <textarea
                            value={translationKey.translations[language.code] || ''}
                            onChange={(e) =>
                              handleTranslationChange(
                                translationKey.id,
                                language.code,
                                e.target.value
                              )
                            }
                            onBlur={() => saveTranslation(translationKey, language.code)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[80px]"
                            dir={language.rtl ? 'rtl' : 'ltr'}
                          />
                        </div>
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete the key "${translationKey.key}"?`)) {
                            // Handle delete - this would need to be implemented in the API
                            alert('Delete functionality not yet implemented');
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
