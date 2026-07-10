import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import './LegalPages.css';

function LegalNotice() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        {/* Header */}
        <header className="legal-header">
          <div className="legal-header-inner">
            <span className="legal-category">Legal &amp; Compliance</span>
            <h1 className="legal-title">Privacy Policy</h1>
            <p className="legal-meta">Last Updated: July 2026</p>
          </div>
        </header>

        {/* Content Body */}
        <div className="legal-body-container">
          <div className="legal-card">
            <p className="legal-intro">
              At Tridex Exhibitions &amp; Events, we respect your privacy and are committed to protecting 
              any personal data you share with us. This Privacy Policy explain how we collect, use, disclose, 
              and safeguard your information when you visit our website or inquire about our 3D exhibition 
              stall design and turnkey booth fabrication services.
            </p>

            {/* Section 1 */}
            <section className="legal-section">
              <h2 className="legal-section-title">1. Information We Collect</h2>
              <p className="legal-text">
                We collect personal information that you voluntarily provide to us when expressing an interest in 
                obtaining information about us or our services, submitting a job application, or contacting us. 
                This information includes:
              </p>
              <ul className="legal-list">
                <li><strong>Contact details:</strong> Your name, business email address, phone number, and city.</li>
                <li><strong>Corporate details:</strong> Company name, website URL, and exhibition show details.</li>
                <li><strong>Application details:</strong> Job role preferences, messages, and uploaded resume attachments.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="legal-section">
              <h2 className="legal-section-title">2. How We Use Your Information</h2>
              <p className="legal-text">
                We use the personal information collected via our website for a variety of business purposes, including:
              </p>
              <ul className="legal-list">
                <li>To prepare tailored 3D exhibition stall design concepts and pricing quotations.</li>
                <li>To respond to your inquiries and offer dedicated coordinator support.</li>
                <li>To evaluate job applications and resumes submitted through our Career portal.</li>
                <li>To send project status updates, design approvals, or administrative communications.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="legal-section">
              <h2 className="legal-section-title">3. Sharing &amp; Disclosure of Information</h2>
              <p className="legal-text">
                We only share information with your consent, to comply with laws, to provide you with services, 
                to protect your rights, or to fulfill business obligations. We do not sell, rent, or trade your 
                personal information to third parties for marketing purposes.
              </p>
            </section>

            {/* Section 4 */}
            <section className="legal-section">
              <h2 className="legal-section-title">4. Data Security</h2>
              <p className="legal-text">
                We implement appropriate technical and organizational security measures designed to protect the 
                security of any personal information we process. However, please also remember that we cannot 
                guarantee that the internet itself is 100% secure. Transmission of personal information to and 
                from our website is at your own risk.
              </p>
            </section>

            {/* Section 5 */}
            <section className="legal-section">
              <h2 className="legal-section-title">5. Cookies &amp; Tracking Technologies</h2>
              <p className="legal-text">
                We may use cookies and similar tracking technologies to access or store information. You can set 
                your browser to refuse all or some browser cookies, but this may cause some parts of this website 
                to function incorrectly.
              </p>
            </section>

            {/* Section 6 */}
            <section className="legal-section">
              <h2 className="legal-section-title">6. Contact Us</h2>
              <p className="legal-text">
                If you have any questions or concerns about this policy, or our data handling practices, 
                please feel free to reach out to us at:
              </p>
              <div className="legal-contact-box">
                <p><strong>Tridex Exhibitions &amp; Events</strong></p>
                <p>Office No. 02, Rohini Sector-16, North Delhi - 110089, India</p>
                <p>Email: <strong>info@tridexexhibit.com</strong> / <strong>sales@tridexexhibit.com</strong></p>
                <p>Phone: <strong>+91 87964 11515</strong></p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <FloatingContact />
      <Footer />
    </>
  );
}

export default LegalNotice;
