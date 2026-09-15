import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/home/Footer';
import { ToastContainer } from '@/components/ui/Toast';
import { useUIStore } from '@/stores';

export function Layout() {
  const { resolvedTheme } = useUIStore();

  return (
    <div className="min-h-screen flex flex-col" data-theme={resolvedTheme}>
      <Navbar />
      <main id="main-content" className="flex-1" role="main">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export function EmptyLayout({ children }) {
  return <>{children}</>;
}