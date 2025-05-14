import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
import Login from './pages/admin/Login';

import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ui/ScrollToTop';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
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

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
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
            </Routes>ver
          </div>
        </ErrorBoundary>
      </AuthProvider>
    </Provider>
  );
}

export default App;
