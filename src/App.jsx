import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import WaveBackground from './components/WaveBackground/WaveBackground';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import EventDesign from './pages/EventDesign';
import BoothDesign from './pages/BoothDesign';
import StandDesign from './pages/StandDesign';
import Career from './pages/Career';
import Contact from './pages/Contact';
import LegalNotice from './pages/LegalNotice';
import TermsOfService from './pages/TermsOfService';
import './styles/global.css';
import './styles/responsive.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <WaveBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Pages routes */}
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/event-design" element={<EventDesign />} />
        <Route path="/booth-design" element={<BoothDesign />} />
        <Route path="/stand-design" element={<StandDesign />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<LegalNotice />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
