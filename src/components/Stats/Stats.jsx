import { useEffect, useState, useRef } from 'react';
import './Stats.css';

function CountUp({ end, duration = 1500, suffix = '', startTrigger }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;

    let start = 0;
    const endVal = parseInt(end, 10);
    if (isNaN(endVal)) return;

    const increment = endVal / (duration / 16); // ~60fps
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= endVal) {
        setCount(endVal);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, startTrigger]);

  return <span className="stat-card__number">{count}{suffix}</span>;
}

function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Trigger only once
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="stats-section" aria-label="Our Achievements">
      <div className="container">
        <div className="stats-row">
          {/* Stat 1 */}
          <div className="stat-card reveal reveal-up">
            <div className="stat-card__icon-wrapper">
              <i className="fa-solid fa-clipboard-check" aria-hidden="true"></i>
            </div>
            <CountUp end={100} suffix="+" startTrigger={isVisible} />
            <span className="stat-card__label">Projects Completed</span>
          </div>

          {/* Stat 2 */}
          <div className="stat-card reveal reveal-up delay-200">
            <div className="stat-card__icon-wrapper">
              <i className="fa-solid fa-face-smile-beam" aria-hidden="true"></i>
            </div>
            <CountUp end={500} suffix="+" startTrigger={isVisible} />
            <span className="stat-card__label">Satisfied Customers</span>
          </div>

          {/* Stat 3 */}
          <div className="stat-card reveal reveal-up delay-400">
            <div className="stat-card__icon-wrapper">
              <i className="fa-solid fa-calendar-days" aria-hidden="true"></i>
            </div>
            <CountUp end={7} suffix="+" startTrigger={isVisible} />
            <span className="stat-card__label">Years Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
