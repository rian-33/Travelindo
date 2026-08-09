// frontend/src/pages/Home.jsx
import { useState, useEffect } from "react";
import { getDestinations } from "../services/api";
// - Modifikasi Home.jsx

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // useEffect dijalankan SEKALI saat halaman pertama dibuka.
  useEffect(() => {
    fetchDestinations("");
  }, []); // [] artinya hanya jalan sekali.

  const fetchDestinations = async (searchQuery) => {
    setIsLoading(true); // Tampilkan loading
    const data = await getDestinations(searchQuery); // Memanggil fungsi API[cite: 20]
    setDestinations(data); // Menyimpan data dari Backend ke state
    setIsLoading(false); // Sembunyikan loading
  };

  const handleQuickSearch = () => {
    fetchDestinations(region); // Memanggil ulang API berdasarkan input wilayah
  };

  return (
    <>
      {/* 1. HERO SECTION & HEADLINE MENARIK */}
      <section className="hero-gradient min-h-[90vh] flex items-center justify-center px-4 relative pt-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-900/30"></div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10 w-full">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Temukan Liburan <span className="text-blue-400">Terbaik</span>{" "}
            <br /> Sesuai Budget Anda.
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Jelajahi keindahan Indonesia dari pantai hingga gunung dengan
            penawaran harga eksklusif.
          </p>

          {/* 3. FITUR PEMESANAN / PENCARIAN */}
          <div className="bg-white p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mt-8">
            {/* Destinasi */}
            <div className="flex-1 flex flex-col items-start border-r border-slate-200 pr-4">
              <label className="text-xs font-bold text-slate-500 uppercase mb-1">
                Destinasi
              </label>
              <div className="flex items-center w-full">
                <i className="fa-solid fa-location-dot text-blue-500 mr-2"></i>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-transparent font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="">Semua Lokasi</option>
                  <option value="Bali">Bali</option>
                  <option value="Yogyakarta">Yogyakarta</option>
                </select>
              </div>
            </div>

            {/* Check-in (Mockup UI) */}
            <div className="flex-1 flex flex-col items-start border-r border-slate-200 px-4">
              <label className="text-xs font-bold text-slate-500 uppercase mb-1">
                Tanggal
              </label>
              <div className="flex items-center w-full text-slate-800 font-semibold cursor-pointer">
                <i className="fa-regular fa-calendar text-blue-500 mr-2"></i>{" "}
                Pilih Tanggal
              </div>
            </div>

            <button
              onClick={handleQuickSearch}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg flex items-center justify-center whitespace-nowrap"
            >
              Cari Liburan
            </button>
          </div>
        </div>
      </section>

      {/* 4. PROMO DAN DISKON */}
      <section className="py-12 max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between shadow-xl text-white">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              Diskon Pengguna Baru! 🎉
            </h3>
            <p>
              Gunakan kode{" "}
              <span className="font-mono bg-white/20 px-2 py-1 rounded">
                TRAVELINDO20
              </span>{" "}
              untuk diskon 20%
            </p>
          </div>
          <button className="mt-4 md:mt-0 bg-white text-blue-700 px-6 py-2 rounded-full font-bold hover:bg-slate-100">
            Klaim Sekarang
          </button>
        </div>
      </section>

      {/* 2 & 5. INFORMASI DESTINASI & DESKRIPSI (Menampilkan Data dari API) */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
          Rekomendasi Terbaik
        </h2>

        {isLoading ? (
          <div className="text-center py-10">Loading data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-slate-100 group flex flex-col"
              >
                <div className="relative h-60 overflow-hidden">
                  {/* 6. GAMBAR BERKUALITAS */}
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-sm font-bold shadow flex items-center gap-1">
                    <i className="fa-solid fa-star text-yellow-400"></i>{" "}
                    {dest.rating}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs font-semibold text-blue-600 mb-1">
                    {dest.location}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {dest.name}
                  </h3>
                  {/* 5. Deskripsi Harga */}
                  <p className="text-slate-500 text-sm mb-4">Mulai dari</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-orange-600 font-extrabold text-xl">
                      Rp {dest.estimatedBudget.toLocaleString("id-ID")}
                    </span>
                    {/* 8. CTA BUTTON */}
                    <button className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
