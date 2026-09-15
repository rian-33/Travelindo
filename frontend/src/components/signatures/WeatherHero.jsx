import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function WeatherHero({ children, className, ...props }) {
  const [timeOfDay, setTimeOfDay] = useState('day');

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 11) setTimeOfDay('morning');
      else if (hour >= 11 && hour < 17) setTimeOfDay('day');
      else if (hour >= 17 && hour < 19) setTimeOfDay('golden');
      else setTimeOfDay('night');
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  const timeConfigs = {
    morning: {
      gradient: 'from-amber-100 via-orange-50 to-yellow-50',
      darkGradient: 'dark:from-amber-900/30 dark:via-orange-900/30 dark:to-yellow-900/30',
      overlay: 'bg-gradient-to-b from-amber-200/30 to-transparent',
    },
    day: {
      gradient: 'from-blue-50 via-sky-50 to-blue-100',
      darkGradient: 'dark:from-blue-900/30 dark:via-sky-900/30 dark:to-blue-900/30',
      overlay: 'bg-gradient-to-b from-blue-200/20 to-transparent',
    },
    golden: {
      gradient: 'from-orange-100 via-amber-50 to-red-50',
      darkGradient: 'dark:from-orange-900/30 dark:via-amber-900/30 dark:to-red-900/30',
      overlay: 'bg-gradient-to-b from-orange-200/30 to-transparent',
    },
    night: {
      gradient: 'from-slate-900 via-indigo-900 to-purple-900',
      darkGradient: 'dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900',
      overlay: 'bg-gradient-to-b from-slate-900/50 to-transparent',
    },
  };

  const config = timeConfigs[timeOfDay];

  return (
    <div
      className={cn(
        'relative min-h-screen flex items-center justify-center',
        'bg-gradient-to-br',
        config.gradient,
        'dark:bg-gradient-to-br',
        config.darkGradient,
        className
      )}
      {...props}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl" />
      </div>

      {/* Time-based overlay */}
      <div className={cn('absolute inset-0', config.overlay)} />

      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%27')] bg-cover" />

      <div className="relative z-10 w-full">
        {children}
      </div>

      {/* Time indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-text-muted/70 capitalize">
        <span className="flex items-center gap-1">
          {timeOfDay === 'morning' && '🌅'}
          {timeOfDay === 'day' && '☀️'}
          {timeOfDay === 'golden' && '🌅'}
          {timeOfDay === 'night' && '🌙'}
          <span className="hidden sm:inline">{timeOfDay}</span>
        </span>
      </div>
    </div>
  );
}

export function useTimeOfDay() {
  const [timeOfDay, setTimeOfDay] = useState('day');

  useEffect(() => {
    const update = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 11) setTimeOfDay('morning');
      else if (hour >= 11 && hour < 17) setTimeOfDay('day');
      else if (hour >= 17 && hour < 19) setTimeOfDay('golden');
      else setTimeOfDay('night');
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return timeOfDay;
}