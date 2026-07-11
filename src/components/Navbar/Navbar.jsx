import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/images/logo.png';

// URLs for redirection — customize these with your profile links when ready
const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/tridexexhibit.com';
const GOOGLE_REVIEWS_URL = 'https://g.page/r/CUlO7YY3MH1rECE/review';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Services', path: '/services' },
  { label: 'Career', path: '/career' },
  { label: 'Contact', path: '/contact' },
];

function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const location = useLocation();

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
    setIsMobileServicesOpen(false);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      {/* ---- Top Bar ---- */}
      <div className="navbar__top">
        {/* Logo */}
        <div className="navbar__logo">
          <Link to="/" className="navbar__logo-link" aria-label="Tridex — Home">
            <img src={logo} alt="Tridex Exhibitions &amp; Events" className="navbar__logo-image" />
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="navbar__badges" aria-label="Trust badges">
          <a
            href={TRUSTPILOT_URL || '#!'}
            className="navbar__badge"
            target={TRUSTPILOT_URL ? '_blank' : undefined}
            rel={TRUSTPILOT_URL ? 'noopener noreferrer' : undefined}
            aria-label="Trustpilot rating"
          >
            <i className="navbar__badge-icon fa-solid fa-star" style={{ color: '#00b67a' }} aria-hidden="true"></i>
            <div className="navbar__badge-content">
              <span className="navbar__badge-label">Trustpilot</span>
              <div className="navbar__badge-stars" aria-label="5 star rating">
                <i className="fa-solid fa-star" aria-hidden="true"></i>
                <i className="fa-solid fa-star" aria-hidden="true"></i>
                <i className="fa-solid fa-star" aria-hidden="true"></i>
                <i className="fa-solid fa-star" aria-hidden="true"></i>
                <i className="fa-solid fa-star" aria-hidden="true"></i>
              </div>
            </div>
          </a>

          <a
            href={GOOGLE_REVIEWS_URL || '#!'}
            className="navbar__badge"
            target={GOOGLE_REVIEWS_URL ? '_blank' : undefined}
            rel={GOOGLE_REVIEWS_URL ? 'noopener noreferrer' : undefined}
            aria-label="Google reviews"
          >
            <i className="navbar__badge-icon fa-brands fa-google" style={{ color: '#4285f4' }} aria-hidden="true"></i>
            <div className="navbar__badge-content">
              <span className="navbar__badge-label">Google <span className="navbar__badge-label-extra">Reviews</span></span>
              <div className="navbar__badge-stars navbar__badge-stars--google" aria-label="5 star rating">
                <i className="fa-solid fa-star" aria-hidden="true"></i>
                <i className="fa-solid fa-star" aria-hidden="true"></i>
                <i className="fa-solid fa-star" aria-hidden="true"></i>
                <i className="fa-solid fa-star" aria-hidden="true"></i>
                <i className="fa-solid fa-star" aria-hidden="true"></i>
              </div>
            </div>
          </a>
        </div>

        {/* Contact Info */}
        <div className="navbar__contact">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@tridexexhibit.com" target="_blank" rel="noopener noreferrer" className="navbar__contact-item" aria-label="Email us">
            <i className="fa-regular fa-envelope" aria-hidden="true"></i>
            <span>info@tridexexhibit.com</span>
          </a>
          <a href="tel:+918796411515" className="navbar__contact-item" aria-label="Call us">
            <i className="fa-solid fa-phone" aria-hidden="true"></i>
            <span>+91 87964 11515</span>
          </a>
        </div>

        {/* Hamburger — Mobile */}
        <button
          className={`navbar__hamburger${isMobileOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={toggleMobile}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
        >
          <span className="navbar__hamburger-line" aria-hidden="true"></span>
          <span className="navbar__hamburger-line" aria-hidden="true"></span>
          <span className="navbar__hamburger-line" aria-hidden="true"></span>
        </button>
      </div>

      {/* ---- Bottom Menu Bar (Desktop) ---- */}
      <div className="navbar__bottom">
        <ul className="navbar__menu" role="menubar">
          {NAV_ITEMS.map((item) => {
            if (item.label === 'Services') {
              return (
                <li className="navbar__menu-item navbar__menu-item--dropdown" key={item.path} role="none">
                  <Link
                    to={item.path}
                    className={`navbar__menu-link${location.pathname === item.path ? ' navbar__menu-link--active' : ''}`}
                    role="menuitem"
                  >
                    {item.label} <i className="fa-solid fa-chevron-down navbar__dropdown-chevron" aria-hidden="true"></i>
                  </Link>
                  <ul className="navbar__dropdown-menu">
                    <li><Link to="/services" className="navbar__dropdown-link">EXHIBITION STALL DESIGN</Link></li>
                    <li><Link to="/event-design" className="navbar__dropdown-link">EVENT DESIGN &amp; FABRICATIONS</Link></li>
                    <li><Link to="/booth-design" className="navbar__dropdown-link">EXHIBITION BOOTH DESIGN</Link></li>
                    <li><Link to="/stand-design" className="navbar__dropdown-link">EXHIBITION STAND DESIGN</Link></li>
                  </ul>
                </li>
              );
            }
            return (
              <li className="navbar__menu-item" key={item.path} role="none">
                <Link
                  to={item.path}
                  className={`navbar__menu-link${location.pathname === item.path ? ' navbar__menu-link--active' : ''}`}
                  role="menuitem"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ---- Mobile Menu Overlay ---- */}
      <div
        className={`navbar__mobile-overlay${isMobileOpen ? ' navbar__mobile-overlay--open' : ''}`}
        onClick={closeMobile}
        aria-hidden={!isMobileOpen}
      >
        <div className="navbar__mobile-menu" onClick={(e) => e.stopPropagation()}>
          <ul className="navbar__mobile-menu-list" role="menu">
            {NAV_ITEMS.map((item) => {
              if (item.label === 'Services') {
                return (
                  <li key={item.path} role="none" className="navbar__mobile-menu-item--dropdown">
                    <div className="navbar__mobile-dropdown-header">
                      <Link
                        to={item.path}
                        className={`navbar__mobile-menu-link${location.pathname === item.path ? ' navbar__mobile-menu-link--active' : ''}`}
                        onClick={closeMobile}
                        role="menuitem"
                      >
                        {item.label}
                      </Link>
                      <button 
                        className={`navbar__mobile-dropdown-toggle${isMobileServicesOpen ? ' navbar__mobile-dropdown-toggle--open' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMobileServicesOpen(!isMobileServicesOpen);
                        }}
                        aria-label="Toggle services menu"
                      >
                        <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                      </button>
                    </div>
                    <ul className={`navbar__mobile-dropdown-menu${isMobileServicesOpen ? ' navbar__mobile-dropdown-menu--open' : ''}`}>
                      <li>
                        <Link to="/services" className="navbar__mobile-dropdown-link" onClick={closeMobile}>
                          EXHIBITION STALL DESIGN
                        </Link>
                      </li>
                      <li>
                        <Link to="/event-design" className="navbar__mobile-dropdown-link" onClick={closeMobile}>
                          EVENT DESIGN &amp; FABRICATIONS
                        </Link>
                      </li>
                      <li>
                        <Link to="/booth-design" className="navbar__mobile-dropdown-link" onClick={closeMobile}>
                          EXHIBITION BOOTH DESIGN
                        </Link>
                      </li>
                      <li>
                        <Link to="/stand-design" className="navbar__mobile-dropdown-link" onClick={closeMobile}>
                          EXHIBITION STAND DESIGN
                        </Link>
                      </li>
                    </ul>
                  </li>
                );
              }
              return (
                <li key={item.path} role="none">
                  <Link
                    to={item.path}
                    className={`navbar__mobile-menu-link${location.pathname === item.path ? ' navbar__mobile-menu-link--active' : ''}`}
                    onClick={closeMobile}
                    role="menuitem"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="navbar__mobile-contact">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@tridexexhibit.com" target="_blank" rel="noopener noreferrer" className="navbar__mobile-contact-item">
              <i className="fa-regular fa-envelope" aria-hidden="true"></i>
              <span>info@tridexexhibit.com</span>
            </a>
            <a href="tel:+918796411515" className="navbar__mobile-contact-item">
              <i className="fa-solid fa-phone" aria-hidden="true"></i>
              <span>+91 87964 11515</span>
            </a>
          </div>

          {/* Mobile Badges */}
          <div className="navbar__mobile-badges">
            <a
              href={TRUSTPILOT_URL || '#!'}
              className="navbar__badge"
              target={TRUSTPILOT_URL ? '_blank' : undefined}
              rel={TRUSTPILOT_URL ? 'noopener noreferrer' : undefined}
              aria-label="Trustpilot rating"
            >
              <i className="navbar__badge-icon fa-solid fa-star" style={{ color: '#00b67a' }} aria-hidden="true"></i>
              <div className="navbar__badge-content">
                <span className="navbar__badge-label">Trustpilot</span>
                <div className="navbar__badge-stars" aria-label="5 star rating">
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                </div>
              </div>
            </a>

            <a
              href={GOOGLE_REVIEWS_URL || '#!'}
              className="navbar__badge"
              target={GOOGLE_REVIEWS_URL ? '_blank' : undefined}
              rel={GOOGLE_REVIEWS_URL ? 'noopener noreferrer' : undefined}
              aria-label="Google reviews"
            >
              <i className="navbar__badge-icon fa-brands fa-google" style={{ color: '#4285f4' }} aria-hidden="true"></i>
              <div className="navbar__badge-content">
                <span className="navbar__badge-label">Google Reviews</span>
                <div className="navbar__badge-stars navbar__badge-stars--google" aria-label="5 star rating">
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
