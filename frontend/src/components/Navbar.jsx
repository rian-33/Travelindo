import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              <i className="fa-solid fa-compass"></i>
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900">
                Pesona<span className="text-emerald-600">Nusantara</span>
              </span>
              <p className="text-xs text-slate-500 font-medium uppercase">
                Travel Planner
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Beranda
            </Link>
            <Link
              to="/"
              className="font-medium text-slate-600 hover:text-emerald-600"
            >
              Tempat Wisata
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
