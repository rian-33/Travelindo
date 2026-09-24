import { useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { modalVariants, modalOverlayVariants } from '@/lib/motion';

const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showClose = true,
  closeOnOverlay = true,
  closeOnEscape = true,
  className,
  footer,
}) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const previousActiveElement = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[90vw]',
  };

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      contentRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      previousActiveElement.current?.focus?.();
      previousActiveElement.current = null;
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
      if (e.key === 'Tab') {
        const focusableElements = contentRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeOnEscape, onClose]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={modalOverlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => {
            if (e.target === overlayRef.current && closeOnOverlay) {
              onClose();
            }
          }}
          role="presentation"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
          <motion.div
            ref={contentRef}
            className={cn(
              'w-full bg-surface-elevated rounded-[var(--radius-feature)] shadow-float border border-border overflow-hidden',
              sizes[size],
              'max-h-[90vh] flex flex-col',
              className
            )}
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={description ? descriptionId : undefined}
          >
            {(title || showClose) && (
              <div className="flex items-start justify-between p-5 lg:p-6 border-b border-border">
                <div>
                  {title && (
                    <h2 id={titleId} className="font-serif text-xl font-bold text-text-primary">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id={descriptionId} className="text-text-secondary text-sm mt-1">
                      {description}
                    </p>
                  )}
                </div>
                {showClose && (
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-muted transition-colors flex-shrink-0"
                    aria-label="Tutup modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-5 lg:p-6">
              {children}
            </div>
            {footer && (
              <div className="flex items-center justify-end gap-3 p-5 lg:p-6 border-t border-border bg-surface-muted/50">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export { Modal };

// Convenience components
export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Ya',
  cancelText = 'Batal',
  variant = 'danger',
  loading = false,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="w-full">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant={variant} onClick={onConfirm} loading={loading}>
            {confirmText}
          </Button>
        </div>
      }
    >
      <p className="text-text-secondary">{message}</p>
    </Modal>
  );
}

export function FormModal({
  open,
  onClose,
  title,
  description,
  children,
  submitText = 'Simpan',
  cancelText = 'Batal',
  onSubmit,
  loading = false,
  size = 'md',
}) {
  const formId = useId();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size={size}
      footer={
        <div className="w-full">
          <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button type="submit" form={formId} variant="primary" loading={loading}>
            {submitText}
          </Button>
        </div>
      }
    >
      <form id={formId} onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}>
        {children}
      </form>
    </Modal>
  );
}