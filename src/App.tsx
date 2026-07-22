import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// pages
import Home from './pages/Home';
import Questionnaire from './pages/Questionnaire';
import AccessibilityStatementPage from './pages/AccessibilityStatement';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
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
import CookiesBanner from './components/CookiesBanner';
import WhatsAppButton from './components/WhatsAppButton';
import StickySectionTitle from './components/StickySectionTitle';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <Provider store={store}>
      <ScrollToTop />
      <ToastContainer position="top-center" />
      <ErrorBoundary>
        <div id="main-container" className="flex flex-col min-h-screen scrollbar overflow">
          <AccessibilityWidget />
          <CookiesBanner />
          <WhatsAppButton />
          <StickySectionTitle />
          <ChatWidget />
          <Routes>
            {/* Secret SPA Route */}
            <Route path="/spa" element={<SpaPage />} />

            {/* Standalone questionnaire flow - no site chrome, same as keshevplus.com */}
            <Route path="/questionnaire/:type" element={<Questionnaire />} />

            {/* Public Routes */}
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    {/* Every section route renders the same one-page SPA and
                        scrolls to its anchor (handled in Navbar) - routes
                        stay real/distinct for SEO and direct links. */}
                    <Route index element={<Home />} />
                    <Route path="about" element={<Home />} />
                    <Route path="services" element={<Home />} />
                    <Route path="adhd" element={<Home />} />
                    <Route path="diagnosis" element={<Home />} />
                    <Route path="forms" element={<Home />} />
                    <Route path="contact" element={<Home />} />
                    <Route path="accessibility" element={<AccessibilityStatementPage />} />
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="terms-of-use" element={<TermsOfUse />} />
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
