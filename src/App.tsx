import AppRoutes from './components/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BodyContent from './components/BodyContent';
import PageTitle from './components/PageTitle';

function App() {
  return (
    <div>
      <>
        <Navbar />
        <BodyContent>
          <PageTitle>Test</PageTitle>
          <AppRoutes />
        </BodyContent>
        <Footer />
      </>
    </div>
  );
}

export default App;
