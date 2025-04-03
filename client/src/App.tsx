import AppRoutes from './components/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BodyContent from './components/BodyContent';
import { AuthProvider } from './contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <ScrollToTop />
      <div>
        {/* Don't show navbar on admin pages */}
        {!isAdminPage && <Navbar />}

        <AppRoutes />

        {/* Don't show footer on admin pages */}
        {!isAdminPage && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;
