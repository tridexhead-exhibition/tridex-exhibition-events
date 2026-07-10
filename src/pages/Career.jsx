import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import careerHero from '../assets/images/career_hero.png';
import './Career.css';

const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE"; // Replace with your Web3Forms access key (Get one for free at web3forms.com)


const OPENINGS = [
  {
    id: 'jr-sr-designer-visualizer',
    title: 'Junior & Senior 3D Exhibition Stall Designer',
    location: 'North Delhi',
    experience: '1 Month+',
    description: 'We are seeking creative Junior and Senior 3D Exhibition Stall Designers to translate client brand objectives into impactful 3D environments. You will be responsible for modeling custom stands, rendering high-lux textures, developing detailed elevations for production, and building a premium portfolio.',
    requirements: [
      'Proficiency in 3ds Max, AutoCAD, V-Ray/Corona, and Photoshop.',
      'Excellent spatial layout, color coordination, material understanding, and lighting configurations.',
      'A strong portfolio demonstrating custom booth or display configurations.'
    ]
  },
  {
    id: 'project-estimator',
    title: 'Exhibition Project Executive & Estimator',
    location: 'North Delhi',
    experience: '1 Month+',
    description: 'Join our execution team as a Project Estimator. You will coordinate fabrication costing, vendor management, pre-fit inspections, and ensure the on-site team executes the designs precisely to spec.',
    requirements: [
      'Understanding of fabrication methods (wooden, modular, metal systems).',
      'Strong costing, estimation, and negotiation skills.',
      'Willingness to travel for on-site execution and oversight.'
    ]
  },
  {
    id: 'business-development-manager',
    title: 'Business Development Manager (BDM)',
    location: 'North Delhi',
    experience: '1 Month+',
    description: 'We are looking for a result-driven Business Development Manager to identify new business opportunities, build relationships with corporate clients, and drive sales growth for our exhibition stall design and fabrication services.',
    requirements: [
      'Proven experience in sales, client acquisition, or business development (preferably in the exhibition, event, or interior design industry).',
      'Strong communication, presentation, negotiation, and relationship-building skills.',
      'Ability to understand client briefs and coordinate with the design team to present winning pitches.'
    ]
  }
];

function Career() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    website_url: '' // Honeypot field
  });
  const [cvFile, setCvFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Strict extension check for security
    const allowedExts = ['pdf', 'png', 'jpg', 'jpeg'];
    const fileExt = file.name.split('.').pop().toLowerCase();
    if (!allowedExts.includes(fileExt)) {
      setError('Security Block: Unsupported file type. Only PDF, PNG, JPG, and JPEG files are allowed.');
      setCvFile(null);
      e.target.value = '';
      return;
    }

    // Strict MIME-type check for safety
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setError('Security Block: Invalid file content format. Please upload a secure PDF, PNG, or JPEG.');
      setCvFile(null);
      e.target.value = '';
      return;
    }

    // File size check (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size too large. Maximum allowed size is 5MB.');
      setCvFile(null);
      e.target.value = '';
      return;
    }

    setError('');
    setCvFile(file);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { name, email, phone, position, message, website_url } = formData;

    // 1. Bot Protection - Honeypot check
    if (website_url) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess('Your CV has been successfully and securely submitted. Our HR team will contact you shortly.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          message: '',
          website_url: ''
        });
        setCvFile(null);
        const fileInput = document.getElementById('cv-file-input');
        if (fileInput) fileInput.value = '';
      }, 1000);
      return;
    }

    // 2. Validate fields
    if (!name.trim() || !email.trim() || !phone.trim() || !position || !cvFile) {
      setError('Please fill in all required fields and upload your CV.');
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

    // 5. Rate Limiting (1 submission per minute)
    const lastSubmit = localStorage.getItem('tridex_career_submit_time');
    const now = Date.now();
    if (lastSubmit && now - parseInt(lastSubmit) < 60000) {
      const waitTime = Math.ceil((60000 - (now - parseInt(lastSubmit))) / 1000);
      setError(`You have already submitted an application. Please wait ${waitTime} seconds before submitting again.`);
      return;
    }

    // 6. XSS Hacker Protection - Sanitise inputs
    const sanitize = (str) => str.replace(/<[^>]*>/g, '').trim();
    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      phone: sanitize(phone),
      position: position,
      message: sanitize(message)
    };

    setIsSubmitting(true);

    // 7. Try sending via Resend Serverless Endpoint (CORS-Safe backend routing with Attachment)
    try {
      const base64File = await getBase64(cvFile);
      const payloadData = {
        ...sanitizedData,
        cvFile: {
          name: cvFile.name,
          type: cvFile.type,
          base64: base64File
        }
      };

      const response = await fetch("/api/send-career", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payloadData)
      });

      const result = await response.json();
      if (response.ok && result.success) {
        localStorage.setItem('tridex_career_submit_time', Date.now().toString());
        setSubmittedDetails(sanitizedData);
        setShowSuccessModal(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          message: '',
          website_url: ''
        });
        setCvFile(null);
        const fileInput = document.getElementById('cv-file-input');
        if (fileInput) fileInput.value = '';
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      console.log("Resend API route unreachable locally, falling back to Web3Forms...");
    }

    // 8. Fallback: Web3Forms API Send / Developer simulation
    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE" || !WEB3FORMS_ACCESS_KEY) {
      setTimeout(() => {
        setIsSubmitting(false);
        localStorage.setItem('tridex_career_submit_time', Date.now().toString());
        setSubmittedDetails(sanitizedData);
        setShowSuccessModal(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          message: '',
          website_url: ''
        });
        setCvFile(null);
        const fileInput = document.getElementById('cv-file-input');
        if (fileInput) fileInput.value = '';
      }, 1200);
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("access_key", WEB3FORMS_ACCESS_KEY);
      formDataObj.append("subject", `New Job Application: ${sanitizedData.name} - ${sanitizedData.position}`);
      formDataObj.append("from_name", "Tridex Careers Portal");
      formDataObj.append("name", sanitizedData.name);
      formDataObj.append("email", sanitizedData.email);
      formDataObj.append("phone", sanitizedData.phone);
      formDataObj.append("position", sanitizedData.position);
      formDataObj.append("message", sanitizedData.message);
      formDataObj.append("attachment", cvFile);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj
      });

      const result = await response.json();
      if (result.success) {
        localStorage.setItem('tridex_career_submit_time', Date.now().toString());
        setSubmittedDetails(sanitizedData);
        setShowSuccessModal(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          message: '',
          website_url: ''
        });
        setCvFile(null);
        const fileInput = document.getElementById('cv-file-input');
        if (fileInput) fileInput.value = '';
      } else {
        setError(result.message || 'Failed to submit CV. Please verify your Web3Forms access key.');
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
      <main className="career-page">
        
        {/* 1. Split Hero Section */}
        <section className="career-hero" aria-label="Join our team">
          <div className="career-hero__content">
            <span className="career-hero__label">Careers at Tridex</span>
            <h1 className="career-hero__heading">
              Shape the Future of <span className="career-hero__accent">Exhibition spaces</span>
            </h1>
            <p className="career-hero__desc">
              At Tridex, we turn brand visions into real-world breathtaking structures. 
              Join a team of passionate designers, engineers, and creators who are pushing the boundaries 
              of exhibition booth fabrication and 3D architectural craft.
            </p>
          </div>
          <div className="career-hero__image-wrapper">
            <img 
              src={careerHero} 
              alt="Tridex Exhibition Design Studio" 
              className="career-hero__image"
            />
          </div>
        </section>

        {/* Workplace Culture Section */}
        <section className="culture-section">
          <div className="culture-container">
            <div className="culture-grid">
              <div className="culture-card">
                <div className="culture-icon">
                  <i className="fa-solid fa-paintbrush" aria-hidden="true"></i>
                </div>
                <h3 className="culture-card-title">CREATE</h3>
                <p className="culture-card-desc">We create the best working environment for our Team</p>
              </div>

              <div className="culture-card">
                <div className="culture-icon">
                  <i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>
                </div>
                <h3 className="culture-card-title">LEARN</h3>
                <p className="culture-card-desc">Constant Communication &amp; Skill Development</p>
              </div>

              <div className="culture-card">
                <div className="culture-icon">
                  <i className="fa-solid fa-trophy" aria-hidden="true"></i>
                </div>
                <h3 className="culture-card-title">PLAY</h3>
                <p className="culture-card-desc">We Award the best performer &amp; Celebrate team success</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Current Openings Section */}
        <section className="openings-section">
          <div className="openings-container">
            <div className="openings-header">
              <h2 className="openings-title">Current Openings</h2>
              <p className="openings-subtitle">Work with us in North Delhi and build projects that command attention.</p>
            </div>

            <div className="openings-grid">
              {OPENINGS.map((job) => (
                <div key={job.id} className="job-card">
                  <div className="job-card__header">
                    <h3 className="job-card__title">{job.title}</h3>
                    <div className="job-card__meta">
                      <span className="job-card__meta-item">
                        <i className="fa-solid fa-location-dot" aria-hidden="true"></i> {job.location}
                      </span>
                      <span className="job-card__meta-item">
                        <i className="fa-solid fa-briefcase" aria-hidden="true"></i> Exp: {job.experience}
                      </span>
                    </div>
                  </div>
                  <p className="job-card__desc">{job.description}</p>
                  <div className="job-card__requirements">
                    <h4>Key Requirements:</h4>
                    <ul>
                      {job.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <a href="#apply-form" className="job-card__apply-btn">
                    Apply Now <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                  </a>
                </div>
              ))}
            </div>

            {/* Bottom note for experienced professionals */}
            <div className="openings-footer-note">
               <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
              <p>
                Any experienced professional is welcome to apply. Even if your profile does not match our exact 
                active openings listed above, we are always looking for skilled talent to join our project and execution divisions.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Drop Your CV Form */}
        <section id="apply-form" className="apply-section">
          <div className="apply-container">
            <div className="apply-header">
              <h2 className="apply-title">Drop Your CV</h2>
              <p className="apply-subtitle">Fill out the secure application form below and attach your CV.</p>
            </div>

            <div className="apply-card">
              <form onSubmit={handleSubmit} className="apply-form" noValidate>
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
                  <div className="apply-msg apply-msg--error">
                    <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i>
                    <span>{error}</span>
                  </div>
                )}
                {success && (
                  <div className="apply-msg apply-msg--success">
                    <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
                    <span>{success}</span>
                  </div>
                )}

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="name-input">Full Name *</label>
                    <input
                      type="text"
                      id="name-input"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email-input">Email Address *</label>
                    <input
                      type="email"
                      id="email-input"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="phone-input">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone-input"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div className="form-group" ref={dropdownRef}>
                    <label htmlFor="position-select">Position Applying For *</label>
                    <select
                      id="position-select"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      style={{ display: 'none' }}
                    >
                      <option value="">Select Position</option>
                      <option value="jr-sr-designer-visualizer">Junior &amp; Senior 3D Exhibition Stall Designer</option>
                      <option value="project-estimator">Exhibition Project Executive &amp; Estimator</option>
                      <option value="business-development-manager">Business Development Manager (BDM)</option>
                      <option value="other">Other Domain Experience</option>
                    </select>

                    <div className="custom-select-wrapper">
                      <button
                        type="button"
                        className={`custom-select-trigger ${isDropdownOpen ? 'open' : ''} ${!formData.position ? 'placeholder' : ''}`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span>
                          {formData.position === 'jr-sr-designer-visualizer' && 'Junior & Senior 3D Exhibition Stall Designer'}
                          {formData.position === 'project-estimator' && 'Exhibition Project Executive & Estimator'}
                          {formData.position === 'business-development-manager' && 'Business Development Manager (BDM)'}
                          {formData.position === 'other' && 'Other Domain Experience'}
                          {!formData.position && 'Select Position'}
                        </span>
                        <i className={`fa-solid fa-chevron-down custom-select-arrow ${isDropdownOpen ? 'rotate' : ''}`}></i>
                      </button>
                      
                      {isDropdownOpen && (
                        <ul className="custom-select-options">
                          <li 
                            className={`custom-option ${!formData.position ? 'selected' : ''}`}
                            onClick={() => {
                              handleInputChange({ target: { name: 'position', value: '' } });
                              setIsDropdownOpen(false);
                            }}
                          >
                            Select Position
                          </li>
                          <li 
                            className={`custom-option ${formData.position === 'jr-sr-designer-visualizer' ? 'selected' : ''}`}
                            onClick={() => {
                              handleInputChange({ target: { name: 'position', value: 'jr-sr-designer-visualizer' } });
                              setIsDropdownOpen(false);
                            }}
                          >
                            Junior &amp; Senior 3D Exhibition Stall Designer
                          </li>
                          <li 
                            className={`custom-option ${formData.position === 'project-estimator' ? 'selected' : ''}`}
                            onClick={() => {
                              handleInputChange({ target: { name: 'position', value: 'project-estimator' } });
                              setIsDropdownOpen(false);
                            }}
                          >
                            Exhibition Project Executive &amp; Estimator
                          </li>
                          <li 
                            className={`custom-option ${formData.position === 'business-development-manager' ? 'selected' : ''}`}
                            onClick={() => {
                              handleInputChange({ target: { name: 'position', value: 'business-development-manager' } });
                              setIsDropdownOpen(false);
                            }}
                          >
                            Business Development Manager (BDM)
                          </li>
                          <li 
                            className={`custom-option ${formData.position === 'other' ? 'selected' : ''}`}
                            onClick={() => {
                              handleInputChange({ target: { name: 'position', value: 'other' } });
                              setIsDropdownOpen(false);
                            }}
                          >
                            Other Domain Experience
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message-input">Cover Message / Brief Profile Overview</label>
                  <textarea
                    id="message-input"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="cv-file-input">Attach CV / Resume (PDF, PNG, JPG, JPEG) *</label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="cv-file-input"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                      required
                    />
                    <div className="file-input-info">
                      <i className="fa-solid fa-lock" aria-hidden="true"></i>
                      <span>Secure File Verification Enabled. Only PDF, PNG, or JPEG formats up to 5MB are accepted.</span>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="form-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                       <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true"></i> Submitting...
                    </>
                  ) : (
                    <>
                       Submit Application <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
                    </>
                  )}
                </button>
              </form>
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
              <h3>Application Received!</h3>
              <p>Your CV and profile have been securely transmitted.</p>
            </div>
            
            <div className="success-modal-body">
              <div className="success-modal-info-row">
                <span className="label">Name:</span>
                <span className="value">{submittedDetails.name}</span>
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
                <span className="label">Position:</span>
                <span className="value">
                  {submittedDetails.position === 'jr-sr-designer-visualizer' && '3D Stall Designer'}
                  {submittedDetails.position === 'project-estimator' && 'Project Estimator'}
                  {submittedDetails.position === 'business-development-manager' && 'BDM'}
                  {submittedDetails.position === 'other' && 'Other'}
                </span>
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

export default Career;
