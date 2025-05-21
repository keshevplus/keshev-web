import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  connections: number[];
}

interface NeuralAnimationProps {
  isDarkTheme: boolean;
}

const NeuralAnimation: React.FC<NeuralAnimationProps> = ({ isDarkTheme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameIdRef = useRef<number>(0);

  const orangeColor = '#F97316';
  const greenColor = '#10B981';
  const textColor = isDarkTheme ? 'white' : 'black';

  // Handle mouse movement
  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  // Handle resize
  const handleResize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      initParticles();
    }
  };

  // Initialize particles
  const initParticles = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 15000), 150);

    for (let i = 0; i < particleCount; i++) {
      const particle: Particle = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? orangeColor : greenColor,
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
    const height = canvas.height;
    const particles = particlesRef.current;

    // Clear canvas with background color
    ctx.fillStyle = isDarkTheme ? 'black' : 'white';
    ctx.fillRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Apply mouse influence if mouse is present
      if (mousePosition) {
        const dx = mousePosition.x - p.x;
        const dy = mousePosition.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = 0.1 * (1 - distance / 200);
          p.vx += (dx / distance) * force;
          p.vy += (dy / distance) * force;
        }
      }

      // Update position
      p.x += p.vx;
      p.vy += (Math.random() - 0.5) * 0.01; // Add slight vertical wobble
      p.y += p.vy;

      // Bounce off edges
      if (p.x <= 0 || p.x >= width) p.vx *= -1;
      if (p.y <= 0 || p.y >= height) p.vy *= -1;

      // Reset connections
      p.connections = [];

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }

    // Find and draw connections
    const maxDistance = Math.min(width, height) * 0.15;
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
          ctx.globalAlpha = 1 - (distance / maxDistance);
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    // Glow effect on nodes with many connections
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.connections.length > 3) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + 2 + p.connections.length / 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.1;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Draw title text
    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.fillText('Neural Network Animation', width / 2, 40);
    
    // Continue animation loop
    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      initParticles();
      
      // Start animation
      animate();
      
      // Add event listeners
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => {
        cancelAnimationFrame(animationFrameIdRef.current);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Re-render when theme changes
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = isDarkTheme ? 'black' : 'white';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, [isDarkTheme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
};

export default NeuralAnimation;