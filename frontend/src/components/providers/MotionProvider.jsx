import { useEffect, useState, createContext, useContext } from 'react';
import { MotionConfig } from 'framer-motion';

const MotionContext = createContext({
  reducedMotion: false,
  prefersReducedMotion: false,
});

export function MotionProvider({ children }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      const reduced = mediaQuery.matches;
      setReducedMotion(reduced);
      setPrefersReducedMotion(reduced);
    };
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return (
    <MotionContext.Provider value={{ reducedMotion, prefersReducedMotion }}>
      <MotionConfig reducedMotion={reducedMotion}>
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useMotion must be used within a MotionProvider');
  }
  return context;
}