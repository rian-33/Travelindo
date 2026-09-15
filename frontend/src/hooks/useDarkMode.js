import { useEffect, useState, useCallback } from 'react';
import { useUIStore } from '@/stores';

export function useDarkMode() {
  const { theme, resolvedTheme, setTheme, setResolvedTheme } = useUIStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const resolved = theme === 'system' ? (mediaQuery.matches ? 'dark' : 'light') : theme;
      setResolvedTheme(resolved);
      document.documentElement.setAttribute('data-theme', resolved);
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, setResolvedTheme]);

  const toggleTheme = useCallback(() => {
    const themes = ['light', 'dark', 'system'];
    const next = themes[(themes.indexOf(theme) + 1) % 3];
    setTheme(next);
  }, [theme, setTheme]);

  return {
    theme,
    resolvedTheme,
    toggleTheme,
    setTheme,
    isDark: resolvedTheme === 'dark',
  };
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export function useBreakpoint() {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isWide = useMediaQuery('(min-width: 1280px)');

  return { isMobile, isTablet, isDesktop, isWide };
}

export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function useHighContrast() {
  return useMediaQuery('(prefers-contrast: more)');
}