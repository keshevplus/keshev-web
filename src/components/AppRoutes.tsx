import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Services from '../pages/Services';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ADHD from '../pages/ADHD';
import Diagnosis from '../pages/Diagnosis';
import Forms from '../pages/Forms';
import Admin from '../pages/Admin';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/adhd" element={<ADHD />} />
      <Route path="/diagnosis" element={<Diagnosis />} />
      <Route path="/forms" element={<Forms />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
}

export default AppRoutes;