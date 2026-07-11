import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import whatsapp9 from '../assets/images/whatsapp_9.jpeg';
import './Services.css';

const TYPOLOGIES = [
  {
    id: 'custom-stand',
    title: 'Custom Wood Stand Design',
    detailTitle: 'Custom Wood',
    iconClass: 'fa-solid fa-hammer',
    features: [
      'Bespoke carpentry structures built to any shape or dimension.',
      'Premium laminate, paint finishes, and custom acrylic display stands.',
      'Enables high creative freedom, tailored meeting zones, and custom storage.'
    ]
  },
  {
    id: 'double-decker',
    title: 'Double-Decker Exhibition Stands',
    detailTitle: 'Double Decker',
    iconClass: 'fa-solid fa-building-flag',
    features: [
      'Two-story structural engineering to double your usable space.',
      'Private VIP discussion lounge on top, open demo zone below.',
      'Unmatched brand presence and high visual elevation in the hall.'
    ]
  },
  {
    id: 'modular-stand',
    title: 'Modular Max Stands (Eco-Friendly)',
    detailTitle: 'Modular Stand',
    iconClass: 'fa-solid fa-arrows-rotate',
    features: [
      'Reusable aluminum frameworks with seamless textile fabric prints.',
      'Fast onsite construction, zero carpentry waste, and easy storage.',
      'Scalable to different layouts, saving costs over multiple shows.'
    ]
  },
  {
    id: 'shell-upgrade',
    title: 'Shell Scheme Upgrades',
    detailTitle: 'Shell Upgrade',
    iconClass: 'fa-solid fa-up-right-and-down-left-from-center',
    features: [
      'Upgrade standard shell booths with custom graphical vinyl liners.',
      'Add front reception desks, custom flooring, and extra spotlights.',
      'Transform basic spaces into premium stands on a smart budget.'
    ]
  }
];

const FAQS = [
  {
    q: 'Do you provide double-decker exhibition stands?',
    a: 'Yes! We design and build double-decker (two-story) stands. Our structural designers prepare detailed safety certificates, load calculations, and technical blueprints required by organizer architects.'
  },
  {
    q: 'What materials are used for custom stand design?',
    a: 'We use premium commercial plywood, MDF, iron frames, acrylics, glass vitrines, high-quality laminates, PU paints, and Tension Fabric Systems with LED backlighting.'
  },
  {
    q: 'What is the difference between stand design and stall design?',
    a: 'They are largely synonymous. Internationally (in Europe and the UAE), "exhibition stand design" is the preferred term, whereas "stall design" is more commonly used in India.'
  },
  {
    q: 'Do you handle stand approvals and logistics?',
    a: 'Yes, we handle stand design submissions, electrical approvals, risk assessments, transport, onsite build, dismantle, and return-logistics.'
  },
  {
    q: 'Can we store our stand materials with you for future expos?',
    a: 'Yes! We offer warehousing and refurbishing services. We can store your custom furniture, banners, and reusable frames in our warehouses in Mumbai, Delhi, or Dubai.'
  }
];

function StandDesign() {
  const [activeTypology, setActiveTypology] = useState('custom-stand');
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
            <div className="hero-content reveal reveal-left">
              <div className="hero-text">
                <h1 className="hero-title">Exhibition Stand <span className="hero-title-accent">Design &amp; Construction</span></h1>
                <p className="hero-subtitle">
                  We design and construct premium custom exhibition stands globally. 
                  We combine cutting-edge 3D stand concepts with reliable, turnkey engineering and fabrication. 
                  Whether you need a double-decker pavilion, a modern island layout, or custom modular displays, 
                  we deliver high-impact custom exhibition stands that showcase your brand and products on any expo floor.
                </p>
                <a href="#typologies" className="cta-button">
                  Explore Typologies
                </a>
              </div>
            </div>
            <div className="hero-image-placeholder reveal reveal-right" aria-hidden="true">
              <div className="blank-image-card image-loaded">
                <img 
                  src={whatsapp9} 
                  alt="Armandoz Tea Kiosk Design" 
                  className="hero-loaded-image"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Why Tridex Section */}
        <section className="why-woodpeckers">
          <div className="section-header reveal reveal-up">
            <h2 className="section-title">Why Tridex for Exhibition Stands</h2>
          </div>
          
          <div className="features-grid">
            <div className="feature-card reveal reveal-up delay-100">
              <div className="feature-icon">
                <i className="fa-solid fa-pen-ruler" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Turnkey Engineering</h3>
              <p className="feature-description">
                From initial 3D visualization to detailed blueprints, structural certificates, and electrical plans.
              </p>
            </div>

            <div className="feature-card reveal reveal-up delay-200">
              <div className="feature-icon">
                <i className="fa-solid fa-bolt" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Factory Fit Checks</h3>
              <p className="feature-description">
                All wood panels and metal truss items are pre-fitted in our factory before transport to guarantee no onsite delays.
              </p>
            </div>

            <div className="feature-card reveal reveal-up delay-300">
              <div className="feature-icon">
                <i className="fa-solid fa-swatchbook" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Premium Aesthetics</h3>
              <p className="feature-description">
                Using layered warm/cool lighting, acrylic integrations, and sharp paint finishes to make your stand glow.
              </p>
            </div>

            <div className="feature-card reveal reveal-up delay-400">
              <div className="feature-icon">
                <i className="fa-solid fa-globe" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Global Execution</h3>
              <p className="feature-description">
                Reliable build delivery in India, the UAE (Dubai/Abu Dhabi), and major European business expos.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Stall Typologies Section (Tabs Layout) */}
        <section id="typologies" className="stall-typologies">
          <div className="typologies-container">
            <div className="typologies-header reveal reveal-up">
              <h2 className="typologies-title">Stand Design Typologies</h2>
            </div>

            <div className="typologies-content reveal reveal-up delay-200">
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
            <div className="industry-header reveal reveal-up">
              <h2 className="industry-title">Industry-Focused Stand Designs</h2>
            </div>

            <div className="industry-grid">
              <div className="industry-card reveal reveal-up delay-100">
                <h3 className="industry-card-title">IT &amp; Consumer Tech</h3>
                <p className="industry-card-description">
                  Interactive screen consoles, wire-management hubs, tech-demonstration pods, and backlit logo columns.
                </p>
              </div>

              <div className="industry-card reveal reveal-up delay-200">
                <h3 className="industry-card-title">Food &amp; Beverage</h3>
                <p className="industry-card-description">
                  Integrated kitchen spaces, tasting counters, food safety glass guards, and hygienic display surfaces.
                </p>
              </div>

              <div className="industry-card reveal reveal-up delay-300">
                <h3 className="industry-card-title">Chemicals &amp; heavy Industry</h3>
                <p className="industry-card-description">
                  Heavy platforms, architectural graphic towers, scale-model demo counters, and private meeting cabins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Design Process */}
        <section className="design-process">
          <div className="process-container">
            <div className="process-header reveal reveal-up">
              <h2 className="process-title">Stand Build Process</h2>
            </div>

            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3 className="step-title">Stand Briefing</h3>
                <p className="step-description">Detailing stand size, orientation (open sides), and key target visitor objectives.</p>
              </div>

              <div className="process-step">
                <div className="step-number">2</div>
                <h3 className="step-title">3D Concept</h3>
                <p className="step-description">Creating 3D designs showing spatial layout, materials, and display hubs.</p>
              </div>

              <div className="process-step">
                <div className="step-number">3</div>
                <h3 className="step-title">Engineering</h3>
                <p className="step-description">Preparing blueprints, electrical wire maps, and submission for organizer approval.</p>
              </div>

              <div className="process-step">
                <div className="step-number">4</div>
                <h3 className="step-title">Fabrication</h3>
                <p className="step-description">Constructing panels, stage floors, and support beams in our local workshops.</p>
              </div>

              <div className="process-step">
                <div className="step-number">5</div>
                <h3 className="step-title">Assembly</h3>
                <p className="step-description">Onsite construction, lighting installation, graphics wall-wrapping, and handover.</p>
              </div>

              <div className="process-step">
                <div className="step-number">6</div>
                <h3 className="step-title">Dismantling</h3>
                <p className="step-description">Safe dismantle, packing reusable modules, and return shipping to storage hubs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Simple Stall Design */}
        <section className="simple-design">
          <div className="simple-container reveal reveal-up">
            <h2 className="simple-title">Bespoke Stand Layouts — <span className="simple-title-accent">Without Looking Cluttered</span></h2>
            <p className="simple-subtitle">
              Sleek profiles, clear layouts: One key visual message, centered reception counters, and clean backdrops.
            </p>
            <div className="simple-features">
              <div className="simple-feature reveal reveal-up delay-100">
                <h3 className="simple-feature-title">Modular frameworks</h3>
                <p className="simple-feature-description">
                  Sustainable aluminum stand structures and reusable fabric graphic displays.
                </p>
              </div>
              <div className="simple-feature reveal reveal-up delay-200">
                <h3 className="simple-feature-title">Smart Merchandising</h3>
                <p className="simple-feature-description">
                  Integrated wall panels with clean floating shelving for product display and literature.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Build Quality */}
        <section className="build-quality">
          <div className="quality-container">
            <div className="quality-header reveal reveal-up">
              <h2 className="quality-title">Build Quality &amp; Materials</h2>
            </div>

            <div className="quality-grid">
              <div className="quality-item reveal reveal-up delay-100">
                <h3 className="quality-item-title">Custom Carpentry</h3>
                <p className="quality-item-description">
                  Bespoke woodwork panels, premium laminate finishings, and acrylic showcases.
                </p>
              </div>

              <div className="quality-item reveal reveal-up delay-200">
                <h3 className="quality-item-title">AV &amp; LED systems</h3>
                <p className="quality-item-description">
                  Directional spot lights, back-lit logo fascia headers, and edge glow LED strips.
                </p>
              </div>

              <div className="quality-item reveal reveal-up delay-300">
                <h3 className="quality-item-title">Eco Materials</h3>
                <p className="quality-item-description">
                  Reusable frame nodes, organic water-based paint, and recyclable graphic fabrics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Where We Work */}
        <section className="where-we-work">
          <div className="work-container">
            <div className="work-header reveal reveal-up">
              <h2 className="work-title">Where We Work</h2>
            </div>

            <div className="work-content reveal reveal-up delay-200">
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
            <div className="faq-header reveal reveal-up">
              <h2 className="faq-title">Frequently Asked Questions (FAQs)</h2>
            </div>

            <div className="faq-list reveal reveal-up delay-200">
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

export default StandDesign;
