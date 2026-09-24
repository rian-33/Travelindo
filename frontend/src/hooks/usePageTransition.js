import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';

const PATHS = ['/', '/destinations', '/culinary', '/hotels', '/promo', '/login', '/register'];

export function usePageTransition() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('forward');

  const currentIndex = PATHS.indexOf(location.pathname.split('/')[1] ? `/${location.pathname.split('/')[1]}` : '/');
  const prevIndexRef = useRef(currentIndex);

  useEffect(() => {
    const newIndex = PATHS.indexOf(location.pathname.split('/')[1] ? `/${location.pathname.split('/')[1]}` : '/');
    if (newIndex !== -1 && prevIndexRef.current !== -1) {
      setTransitionDirection(newIndex > prevIndexRef.current ? 'forward' : 'backward');
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 600);
      return () => clearTimeout(timer);
    }
    prevIndexRef.current = newIndex;
  }, [location.pathname]);

  return { isTransitioning, transitionDirection };
}

export function useRouteLoader() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  return { isLoading, startLoading, stopLoading };
}

export function usePendingNavigation() {
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const handleLinkClick = (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link && !link.hasAttribute('target') && !e.metaKey && !e.ctrlKey) {
        setIsPending(true);
      }
    };

    document.addEventListener('click', handleLinkClick, true);
    return () => document.removeEventListener('click', handleLinkClick, true);
  }, []);

  return isPending;
}