import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import whatsapp1 from '../assets/images/whatsapp_1.jpeg';
import './Services.css';

const TYPOLOGIES = [
  {
    id: 'one-side',
    title: 'One Side Open Exhibition Stall Design',
    detailTitle: 'One Side Open',
    iconClass: 'fa-solid fa-square',
    features: [
      'Perfect for focused storytelling in compact footprints.',
      'Smart wall merchandising, storage integration, and bold fascia.',
      'Fast setup, budget-friendly, and ideal for first-time exhibitors.'
    ]
  },
  {
    id: 'two-side',
    title: '2 Side Open Exhibition Stall Design',
    detailTitle: '2 Side Open',
    iconClass: 'fa-solid fa-columns',
    features: [
      'Higher visibility with dual-axis entry.',
      'Diagonal circulation, hero product zoning, dynamic signage.',
      'Great balance of flow, function, and cost.'
    ]
  },
  {
    id: 'three-side',
    title: '3 Side Open Exhibition Stall Design',
    detailTitle: '3 Side Open',
    iconClass: 'fa-solid fa-vector-square',
    features: [
      'Immersive exposure on three fronts.',
      'Island-like presence, central engagement tables, light towers.',
      'Recommended for launches and high-traffic shows.'
    ]
  },
  {
    id: 'island',
    title: 'Island / 4 Side Open',
    detailTitle: 'Island / 4 Side Open',
    iconClass: 'fa-solid fa-border-all',
    features: [
      'Maximum branding with 360° access.',
      'Overhead features, multi-zone demos, lounge + meeting cabins.',
      'Flagship presence for category leaders.'
    ]
  }
];

const FAQS = [
  {
    q: 'What is the cost of exhibition stall design in India?',
    a: 'The cost of exhibition stall design in India depends on the size, type (one side open, 2 side open, 3 side open, or island), materials, and level of customization. At Tridex, we provide tailored solutions that fit both budget-friendly and premium requirements.'
  },
  {
    q: 'Do you provide exhibition stall design services outside Mumbai?',
    a: 'Yes, while Tridex is a leading exhibition stall designer in Mumbai, we deliver complete exhibition stall design services pan-India, the UAE, and Europe. Our team handles design, fabrication, logistics, and installation at major expo centers nationwide and internationally.'
  },
  {
    q: 'What are the prints used in an exhibition stall design?',
    a: 'Fabric prints and vinyl prints are the most commonly used for walls, panels, and branding in an exhibition stall.'
  },
  {
    q: 'What flooring options are used in exhibition stall fabrication?',
    a: 'Vinyl flooring, laminate, carpet tiles, and wooden flooring are most popular. The choice depends on budget, design theme, and foot traffic expectations.'
  },
  {
    q: 'What is the use of skirting in an exhibition stall?',
    a: 'Skirting hides structural elements, wiring, and storage areas while giving a neat, premium look to your exhibition stall panel design.'
  },
  {
    q: 'How do you make an exhibition stall attractive?',
    a: 'By using bold branding, engaging graphics, layered lighting, interactive displays, and premium finishes. For impact, Tridex blends business exhibition stall design expertise with creativity.'
  }
];

function Services() {
  const [activeTypology, setActiveTypology] = useState('one-side');
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
                <h1 className="hero-title">Exhibition Stall Design in India — <span className="hero-title-accent">Built to Stand Out</span></h1>
                <p className="hero-subtitle">
                  Tridex is an exhibition stall design company in Mumbai with 7+ years of delivery 
                  across India, the UAE, and Europe. We craft simple exhibition stall design to large, immersive brand 
                  environments—backed by in-house design and fabrication, 3D visualization, and on-site execution. 
                  From one side open to 3 side open exhibition stall design and island concepts, we build stalls 
                  that drive footfall, conversations, and conversions.
                </p>
                <a href="#typologies" className="cta-button">
                  Explore Typologies
                </a>
              </div>
            </div>
            {/* Blank card placeholder replaced by Java Juice Image */}
            <div className="hero-image-placeholder">
              <div className="blank-image-card image-loaded">
                <img 
                  src={whatsapp1} 
                  alt="Java Juice Mall Kiosk Design" 
                  className="hero-loaded-image"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Why Tridex Section */}
        <section className="why-woodpeckers">
          <div className="section-header">
            <h2 className="section-title">Why Tridex for Exhibition Stall Design &amp; Fabrication</h2>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-pen-ruler" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Strategy → 3D → Build</h3>
              <p className="feature-description">
                Research-led concepts, 3D exhibition stall design, engineering, graphics, and turnkey fabrication under one roof.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-bolt" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Speed &amp; Reliability</h3>
              <p className="feature-description">
                Pre-approved materials, modular kits, and experienced crews for tight expo timelines.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-paint-roller" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Brand-First Craft</h3>
              <p className="feature-description">
                Layouts that showcase products, enable demos, and streamline lead capture.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-globe" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Global Footprint</h3>
              <p className="feature-description">
                Mumbai HQ with custom fabrication and build execution across India, UAE &amp; Europe.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Stall Typologies Section (Tabs Layout) */}
        <section id="typologies" className="stall-typologies">
          <div className="typologies-container">
            <div className="typologies-header">
              <h2 className="typologies-title">Stall Typologies We Specialize In</h2>
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
                    <h3 className="detail-title">{currentType.detailTitle}</h3>
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
              <h2 className="industry-title">Industry-Focused Stalls That Convert</h2>
            </div>

            <div className="industry-grid">
              <div className="industry-card">
                <h3 className="industry-card-title">Jewellery Exhibition Stall Design</h3>
                <p className="industry-card-description">
                  High-lux showcases, secure vitrines, colour-accurate lighting, VIP lounges.
                </p>
              </div>

              <div className="industry-card">
                <h3 className="industry-card-title">Garment Exhibition Stall Design</h3>
                <p className="industry-card-description">
                  Racks/looks walls, quick-change trial corners, sample storage, fabric-friendly lighting.
                </p>
              </div>

              <div className="industry-card">
                <h3 className="industry-card-title">Business Exhibition Stall Design (B2B/B2C)</h3>
                <p className="industry-card-description">
                  Modular product bays, demo counters, meeting cabins, data capture points.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Design Process */}
        <section className="design-process">
          <div className="process-container">
            <div className="process-header">
              <h2 className="process-title">Design Process (Fast, Clear, On-Point)</h2>
            </div>

            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3 className="step-title">Discovery</h3>
                <p className="step-description">Brand goals, target visitors, KPIs, and budget.</p>
              </div>

              <div className="process-step">
                <div className="step-number">2</div>
                <h3 className="step-title">Concept &amp; 3D</h3>
                <p className="step-description">Moodboards, 3D exhibition stall design, materials, lighting plan.</p>
              </div>

              <div className="process-step">
                <div className="step-number">3</div>
                <h3 className="step-title">Detailing</h3>
                <p className="step-description">Exhibition stall panel design, structural drawings, graphics, messaging.</p>
              </div>

              <div className="process-step">
                <div className="step-number">4</div>
                <h3 className="step-title">Fabrication</h3>
                <p className="step-description">In-house build, pre-fit checks, logistics planning.</p>
              </div>

              <div className="process-step">
                <div className="step-number">5</div>
                <h3 className="step-title">Onsite</h3>
                <p className="step-description">Install, QA, handover, show-day support, dismantling.</p>
              </div>

              <div className="process-step">
                <div className="step-number">6</div>
                <h3 className="step-title">Post-Show</h3>
                <p className="step-description">Storage, refurb options, and performance review.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Simple Stall Design */}
        <section className="simple-design">
          <div className="simple-container">
            <h2 className="simple-title">Simple Exhibition Stall Design — <span className="simple-title-accent">Without Looking Basic</span></h2>
            <p className="simple-subtitle">
              Minimal footprint, maximum clarity: One hero message, one hero product, one hero interaction.
            </p>
            <div className="simple-features">
              <div className="simple-feature">
                <h3 className="simple-feature-title">Clean Design</h3>
                <p className="simple-feature-description">
                  Clean panels, modular counters, overhead price-smart features.
                </p>
              </div>
              <div className="simple-feature">
                <h3 className="simple-feature-title">Quick Build</h3>
                <p className="simple-feature-description">
                  Quick to build, easy to replicate across cities.
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
                <h3 className="quality-item-title">Engineered Structures</h3>
                <p className="quality-item-description">
                  Engineered structures, premium laminates/veneers, solid-wood or aluminium systems
                </p>
              </div>

              <div className="quality-item">
                <h3 className="quality-item-title">Professional Lighting</h3>
                <p className="quality-item-description">
                  Glare-controlled, product-true lighting; reliable electrical &amp; AV
                </p>
              </div>

              <div className="quality-item">
                <h3 className="quality-item-title">Sustainable Options</h3>
                <p className="quality-item-description">
                  Sustainable options on request (reusable modules, recyclable prints)
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

      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}

export default Services;
