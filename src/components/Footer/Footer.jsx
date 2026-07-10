import { Link } from 'react-router-dom';
import './Footer.css';
import footerLogo from '../../assets/images/logo-footer.png';

function Footer() {
  return (
    <footer className="footer" role="contentinfo" aria-label="Site Footer">
      {/* Main Footer Content */}
      <div className="footer__main">
        <div className="container container--wide footer__container">
          <div className="footer__grid">
            
            {/* Column 1 — Brand Info */}
            <div className="footer__col footer__col--brand">
              <Link to="/" className="footer__logo" aria-label="Tridex — Home">
                <img
                  src={footerLogo}
                  alt="Tridex Exhibitions & Events"
                  className="footer__logo-image"
                />
              </Link>
              <p className="footer__desc">
                Tridex is India's leading exhibition stand builder and booth fabricator, 
                delivering bespoke 3D stall designs and complete turnkey event solutions globally.
              </p>
              <div className="footer__socials" aria-label="Social media links">
                <a href="https://www.facebook.com/share/14qjvnMfsAo/" className="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                </a>
                <a href="https://www.instagram.com/tridex_exhibitions_events" className="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                </a>
                <a href="https://www.linkedin.com/in/tridex-exhibits-1a7408421" className="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                </a>
                <a href="https://x.com/TRIDEX_EXHIBIT" className="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter (X)">
                  <i className="fa-brands fa-x-twitter" aria-hidden="true"></i>
                </a>
              </div>
            </div>

            {/* Column 2 — Quick Links */}
            <div className="footer__col">
              <h3 className="footer__title">Quick Links</h3>
              <ul className="footer__links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/career">Career</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Column 3 — Services */}
            <div className="footer__col">
              <h3 className="footer__title">Our Services</h3>
              <ul className="footer__links">
                <li><Link to="/services">Exhibition Stall Design</Link></li>
                <li><Link to="/event-design">Event Design &amp; Fabrications</Link></li>
                <li><Link to="/booth-design">Exhibition Booth Design</Link></li>
                <li><Link to="/stand-design">Exhibition Stand Design</Link></li>
              </ul>
            </div>

            {/* Column 4 — Contact Details */}
            <div className="footer__col footer__col--contact">
              <h3 className="footer__title">Get In Touch</h3>
              <ul className="footer__contact-list">
                <li>
                  <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                  <a 
                    href="https://maps.google.com/?q=Office+No.+02,+Rohini+Sector-16,+North+Delhi+-+110089" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Office No. 02, Rohini Sector-16, North Delhi - 110089, India
                  </a>
                </li>
                <li>
                  <i className="fa-solid fa-phone" aria-hidden="true"></i>
                  <a href="tel:+918796411515">+91 87964 11515</a>
                </li>
                <li>
                  <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@tridexexhibit.com" target="_blank" rel="noopener noreferrer">info@tridexexhibit.com</a>
                </li>
                <li>
                  <i className="fa-solid fa-envelope-open-text" aria-hidden="true"></i>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sales@tridexexhibit.com" target="_blank" rel="noopener noreferrer">sales@tridexexhibit.com</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Sub-Footer / Copyright Bar */}
      <div className="footer__bottom">
        <div className="container container--wide footer__container">
          <div className="footer__bottom-row">
            <p className="footer__copyright">
              &copy; {new Date().getFullYear()} Tridex Exhibitions &amp; Events. All Rights Reserved.
            </p>
            <div className="footer__legal-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <span className="footer__separator" aria-hidden="true">|</span>
              <Link to="/terms-of-service">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
