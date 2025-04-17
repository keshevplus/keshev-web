import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ADHD from './pages/ADHD';
import Diagnosis from './pages/Diagnosis';
import Forms from './pages/Forms';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ui/ScrollToTop';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ScrollToTop />
        <ToastContainer position="top-center" />
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Admin routes */}
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
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
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/adhd" element={<ADHD />} />
                      <Route path="/diagnosis" element={<Diagnosis />} />
                      <Route path="/forms" element={<Forms />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Provider>
  );
}

export default App;
