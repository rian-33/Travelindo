import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { pageVariants, pageVariantsSlide } from '@/lib/motion';

export function PageTransition({ children, mode = 'wait', variant = 'fade' }) {
  const location = useLocation();

  const variants = variant === 'slide' ? pageVariantsSlide : pageVariants;

  return (
    <AnimatePresence mode={mode}>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full"
      >
        {children ?? <Outlet />}
      </motion.div>
    </AnimatePresence>
  );
}