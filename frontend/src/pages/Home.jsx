import { useState, useEffect } from "react";
import { getDestinations } from "../services/api";

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDestinations("");
  }, []);

  const fetchDestinations = async (searchQuery) => {
    setIsLoading(true);
    const data = await getDestinations(searchQuery);
    setDestinations(data);
    setIsLoading(false);
  };

  const handleQuickSearch = () => {
    fetchDestinations(region);
  };

  return (
    <>
      {/* HERO SECTION dengan Glassmorphism */}
      <section className="hero-gradient min-h-[90vh] flex items-center justify-center px-4 relative pt-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-slate-50"></div>

        <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10 w-full">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-sm font-semibold px-5 py-2 rounded-full backdrop-blur-md shadow-lg">
              <i className="fa-solid fa-plane-departure"></i> Eksplorasi Tanpa
              Batas
            </span>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white drop-shadow-2xl leading-tight">
              Rancang Perjalanan <br className="hidden sm:block" />
              <span className="text-emerald-400">Impian Anda</span>
            </h1>
          </div>

          {/* Kotak Pencarian Floating (Glassmorphism) */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 sm:p-3 rounded-[2rem] shadow-2xl max-w-3xl mx-auto flex flex-col sm:flex-row gap-2 transition-all duration-300 hover:bg-white/20">
            <div className="flex-1 flex items-center bg-white rounded-full px-6 py-4 shadow-inner">
              <i className="fa-solid fa-location-dot text-emerald-500 mr-3 text-xl"></i>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-700 focus:outline-none cursor-pointer appearance-none"
              >
                <option value="">Ke mana Anda ingin pergi?</option>
                <option value="Bali">Bali</option>
                <option value="Yogyakarta">Yogyakarta</option>
                <option value="Lombok">Lombok</option>
                <option value="Labuan Bajo">Labuan Bajo</option>
              </select>
            </div>
            <button
              onClick={handleQuickSearch}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/30 flex items-center justify-center space-x-2 hover:-translate-y-1"
            >
              <span>Cari</span>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION DESTINASI POPULER */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Destinasi Populer
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Pilihan terbaik untuk liburan Anda berikutnya.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.length > 0 ? (
              destinations.map((dest) => (
                /* KARTU DESTINASI (Interaktif) */
                <div
                  key={dest.id}
                  className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col hover:-translate-y-2"
                >
                  {/* Gambar dengan Efek Zoom In */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-2xl text-sm font-bold text-slate-800 shadow-sm flex items-center gap-1">
                      <i className="fa-solid fa-star text-amber-500 text-xs"></i>{" "}
                      {dest.rating}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-white">
                      {dest.location}
                    </div>
                  </div>

                  {/* Info Card */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1 line-clamp-1">
                      {dest.name}
                    </h3>
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                          Mulai dari
                        </p>
                        <span className="text-emerald-600 font-extrabold text-lg">
                          Rp {dest.estimatedBudget.toLocaleString("id-ID")}
                        </span>
                      </div>

                      {/* Tombol Maps Membulat */}
                      <a
                        href={dest.mapLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors duration-300 shadow-sm"
                        title="Buka di Google Maps"
                      >
                        <i className="fa-solid fa-location-arrow"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white rounded-3xl p-10 text-center border border-slate-100">
                <i className="fa-regular fa-compass text-4xl text-slate-300 mb-3"></i>
                <h3 className="text-xl font-bold text-slate-700">
                  Tidak Ditemukan
                </h3>
                <p className="text-slate-500">
                  Coba cari daerah destinasi lainnya.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
