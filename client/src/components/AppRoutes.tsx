import { Routes, Route } from 'react-router-dom';
import { FormProvider } from '../contexts/FormContext';
import Home from '../pages/Home';
import Services from '../pages/Services';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ADHD from '../pages/ADHD';
import Diagnosis from '../pages/Diagnosis';
import Forms from '../pages/Forms';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';

function AppRoutes() {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/adhd" element={<ADHD />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/*" element={<Admin />} />
        {/* Catch-all route for any undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </FormProvider>
  );
}

export default AppRoutes;
