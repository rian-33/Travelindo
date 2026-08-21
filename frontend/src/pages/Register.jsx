// frontend/src/pages/Register.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Data Daftar:", name, email, password);
    alert("Fitur integrasi Backend Register akan datang!");
  };

  return (
    <div className="min-h-screen flex font-sans">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=2070&auto=format&fit=crop"
          alt="Gunung Rinjani"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40"></div>
        <div className="absolute bottom-12 left-12 text-white pr-12">
          <h2 className="font-serif text-4xl font-bold mb-3">
            Mulai Petualangan Baru
          </h2>
          <p className="text-slate-200 text-lg font-light">
            Bergabunglah dengan ribuan traveler lainnya dan rancang perjalanan
            tak terlupakan.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <Link
            to="/"
            className="text-2xl font-extrabold text-slate-900 block mb-8 text-center"
          >
            Trave<span className="text-blue-600">Lindo</span>
          </Link>

          <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
            Buat Akun Baru
          </h3>
          <p className="text-slate-500 text-sm mb-6 font-light">
            Lengkapi data diri Anda di bawah ini.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:font-light"
                placeholder="John Doe"
              />
            </div>
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
                placeholder="Minimal 8 karakter"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-slate-900 transition-colors duration-300 mt-6"
            >
              Daftar Sekarang
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-bold hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
