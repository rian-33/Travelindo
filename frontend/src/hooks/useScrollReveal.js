import { useEffect, useRef, useState, useCallback } from 'react';

export function useScrollReveal(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '-100px',
    triggerOnce = true,
    initialState = { opacity: 0, y: 30 },
    activeState = { opacity: 1, y: 0 },
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  const setRef = useCallback((node) => {
    elementRef.current = node;
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || (triggerOnce && hasAnimated)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasAnimated(true);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, hasAnimated]);

  return { ref: setRef, isVisible, hasAnimated, initialState, activeState };
}

export function useIntersectionObserver(callback, options = {}) {
  const elementRef = useRef(null);
  const { root = null, rootMargin = '0px', threshold = 0 } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, { root, rootMargin, threshold });
    observer.observe(element);
    return () => observer.disconnect();
  }, [callback, root, rootMargin, threshold]);

  return elementRef;
}

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  const { root = null, rootMargin = '0px', threshold = 0 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { root, rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  return { ref, inView };
}

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

export function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState('up');
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDir(currentScrollY > prevScrollY.current ? 'down' : 'up');
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollDir;
}

export function useParallax(speed = 0.5) {
  const ref = useRef(null);
  const [transform, setTransform] = useState('translateY(0)');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;

      const scrollProgress = (scrollY + viewportHeight - elementTop) / (viewportHeight + elementHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      const offset = (clampedProgress - 0.5) * speed * elementHeight;

      setTransform(`translateY(${offset}px)`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, style: { transform } };
}