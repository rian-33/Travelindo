import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Data Login:", email, password);
    alert("Fitur integrasi Backend Login akan datang!");
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Sisi Kiri: Gambar Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070&auto=format&fit=crop"
          alt="Pemandangan Bali"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/30"></div>
        <div className="absolute bottom-12 left-12 text-white pr-12">
          <h2 className="font-serif text-4xl font-bold mb-3">
            Selamat Datang Kembali
          </h2>
          <p className="text-slate-200 text-lg font-light">
            Lanjutkan rencana perjalanan impian Anda dan temukan penawaran
            eksklusif bersama TraveLindo.
          </p>
        </div>
      </div>

      {/* Sisi Kanan: Form Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <Link
            to="/"
            className="text-2xl font-extrabold font serif text-slate-900 block mb-10 text-center"
          >
            Trave<span className="text-blue-600">Lindo</span>
          </Link>

          <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
            Masuk ke Akun
          </h3>
          <p className="text-slate-500 text-sm mb-8 font-light">
            Silakan masukkan email dan kata sandi Anda.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:font-light"
                placeholder="nama@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Kata Sandi
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:font-light"
                placeholder="••••••••"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />{" "}
                Ingat saya
              </label>
              <a
                href="#"
                className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
              >
                Lupa sandi?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors duration-300 mt-4"
            >
              Masuk
            </button>
          </form>

          <div className="mt-8 flex items-center justify-between">
            <span className="border-b border-slate-200 w-1/4"></span>
            <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
              Atau masuk dengan
            </span>
            <span className="border-b border-slate-200 w-1/4"></span>
          </div>

          <button className="mt-6 w-full flex items-center justify-center gap-3 border border-slate-200 bg-white text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors">
            <i className="fa-brands fa-google text-red-500"></i> Google
          </button>

          <p className="mt-8 text-center text-sm text-slate-600">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-bold hover:underline"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
