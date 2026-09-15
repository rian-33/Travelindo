import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function CustomCursor({ enabled = true }) {
  const cursorRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const prefersReducedMotion = false; // Would use hook in real app

  useEffect(() => {
    if (!enabled || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth follow animation
    let animationId;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += (position.x - currentX) * 0.15;
      currentY += (position.y - currentY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, [enabled, prefersReducedMotion, visible, position]);

  useEffect(() => {
    if (!enabled || prefersReducedMotion) return;

    const handleHover = (e) => {
      const target = e.target.closest('a, button, [role="button"], .card-hover, .btn-hover');
      setHovering(!!target);
    };

    document.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseout', handleHover);

    return () => {
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseout', handleHover);
    };
  }, [enabled, prefersReducedMotion]);

  if (!enabled || prefersReducedMotion) return null;

  return (
    <motion.div
      ref={cursorRef}
      className={cn(
        'fixed top-0 left-0 pointer-events-none z-[9999] select-none',
        'transition-opacity duration-200',
        !visible && 'opacity-0',
        visible && 'opacity-100'
      )}
      style={{ transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)` }}
    >
      <div className="cursor-compass relative w-12 h-12">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-brand-primary/30" />

        {/* Rotating needle */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-0.5 h-6 -translate-x-1/2 -translate-y-full bg-brand-primary transform-origin-bottom-center rounded-t-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary" />

        {/* Hover ring */}
        {hovering && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-brand-primary"
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeOut' }}
          />
        )}

        {/* Click ripple */}
        {hovering && (
          <motion.div
            className="absolute inset-0 rounded-full bg-brand-primary/20"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
}