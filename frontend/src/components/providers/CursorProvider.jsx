import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useDarkMode';

const CursorContext = createContext({
  cursorRef: null,
  setCursorRef: () => {},
  isHovering: false,
  setIsHovering: () => {},
});

export function CursorProvider({ children, enabled = true }) {
  const cursorRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    if (!enabled || prefersReducedMotion) {
      setVisible(false);
      return;
    }

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [enabled, prefersReducedMotion, visible]);

  // Smooth cursor animation
  useEffect(() => {
    if (!enabled || prefersReducedMotion) return;

    const animateCursor = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.15;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px) translate(-50%, -50%)`;
      }

      animationRef.current = requestAnimationFrame(animateCursor);
    };

    animateCursor();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled, prefersReducedMotion]);

  const setCursorRef = (el) => {
    cursorRef.current = el;
  };

  return (
    <CursorContext.Provider
      value={{
        cursorRef: setCursorRef,
        setIsHovering,
        isHovering,
        visible,
        enabled: enabled && !prefersReducedMotion,
      }}
    >
{enabled && !prefersReducedMotion && (
            <motion.div
              ref={setCursorRef}
              className="fixed top-0 left-0 pointer-events-none z-[1000] select-none"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.2s ease',
                display: visible ? 'block' : 'none',
              }}
            >
          <div className="cursor-compass relative">
            <div className="compass-outer w-12 h-12 rounded-full border-2 border-brand-primary/30" />
            <motion.div
              className="compass-needle absolute top-1/2 left-1/2 w-0.5 h-6 -translate-x-1/2 -translate-y-full bg-brand-primary transform-origin-bottom-center rounded-t-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <div className="compass-center absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary" />
            {isHovering && (
              <motion.div
                className="compass-ring absolute inset-0 rounded-full border-2 border-brand-primary"
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
          </div>
        </motion.div>
      )}
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}

export function CursorHover({ children }) {
  const { setIsHovering } = useCursor();
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </div>
  );
}