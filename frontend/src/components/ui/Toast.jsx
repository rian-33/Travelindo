import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, Loader2 } from 'lucide-react';
import { useUIStore } from '@/stores';

const toastVariants = {
  initial: { opacity: 0, x: 400, scale: 0.9 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: 400, scale: 0.9 },
};

const toastStyles = {
  success: 'border-l-4 border-brand-accent',
  error: 'border-l-4 border-red-500',
  info: 'border-l-4 border-blue-500',
  loading: 'border-l-4 border-brand-primary',
};

const iconComponents = {
  success: <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />,
  info: <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />,
  loading: <Loader2 className="w-5 h-5 text-brand-primary animate-spin flex-shrink-0" />,
};

const ToastItem = ({ toast, onClose }) => (
  <motion.div
    key={toast.id}
    variants={toastVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className={cn(
      'toast-custom flex items-start gap-3 p-4 min-w-[320px] max-w-md',
      'rounded-xl shadow-float border border-border bg-surface-elevated',
      toastStyles[toast.type] || toastStyles.info
    )}
  >
    <div className="flex-shrink-0 mt-0.5">{iconComponents[toast.type]}</div>
    <div className="flex-1 min-w-0">
      {toast.title && (
        <p className="font-semibold text-text-primary mb-1">{toast.title}</p>
      )}
      {toast.message && (
        <p className="text-text-secondary text-sm">{toast.message}</p>
      )}
      {toast.action && (
        <button
          onClick={() => { toast.action.onClick(); onClose(toast.id); }}
          className="mt-2 text-sm font-medium text-brand-primary hover:underline"
        >
          {toast.action.label}
        </button>
      )}
    </div>
    <button
      onClick={() => onClose(toast.id)}
      className="flex-shrink-0 p-1 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-surface-muted"
      aria-label="Tutup notifikasi"
    >
      <X className="w-4 h-4" />
    </button>
  </motion.div>
);

export function ToastContainer() {
  const { toasts } = useUIStore();

  const removeToast = (id) => {
    useUIStore.getState().removeToast(id);
  };

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onClose={removeToast} />
          </div>
        ))}
      </div>
    </AnimatePresence>
  );
}

export function useToast() {
  const addToast = useUIStore((state) => state.addToast);

  const toast = {
    success: (title, message, action) => addToast({ type: 'success', title, message, action }),
    error: (title, message, action) => addToast({ type: 'error', title, message, action }),
    info: (title, message, action) => addToast({ type: 'info', title, message, action }),
    loading: (title, message) => addToast({ type: 'loading', title, message }),
    custom: (toast) => addToast(toast),
  };

  return toast;
}