import React, { useState, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

export default function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const particleIdRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set moving to false after 100ms of no movement
      timeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 100);

      // Add new particle
      const newParticle: Particle = {
        id: particleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        scale: 1,
      };

      setParticles(prev => [...prev, newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Animate and remove particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            opacity: particle.opacity - 0.05,
            scale: particle.scale * 0.98,
          }))
          .filter(particle => particle.opacity > 0)
      );
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Main cursor */}
      <div
        className={`fixed w-6 h-6 rounded-full transition-all duration-200 ease-out ${
          isMoving ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.8) 0%, rgba(79, 70, 229, 0.6) 50%, rgba(59, 130, 246, 0.4) 100%)',
          boxShadow: `
            0 0 20px rgba(147, 51, 234, 0.6),
            0 0 40px rgba(79, 70, 229, 0.4),
            0 0 60px rgba(59, 130, 246, 0.2)
          `,
        }}
      />

      {/* Outer ring */}
      <div
        className={`fixed w-12 h-12 rounded-full border-2 transition-all duration-300 ease-out ${
          isMoving ? 'scale-75 opacity-100' : 'scale-100 opacity-60'
        }`}
        style={{
          left: mousePosition.x - 24,
          top: mousePosition.y - 24,
          borderColor: 'rgba(147, 51, 234, 0.5)',
          background: 'radial-gradient(circle, transparent 60%, rgba(147, 51, 234, 0.1) 100%)',
        }}
      />

      {/* Particle trail */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed w-2 h-2 rounded-full"
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
            opacity: particle.opacity,
            transform: `scale(${particle.scale})`,
            background: `radial-gradient(circle, rgba(147, 51, 234, ${particle.opacity}) 0%, rgba(79, 70, 229, ${particle.opacity * 0.7}) 100%)`,
            boxShadow: `0 0 10px rgba(147, 51, 234, ${particle.opacity * 0.5})`,
          }}
        />
      ))}

      {/* Ambient glow effect */}
      <div
        className="fixed w-32 h-32 rounded-full transition-all duration-500 ease-out"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.05) 0%, rgba(79, 70, 229, 0.03) 50%, transparent 100%)',
          transform: isMoving ? 'scale(1.2)' : 'scale(1)',
          opacity: isMoving ? 0.8 : 0.4,
        }}
      />
    </div>
  );
}