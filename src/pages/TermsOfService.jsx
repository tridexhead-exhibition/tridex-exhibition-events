import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FloatingContact from '../components/FloatingContact/FloatingContact';
import './LegalPages.css';

function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        {/* Header */}
        <header className="legal-header">
          <div className="legal-header-inner">
            <span className="legal-category">Agreement &amp; Terms</span>
            <h1 className="legal-title">Terms of Service</h1>
            <p className="legal-meta">Last Updated: July 2026</p>
          </div>
        </header>

        {/* Content Body */}
        <div className="legal-body-container">
          <div className="legal-card">
            <p className="legal-intro">
              Welcome to Tridex Exhibitions &amp; Events. By accessing our website, requesting 3D exhibition 
              stall designs, or contracting us for turnkey booth fabrication and setup services, you agree to 
              comply with and be bound by the following Terms of Service. Please read these terms carefully.
            </p>

            {/* Section 1 */}
            <section className="legal-section">
              <h2 className="legal-section-title">1. Services Offered</h2>
              <p className="legal-text">
                Tridex provides professional services in 3D exhibition stall design, layout consultation, 
                booth fabrication, printing, electrical fixtures setup, and complete turnkey on-site assembly 
                and dismantling for commercial trade shows, summits, and events.
              </p>
            </section>

            {/* Section 2 */}
            <section className="legal-section">
              <h2 className="legal-section-title">2. Proposals, Quotations &amp; Adjustments</h2>
              <p className="legal-text">
                All design proposals, 3D renderings, and cost estimations provided by Tridex are project-specific. 
                Any modification to structural requirements, size changes, material upgrades, or additional printing 
                requested after the final design freeze will be subject to revised pricing.
              </p>
            </section>

            {/* Section 3 */}
            <section className="legal-section">
              <h2 className="legal-section-title">3. Intellectual Property</h2>
              <p className="legal-text">
                All 3D stand design concepts, layouts, graphics, elevations, and structural schematics generated 
                by our design team remain the intellectual property of Tridex Exhibitions &amp; Events. 
                Unless explicitly agreed upon in writing or upon full receipt of final project payments, 
                the design concepts may not be shared with, copied, or fabricated by third-party contractors.
              </p>
            </section>

            {/* Section 4 */}
            <section className="legal-section">
              <h2 className="legal-section-title">4. Client Obligations</h2>
              <p className="legal-text">
                To ensure a successful and timely exhibition booth setup, the client is responsible for:
              </p>
              <ul className="legal-list">
                <li>Providing accurate stall dimensions, layout details, and open-front specifications.</li>
                <li>Supplying vector-based logo files and high-resolution print graphics on time.</li>
                <li>Obtaining required approvals or passes from the event organizers or venue authority.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="legal-section">
              <h2 className="legal-section-title">5. Cancellation &amp; Refitting</h2>
              <p className="legal-text">
                Due to the customized nature of exhibition stall fabrication (including pre-cutting timber, 
                printing customized vinyl, and staging modular panels), cancellations requested after material procurement 
                and fabrication have commenced will incur cancellation charges as outlined in the project contract.
              </p>
            </section>

            {/* Section 6 */}
            <section className="legal-section">
              <h2 className="legal-section-title">6. Limitation of Liability</h2>
              <p className="legal-text">
                Tridex will make all reasonable efforts to ensure timely delivery and high-quality fabrication of 
                exhibition stands. However, we shall not be held liable for delays or issues caused by force majeure 
                events, venue power failures, organizer regulation changes, or late material access granted by the venue.
              </p>
            </section>

            {/* Section 7 */}
            <section className="legal-section">
              <h2 className="legal-section-title">7. Contact Information</h2>
              <p className="legal-text">
                If you have any questions regarding these Terms of Service, please contact our legal counsel:
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

export default TermsOfService;
