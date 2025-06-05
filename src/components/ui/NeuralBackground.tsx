import React, { useRef, useEffect, useState } from 'react';

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: 'circle' | 'star' | 'polygon' | 'neuron' | 'triangle' | 'rectangle' | 'diamond';
  rotation: number;
  rotationSpeed: number;
  connections: number[];
  morphTimer: number;   // Timer for shape morphing
  morphDuration: number; // How long to wait before morphing
  nextType: 'circle' | 'star' | 'polygon' | 'neuron' | 'triangle' | 'rectangle' | 'diamond'; // Next shape type
  morphProgress: number; // Transition progress (0-1)
}

interface NeuralBackgroundProps {
  density?: number; // Controls how many neurons appear (1-10, default 5)
  speed?: number; // Controls animation speed (1-10, default 5)
  opacity?: number; // Background opacity (0-1, default 0.5)
}

const NeuralBackground: React.FC<NeuralBackgroundProps> = ({ 
  density = 5,
  speed = 5,
  opacity = 0.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const neuronsRef = useRef<Neuron[]>([]);
  const animationFrameIdRef = useRef<number>(0);

  // Colors from the main theme
  const orangeColor = '#F97316'; // Orange
  const greenColor = '#10B981'; // Green
  
  // Handle mouse movement
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

  // Draw a neuron shape based on its type with morphing capability
  const drawNeuron = (ctx: CanvasRenderingContext2D, neuron: Neuron) => {
    ctx.save();
    ctx.translate(neuron.x, neuron.y);
    ctx.rotate(neuron.rotation);
    ctx.fillStyle = neuron.color;

    // If morphing is in progress, draw interpolated shape
    if (neuron.morphProgress > 0 && neuron.morphProgress < 1) {
      // Draw blended shape based on morphProgress
      drawMorphingShape(ctx, neuron);
    } else {
      // Draw normal shape
      drawShape(ctx, neuron, neuron.type, neuron.size);
    }
    
    ctx.restore();
  };

  // Draw a specific shape
  const drawShape = (ctx: CanvasRenderingContext2D, neuron: Neuron, shapeType: Neuron['type'], size: number) => {
    switch(shapeType) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        break;
      
      case 'star':
        const spikes = 5;
        const outerRadius = size;
        const innerRadius = size / 2;
        
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (Math.PI * i) / spikes;
          ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }
        ctx.closePath();
        ctx.fill();
        break;
      
      case 'neuron':
        // Draw neuron cell body
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw dendrites (small branches)
        const dendrites = Math.floor(size * 0.7) + 3;
        for (let i = 0; i < dendrites; i++) {
          const angle = (Math.PI * 2 * i) / dendrites;
          const length = size * (0.8 + Math.random() * 0.2);
          
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
          ctx.lineWidth = size / 8;
          ctx.strokeStyle = neuron.color;
          ctx.stroke();
          
          // Add small bulbs at the end of some dendrites
          if (Math.random() > 0.5) {
            ctx.beginPath();
            ctx.arc(
              Math.cos(angle) * length, 
              Math.sin(angle) * length, 
              size / 3, 
              0, 
              Math.PI * 2
            );
            ctx.fill();
          }
        }
        break;
      
      case 'polygon':
        const sides = 6;
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
          const angle = (Math.PI * 2 * i) / sides;
          const radius = size;
          if (i === 0) {
            ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          } else {
            ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          }
        }
        ctx.closePath();
        ctx.fill();
        break;

      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.866, size * 0.5); // cos(30°) = 0.866
        ctx.lineTo(-size * 0.866, size * 0.5);
        ctx.closePath();
        ctx.fill();
        break;

      case 'rectangle':
        ctx.beginPath();
        ctx.rect(-size * 0.7, -size * 0.7, size * 1.4, size * 1.4);
        ctx.fill();
        break;

      case 'diamond':
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size, 0);
        ctx.closePath();
        ctx.fill();
        break;
    }
  };

  // Draw morphing between two shapes
  const drawMorphingShape = (ctx: CanvasRenderingContext2D, neuron: Neuron) => {
    // Fade out current shape and fade in new shape
    ctx.globalAlpha = 1 - neuron.morphProgress;
    drawShape(ctx, neuron, neuron.type, neuron.size);
    
    ctx.globalAlpha = neuron.morphProgress;
    drawShape(ctx, neuron, neuron.nextType, neuron.size);
    
    ctx.globalAlpha = 1;
  };

  // Initialize neurons
  const initNeurons = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    const neurons: Neuron[] = [];
    
    // Adjust count based on density and screen size - reduced count for subtlety
    const neuronCount = Math.min(Math.floor((width * height) / 15000) * (density / 5), 80);

    const neuronTypes: Array<'circle' | 'star' | 'polygon' | 'neuron' | 'triangle' | 'rectangle' | 'diamond'> = 
      ['circle', 'star', 'polygon', 'neuron', 'triangle', 'rectangle', 'diamond'];

    for (let i = 0; i < neuronCount; i++) {
      // Select initial shape type
      const initialType = neuronTypes[Math.floor(Math.random() * neuronTypes.length)];
      // Select a different type for the next morph
      let nextType = neuronTypes[Math.floor(Math.random() * neuronTypes.length)];
      while (nextType === initialType) {
        nextType = neuronTypes[Math.floor(Math.random() * neuronTypes.length)];
      }
      
      const neuron: Neuron = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (speed / 20), // Even slower movement
        vy: (Math.random() - 0.5) * (speed / 20),
        size: Math.random() * 8 + 3, // Sizes from 3 to 11
        color: Math.random() > 0.4 ? orangeColor : greenColor,
        type: initialType,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.002, // Very slow rotation
        connections: [],
        morphTimer: Math.random() * 5000 + 3000, // Random time between 3-8 seconds before first morph
        morphDuration: 2000 + Math.random() * 2000, // 2-4 seconds for morph transition
        nextType: nextType,
        morphProgress: 0 // Not currently morphing
      };
      neurons.push(neuron);
    }

    neuronsRef.current = neurons;
  };

  // Animation loop
  const animate = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const neurons = neuronsRef.current;

    // Clear canvas with transparent background
    ctx.clearRect(0, 0, width, height);

    // Update and draw neurons
    for (let i = 0; i < neurons.length; i++) {
      const n = neurons[i];

      // Apply mouse influence if mouse is present
      if (mousePosition) {
        const dx = mousePosition.x - n.x;
        const dy = mousePosition.y - n.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = 0.05 * (1 - distance / 150);
          n.vx += (dx / distance) * force;
          n.vy += (dy / distance) * force;
        }
      }

      // Update position (very subtle movement)
      n.x += n.vx;
      n.y += n.vy;
      n.rotation += n.rotationSpeed;
      
      // Handle shape morphing
      if (n.morphProgress > 0 && n.morphProgress < 1) {
        // Currently morphing - update progress
        n.morphProgress += 1 / (n.morphDuration / 16.67); // 16.67ms is approx. one frame at 60fps
        
        // If morphing complete
        if (n.morphProgress >= 1) {
          n.morphProgress = 0;
          n.type = n.nextType;
          // Choose new next type that's different from current
          const neuronTypes: Array<'circle' | 'star' | 'polygon' | 'neuron' | 'triangle' | 'rectangle' | 'diamond'> = 
            ['circle', 'star', 'polygon', 'neuron', 'triangle', 'rectangle', 'diamond'];
          do {
            n.nextType = neuronTypes[Math.floor(Math.random() * neuronTypes.length)];
          } while (n.nextType === n.type);
          
          // Set timer for next morphing
          n.morphTimer = Math.random() * 5000 + 3000;
        }
      } else {
        // Not currently morphing - update timer
        n.morphTimer -= 16.67; // Approx one frame
        
        // Start morphing if timer expired
        if (n.morphTimer <= 0) {
          n.morphProgress = 0.001; // Start morphing
        }
      }

      // Bounce off edges
      if (n.x <= 0 || n.x >= width) n.vx *= -1;
      if (n.y <= 0 || n.y >= height) n.vy *= -1;

      // Reset connections
      n.connections = [];

      // Draw neuron
      drawNeuron(ctx, n);
    }

    // Find and draw connections
    const maxDistance = Math.min(width, height) * 0.15;
    for (let i = 0; i < neurons.length; i++) {
      const n1 = neurons[i];
      
      for (let j = i + 1; j < neurons.length; j++) {
        const n2 = neurons[j];
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          n1.connections.push(j);
          n2.connections.push(i);
          
          // Create gradient for line
          const gradient = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
          gradient.addColorStop(0, n1.color);
          gradient.addColorStop(1, n2.color);
          
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = gradient;
          ctx.globalAlpha = 0.35 * (1 - (distance / maxDistance)); // Slightly higher opacity for connections
          ctx.lineWidth = 0.5; // Slightly thicker lines
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    // Very subtle glow effect on neurons with connections
    for (let i = 0; i < neurons.length; i++) {
      const n = neurons[i];
      if (n.connections.length > 1) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size + 1 + n.connections.length / 3, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = 0.12; // Increased glow opacity
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    
    // Continue animation loop
    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  // Handle resize
  const updateCanvasSize = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Reinitialize neurons for new dimensions
    initNeurons();
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
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ opacity: opacity * 0.7, zIndex: -1 }} // Slightly increased opacity with negative z-index
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

export default NeuralBackground;
