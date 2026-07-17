import heroBg from '../../assets/images/hero_bg.webp';
import './Hero.css';

function Hero() {
  return (
    <section className="hero" aria-label="Hero section">
      {/* Background Image */}
      <div className="hero__background">
        <img
          className="hero__background-img"
          src={heroBg}
          alt="Exhibition hall with visitors exploring expo stalls and booths"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Dark Overlay */}
      <div className="hero__overlay" aria-hidden="true"></div>

      {/* Content */}
      <div className="hero__content">
        <p className="hero__sub-heading">What We Do</p>

        <h1 className="hero__heading">
          <span className="hero__heading-line">Complete Expo Stall Design &amp; Event Solutions</span>
          <span className="hero__heading-line">Tailored for <span className="hero__heading-accent">High-Impact Exhibitions</span></span>
        </h1>

        <p className="hero__description">
          As a leading 3D exhibition booth builder and event solutions agency, Tridex designs and delivers custom-built expo stalls. 
          From concept to execution, we create high-impact trade show booths that elevate your brand globally.
        </p>

        <a 
          href="https://wa.me/918796411515?text=Hi%20Tridex%20Exhibitions%2C%20I%20visited%20your%20homepage%20and%20would%20like%20to%20request%20a%20free%20stall%20design%20consultation%20for%20our%20upcoming%20exhibition.%20Please%20guide%20me%20on%20the%20next%20steps." 
          target="_blank"
          rel="noopener noreferrer"
          className="hero__cta" 
          role="button" 
          aria-label="Request a free stall design consultation"
        >
          Request a Free Stall Design Consultation
        </a>
      </div>
    </section>
  );
}

export default Hero;
