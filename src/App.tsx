import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// No Animation
// import AnimatedFooter from './components/AnimatedFooter';

// pages routes
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ADHD from './pages/ADHD';
import Diagnosis from './pages/Diagnosis';
import Forms from './pages/Forms';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// admin routes
import Admin from './pages/admin/Admin';
import AdminLogin from './pages/admin/AdminLogin';
import RegisterAdmin from './pages/admin/RegisterAdmin';

import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ui/ScrollToTop';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import AdminErrorBoundary from './components/AdminErrorBoundary';
import { SpeedInsights } from "@vercel/speed-insights/react";
import AccessibilityWidget from './components/acc/AccessibilityWidget';

function App() {
  return (
    <Provider store={store}>
        <AuthProvider>
          <ScrollToTop />
          <ToastContainer position="top-center" />
          <ErrorBoundary>
          <div id="main-container" className="flex flex-col min-h-screen scrollbar overflow">
            {/* Accessibility Widget - Israeli Standard 5568 compliant */}
            <AccessibilityWidget />
            <Routes>
              {/* Admin routes - isolated with specialized admin error boundary */}
              <Route path="/admin/*" element={
                <AdminErrorBoundary>
                  <Routes>
                    <Route path="/login" element={<AdminLogin />} />
                    <Route path="/register" element={<RegisterAdmin />} />
                    <Route path="/*" element={<Admin />} />
                  </Routes>
                </AdminErrorBoundary>
              } />
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
                    
                    {/* AnimatedFooter only shown on non-home pages */}
                    {/* <Routes>
                      <Route path="/" element={null} />
                      <Route path="*" element={<AnimatedFooter />} />
                    </Routes> */}
                    
                    <Footer />
                  </>
                }
              />
            </Routes>
            <SpeedInsights /> 
          </div>
        </ErrorBoundary>
        </AuthProvider>
    </Provider>
  );
}

export default App;
