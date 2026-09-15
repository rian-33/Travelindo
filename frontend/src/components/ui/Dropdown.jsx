import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { dropdownVariants } from '@/lib/motion';
import { ChevronDown, Check } from 'lucide-react';
import { Button } from './Button';

const Dropdown = ({
  trigger,
  items,
  placement = 'bottom',
  align = 'left',
  className,
  menuClassName,
  onSelect,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (triggerRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return;
      setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!open) return;
    const itemsArray = Array.from(menuRef.current?.querySelectorAll('[role="menuitem"]') || []);
    const currentIndex = itemsArray.indexOf(document.activeElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % itemsArray.length;
        itemsArray[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + itemsArray.length) % itemsArray.length;
        itemsArray[prevIndex]?.focus();
        break;
      case 'Escape':
      case 'Tab':
        setOpen(false);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        document.activeElement?.click();
        break;
    }
  };

  if (!trigger) return null;

  const menuPlacement = {
    bottom: 'top-full mt-1',
    top: 'bottom-full mb-1',
    left: 'right-full mr-1',
    right: 'left-full ml-1',
  };

  const menuAlign = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div className={cn('relative inline-block', className)} ref={triggerRef}>
      {typeof trigger === 'function' ? (
        trigger({ open, onToggle: () => setOpen(!open), onClose: () => setOpen(false) })
      ) : (
        <Button
          variant="ghost"
          size="sm"
          rightIcon={<ChevronDown className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />}
          onClick={() => !disabled && setOpen(!open)}
          disabled={disabled}
          aria-haspopup="menu"
          aria-expanded={open}
        >
          {trigger}
        </Button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            className={cn(
              'absolute z-50 min-w-[200px] bg-surface-elevated rounded-xl shadow-float border border-border overflow-hidden py-1',
              'dropdown-menu',
              menuPlacement[placement],
              menuAlign[align],
              menuClassName
            )}
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            role="menu"
            onKeyDown={handleKeyDown}
          >
            {items.map((item, index) => (
              <motion.button
                key={item.value || index}
                type="button"
                role="menuitem"
                tabIndex={-1}
                className={cn(
                  'dropdown-item w-full px-4 py-2.5 text-left text-body text-text-primary',
                  'hover:bg-surface-muted transition-colors duration-fast',
                  'focus:outline-none focus:bg-surface-muted',
                  item.disabled && 'opacity-50 cursor-not-allowed',
                  item.selected && 'font-medium text-brand-primary'
                )}
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) {
                    onSelect?.(item.value, item);
                    if (!item.keepOpen) setOpen(false);
                  }
                }}
              >
                <span className="flex items-center gap-3">
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  <span className="flex-1">{item.label}</span>
                  {item.shortcut && (
                    <span className="text-caption text-text-muted font-mono">{item.shortcut}</span>
                  )}
                  {item.selected && <Check className="w-4 h-4 text-brand-primary flex-shrink-0" />}
                </span>
              </motion.button>
            ))}
            {items.some((i) => i.divider) && (
              <div className="dropdown-divider" role="separator" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Dropdown };

// Multi-select dropdown
export function MultiSelectDropdown({
  label,
  placeholder = 'Pilih...',
  items,
  value = [],
  onChange,
  disabled = false,
  className,
  required = false,
  error,
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (triggerRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleItem = (itemValue) => {
    onChange?.(
      value.includes(itemValue)
        ? value.filter((v) => v !== itemValue)
        : [...value, itemValue]
    );
  };

  const displayValue = items.filter((i) => value.includes(i.value)).map((i) => i.label).join(', ');

  return (
    <div className={cn('w-full', className)} ref={triggerRef}>
      <label className="label-base">{label} {required && <span className="text-red-500">*</span>}</label>
      <button
        type="button"
        className={cn(
          'input-base w-full text-left justify-between',
          'hover:border-brand-primary/50',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
          disabled && 'bg-surface-muted cursor-not-allowed'
        )}
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
      >
        <span className={cn('flex-1', !displayValue && 'text-text-muted')}>
          {displayValue || placeholder}
        </span>
        <ChevronDown className={cn('w-4 h-4 text-text-muted transition-transform', open && 'rotate-180')} />
      </button>
      {error && <p className="error-text">{error}</p>}

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            className="dropdown-menu absolute z-50 w-full mt-1 max-h-60 overflow-y-auto"
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            role="listbox"
          >
            {items.map((item) => (
              <button
                key={item.value}
                type="button"
                role="option"
                aria-selected={value.includes(item.value)}
                className={cn(
                  'dropdown-item w-full justify-between',
                  value.includes(item.value) && 'bg-brand-primary-light text-brand-primary'
                )}
                onClick={() => toggleItem(item.value)}
              >
                <span>{item.label}</span>
                {value.includes(item.value) && <Check className="w-4 h-4 text-brand-primary" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}