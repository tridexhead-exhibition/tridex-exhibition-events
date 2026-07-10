import { Link } from 'react-router-dom';
import './PortfolioCTA.css';

function PortfolioCTA() {
  return (
    <section className="portfolio-cta-section" aria-label="Book a Proposal">
      <div className="portfolio-cta-bg-glow" aria-hidden="true"></div>
      
      <div className="container portfolio-cta-container">
        <span className="portfolio-cta-subtitle">Elevate Your Presence</span>
        <h2 className="portfolio-cta-title">
          Ready to Build an <span className="portfolio-cta-accent">Award-Winning</span> Exhibition Stall?
        </h2>
        <p className="portfolio-cta-desc">
          Partner with India’s leading 3D designers and exhibition stand builders. 
          Get a complimentary custom 3D stall design concept and detailed fabrication proposal 
          tailored specifically for your upcoming trade show.
        </p>

        <div className="portfolio-cta-actions">
          <a 
            href="https://wa.me/918796411515?text=Hi%20Tridex%20Exhibitions%2C%20I%20want%20to%20request%20a%20free%20custom%203D%20stall%20design%20concept%20and%20detailed%20fabrication%20proposal%20for%20our%20upcoming%20trade%20show.%20Please%20guide%20me%20on%20this." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="portfolio-cta-btn portfolio-cta-btn--primary"
          >
            Request Free 3D Concept <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </a>
          <a href="tel:+918796411515" className="portfolio-cta-btn portfolio-cta-btn--secondary">
            <i className="fa-solid fa-phone" aria-hidden="true"></i> Talk to Expert
          </a>
        </div>
      </div>
    </section>
  );
}

export default PortfolioCTA;
