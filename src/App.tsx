import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ADHD from './pages/ADHD';
import Diagnosis from './pages/Diagnosis';
import Forms from './pages/Forms';
import Contact from './pages/Contact';
import AccessibilityStatementPage from './pages/AccessibilityStatement';
import NotFound from './pages/NotFound';
import SpaPage from './pages/SpaPage';

import ScrollToTop from './components/ui/ScrollToTop';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import { SpeedInsights } from '@vercel/speed-insights/react';
import AccessibilityWidget from './components/acc/AccessibilityWidget';

function App() {
  return (
    <Provider store={store}>
      <ScrollToTop />
      <ToastContainer position="top-center" />
      <ErrorBoundary>
        <div id="main-container" className="flex flex-col min-h-screen scrollbar overflow">
          <AccessibilityWidget />
          <Routes>
            {/* Secret SPA Route */}
            <Route path="/spa" element={<SpaPage />} />

            {/* Public Routes */}
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="services" element={<Services />} />
                    <Route path="adhd" element={<ADHD />} />
                    <Route path="diagnosis" element={<Diagnosis />} />
                    <Route path="forms" element={<Forms />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="accessibility" element={<AccessibilityStatementPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
          <SpeedInsights />
        </div>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
