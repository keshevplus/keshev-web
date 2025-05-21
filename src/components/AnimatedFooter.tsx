import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Import our custom translation hook for consistent i18n implementation
import { useTranslations } from '../hooks/useTranslations';
// Import translation keys for type safety and consistency
import { TRANSLATION_KEYS } from '../i18n/translations';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  connections: number[];
}

interface AnimatedFooterProps {
  height?: number; // Height in pixels
  isDarkTheme?: boolean;
}

const AnimatedFooter: React.FC<AnimatedFooterProps> = ({ 
  height = 180, 
  isDarkTheme = false 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameIdRef = useRef<number>(0);
  // Use our custom translations hook for better reliability
  const { t } = useTranslations('common');

  // Colors from the main theme
  const orangeColor = '#F97316'; // Orange
  const greenColor = '#10B981'; // Green
  
  // Handle mouse movement within the footer area only
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMousePosition({ x, y });
  };
  
  // Handle mouse leave
  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  // Initialize particles
  const initParticles = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    const particles: Particle[] = [];
    
    // Calculate appropriate number of particles based on canvas size
    // But less than in the original to keep it lighter
    const particleCount = Math.min(Math.floor((width * height) / 10000), 70);

    for (let i = 0; i < particleCount; i++) {
      const particle: Particle = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8, // Faster horizontal movement
        vy: (Math.random() - 0.5) * 0.3, // More noticeable vertical movement
        size: Math.random() * 3 + 1.5, // Larger particles for visibility
        color: Math.random() > 0.4 ? orangeColor : greenColor, // More orange particles
        connections: []
      };
      particles.push(particle);
    }

    particlesRef.current = particles;
  };

  // Animation loop
  const animate = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const canvasHeight = canvas.height;
    const particles = particlesRef.current;

    // Clear canvas with semi-transparent background based on theme
    ctx.clearRect(0, 0, width, canvasHeight);
    ctx.fillStyle = isDarkTheme ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)';
    ctx.fillRect(0, 0, width, canvasHeight);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Apply mouse influence if mouse is present
      if (mousePosition) {
        const dx = mousePosition.x - p.x;
        const dy = mousePosition.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) { // Smaller influence radius
          const force = 0.05 * (1 - distance / 150); // Gentler force
          p.vx += (dx / distance) * force;
          p.vy += (dy / distance) * force;
        }
      }

      // Update position
      p.x += p.vx;
      p.vy += (Math.random() - 0.5) * 0.005; // Add very slight vertical wobble
      p.y += p.vy;

      // Bounce off edges
      if (p.x <= 0 || p.x >= width) p.vx *= -1;
      if (p.y <= 0 || p.y >= canvasHeight) p.vy *= -1;

      // Reset connections
      p.connections = [];

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }

    // Find and draw connections
    const maxDistance = Math.min(width, canvasHeight) * 0.12; // Shorter connection distance
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          p1.connections.push(j);
          p2.connections.push(i);
          
          // Create gradient for line
          const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          gradient.addColorStop(0, p1.color);
          gradient.addColorStop(1, p2.color);
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = gradient;
          ctx.globalAlpha = 0.8 * (1 - (distance / maxDistance)); // More opaque
          ctx.lineWidth = 0.8; // Thicker lines
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    // Enhanced glow effect on nodes with connections
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.connections.length > 1) { // Lower threshold for glow, more particles glowing
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + 2 + p.connections.length / 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.15; // More pronounced glow
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    
    // Continue animation loop
    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  // Handle resize by adapting canvas size
  const updateCanvasSize = () => {
    if (!canvasRef.current || !canvasRef.current.parentElement) return;
    
    const parent = canvasRef.current.parentElement;
    const width = parent.clientWidth;
    
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    
    // Reinitialize particles for new dimensions
    initParticles();
  };

  useEffect(() => {
    if (canvasRef.current) {
      // Initial setup
      updateCanvasSize();
      
      // Start animation
      animate();
      
      // Add window resize listener
      window.addEventListener('resize', updateCanvasSize);
      
      // Cleanup
      return () => {
        cancelAnimationFrame(animationFrameIdRef.current);
        window.removeEventListener('resize', updateCanvasSize);
      };
    }
  }, []);

  return (
    <div 
      className="relative w-full overflow-hidden mt-0 bg-orange-50" 
      style={{ height: `${height}px` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animation canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
      
      {/* Content that can be placed over the animation */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h3 className="text-xl md:text-2xl font-semibold text-green-800 mb-2">
          {t(TRANSLATION_KEYS.common.footer.animated.title, 'בריאות טובה יותר עם הבנה טובה יותר')}
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-4">
          {t(TRANSLATION_KEYS.common.footer.animated.tagline, 'פתרונות אבחון וטיפול ב-ADHD, מותאמים לצרכים שלך')}
        </p>
        <Link 
          to="/contact" 
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md text-lg font-bold transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          {t(TRANSLATION_KEYS.common.footer.animated.cta, 'זמנו פגישה היום')}
        </Link>
      </div>
    </div>
  );
};

export default AnimatedFooter;
