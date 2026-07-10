import heroVideo from '../../assets/images/Ultra_realistic_K_cinematic_v.mp4';
import './PortfolioHero.css';

function PortfolioHero() {
  return (
    <section className="portfolio-hero" aria-label="Portfolio Hero">
      {/* Video Background */}
      <div className="portfolio-hero__video-wrapper">
        <video
          className="portfolio-hero__video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src={heroVideo}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="portfolio-hero__overlay" aria-hidden="true"></div>

      {/* Content */}
      <div className="portfolio-hero__content">
        <h1 className="portfolio-hero__heading">
          <span className="portfolio-hero__accent">“Engineering Impact:</span> From Blueprints to <span className="portfolio-hero__accent">Breathtaking Structures”</span>
        </h1>
        <p className="portfolio-hero__subheading">
          We bridge the gap between bold design and structural perfection, crafting 
          high-performance exhibition stands that command attention and drive engagement.
        </p>
      </div>
    </section>
  );
}

export default PortfolioHero;
