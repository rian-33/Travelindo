// frontend/src/components/Navbar.jsx
import { Link } from "react-router-dom";
// - Modifikasi dari Navbar yang lama.

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              <i className="fa-solid fa-plane"></i>
            </div>
            <div>
              {/* PERUBAHAN: Nama diganti menjadi TraveLindo */}
              <span className="text-xl font-extrabold text-slate-900">
                Trave<span className="text-blue-600">Lindo</span>
              </span>
              <p className="text-xs text-slate-500 font-medium uppercase">
                Your Travel Partner
              </p>
            </div>
          </Link>

          {/* PERUBAHAN: Menambahkan menu navigasi yang lebih lengkap */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Beranda
            </Link>
            <Link
              to="/destinations"
              className="font-medium text-slate-600 hover:text-blue-600"
            >
              Destinasi
            </Link>
            <Link
              to="/hotels"
              className="font-medium text-slate-600 hover:text-blue-600"
            >
              Penginapan
            </Link>
            <Link
              to="/promo"
              className="font-medium text-red-500 hover:text-red-600"
            >
              Promo
            </Link>
          </nav>

          {/* PERUBAHAN: Menambahkan tombol Login/Register (CTA Button) */}
          <div className="flex space-x-4">
            <button className="text-slate-600 font-medium hover:text-blue-600">
              Masuk
            </button>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 shadow-md">
              Daftar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
