import { Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';

// pages
=======
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// pages routes
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ADHD from './pages/ADHD';
import Diagnosis from './pages/Diagnosis';
import Forms from './pages/Forms';
import Contact from './pages/Contact';
<<<<<<< HEAD
import AccessibilityStatementPage from './pages/AccessibilityStatement';
import NotFound from './pages/NotFound';
import SpaPage from './pages/SpaPage';

// admin (lazy-loaded)
const Admin = lazy(() => import('./pages/admin/Admin'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const RegisterAdmin = lazy(() => import('./pages/admin/RegisterAdmin'));
const AdminUser = lazy(() => import('./pages/admin/AdminUser'));

import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
=======
import NotFound from './pages/NotFound';

// admin routes
import Admin from './pages/admin/Admin';
import Login from './pages/admin/Login';

import { AuthProvider } from './contexts/AuthContext';
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
import ScrollToTop from './components/ui/ScrollToTop';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
<<<<<<< HEAD
import SafeAdminComponentWrapper from './components/admin/SafeAdminComponentWrapper';
import { SpeedInsights } from '@vercel/speed-insights/react';
import AccessibilityWidget from './components/acc/AccessibilityWidget';
=======
import AccessibilityWidget from './components/AccessibilityWidget';

// Styles for the fixed corner container
// const cornerContainerStyle: React.CSSProperties = {
//   position: 'fixed',
//   bottom: '1rem', // Adjust as needed
//   right: '1rem', // Adjust as needed
//   zIndex: 1000, // Ensure it's above other content
//   backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: light background for visibility
//   padding: '0.5rem',
//   borderRadius: '5px',
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.5rem' // Add spacing between components
// };
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
<<<<<<< HEAD
        <AdminProvider>
          <ScrollToTop />
          <ToastContainer position="top-center" />
          <ErrorBoundary>
            <div id="main-container" className="flex flex-col min-h-screen scrollbar overflow">
              <AccessibilityWidget />
              <Routes>
                {/* Admin Routes - isolated via SafeAdminComponentWrapper */}
                <Route
                  path="/admin/*"
                  element={
                    <SafeAdminComponentWrapper
                      component={() => (
                        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading admin...</div>}>
                          <Routes>
                            <Route path="login" element={<AdminLogin />} />
                            <Route path="register" element={<RegisterAdmin />} />
                            <Route path="user" element={<AdminUser />} />
                            <Route path="user/:id" element={<AdminUser />} />
                            <Route path="*" element={<Admin />} />
                          </Routes>
                        </Suspense>
                      )}
                      featureFlag="dashboard"
                    />
                  }
                />

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
        </AdminProvider>
=======
        <ScrollToTop />
        <ToastContainer position="top-center" />
        <ErrorBoundary>
          <div id="main-container" className="flex flex-col min-h-screen scrollbar overflow">
            {/* Accessibility Widget - positioned by its own CSS */}
            <AccessibilityWidget />

            <Routes>
              {/* Admin routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/*" element={<Admin />} />
              {/* Public routes */}
              <Route
                path="*"
                element={
                  <>
                    <Navbar />
                    <main className="flex-grow p-0">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/adhd" element={<ADHD />} />
                        <Route path="/diagnosis" element={<Diagnosis />} />
                        <Route path="/forms" element={<Forms />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </div>
        </ErrorBoundary>
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
      </AuthProvider>
    </Provider>
  );
}

export default App;
