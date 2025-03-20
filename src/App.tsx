import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import ADHD from './pages/ADHD';
import Diagnosis from './pages/Diagnosis';
import Treatment from './pages/Treatment';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-0 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/adhd" element={<ADHD />} />
            <Route path="/diagnosis" element={<Diagnosis />} />
            <Route path="/treatment" element={<Treatment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
