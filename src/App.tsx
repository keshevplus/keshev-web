import { Routes, Route, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';

// pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ADHD from './pages/ADHD';
import Diagnosis from './pages/Diagnosis';
import Forms from './pages/Forms';
import Contact from './pages/Contact';
import AccessibilityStatementPage from './pages/AccessibilityStatement.tsx'; // Ensure this file exists in the './pages' directory
import NotFound from './pages/NotFound';
// import NeonStreamPage from './pages/NeonStreamPage';

// admin (lazy-loaded)
const Admin = lazy(() => import('./pages/admin/Admin'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const RegisterAdmin = lazy(() => import('./pages/admin/RegisterAdmin'));

import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ui/ScrollToTop';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import AdminErrorBoundary from './components/admin/AdminErrorBoundary';
import { SpeedInsights } from '@vercel/speed-insights/react';
import AccessibilityWidget from './components/acc/AccessibilityWidget';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ScrollToTop />
        <ToastContainer position="top-center" />
        <ErrorBoundary>
          <div id="main-container" className="flex flex-col min-h-screen scrollbar overflow">
            <AccessibilityWidget />
            <Routes>
              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <AdminErrorBoundary>
                    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading admin...</div>}>
                      <Routes>
                        <Route path="login" element={<AdminLogin />} />
                        <Route path="register" element={<RegisterAdmin />} />
                        <Route path="*" element={<Admin />} />
                      </Routes>
                    </Suspense>
                  </AdminErrorBoundary>
                }
              />

              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="services" element={<Services />} />
                <Route path="adhd" element={<ADHD />} />
                <Route path="diagnosis" element={<Diagnosis />} />
                <Route path="forms" element={<Forms />} />
                <Route path="contact" element={<Contact />} />
                <Route path="accessibility" element={<AccessibilityStatementPage />} />
                {/* <Route path="neon-stream" element={<NeonStreamPage />} /> */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <SpeedInsights />
          </div>
        </ErrorBoundary>
      </AuthProvider>
    </Provider>
  );
}

function Layout() {
  return (
    <>
      <Navbar />
      <main className="flex-grow p-0">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
