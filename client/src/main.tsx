// Importing React and ReactDOM for rendering the application
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing BrowserRouter for routing and FormProvider for context management
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Main application component
import './index.css'; // Global CSS styles
import { FormProvider } from './contexts/FormContext'; // Context for managing form state

// Rendering the root React component into the DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Wrapping the application with BrowserRouter for routing */}
    <BrowserRouter>
      {/* Wrapping the application with FormProvider to provide form context */}
      <FormProvider>
        {/* Main application component */}
        <App />
      </FormProvider>
    </BrowserRouter>
  </React.StrictMode>
);
