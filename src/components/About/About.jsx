import aboutImage from '../../assets/images/about_render.jpeg';
import './About.css';

function About() {
  return (
    <section className="about-section" aria-label="About Tridex">
      <div className="container container--wide about-container">
        <div className="about-grid">
          {/* Left Column — Text */}
          <div className="about-content reveal reveal-up">
            <h2 className="about-title">
              India’s Leading Exhibition &amp; Event Fabricators &amp; Design Company
            </h2>
            <p className="about-paragraph">
              As an exhibition stand builder with a global footprint, we provide premium 
              exhibition &amp; Event design services that make your brand the center of 
              attention. Our experienced designers create immersive environments, while 
              our skilled exhibition stall fabricators ensure flawless execution. From 
              concept to exhibition booth fabricator precision, we offer a complete turnkey 
              solution. Trust our exhibition design company to deliver high-impact results 
              as your dedicated exhibition stand contractor and exhibition stall design 
              company for every major trade show.
            </p>
          </div>

          {/* Right Column — Image Card (Wider & Responsive) */}
          <div className="about-image-card reveal reveal-up delay-200">
            <img 
              src={aboutImage} 
              alt="Exhibition Booth Design Rendering" 
              className="about-image" 
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
