import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollRevealInitializer() {
  const location = useLocation();

  useEffect(() => {
    // Wait for the route transition and layout rendering
    const timer = setTimeout(() => {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px', // Trigger when 60px of the element enters the screen
        threshold: 0.05
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Unobserve once animated
          }
        });
      }, observerOptions);

      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((el) => {
        // If element is already below the viewport, observe it.
        // If it's already above the viewport (scrolled past), or in the viewport, observe it as well.
        observer.observe(el);
      });

      return () => {
        revealElements.forEach((el) => observer.unobserve(el));
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}

export default ScrollRevealInitializer;
