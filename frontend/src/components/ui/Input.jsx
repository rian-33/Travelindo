import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { inputFocus } from '@/lib/motion';
import { motion } from 'framer-motion';

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className,
      containerClassName,
      labelClassName,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const hasError = !!error;
    const hasHelper = !!helperText && !hasError;

    return (
      <div className={cn('w-full space-y-1.5', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium text-text-primary',
              'transition-colors duration-fast',
              hasError && 'text-red-600',
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-text-muted">
              {leftIcon}
            </div>
          )}
          <motion.input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-surface-elevated border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted',
              'transition-all duration-fast ease-brand',
              'focus:outline-none focus:ring-2 focus:ring-focus-ring',
              'disabled:bg-surface-muted disabled:cursor-not-allowed',
              leftIcon && 'pl-12',
              rightIcon && 'pr-12',
              hasError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                : 'border-border focus:border-border-focus',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : hasHelper ? helperId : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-text-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {hasError && (
          <motion.p
            id={errorId}
            className="error-text"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
          >
            {error}
          </motion.p>
        )}
        {hasHelper && (
          <p id={helperId} className="helper-text">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

const Textarea = forwardRef(
  ({ label, error, helperText, className, containerClassName, labelClassName, id, ...props }, ref) => {
    const inputId = id || `textarea-${Math.random().toString(36).slice(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const hasError = !!error;
    const hasHelper = !!helperText && !hasError;

    return (
      <div className={cn('w-full space-y-1.5', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium text-text-primary',
              'transition-colors duration-fast',
              hasError && 'text-red-600',
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <motion.textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full bg-surface-elevated border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted',
            'transition-all duration-fast ease-brand resize-y min-h-[100px]',
            'focus:outline-none focus:ring-2 focus:ring-focus-ring',
            'disabled:bg-surface-muted disabled:cursor-not-allowed',
            hasError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
              : 'border-border focus:border-border-focus',
            className
          )}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : hasHelper ? helperId : undefined}
          {...props}
        />
        {hasError && (
          <motion.p
            id={errorId}
            className="error-text"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
          >
            {error}
          </motion.p>
        )}
        {hasHelper && (
          <p id={helperId} className="helper-text">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, Textarea };