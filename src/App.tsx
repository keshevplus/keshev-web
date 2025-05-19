import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingPhoneNumber from './components/FloatingPhoneNumber';

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

import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ui/ScrollToTop';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ScrollToTop />
        <ToastContainer position="top-center" />
        <ErrorBoundary>
          <div id="main-container" className="flex flex-col min-h-screen scrollbar overflow">
            <Routes>
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/*" element={<Admin />} />
              {/* Public routes */}
              <Route
                path="*"
                element={
                  <>
                    <Navbar />
                    <FloatingPhoneNumber />
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
            <SpeedInsights /> 
          </div>
        </ErrorBoundary>
      </AuthProvider>
    </Provider>
  );
}

export default App;
