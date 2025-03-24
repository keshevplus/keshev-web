import AppRoutes from './components/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BodyContent from './components/BodyContent';

function App() {
  return (
    <div>
      <Navbar />
      <BodyContent>
        <AppRoutes />
      </BodyContent>
      <Footer />
    </div>
  );
}

export default App;
