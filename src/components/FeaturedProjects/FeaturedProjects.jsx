import { Link } from 'react-router-dom';
import tataHitachiImg from '../../assets/images/tata_hitachi.jpeg';
import portfolio2Img from '../../assets/images/portfolio_2.jpeg';
import portfolio3Img from '../../assets/images/portfolio_3.jpeg';
import './FeaturedProjects.css';

const FEATURED_ITEMS = [
  {
    image: tataHitachiImg,
    title: 'Baker Hughes Exhibition Stall',
    category: 'Energy & Technology'
  },
  {
    image: portfolio2Img,
    title: 'BYD Auto Expo Pavilion',
    category: 'Automotive & EV'
  },
  {
    image: portfolio3Img,
    title: 'Sky Textiles Exhibition Stall',
    category: 'Textiles & Apparel'
  }
];

function FeaturedProjects() {
  return (
    <section className="featured-projects-section" aria-label="Featured Projects Showcase">
      <div className="container container--wide featured-projects-container">
        
        {/* Header */}
        <div className="featured-projects-header">
          <span className="featured-projects-subtitle">Portfolio Highlights</span>
          <h2 className="featured-projects-title">
            Featured Exhibition <span className="featured-projects-accent">Design Projects</span>
          </h2>
          <p className="featured-projects-desc">
            A handpicked selection of our most innovative 3D designs and custom-built stalls 
            fabricated for major brand exhibitions globally.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="featured-projects-grid">
          {FEATURED_ITEMS.map((item, idx) => (
            <div className="featured-project-card" key={idx}>
              <div className="featured-project-card__image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="featured-project-card__image"
                  loading="lazy"
                />
                
                {/* Text Overlay */}
                <div className="featured-project-card__overlay">
                  <div className="featured-project-card__content">
                    <span className="featured-project-card__category">{item.category}</span>
                    <h3 className="featured-project-card__title">{item.title}</h3>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* CTA link to Full Portfolio */}
        <div className="featured-projects-cta">
          <Link to="/portfolio" className="featured-projects-btn">
            Explore Full Portfolio <i className="fa-solid fa-arrow-right-long" aria-hidden="true"></i>
          </Link>
        </div>

      </div>
    </section>
  );
}

export default FeaturedProjects;
