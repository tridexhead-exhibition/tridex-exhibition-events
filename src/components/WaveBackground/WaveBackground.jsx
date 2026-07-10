import { useEffect, useRef } from 'react';
import './WaveBackground.css';

/**
 * WaveBackground — Fixed Canvas waves at the bottom of the screen.
 * Interactive: The wave organically stretches and pulls toward the mouse 
 * when the cursor is nearby, then smoothly snaps back if the cursor pulls away too far.
 */
function WaveBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();

    // Mouse movement listeners
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Draw wave with elastic mouse interaction
    const drawWave = (yBase, amplitude, wavelength, speed, opacity) => {
      ctx.beginPath();
      ctx.moveTo(0, height);

      const mouse = mouseRef.current;
      const maxDist = 250; // Interaction radius

      for (let x = 0; x <= width; x += 4) {
        // Base rippling wave height
        const yDefault = yBase + 
          Math.sin(x / wavelength + time * speed) * amplitude + 
          Math.sin(x / (wavelength * 1.5) + time * speed * 0.7) * (amplitude * 0.4);

        let y = yDefault;

        // Apply mouse deformation if mouse is active and near
        if (mouse.x !== -9999) {
          const dx = x - mouse.x;
          const dy = mouse.y - yDefault;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDist) {
            // Smooth falloff weight (smoothstep curve)
            const influence = 1 - distance / maxDist;
            const weight = influence * influence * (3 - 2 * influence);
            
            // Pull the wave height toward the mouse (dampened by 0.6)
            y += dy * weight * 0.6;
          }
        }

        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = `rgba(21, 36, 57, ${opacity})`;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015; // Gentle horizontal speed

      // ===== BOTTOM WAVES =====
      // Lighter background wave
      drawWave(height - 150, 25, 180, -0.15, 0.12);
      // Bolder foreground wave
      drawWave(height - 130, 35, 240, -0.22, 0.22);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="wave-background"
      aria-hidden="true"
    />
  );
}

export default WaveBackground;
