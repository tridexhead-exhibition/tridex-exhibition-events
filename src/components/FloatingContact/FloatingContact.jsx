import { useState, useEffect, useRef } from 'react';
import './FloatingContact.css';

const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE"; // Replace with your Web3Forms access key (Get one for free at web3forms.com)

function FloatingContact() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
    website_url: '' // Honeypot field
  });
  const [error, setError] = useState('');
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

  const modalRef = useRef(null);

  // Close schedule call modal on clicking outside card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsScheduleOpen(false);
      }
    };
    if (isScheduleOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isScheduleOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
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

    const { name, email, phone, date, timeSlot, website_url } = formData;

    // 1. Honeypot check
    if (website_url) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsScheduleOpen(false);
        setFormData({ name: '', email: '', phone: '', date: '', timeSlot: '', website_url: '' });
      }, 1000);
      return;
    }

    // 2. Validation
    if (!name.trim() || !email.trim() || !phone.trim() || !date || !timeSlot) {
      setError('Please fill in all fields.');
      return;
    }

    // 3. Email check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    // 4. Phone check
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.trim())) {
      setError('Please enter a valid 10-digit mobile number.');
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
      setError(`For security, you can only schedule one call every 10 minutes. Please wait ${waitTimeMinutes} minute(s) before submitting again.`);
      return;
    }

    setIsSubmitting(true);
    const sanitizedData = {
      name: name.replace(/<[^>]*>/g, '').trim(),
      email: email.trim(),
      phone: phone.trim(),
      date: date,
      timeSlot: timeSlot
    };

    // 1. Try sending via Resend Serverless Endpoint
    try {
      const response = await fetch("/api/send-schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sanitizedData)
      });

      const result = await response.json();
      if (response.ok && result.success) {
        recordSubmission(email, phone);
        localStorage.setItem('tridex_schedule_submit_time', Date.now().toString());
        setSubmittedDetails(sanitizedData);
        setShowSuccessModal(true);
        setIsScheduleOpen(false);
        setFormData({ name: '', email: '', phone: '', date: '', timeSlot: '', website_url: '' });
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      console.log("Resend API route unreachable, falling back to Web3Forms...");
    }

    // 2. Fallback: Web3Forms / Simulation Mode
    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE" || !WEB3FORMS_ACCESS_KEY) {
      setTimeout(() => {
        setIsSubmitting(false);
        recordSubmission(email, phone);
        localStorage.setItem('tridex_schedule_submit_time', Date.now().toString());
        setSubmittedDetails(sanitizedData);
        setShowSuccessModal(true);
        setIsScheduleOpen(false);
        setFormData({ name: '', email: '', phone: '', date: '', timeSlot: '', website_url: '' });
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
          subject: `New Call Scheduled: ${sanitizedData.name} on ${sanitizedData.date}`,
          from_name: "Tridex Schedule System",
          ...sanitizedData
        })
      });

      const result = await response.json();
      if (result.success) {
        recordSubmission(email, phone);
        localStorage.setItem('tridex_schedule_submit_time', Date.now().toString());
        setSubmittedDetails(sanitizedData);
        setShowSuccessModal(true);
        setIsScheduleOpen(false);
        setFormData({ name: '', email: '', phone: '', date: '', timeSlot: '', website_url: '' });
      } else {
        setError(result.message || 'Failed to submit request.');
      }
    } catch (err) {
      setError('Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="floating-contact" aria-label="Quick contact options">
        {/* Direct Call */}
        <a
          href="tel:+918796411515"
          className="floating-contact__item floating-contact__item--call"
          aria-label="Talk to Expert"
        >
          <span className="floating-contact__text">Talk to Expert</span>
          <span className="floating-contact__icon">
            <i className="fa-solid fa-phone" aria-hidden="true"></i>
          </span>
        </a>

        {/* Schedule a Call */}
        <button
          onClick={() => setIsScheduleOpen(true)}
          className="floating-contact__item floating-contact__item--schedule"
          aria-label="Schedule a Call"
        >
          <span className="floating-contact__text">Schedule a Call</span>
          <span className="floating-contact__icon">
            <i className="fa-regular fa-calendar-check" aria-hidden="true"></i>
          </span>
        </button>

        {/* WhatsApp */}
        <a
          href="https://wa.me/918796411515?text=Hi%20Tridex%20Exhibitions%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20get%20a%20free%203D%20stall%20design%20concept%20and%20fabrication%20quote%20for%20our%20upcoming%20expo.%20Please%20connect%20with%20me%20at%20the%20earliest."
          className="floating-contact__item floating-contact__item--whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <span className="floating-contact__text">WhatsApp</span>
          <span className="floating-contact__icon">
            <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
          </span>
        </a>
      </div>

      {/* Schedule a Call Popup Modal Form */}
      {isScheduleOpen && (
        <div className="schedule-modal-overlay">
          <div className="schedule-modal-card" ref={modalRef}>
            <button 
              className="schedule-modal-close" 
              onClick={() => setIsScheduleOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="schedule-modal-header">
              <div className="schedule-modal-icon-badge">
                <i className="fa-regular fa-calendar-plus"></i>
              </div>
              <h3>Schedule a Call</h3>
              <p>Book a callback from our team at your preferred slot.</p>
            </div>

            <form onSubmit={handleSubmit} className="schedule-modal-form" noValidate>
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
                <div className="schedule-modal-error">
                  <i className="fa-solid fa-circle-exclamation"></i> <span>{error}</span>
                </div>
              )}

              <div className="schedule-modal-field">
                <label htmlFor="schedule-name">Full Name *</label>
                <input
                  type="text"
                  id="schedule-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="schedule-modal-field">
                <label htmlFor="schedule-email">Email Address *</label>
                <input
                  type="email"
                  id="schedule-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="schedule-modal-field">
                <label htmlFor="schedule-phone">Phone Number *</label>
                <input
                  type="tel"
                  id="schedule-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  required
                />
              </div>

              <div className="schedule-modal-field-row">
                <div className="schedule-modal-field">
                  <label htmlFor="schedule-date">Preferred Date *</label>
                  <input
                    type="date"
                    id="schedule-date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="schedule-modal-field">
                  <label htmlFor="schedule-timeslot">Time Slot *</label>
                  <select
                    id="schedule-timeslot"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Time</option>
                    <option value="10:00 AM - 1:00 PM">10:00 AM – 1:00 PM</option>
                    <option value="1:00 PM - 4:00 PM">1:00 PM – 4:00 PM</option>
                    <option value="4:00 PM - 7:00 PM">4:00 PM – 7:00 PM</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="schedule-modal-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Booking Callback...' : 'Confirm Call Slot'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && submittedDetails && (
        <div className="success-modal-overlay">
          <div className="success-modal-card">
            <div className="success-modal-header">
              <div className="success-modal-icon">
                <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
              </div>
              <h3>Call Scheduled!</h3>
              <p>We will call you back on your preferred slot.</p>
            </div>
            
            <div className="success-modal-body">
              <div className="success-modal-info-row">
                <span className="label">Name:</span>
                <span className="value">{submittedDetails.name}</span>
              </div>
              <div className="success-modal-info-row">
                <span className="label">Phone:</span>
                <span className="value">{submittedDetails.phone}</span>
              </div>
              <div className="success-modal-info-row">
                <span className="label">Date:</span>
                <span className="value">{submittedDetails.date}</span>
              </div>
              <div className="success-modal-info-row">
                <span className="label">Time Slot:</span>
                <span className="value">{submittedDetails.timeSlot}</span>
              </div>
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

export default FloatingContact;
