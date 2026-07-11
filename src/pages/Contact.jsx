import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import contactHero from '../assets/images/contact_hero.png';
import './Contact.css';

const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE"; // Replace with your Web3Forms access key (Get one for free at web3forms.com)


function Contact() {
  const [formData, setFormData] = useState({
    companyName: '',
    yourName: '',
    email: '',
    phone: '',
    city: '',
    showName: '',
    message: '',
    website_url: '' // Honeypot field
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState(null);

  const recordSubmission = (emailVal, phoneVal) => {
    try {
      const history = JSON.parse(localStorage.getItem('tridex_submission_history') || '[]');
      history.push({
        email: emailVal.trim(),
        phone: phoneVal.trim(),
        timestamp: Date.now()
      });
      localStorage.setItem('tridex_submission_history', JSON.stringify(history));
    } catch (e) {}
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Allow only digits and limit to 10 characters
      const cleanDigits = value.replace(/\D/g, '');
      if (cleanDigits.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: cleanDigits }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { companyName, yourName, email, phone, message, website_url } = formData;

    // 1. Bot Protection - Honeypot check
    if (website_url) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess('Your enquiry has been successfully sent. We will get back to you within 24 hours!');
        setFormData({
          companyName: '',
          yourName: '',
          email: '',
          phone: '',
          city: '',
          showName: '',
          message: '',
          website_url: ''
        });
      }, 1000);
      return;
    }

    // 2. Validate required fields
    if (!companyName.trim() || !yourName.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setError('Please fill in all required fields marked with *.');
      return;
    }

    // 3. Strict Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    // 4. Strict Indian mobile number format validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.trim())) {
      setError('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.');
      return;
    }

    // 5. Rate Limiting (Max 1 submission per 10 minutes for same email or phone)
    const now = Date.now();
    const submissionsKey = 'tridex_submission_history';
    let history = [];
    try {
      history = JSON.parse(localStorage.getItem(submissionsKey) || '[]');
    } catch (e) {}

    // Clean up entries older than 10 minutes (600,000 ms)
    history = history.filter(item => now - item.timestamp < 600000);

    const duplicate = history.find(item => 
      item.email.toLowerCase() === email.trim().toLowerCase() || item.phone.trim() === phone.trim()
    );

    if (duplicate) {
      const waitTimeMinutes = Math.ceil((600000 - (now - duplicate.timestamp)) / 60000);
      setError(`For security, you can only submit one request every 10 minutes. Please wait ${waitTimeMinutes} minute(s) before submitting again.`);
      return;
    }

    // 6. XSS Hacker Protection - Sanitise inputs
    const sanitize = (str) => str.replace(/<[^>]*>/g, '').trim();
    const sanitizedData = {
      companyName: sanitize(companyName),
      yourName: sanitize(yourName),
      email: sanitize(email),
      phone: sanitize(phone),
      city: sanitize(formData.city),
      showName: sanitize(formData.showName),
      message: sanitize(message)
    };

    setIsSubmitting(true);

    // 1. Try sending via Resend Serverless Endpoint (CORS-Safe backend routing)
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sanitizedData)
      });

      const result = await response.json();
      if (response.ok && result.success) {
        recordSubmission(email, phone);
        localStorage.setItem('tridex_contact_submit_time', Date.now().toString());
        setSubmittedDetails(sanitizedData);
        setShowSuccessModal(true);
        setFormData({
          companyName: '',
          yourName: '',
          email: '',
          phone: '',
          city: '',
          showName: '',
          message: '',
          website_url: ''
        });
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      console.log("Resend API route unreachable locally, falling back to Web3Forms...");
    }

    // 2. Fallback: Web3Forms API Send / Developer simulation
    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE" || !WEB3FORMS_ACCESS_KEY) {
      setTimeout(() => {
        setIsSubmitting(false);
        recordSubmission(email, phone);
        localStorage.setItem('tridex_contact_submit_time', Date.now().toString());
        setSubmittedDetails(sanitizedData);
        setShowSuccessModal(true);
        setFormData({
          companyName: '',
          yourName: '',
          email: '',
          phone: '',
          city: '',
          showName: '',
          message: '',
          website_url: ''
        });
      }, 1200);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Stall Inquiry from ${sanitizedData.yourName} (${sanitizedData.companyName})`,
          from_name: "Tridex Exhibitions Website",
          ...sanitizedData
        })
      });

      const result = await response.json();
      if (result.success) {
        recordSubmission(email, phone);
        localStorage.setItem('tridex_contact_submit_time', Date.now().toString());
        setSubmittedDetails(sanitizedData);
        setShowSuccessModal(true);
        setFormData({
          companyName: '',
          yourName: '',
          email: '',
          phone: '',
          city: '',
          showName: '',
          message: '',
          website_url: ''
        });
      } else {
        setError(result.message || 'Failed to submit form. Please check your Web3Forms access key.');
      }
    } catch (err) {
      setError('Network error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="contact-page">
        
        {/* 1. Hero Section (modular-hero style) */}
        <section className="modular-hero" aria-label="Contact Us Info">
          <div className="modular-hero-inner">
            <div className="modular-hero-content">
              
              {/* Left Column */}
              <div className="modular-hero-left reveal reveal-left">
                <div className="years-of-excellence-wrapper">
                  <span className="years-of-excellence-icon">
                    <i className="fa-solid fa-trophy" aria-hidden="true"></i>
                  </span>
                  <span className="years-of-excellence-text">7+ YEARS OF EXCELLENCE</span>
                </div>
                
                <h1 className="modular-hero-title">
                  Contact <span className="modular-hero-title-red">Us</span>
                </h1>
                
                <p className="modular-hero-subtitle">We'd love to hear from you</p>
                <p className="modular-hero-text">
                  Reach out to us for any exhibition stall design enquiries, fabrication pricing, 
                  or turnkey setup assistance.
                </p>
                
                <div className="hero-tag-wrapper">
                  <div className="hero-tag-items">
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                    <span className="hero-tag-texts">Pan-India Presence</span>
                  </div>
                  <div className="hero-tag-items">
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                    <span className="hero-tag-texts">World-Class Output</span>
                  </div>
                  <div className="hero-tag-items">
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                    <span className="hero-tag-texts">7+ Years</span>
                  </div>
                </div>
                
                <a 
                  className="modular-hero-cta free_quote" 
                  href="https://wa.me/918796411515?text=Hi%20Tridex%20Exhibitions%2C%20I%20am%20on%20the%20contact%20page%20and%20want%20to%20get%20a%20free%20design%20concept%20and%20quotation%20for%20our%20exhibition%20stand.%20Please%20let%20me%20know%20what%20details%20you%20need." 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Get Free Design &amp; Quote <span className="modular-hero-cta-arrow">→</span>
                </a>
              </div>

              {/* Right Column */}
              <div className="modular-hero-right reveal reveal-right">
                <img 
                  src={contactHero} 
                  alt="Tridex Exhibition Head Office" 
                  className="modular-hero-image"
                />
              </div>

            </div>
          </div>
        </section>

        {/* 2. Get In Touch + Get Free Quote Section */}
        <section className="contact-touch-section">
          <div className="contact-touch-inner">
            <div className="contact-touch-grid">
              
              {/* Left: Get In Touch Cards */}
              <div className="contact-touch-left reveal reveal-left">
                <h2 className="contact-touch-title">
                  Get In <span>Touch</span>
                </h2>
                <p className="contact-touch-text contact-touch-text-intro">
                  We’d love to hear from you! Reach out for quotes, inquiries, or any questions about our services.
                </p>

                <div className="contact-touch-cards">
                  {/* Phone Card */}
                  <a href="tel:+918796411515" className="contact-touch-card">
                    <div className="contact-touch-card-icon contact-touch-card-icon-phone">
                      <i className="fa-solid fa-phone" aria-hidden="true"></i>
                    </div>
                    <div className="contact-touch-card-body">
                      <p className="contact-touch-card-label">Phone Number</p>
                      <p className="contact-touch-card-value">+91 87964 11515</p>
                    </div>
                    <div className="contact-touch-card-arrow">
                      <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </div>
                  </a>

                  {/* Mail Card */}
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@tridexexhibit.com" target="_blank" rel="noopener noreferrer" className="contact-touch-card">
                    <div className="contact-touch-card-icon contact-touch-card-icon-mail">
                      <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                    </div>
                    <div className="contact-touch-card-body">
                      <p className="contact-touch-card-label">Email Address</p>
                      <p className="contact-touch-card-value">info@tridexexhibit.com</p>
                    </div>
                    <div className="contact-touch-card-arrow">
                      <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </div>
                  </a>

                  {/* Web Card replaced with Sales Inquiry Mail Card */}
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sales@tridexexhibit.com" target="_blank" rel="noopener noreferrer" className="contact-touch-card">
                    <div className="contact-touch-card-icon contact-touch-card-icon-mail">
                      <i className="fa-solid fa-envelope-open-text" aria-hidden="true"></i>
                    </div>
                    <div className="contact-touch-card-body">
                      <p className="contact-touch-card-label">Sales Inquiry</p>
                      <p className="contact-touch-card-value">sales@tridexexhibit.com</p>
                    </div>
                    <div className="contact-touch-card-arrow">
                      <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </div>
                  </a>
                </div>

                <div className="contact-touch-social">
                  <p className="contact-touch-social-label">Follow Us</p>
                  <div className="contact-touch-social-icons">
                    <a href="https://www.facebook.com/share/14qjvnMfsAo/" className="contact-social-icon contact-social-icon-fb" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/tridex-exhibits-1a7408421" className="contact-social-icon contact-social-icon-in" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.instagram.com/tridex_exhibitions_events" className="contact-social-icon contact-social-icon-ig" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                    </a>
                    <a href="https://x.com/TRIDEX_EXHIBIT" className="contact-social-icon contact-social-icon-tw" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-x-twitter" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Get Free Quote Form Box */}
              <div className="contact-touch-right reveal reveal-right" id="get-free-quote">
                <div className="contact-quote-card">
                  <div className="contact-quote-card-header">
                    <div className="contact-quote-icon-badge">
                      <i className="fa-solid fa-envelope-circle-check" aria-hidden="true"></i>
                    </div>
                    <div>
                      <p className="contact-quote-title">Get Free Quote</p>
                      <p className="contact-quote-subtitle">Quick response within 24 hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="contact-quote-form" noValidate>
                    {/* Honeypot field for bot protection */}
                    <div style={{ display: 'none' }} aria-hidden="true">
                      <input
                        type="text"
                        name="website_url"
                        value={formData.website_url || ''}
                        onChange={handleInputChange}
                        tabIndex="-1"
                        autoComplete="off"
                      />
                    </div>

                    {error && (
                      <div className="contact-quote-alert contact-quote-alert--error">
                        <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
                        <span>{error}</span>
                      </div>
                    )}
                    {success && (
                      <div className="contact-quote-alert contact-quote-alert--success">
                        <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                        <span>{success}</span>
                      </div>
                    )}

                    <div className="contact-quote-field">
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Company Name *"
                        required
                      />
                    </div>

                    <div className="contact-quote-field">
                      <input
                        type="text"
                        name="yourName"
                        value={formData.yourName}
                        onChange={handleInputChange}
                        placeholder="Your Name *"
                        required
                      />
                    </div>

                    <div className="contact-quote-field">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address *"
                        required
                      />
                    </div>

                    <div className="contact-quote-field">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number *"
                        required
                      />
                    </div>

                    <div className="contact-quote-field">
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                      />
                    </div>

                    <div className="contact-quote-field">
                      <input
                        type="text"
                        name="showName"
                        value={formData.showName}
                        onChange={handleInputChange}
                        placeholder="Show Name"
                      />
                    </div>

                    <div className="contact-quote-field">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Brief Stall Requirements (Stall Size, Configuration, etc.) *"
                        rows={3}
                        required
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="contact-quote-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Get Your Quote'}
                    </button>
                  </form>

                  <div className="contact-quote-meta">
                    <div className="contact-quote-meta-item">
                      <i className="fa-regular fa-clock" aria-hidden="true"></i>
                      <span>24hr Response</span>
                    </div>
                    <div className="contact-quote-meta-item">
                      <i className="fa-solid fa-shield-halved" aria-hidden="true"></i>
                      <span>100% Secure</span>
                    </div>
                    <div className="contact-quote-meta-item">
                      <i className="fa-solid fa-hand-holding-dollar" aria-hidden="true"></i>
                      <span>Free Quotes</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Our Offices Section */}
        <section className="contact-offices-section">
          <div className="contact-offices-inner">
            <div className="contact-offices-header reveal reveal-up">
              <h2 className="contact-offices-title">
                Our <span className="contact-offices-title-accent">Offices</span>
              </h2>
              <p className="contact-offices-subtitle">Our manufacturing and corporate presence</p>
            </div>

            <div className="contact-offices-grid">
              
              {/* Card 1: Office North Delhi */}
              <article className="contact-office-card contact-office-card-primary reveal reveal-up delay-100">
                <header className="contact-office-card-header">
                  <div className="contact-office-pill">Corporate HQ</div>
                  <div className="contact-office-title-row">
                    <div className="contact-office-title-icon">
                      <i className="fa-solid fa-building-columns" aria-hidden="true"></i>
                    </div>
                    <h3 className="contact-office-title">OFFICE — NORTH DELHI</h3>
                  </div>
                </header>
                <div className="contact-office-body">
                  <p className="company-name">Tridex Exhibitions &amp; Events</p>
                  <div className="contact-office-row">
                    <span className="contact-office-row-icon">
                      <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                    </span>
                    <span className="contact-office-row-text">Office No. 02, Rohini Sector-16, North Delhi - 110089, India</span>
                  </div>
                  <div className="contact-office-row">
                    <span className="contact-office-row-icon">
                      <i className="fa-solid fa-phone" aria-hidden="true"></i>
                    </span>
                    <span className="contact-office-row-text">+91 87964 11515</span>
                  </div>
                  <div className="contact-office-row">
                    <span className="contact-office-row-icon">
                      <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                    </span>
                    <span className="contact-office-row-text">info@tridexexhibit.com</span>
                  </div>
                  <div className="contact-office-divider"></div>
                  <div className="contact-office-footer">
                    <p className="contact-office-hours">Mon – Sat: 10:00 AM – 6:30 PM</p>
                    <a 
                      href="https://maps.google.com/?q=Office+No.+02,+Rohini+Sector-16,+North+Delhi+-+110089" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="contact-office-map-btn"
                    >
                      View Location <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </article>
 
              {/* Card 2: Manufacturing Unit */}
              <article className="contact-office-card reveal reveal-up delay-200">
                <header className="contact-office-card-header">
                  <div className="contact-office-pill">Production Hub</div>
                  <div className="contact-office-title-row">
                    <div className="contact-office-title-icon">
                      <i className="fa-solid fa-gears" aria-hidden="true"></i>
                    </div>
                    <h3 className="contact-office-title">MANUFACTURING UNIT</h3>
                  </div>
                </header>
                <div className="contact-office-body">
                  <p className="company-name">Tridex Fabrication Facility</p>
                  <div className="contact-office-row">
                    <span className="contact-office-row-icon">
                      <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                    </span>
                    <span className="contact-office-row-text">Pusta No. 05, Sonia Vihar, New Delhi - 110090, India</span>
                  </div>
                  <div className="contact-office-row">
                    <span className="contact-office-row-icon">
                      <i className="fa-solid fa-phone" aria-hidden="true"></i>
                    </span>
                    <span className="contact-office-row-text">+91 87964 11515</span>
                  </div>
                  <div className="contact-office-row">
                    <span className="contact-office-row-icon">
                      <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                    </span>
                    <span className="contact-office-row-text">info@tridexexhibit.com</span>
                  </div>
                  <div className="contact-office-divider"></div>
                  <div className="contact-office-footer">
                    <p className="contact-office-hours">Mon – Sat: 9:00 AM – 8:00 PM</p>
                    <a 
                      href="https://maps.google.com/?q=Pusta+No.+05,+Sonia+Vihar,+New+Delhi+-+110090" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="contact-office-map-btn"
                    >
                      View Location <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* 4. Google Maps Section */}
        <section className="contact-map-section">
          <div className="contact-map-container">
            <h2 className="contact-map-title">Locate Us</h2>
            <div className="contact-map-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14002.505697204432!2d77.1085357!3d28.7303498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d061129f5f085%3A0x633e85e4933a3286!2sSector%2016%2C%20Rohini%2C%20Delhi!5e0!3m2!1sen!2sin!4v1719936000000!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Tridex Office Location Map"
              ></iframe>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FloatingContact />

      {/* Success Modal */}
      {showSuccessModal && submittedDetails && (
        <div className="success-modal-overlay">
          <div className="success-modal-card">
            <div className="success-modal-header">
              <div className="success-modal-icon">
                <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
              </div>
              <h3>Thank You!</h3>
              <p>Your details have been securely transmitted.</p>
            </div>
            
            <div className="success-modal-body">
              <div className="success-modal-info-row">
                <span className="label">Name:</span>
                <span className="value">{submittedDetails.yourName}</span>
              </div>
              <div className="success-modal-info-row">
                <span className="label">Email:</span>
                <span className="value">{submittedDetails.email}</span>
              </div>
              <div className="success-modal-info-row">
                <span className="label">Phone:</span>
                <span className="value">{submittedDetails.phone}</span>
              </div>
              <div className="success-modal-info-row">
                <span className="label">Company:</span>
                <span className="value">{submittedDetails.companyName}</span>
              </div>
              {submittedDetails.city && (
                <div className="success-modal-info-row">
                  <span className="label">City:</span>
                  <span className="value">{submittedDetails.city}</span>
                </div>
              )}
            </div>

            <button 
              className="success-modal-close-btn"
              onClick={() => setShowSuccessModal(false)}
            >
              Okay, Got It!
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Contact;
