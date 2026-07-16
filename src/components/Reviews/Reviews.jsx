import './Reviews.css';

const REVIEWS_DATA = [
  {
    name: 'Vikramaditya Sen',
    role: 'Senior Brand Manager',
    company: 'Veloce Motors India',
    event: 'Auto Expo 2025',
    location: 'Greater Noida',
    rating: 5,
    text: 'Tridex delivered an absolute masterpiece for our pavilion at the Auto Expo. The 3D conceptual stand design perfectly captured our brand\'s futuristic electric vehicle theme. Their fabrication was top-notch, and the modular layouts stood out in a crowded hall. A flawless turnkey experience!'
  },
  {
    name: 'Meenakshi Iyer',
    role: 'Director of Marketing',
    company: 'Polypack Industries',
    event: 'PLASTINDIA 2026',
    location: 'New Delhi',
    rating: 4,
    text: 'Working with Tridex for our stall at Plastindia was the best decision we made. The booth design was clean, spacious, and highly professional. Their in-house fabrication team executed the exact design without a single deviation. The on-site support was outstanding!'
  },
  {
    name: 'Rajeev Khandelwal',
    role: 'VP of Corporate Communications',
    company: 'Zenith Power Grid',
    event: 'Elecrama 2025',
    location: 'Greater Noida',
    rating: 5,
    text: 'Our stand at Elecrama attracted huge crowds, thanks to Tridex\'s creative design and immaculate execution. They managed everything from conceptual drawing to finishing, giving us a completely stress-free experience. Truly premium stand builders.'
  },
  {
    name: 'Karthik Gowda',
    role: 'Head of Event Operations',
    company: 'Apex Precision Tools',
    event: 'IMTEX 2026',
    location: 'Bengaluru',
    rating: 4,
    text: 'Tridex has a very professional team of designers and fabricators. They built a heavy-duty machinery display stand for us at IMTEX Bangalore. The structural stability and visual appeal of the stand were exceptional. Highly recommended!'
  },
  {
    name: 'Sanjay Mehta',
    role: 'Principal Architect',
    company: 'Lumina Glass Concepts',
    event: 'ACETECH 2025',
    location: 'Mumbai',
    rating: 3,
    text: 'For our exhibition stand at ACETECH Mumbai, Tridex created an architectural marvel. Their attention to detail in lighting and finish was incredible, showcasing our glass solutions in the best light. Looking forward to our next collaboration!'
  },
  {
    name: 'Pooja Malhotra',
    role: 'Head of Public Relations',
    company: 'TeleConnect Solutions',
    event: 'Convergence India 2026',
    location: 'New Delhi',
    rating: 4,
    text: 'We have worked with several exhibition contractors, but Tridex stands out for their dedication and responsiveness. They delivered our double-decker stall on time at Pragati Maidan. The design was modern and interactive, hitting all our key requirements.'
  }
];

function Reviews() {
  return (
    <section className="reviews-section" aria-label="Client Testimonials">
      <div className="container">
        {/* Section Header */}
        <div className="reviews-header reveal reveal-up">
          <h2 className="reviews-header-title">
            What Our Clients <span className="reviews-header-accent">Say</span>
          </h2>
          <p className="reviews-header-desc">
            Discover the experiences of leading brands that partnered with Tridex at India's largest exhibitions.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {REVIEWS_DATA.map((review, idx) => (
            <div 
              className={`review-card reveal reveal-up delay-${((idx % 3) + 1) * 200}`} 
              key={idx}
            >
              <div className="review-card__meta">
                <span className="review-card__badge">
                  {review.event}
                </span>
                <div className="review-card__stars" aria-label={`Rated ${review.rating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={i < review.rating ? "fa-solid fa-star" : "fa-regular fa-star"} 
                      aria-hidden="true"
                    ></i>
                  ))}
                </div>
              </div>

              <div className="review-card__quote-icon">
                <i className="fa-solid fa-quote-left" aria-hidden="true"></i>
              </div>

              <p className="review-card__text">{review.text}</p>

              <div className="review-card__author">
                <div className="review-card__name">{review.name}</div>
                <div className="review-card__role">
                  {review.role}, <span className="review-card__company">{review.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
