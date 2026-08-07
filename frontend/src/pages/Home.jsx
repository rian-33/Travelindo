import { useState, useEffect } from "react";
import { getDestinations } from "../services/api";

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [region, setRegion] = useState("");

  // Otomatis tarik data saat halaman dimuat
  useEffect(() => {
    fetchDestinations("");
  }, []);

  const fetchDestinations = async (searchQuery) => {
    const data = await getDestinations(searchQuery);
    setDestinations(data);
  };

  const handleQuickSearch = () => {
    fetchDestinations(region);
  };

  return (
    <>
      <section className="hero-gradient min-h-[85vh] flex items-center justify-center text-white px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8 py-20">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Temukan Petualangan di{" "}
            <span className="text-emerald-400">Nusantara</span>
          </h1>

          <div className="bg-white p-3 rounded-2xl shadow-2xl max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center bg-slate-100 rounded-xl px-4 py-3 text-slate-800">
              <i className="fa-solid fa-location-dot text-emerald-600 mr-3"></i>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
              >
                <option value="">Semua Daerah</option>
                <option value="Bali">Bali</option>
                <option value="Yogyakarta">Yogyakarta</option>
                <option value="Lombok">Lombok</option>
                <option value="Labuan Bajo">Labuan Bajo</option>
              </select>
            </div>
            <button
              onClick={handleQuickSearch}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-xl flex items-center justify-center space-x-2"
            >
              <span>Cari Destinasi</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          Rekomendasi Pilihan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.length > 0 ? (
            destinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-white p-6 rounded-2xl shadow-md border border-slate-100"
              >
                <h3 className="text-xl font-bold mb-1">{dest.name}</h3>
                <p className="text-slate-500 mb-4">
                  <i className="fa-solid fa-location-dot text-emerald-500 mr-2"></i>
                  {dest.location}
                </p>
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Budget</p>
                    <span className="text-emerald-600 font-bold">
                      Rp {dest.estimatedBudget.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Rating</p>
                    <span className="text-amber-500 font-bold">
                      <i className="fa-solid fa-star mr-1"></i>
                      {dest.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 col-span-3 text-center">
              Destinasi tidak ditemukan.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
