import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-surface-elevated/95 backdrop-blur-md shadow-sm border-b border-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
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

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="font-semibold text-brand-primary hover:text-brand-secondary"
            >
              Beranda
            </Link>
            <Link
              to="/destinations"
              className="font-medium text-text-secondary hover:text-brand-primary transition-colors"
            >
              Destinasi
            </Link>
            <Link
              to="/hotels"
              className="font-medium text-text-secondary hover:text-brand-primary transition-colors"
            >
              Penginapan
            </Link>
            <Link
              to="/culinary"
              className="font-medium text-text-secondary hover:text-brand-primary transition-colors"
            >
              Kuliner
            </Link>
            <Link
              to="/promo"
              className="font-medium text-red-500 hover:text-red-600 transition-colors"
            >
              Promo
            </Link>
          </nav>

          <div className="flex space-x-4">
            <Link
              to="/login"
              className="text-text-secondary font-medium px-5 py-2 rounded-full hover:text-text-inverse hover:bg-brand-primary transition-all duration-300"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="bg-brand-primary text-text-inverse px-5 py-2 rounded-full font-semibold hover:bg-brand-primary-hover hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}