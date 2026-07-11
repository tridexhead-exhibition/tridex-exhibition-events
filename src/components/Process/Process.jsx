import './Process.css';

const PROCESS_STEPS = [
  {
    icon: 'fa-solid fa-magnifying-glass-chart',
    title: 'Requirement Analysis',
    desc: 'We begin by understanding your brand goals, floor space, and specific show requirements.'
  },
  {
    icon: 'fa-solid fa-cube',
    title: '3D Conceptual Design',
    desc: 'Our exhibition stall design company creates a detailed 3D visualization of your stall for your review.'
  },
  {
    icon: 'fa-solid fa-drafting-compass',
    title: 'Technical Planning',
    desc: 'We finalize structural drawings, material specifications, and graphic layouts for the fabrication team.'
  },
  {
    icon: 'fa-solid fa-screwdriver-wrench',
    title: 'In-House Fabrication',
    desc: 'Your stall is built in our factory by our expert exhibition stall fabricators to ensure every component fits perfectly.'
  },
  {
    icon: 'fa-solid fa-truck-fast',
    title: 'On-Site Support',
    desc: 'Our supervisor manages the complete setup at the venue, ensuring everything is ready on time.'
  },
  {
    icon: 'fa-solid fa-flag-checkered',
    title: 'Turnkey Solution',
    desc: 'From the final coat of paint to graphic placement, we ensure your booth is 100% show-ready, allowing you to focus on your visitors.'
  }
];

function Process() {
  return (
    <section className="process-section" aria-label="Our Process">
      <div className="container">
        {/* Section Header */}
        <div className="process-header reveal reveal-up">
          <h2 className="process-header-title">
            How We <span className="process-header-accent">Work</span>
          </h2>
          <p className="process-header-desc">
            A streamlined 6-step process that takes your exhibition booth from idea to reality.
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="process-grid">
          {PROCESS_STEPS.map((step, idx) => (
            <div className={`process-card reveal reveal-up delay-${(idx + 1) * 100}`} key={idx}>
              <div className="process-card__icon-wrapper">
                <i className={step.icon} aria-hidden="true"></i>
              </div>
              <h3 className="process-card__title">{step.title}</h3>
              <p className="process-card__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
