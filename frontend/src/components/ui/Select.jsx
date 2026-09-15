import { forwardRef, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { dropdownVariants } from '@/lib/motion';
import { ChevronDown, Check, X } from 'lucide-react';
import { Input } from './Input';

const Select = forwardRef(
  (
    {
      label,
      placeholder = 'Pilih...',
      options = [],
      value,
      onChange,
      disabled = false,
      required = false,
      error,
      helperText,
      searchable = false,
      clearable = false,
      className,
      containerClassName,
      labelClassName,
      id,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const triggerRef = useRef(null);
    const menuRef = useRef(null);
    const inputRef = useRef(null);

    const selectId = id || `select-${Math.random().toString(36).slice(2, 9)}`;

    const filteredOptions = searchable
      ? options.filter((opt) =>
          opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (opt.value && opt.value.toString().toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : options;

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (triggerRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return;
        setOpen(false);
        setSearchQuery('');
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
      if (open && searchable) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }, [open, searchable]);

    const handleKeyDown = (e) => {
      if (!open) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }

      const itemsArray = Array.from(menuRef.current?.querySelectorAll('[role="option"]:not([disabled])') || []);
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
          setOpen(false);
          setSearchQuery('');
          triggerRef.current?.focus();
          break;
        case 'Tab':
          setOpen(false);
          setSearchQuery('');
          break;
        case 'Enter':
        case ' ':
          if (document.activeElement?.getAttribute('role') === 'option') {
            e.preventDefault();
            document.activeElement.click();
          }
          break;
        case 'Backspace':
          if (searchable && !searchQuery && clearable && value) {
            onChange?.('', null);
            setOpen(false);
          }
          break;
      }
    };

    const handleOptionClick = (option) => {
      onChange?.(option.value, option);
      setOpen(false);
      setSearchQuery('');
      triggerRef.current?.focus();
    };

    const handleClear = (e) => {
      e.stopPropagation();
      onChange?.('', null);
      setOpen(false);
    };

    return (
      <div className={cn('w-full', containerClassName)} ref={triggerRef} onKeyDown={handleKeyDown}>
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              'label-base',
              required && 'after:content-["*"] after:ml-1 after:text-red-500',
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <button
            type="button"
            id={selectId}
            ref={ref}
            className={cn(
              'input-base w-full text-left justify-between',
              'hover:border-brand-primary/50',
              disabled && 'bg-surface-muted cursor-not-allowed',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
              open && 'border-border-focus ring-2 ring-focus-ring'
            )}
            onClick={() => !disabled && setOpen(!open)}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={label}
            {...props}
          >
            <span className={cn('flex-1 truncate', !selectedOption && 'text-text-muted')}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <div className="flex items-center gap-2">
              {clearable && value && (
                <button
                  type="button"
                  className="p-1 rounded-lg hover:bg-surface-muted transition-colors text-text-muted hover:text-text-primary"
                  onClick={handleClear}
                  aria-label="Hapus pilihan"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-text-muted transition-transform',
                  open && 'rotate-180'
                )}
              />
            </div>
          </button>
          {error && <p className="error-text">{error}</p>}
          {helperText && !error && <p className="helper-text">{helperText}</p>}

          <AnimatePresence>
            {open && (
              <motion.div
                ref={menuRef}
                className={cn(
                  'dropdown-menu absolute z-50 w-full mt-1 max-h-60 overflow-y-auto',
                  searchable && 'p-0'
                )}
                variants={dropdownVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                role="listbox"
                aria-label={label}
              >
                {searchable && (
                  <div className="p-2 border-b border-border">
                    <Input
                      ref={inputRef}
                      type="search"
                      placeholder="Cari..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      leftIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                      className="bg-surface-muted border-border"
                    />
                  </div>
                )}
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-center text-text-muted text-sm">
                    {searchable ? 'Tidak ada pilihan yang cocok' : 'Tidak ada pilihan tersedia'}
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={value === option.value}
                      className={cn(
                        'dropdown-item w-full justify-between',
                        value === option.value && 'bg-brand-primary-light text-brand-primary'
                      )}
                      onClick={() => handleOptionClick(option)}
                      disabled={option.disabled}
                    >
                      <span>{option.label}</span>
                      {value === option.value && <Check className="w-4 h-4 text-brand-primary" />}
                    </button>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };