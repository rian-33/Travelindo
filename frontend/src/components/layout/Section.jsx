import { Children } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { scrollReveal } from '@/lib/motion';
import { motion } from 'framer-motion';

export function Section({
  children,
  className,
  variant: _variant = 'default',
  spacing = 'lg',
  background,
  divider = false,
  reveal = false,
  revealDelay = 0,
  containerSize = 'full',
  id,
  ...props
}) {
  const spacings = {
    none: 'py-0',
    sm: 'py-10 lg:py-16',
    md: 'py-16 lg:py-24',
    lg: 'py-24 lg:py-32',
    xl: 'py-32 lg:py-40',
  };

  const backgrounds = {
    none: '',
    muted: 'bg-surface-muted',
    elevated: 'bg-surface-elevated',
    brand: 'bg-brand-primary-light',
    brandPrimary: 'bg-brand-primary text-text-inverse',
    brandSecondary: 'bg-brand-secondary',
    gradient: 'bg-gradient-to-b from-surface-bg to-surface-muted',
    gradientBrand: 'bg-gradient-to-br from-brand-primary-light via-surface-bg to-brand-accent-light',
  };

  const dividerStyles = {
    top: 'border-t border-border',
    bottom: 'border-b border-border',
    both: 'border-y border-border',
  };

  const SectionComponent = reveal ? motion.section : 'section';

  return (
    <SectionComponent
      id={id}
      className={cn(
        'relative w-full',
        spacings[spacing],
        backgrounds[background],
        divider && dividerStyles[divider],
        className
      )}
      {...(reveal ? { ...scrollReveal, style: { transitionDelay: `${revealDelay}ms` } } : {})}
      {...props}
    >
      {background === 'pattern' && (
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%27')] bg-cover" aria-hidden="true" />
      )}
      <Container size={containerSize}>
        {children}
      </Container>
    </SectionComponent>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
  className,
  align = 'left',
}) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('mb-10 lg:mb-12', alignClasses[align], className)}>
      {subtitle && (
        <motion.p
          className="text-brand-primary font-semibold tracking-[0.2em] text-sm mb-4 uppercase flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="w-8 h-[1px] bg-brand-primary" />
          {subtitle}
          <span className="w-8 h-[1px] bg-brand-primary" />
        </motion.p>
      )}
      <motion.h2
        className="font-serif text-display-lg lg:text-display-xl font-bold text-text-primary mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {action && (
        <motion.div
          className={cn('mt-6', alignClasses[align])}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {action}
        </motion.div>
      )}
    </div>
  );
}

export function SectionGrid({
  children,
  className,
  columns = { base: 1, md: 2, lg: 3, xl: 4 },
  gap = 'gap-6 lg:gap-8',
  reveal = true,
  stagger = true,
}) {
  const columnClasses = {
    base: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    },
    md: {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
      5: 'md:grid-cols-5',
      6: 'md:grid-cols-6',
    },
    lg: {
      1: 'lg:grid-cols-1',
      2: 'lg:grid-cols-2',
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4',
      5: 'lg:grid-cols-5',
      6: 'lg:grid-cols-6',
    },
    xl: {
      1: 'xl:grid-cols-1',
      2: 'xl:grid-cols-2',
      3: 'xl:grid-cols-3',
      4: 'xl:grid-cols-4',
      5: 'xl:grid-cols-5',
      6: 'xl:grid-cols-6',
    },
  };

  return (
    <div
      className={cn(
        'grid',
        columnClasses.base[columns.base],
        columns.md && columnClasses.md[columns.md],
        columns.lg && columnClasses.lg[columns.lg],
        columns.xl && columnClasses.xl[columns.xl],
        gap,
        className
      )}
    >
      {Children.map(children, (child, index) => {
        if (!child) return null;
        return reveal && stagger ? (
          <motion.div
            key={child.key || index}
            variants={scrollReveal}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            {child}
          </motion.div>
        ) : (
          child
        );
      })}
    </div>
  );
}