import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import whatsapp2 from '../assets/images/whatsapp_2.jpeg';
import './Services.css';

const TYPOLOGIES = [
  {
    id: 'corporate-summits',
    title: 'Corporate Summits & Galas',
    detailTitle: 'Summits & Galas',
    iconClass: 'fa-solid fa-people-roof',
    features: [
      'Multi-zone layouts for stages, lounges, and registration desks.',
      'Premium main-stage backdrops, podiums, and professional lighting.',
      'Symmetric seating arrangements and technical console planning.'
    ]
  },
  {
    id: 'brand-activations',
    title: 'Brand Activations & Pop-ups',
    detailTitle: 'Activations & Pop-ups',
    iconClass: 'fa-solid fa-bullhorn',
    features: [
      'High-engagement zones, product trial bays, and demo counters.',
      'Selfie walls, photobooths, and interactive tech integrations.',
      'Designed to capture leads and drive social media shares.'
    ]
  },
  {
    id: 'product-launches',
    title: 'Product Launch Setups',
    detailTitle: 'Product Launches',
    iconClass: 'fa-solid fa-gift',
    features: [
      'Dramatic reveal systems, custom screens, and stage walk-up areas.',
      'Premium pedestals and focused spotlights for the hero product.',
      'Press corners and media backdrops for high-impact photography.'
    ]
  },
  {
    id: 'theme-pavilions',
    title: 'Theme Pavilions & Zones',
    detailTitle: 'Theme Pavilions',
    iconClass: 'fa-solid fa-tent',
    features: [
      'Large-scale zoning with custom overhead arches and signage.',
      'Unified brand layout with separate pods for group companies.',
      'Optimized visitor flow for halls, forums, and expo environments.'
    ]
  }
];

const FAQS = [
  {
    q: 'What types of corporate events do you design and fabricate?',
    a: 'We design and build setups for corporate summits, product launches, brand activations, pop-up stores, annual meetings, stage backdrops, and theme pavilions across major expo and event venues.'
  },
  {
    q: 'Do you manage both event design and fabrication in-house?',
    a: 'Yes! Tridex is a turnkey agency. We handle the initial 3D event design, technical drafting, in-house printing, carpentry/metalwork fabrication, and final onsite build setup and dismantling.'
  },
  {
    q: 'Can you deliver event setups outside Mumbai?',
    a: 'Yes, we provide event design and fabrication services pan-India, the UAE (Dubai, Abu Dhabi), and major European trade centers. We have a robust logistical network to ensure on-time delivery.'
  },
  {
    q: 'What materials are used for event backdrops and stages?',
    a: 'We use high-grade MDF/plywood structures, metal frames, acrylic sheets, premium fabric printing (Tension Fabric System), and high-resolution vinyl prints. Lighting is customized with professional LEDs and spotlights.'
  },
  {
    q: 'How much time do you need to execute an event fabrication?',
    a: 'Depending on the scale, design approval takes 3-5 days. In-house fabrication requires 5-10 days, and onsite installation is typically completed in 24-48 hours prior to the event.'
  }
];

function EventDesign() {
  const [activeTypology, setActiveTypology] = useState('corporate-summits');
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
                <h1 className="hero-title">Event Design &amp; <span className="hero-title-accent">Fabrication Services</span></h1>
                <p className="hero-subtitle">
                  We design and construct immersive brand environments, stage backdrops, corporate summits, 
                  and experiential pop-ups. From initial 3D visualization to turnkey onsite setup, we make your events stand out.
                </p>
                <a href="#typologies" className="cta-button">
                  Explore Typologies
                </a>
              </div>
            </div>
            <div className="hero-image-placeholder reveal reveal-right" aria-hidden="true">
              <div className="blank-image-card image-loaded">
                <img 
                  src={whatsapp2} 
                  alt="Reserva Apparel Display Design" 
                  className="hero-loaded-image"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Why Tridex Section */}
        <section className="why-woodpeckers">
          <div className="section-header reveal reveal-up">
            <h2 className="section-title">Why Tridex for Event Production &amp; Fabrications</h2>
          </div>
          
          <div className="features-grid">
            <div className="feature-card reveal reveal-up delay-100">
              <div className="feature-icon">
                <i className="fa-solid fa-pen-ruler" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Immersive Concepts</h3>
              <p className="feature-description">
                3D event designs, space layout planning, stage visualization, and branding layouts matched to your brand identity.
              </p>
            </div>

            <div className="feature-card reveal reveal-up delay-200">
              <div className="feature-icon">
                <i className="fa-solid fa-bolt" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Turnkey Production</h3>
              <p className="feature-description">
                In-house printing, wooden carpentry, structural fabrication, AV setups, and stage rigging all managed in-house.
              </p>
            </div>

            <div className="feature-card reveal reveal-up delay-300">
              <div className="feature-icon">
                <i className="fa-solid fa-swatchbook" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Experience First</h3>
              <p className="feature-description">
                Designed to optimize guest flow, provide interactive touchpoints, and create photo-worthy moments.
              </p>
            </div>

            <div className="feature-card reveal reveal-up delay-400">
              <div className="feature-icon">
                <i className="fa-solid fa-globe" aria-hidden="true"></i>
              </div>
              <h3 className="feature-title">Global Reach</h3>
              <p className="feature-description">
                Offices and partner setups across Mumbai, Delhi-NCR, Bangalore, Dubai/Abu Dhabi, and major European event hubs.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Stall Typologies Section (Tabs Layout) */}
        <section id="typologies" className="stall-typologies">
          <div className="typologies-container">
            <div className="typologies-header reveal reveal-up">
              <h2 className="typologies-title">Event Design Typologies</h2>
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
              <h2 className="industry-title">Experiential Event Environments</h2>
            </div>

            <div className="industry-grid">
              <div className="industry-card reveal reveal-up delay-100">
                <h3 className="industry-card-title">Corporate Conferences</h3>
                <p className="industry-card-description">
                  Professional stages, podiums, registration zones, digital LED screens, and VIP networking lounges.
                </p>
              </div>

              <div className="industry-card reveal reveal-up delay-200">
                <h3 className="industry-card-title">Experiential Pop-ups</h3>
                <p className="industry-card-description">
                  Immersive mall setups, high-footfall activations, interactive display booths, and photogenic backdrops.
                </p>
              </div>

              <div className="industry-card reveal reveal-up delay-300">
                <h3 className="industry-card-title">Product Launches &amp; Media Events</h3>
                <p className="industry-card-description">
                  High-lux reveals, VIP seating layouts, custom lighting systems, media walls, and press registration zones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Design Process */}
        <section className="design-process">
          <div className="process-container">
            <div className="process-header reveal reveal-up">
              <h2 className="process-title">Event Production Process</h2>
            </div>

            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3 className="step-title">Discovery</h3>
                <p className="step-description">Briefing on event type, venue, attendee counts, and brand objectives.</p>
              </div>

              <div className="process-step">
                <div className="step-number">2</div>
                <h3 className="step-title">3D Concept</h3>
                <p className="step-description">Creating 3D renders of the stage, registration zone, and floorplan layout.</p>
              </div>

              <div className="process-step">
                <div className="step-number">3</div>
                <h3 className="step-title">Detailing</h3>
                <p className="step-description">Selecting materials, structural engineering checks, and print graphic layouts.</p>
              </div>

              <div className="process-step">
                <div className="step-number">4</div>
                <h3 className="step-title">Production</h3>
                <p className="step-description">Woodwork framing, paint finishing, and high-res fabric graphics printing.</p>
              </div>

              <div className="process-step">
                <div className="step-number">5</div>
                <h3 className="step-title">Onsite Setup</h3>
                <p className="step-description">Stage rigging, AV checks, structural build, and handover with full trial run.</p>
              </div>

              <div className="process-step">
                <div className="step-number">6</div>
                <h3 className="step-title">Post-Event</h3>
                <p className="step-description">Careful dismantling, asset storage, and client review for future setups.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Simple Stall Design */}
        <section className="simple-design">
          <div className="simple-container reveal reveal-up">
            <h2 className="simple-title">Bespoke Event Fabrications — <span className="simple-title-accent">Without Looking Cluttered</span></h2>
            <p className="simple-subtitle">
              Sleek stages, striking focal points: Clean lines, premium materials, and perfect lighting integrations.
            </p>
            <div className="simple-features">
              <div className="simple-feature reveal reveal-up delay-100">
                <h3 className="simple-feature-title">Clean Stage Layouts</h3>
                <p className="simple-feature-description">
                  Seamless Tension Fabric backdrops, concealed wiring, and integrated LED displays.
                </p>
              </div>
              <div className="simple-feature reveal reveal-up delay-200">
                <h3 className="simple-feature-title">Modular Archways</h3>
                <p className="simple-feature-description">
                  Fast setup entrance structures and signage towers for clean attendee direction.
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
                <h3 className="quality-item-title">Premium Stages</h3>
                <p className="quality-item-description">
                  Double-layered wooden stage bases, seamless carpets, and heavy-duty stage backdrops.
                </p>
              </div>

              <div className="quality-item reveal reveal-up delay-200">
                <h3 className="quality-item-title">AV &amp; LED Integration</h3>
                <p className="quality-item-description">
                  High-definition LED screens, directional audio systems, and color-balanced lighting.
                </p>
              </div>

              <div className="quality-item reveal reveal-up delay-300">
                <h3 className="quality-item-title">Sustainable Builds</h3>
                <p className="quality-item-description">
                  Reusable modular framework, water-based paints, and recyclable fabric prints.
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

export default EventDesign;
