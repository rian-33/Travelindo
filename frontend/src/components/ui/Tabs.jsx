import { Children, cloneElement, useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { tabIndicatorVariants } from '@/lib/motion';

const Tabs = ({
  defaultValue,
  value,
  onChange,
  children,
  className,
  variant = 'default',
  orientation = 'horizontal',
  activationMode = 'automatic',
}) => {
  const [activeValue, setActiveValue] = useState(defaultValue || value);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, transform: 'translateX(0)' });
  const tabsListRef = useRef(null);
  const tabsRefs = useRef({});

  const controlled = value !== undefined;
  const currentValue = controlled ? value : activeValue;

  const handleChange = (val) => {
    if (!controlled) setActiveValue(val);
    onChange?.(val);
  };

  const updateIndicator = useCallback(() => {
    const activeTab = tabsRefs.current[currentValue];
    const tabsList = tabsListRef.current;
    if (activeTab && tabsList) {
      const tabRect = activeTab.getBoundingClientRect();
      const listRect = tabsList.getBoundingClientRect();
      setIndicatorStyle({
        width: tabRect.width,
        transform: `translateX(${tabRect.left - listRect.left}px)`,
      });
    }
  }, [currentValue]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const variants = {
    default: 'bg-surface-muted rounded-xl p-1',
    underline: 'border-b border-border',
    pills: 'gap-1',
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        ref={tabsListRef}
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          'relative inline-flex items-center',
          variants[variant],
          orientation === 'vertical' && 'flex-col'
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentValue}
            className={cn(
              'absolute z-0 rounded-lg bg-brand-primary transition-none',
              variant === 'underline' && 'h-px bottom-0',
              variant === 'pills' && 'inset-0'
            )}
            variants={tabIndicatorVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={indicatorStyle}
          />
        </AnimatePresence>

        {Children.map(children, (child) => {
          if (!child || child.type !== TabList) return child;
          return cloneElement(child, {
            activeValue: currentValue,
            onChange: handleChange,
            tabsRefs,
            variant,
            orientation,
            activationMode,
          });
        })}
      </div>

      <div className="mt-4">
        {Children.map(children, (child) => {
          if (!child || child.type !== TabPanel) return child;
          return cloneElement(child, { activeValue: currentValue });
        })}
      </div>
    </div>
  );
};

const TabList = ({ children, activeValue, onChange, tabsRefs, variant, orientation, activationMode }) => (
  <div role="tablist" aria-orientation={orientation} className="relative z-10">
    {Children.map(children, (child) => {
      if (!child || child.type !== TabTrigger) return child;
      return cloneElement(child, {
        activeValue,
        onChange,
        tabsRefs,
        variant,
        orientation,
        activationMode,
      });
    })}
  </div>
);

const TabTrigger = ({
  value,
  children,
  disabled = false,
  activeValue,
  onChange,
  tabsRefs,
  variant,
  orientation,
  className,
}) => {
  const isActive = activeValue === value;
  const ref = (el) => { tabsRefs.current[value] = el; };

  const handleClick = () => {
    if (!disabled) onChange(value);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    const triggers = Array.from(document.querySelectorAll('[role="tab"]:not([disabled])'));
    const currentIndex = triggers.indexOf(e.currentTarget);

    let nextIndex = currentIndex;
    if (orientation === 'horizontal') {
      if (e.key === 'ArrowRight') nextIndex = (currentIndex + 1) % triggers.length;
      if (e.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    } else {
      if (e.key === 'ArrowDown') nextIndex = (currentIndex + 1) % triggers.length;
      if (e.key === 'ArrowUp') nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    }

    if (nextIndex !== currentIndex) {
      e.preventDefault();
      triggers[nextIndex]?.focus();
    }

    if (e.key === 'Home') {
      e.preventDefault();
      triggers[0]?.focus();
    }
    if (e.key === 'End') {
      e.preventDefault();
      triggers[triggers.length - 1]?.focus();
    }
  };

  const variants = {
    default: 'relative z-10 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors data-[state=active]:text-brand-primary data-[state=active]:font-semibold',
    underline: 'relative z-10 px-4 py-3 border-b-2 border-transparent text-sm font-medium text-text-secondary hover:text-text-primary transition-colors data-[state=active]:text-brand-primary data-[state=active]:border-brand-primary',
    pills: 'relative z-10 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors data-[state=active]:bg-brand-primary-light data-[state=active]:text-brand-primary',
  };

  return (
    <button
      ref={ref}
      role="tab"
      id={`tab-${value}`}
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        variants[variant],
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      data-state={isActive ? 'active' : 'inactive'}
    >
      {children}
    </button>
  );
};

const TabPanel = ({ value, children, activeValue, className }) => {
  const isActive = activeValue === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn('animate-fade-slide', className)}
    >
      {children}
    </div>
  );
};

export { Tabs, TabList, TabTrigger, TabPanel };