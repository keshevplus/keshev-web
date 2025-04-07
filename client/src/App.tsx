import AppRoutes from './components/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import BodyContent from './components/BodyContent';
import { AuthProvider } from './contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
