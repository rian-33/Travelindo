import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plane, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Beranda" },
  { to: "/destinations", label: "Destinasi" },
  { to: "/hotels", label: "Penginapan" },
  { to: "/culinary", label: "Kuliner" },
  { to: "/promo", label: "Promo" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-surface-elevated/95 backdrop-blur-md shadow-sm border-b border-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3" onClick={closeMenu}>
            <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-text-inverse shadow-lg">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold font-serif text-text-primary">
                Trave<span className="text-brand-primary">Lindo</span>
              </span>
              <p className="text-xs text-text-muted font-medium uppercase">
                Your Travel Partner
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" aria-label="Navigasi utama">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={location.pathname === link.to ? "page" : undefined}
                className={cn(
                  "font-medium text-text-secondary hover:text-brand-primary transition-colors",
                  location.pathname === link.to && "font-semibold text-brand-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="hidden sm:inline-block text-text-secondary font-medium px-5 py-2 rounded-full hover:text-text-inverse hover:bg-brand-primary transition-all duration-300"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="bg-brand-primary text-text-inverse px-5 py-2 rounded-full font-semibold hover:bg-brand-primary-hover hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Daftar
            </Link>

            {/* Hamburger Toggle - Mobile Only */}
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-muted transition-colors"
              aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-brand bg-surface-elevated border-t border-border",
          isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="px-6 py-4 space-y-1" aria-label="Navigasi utama mobile">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              aria-current={location.pathname === link.to ? "page" : undefined}
              className={cn(
                "block px-4 py-3 rounded-xl font-medium text-text-secondary hover:text-brand-primary hover:bg-surface-muted transition-colors",
                location.pathname === link.to && "bg-brand-primary-light font-semibold text-brand-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}