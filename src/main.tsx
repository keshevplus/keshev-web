// Importing React and ReactDOM for rendering the application
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing HashRouter for routing and FormProvider for context management
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App'; // Main application component
import './index.css'; // Global CSS styles
import { FormProvider } from './contexts/FormContext'; // Context for managing form state

// Import i18n configuration
import './i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

// Rendering the root React component into the DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* Using HashRouter instead of BrowserRouter to avoid refresh issues */}
      <BrowserRouter>
        {/* Wrapping the application with FormProvider to provide form context */}
        <FormProvider>
          {/* Main application component */}
          <App />
        </FormProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
