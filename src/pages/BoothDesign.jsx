import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import whatsapp4 from '../assets/images/whatsapp_4.jpeg';
import './Services.css';

const TYPOLOGIES = [
  {
    id: 'inline-booth',
    title: 'Inline / Linear Booth Design',
    detailTitle: 'Inline Booth',
    iconClass: 'fa-solid fa-align-left',
    features: [
      'One side open layout designed for standard line rows.',
      'Smart storage integration, wall shelving, and back-wall graphics.',
      'Highly cost-effective, ideal for focused branding in small spaces.'
    ]
  },
  {
    id: 'corner-booth',
    title: 'Corner Booth Design (2 Side Open)',
    detailTitle: 'Corner Booth',
    iconClass: 'fa-solid fa-table-cells',
    features: [
      'Two side open exposure for dual-corner traffic flow.',
      'Diagonal layout option, reception counter positioning, and logo headers.',
      'Excellent balance of floor space, layout flexibility, and visibility.'
    ]
  },
  {
    id: 'peninsula-booth',
    title: 'Peninsula Booth Design (3 Side Open)',
    detailTitle: 'Peninsula Booth',
    iconClass: 'fa-solid fa-object-ungroup',
    features: [
      'Three side open exposure for maximum visibility in hallways.',
      'Central display towers, demo hubs, and lounge seating areas.',
      'Attracts traffic from three directions on the trade show floor.'
    ]
  },
  {
    id: 'island-booth',
    title: 'Island Booth Design (4 Side Open)',
    detailTitle: 'Island Booth',
    iconClass: 'fa-solid fa-maximize',
    features: [
      'Four side open exposure for full 360-degree brand access.',
      'Overhead hanging banners, modular meeting rooms, and tech zones.',
      'Designed for flagship presence and category-leading brands.'
    ]
  }
];

const FAQS = [
  {
    q: 'What sizes of exhibition booths do you design and build?',
    a: 'We design and build booths of all sizes, from standard shell scheme upgrades (9sqm, 18sqm, 27sqm) to large custom island pavilions exceeding 100sqm.'
  },
  {
    q: 'Do you offer modular and reusable booth designs?',
    a: 'Yes, we design booths using lightweight modular aluminum frames and fabric graphic systems that can be easily scaled down, reconfigured, and re-used for multiple expos.'
  },
  {
    q: 'What is included in your turnkey booth design services?',
    a: 'Our turnkey service includes 3D booth concept design, technical drafting for approvals, in-house fabrication, graphic printing, logistics, onsite assembly, dismantle, and post-show storage.'
  },
  {
    q: 'How do you handle booth approval from expo organizers?',
    a: 'Our in-house technical draftsmen prepare detailed structural drawings, electrical layouts, and safety certificates needed by the organizers, managing the full submission process for you.'
  },
  {
    q: 'How far in advance should we start designing our booth?',
    a: 'For standard booths, 4-6 weeks before the expo is ideal. For large island stands and pavilions, we recommend starting 8-12 weeks in advance to allow for custom material sourcing.'
  }
];

function BoothDesign() {
  const [activeTypology, setActiveTypology] = useState('inline-booth');
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px -50px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const steps = document.querySelectorAll('.process-step');
    steps.forEach(step => observer.observe(step));

    return () => {
      steps.forEach(step => observer.unobserve(step));
    };
  }, []);

  const currentType = TYPOLOGIES.find(t => t.id === activeTypology) || TYPOLOGIES[0];

  return (
    <>
      <Navbar />
      <main className="services-page">

        {/* 1. Services Hero Section */}
        <div className="page-container">
          <div className="hero-section">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">Exhibition Booth <span className="hero-title-accent">Design &amp; Setup</span></h1>
                <p className="hero-subtitle">
                  We design and construct premium custom exhibition booths that stand out, engage visitors, 
                  and drive lead capture. Backed by in-house fabrication and experienced construction crews.
                </p>
                <a href="#typologies" className="cta-button">
                  Explore Typologies
                </a>
              </div>
            </div>
            <div className="hero-image-placeholder" aria-hidden="true">
              <div className="blank-image-card image-loaded">
                <img 
                  src={whatsapp4} 
                  alt="Volkswagen ID. Expo Pavilion Design" 
                  className="hero-loaded-image"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Why Tridex Section */}
        <section className="why-woodpeckers">
          <div className="section-header">
            <h2 className="section-title">Why Tridex for Exhibition Booths</h2>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-pen-ruler" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Strategic Design</h3>
              <p className="feature-description">
                Layouts optimized for visitor flow, clear product placement, and integrated digital demonstration zones.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-gauge-high" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Speedy Setup</h3>
              <p className="feature-description">
                Pre-fit testing in our factory ensures rapid construction and flawless finishes on the trade show floor.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Premium Graphics</h3>
              <p className="feature-description">
                Ultra-crisp vinyl wall wrapping, back-lit logo headers, and high-impact fabric graphic systems.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-globe" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Pan-India &amp; Global</h3>
              <p className="feature-description">
                Flawless execution in Mumbai, Delhi-NCR, Bangalore, UAE, and major European trade centers.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Stall Typologies Section (Tabs Layout) */}
        <section id="typologies" className="stall-typologies">
          <div className="typologies-container">
            <div className="typologies-header">
              <h2 className="typologies-title">Booth Design Typologies</h2>
            </div>

            <div className="typologies-content">
              {/* Tab Navigation */}
              <div className="typologies-nav">
                {TYPOLOGIES.map(item => (
                  <div
                    key={item.id}
                    className={`nav-item ${activeTypology === item.id ? 'active' : ''}`}
                    onClick={() => setActiveTypology(item.id)}
                  >
                    <div className="nav-item-title">{item.detailTitle}</div>
                  </div>
                ))}
              </div>

              {/* Tab Details */}
              <div className="typologies-details">
                <div className="detail-content active">
                  <div className="detail-header">
                    <div className="stall-icon">
                      <i className={currentType.iconClass} aria-hidden="true"></i>
                    </div>
                    <h3 className="detail-title">{currentType.title}</h3>
                  </div>

                  <div className="detail-features-wrapper">
                    {currentType.features.map((feat, idx) => (
                      <div key={idx} className="detail-feature-card">
                        <div className="detail-feature-check">
                          <i className="fa-solid fa-check" aria-hidden="true"></i>
                        </div>
                        <p className="detail-feature-text">{feat}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Industry-Focused Stalls */}
        <section className="industry-stalls">
          <div className="industry-container">
            <div className="industry-header">
              <h2 className="industry-title">Industry-Focused Booth Designs</h2>
            </div>

            <div className="industry-grid">
              <div className="industry-card">
                <h3 className="industry-card-title">Heavy Machinery &amp; Automotives</h3>
                <p className="industry-card-description">
                  Reinforced platforms, heavy-duty floorboards, ramp structures, high-lux floodlighting, and presentation areas.
                </p>
              </div>

              <div className="industry-card">
                <h3 className="industry-card-title">Pharma &amp; Med-Tech</h3>
                <p className="industry-card-description">
                  Hygienic layouts, integrated glass showcase cabinets, presentation zones, and secure discussion cabins.
                </p>
              </div>

              <div className="industry-card">
                <h3 className="industry-card-title">Real Estate Pavilions</h3>
                <p className="industry-card-description">
                  Large scale building columns, central model display tables, focused spotlighting, and private lounge rooms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Design Process */}
        <section className="design-process">
          <div className="process-container">
            <div className="process-header">
              <h2 className="process-title">Booth Setup Process</h2>
            </div>

            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3 className="step-title">Briefing</h3>
                <p className="step-description">Understanding booth dimensions, target products, branding, and goals.</p>
              </div>

              <div className="process-step">
                <div className="step-number">2</div>
                <h3 className="step-title">3D Design</h3>
                <p className="step-description">Creating realistic 3D renders showing layouts, materials, and display hubs.</p>
              </div>

              <div className="process-step">
                <div className="step-number">3</div>
                <h3 className="step-title">Technical Draft</h3>
                <p className="step-description">Preparing drawings, structural plans, and submission for organizer approval.</p>
              </div>

              <div className="process-step">
                <div className="step-number">4</div>
                <h3 className="step-title">Fabrication</h3>
                <p className="step-description">Pre-building the panels in our workshop to ensure exact component fits.</p>
              </div>

              <div className="process-step">
                <div className="step-number">5</div>
                <h3 className="step-title">Construction</h3>
                <p className="step-description">Onsite construction, graphical vinyl wrapping, AV setups, and hand-over.</p>
              </div>

              <div className="process-step">
                <div className="step-number">6</div>
                <h3 className="step-title">Dismantling</h3>
                <p className="step-description">Safe dismantlement, packaging, and sorting reusable components for storage.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Simple Stall Design */}
        <section className="simple-design">
          <div className="simple-container">
            <h2 className="simple-title">Modular Booth Designs — <span className="simple-title-accent">Without Looking Standard</span></h2>
            <p className="simple-subtitle">
              Sleek profiles, clear layouts: One key visual message, centered reception counters, and clean backdrops.
            </p>
            <div className="simple-features">
              <div className="simple-feature">
                <h3 className="simple-feature-title">Modular Frameworks</h3>
                <p className="simple-feature-description">
                  Lightweight aluminum frame upgrades and reusable Tension Fabric panels.
                </p>
              </div>
              <div className="simple-feature">
                <h3 className="simple-feature-title">Smart Shelving</h3>
                <p className="simple-feature-description">
                  Integrated wall panels with clean floating display shelves for brochures and products.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Build Quality */}
        <section className="build-quality">
          <div className="quality-container">
            <div className="quality-header">
              <h2 className="quality-title">Build Quality &amp; Materials</h2>
            </div>

            <div className="quality-grid">
              <div className="quality-item">
                <h3 className="quality-item-title">Custom Carpentry</h3>
                <p className="quality-item-description">
                  Clean wooden fabrication, premium laminate surfaces, and flawless paint finishings.
                </p>
              </div>

              <div className="quality-item">
                <h3 className="quality-item-title">Integrated Lighting</h3>
                <p className="quality-item-description">
                  Layered warm and cool LED spotlights, back-lit logo headers, and edge glow lighting.
                </p>
              </div>

              <div className="quality-item">
                <h3 className="quality-item-title">Sustainable Systems</h3>
                <p className="quality-item-description">
                  Reusable frame nodes, organic paint choices, and recyclable textile prints.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Where We Work */}
        <section className="where-we-work">
          <div className="work-container">
            <div className="work-header">
              <h2 className="work-title">Where We Work</h2>
            </div>

            <div className="work-content">
              <div>
                <p className="work-description">
                  We deliver exhibition stall design in India, the UAE, and Europe, with strong execution depth 
                  in Mumbai (your go-to exhibition stall designer in Mumbai), Delhi-NCR, Bangalore, 
                  Pune, Hyderabad, Chennai, Ahmedabad, Dubai/Abu Dhabi, and major European trade centers.
                </p>
                <div className="contact-info-custom">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fa-solid fa-phone-volume" aria-hidden="true"></i>
                    </div>
                    <div className="contact-details">
                      <h3>Talk to Us</h3>
                      <p><a href="tel:+918796411515">+91 87964 11515</a></p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fa-solid fa-envelope-open-text" aria-hidden="true"></i>
                    </div>
                    <div className="contact-details">
                      <h3>Write to Us</h3>
                      <p><a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@tridexexhibit.com" target="_blank" rel="noopener noreferrer">info@tridexexhibit.com</a></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="work-map">
                <div className="map-content">
                  <div className="map-icon">
                    <i className="fa-solid fa-map-location-dot" aria-hidden="true"></i>
                  </div>
                  <h3 className="map-title">India, UAE &amp; Europe Coverage</h3>
                  <p className="map-description">
                    From Mumbai and Dubai to major European venues, we bring exhibition stall design excellence to major business hubs 
                    across India, the UAE, and Europe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. FAQ Section */}
        <section className="faq-section">
          <div className="faq-container">
            <div className="faq-header">
              <h2 className="faq-title">Frequently Asked Questions (FAQs)</h2>
            </div>

            <div className="faq-list">
              {FAQS.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className={`faq-item ${isOpen ? 'active' : ''}`}
                  >
                    <button
                      className="faq-question"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <h3>{faq.q}</h3>
                      <div className="faq-icon">{isOpen ? '−' : '+'}</div>
                    </button>
                    <div 
                      className="faq-answer"
                      style={{ 
                        maxHeight: isOpen ? '250px' : '0',
                        opacity: isOpen ? 1 : 0,
                        padding: isOpen ? '0 30px 25px 30px' : '0 30px',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <p>{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <FloatingContact />
      </main>
      <Footer />
    </>
  );
}

export default BoothDesign;
