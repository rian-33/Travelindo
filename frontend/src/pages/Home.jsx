// frontend/src/pages/Home.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDestinations(region);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* 1. HERO SECTION - Gaya Editorial Minimalis */}
      <section className="relative pt-28 pb-32 lg:pt-40 lg:pb-48 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1553603227-2358aabe8eb8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] z-0 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <p className="text-blue-600 font-semibold tracking-[0.2em] text-sm mb-6 uppercase flex items-center gap-3">
            <span className="w-8 h-[1px] bg-blue-600"></span>
            Kurasi Perjalanan Eksklusif
            <span className="w-8 h-[1px] bg-blue-600"></span>
          </p>

          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 max-w-4xl">
            Temukan Keindahan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-500 italic font-normal">
              Tersembunyi Indonesia
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mb-12 font-light leading-relaxed">
            Lepaskan diri dari rutinitas. Kami merancang pengalaman liburan
            premium yang disesuaikan dengan ritme dan anggaran Anda.
          </p>

          {/* Fitur Pemesanan - Clean UI */}
          <form
            onSubmit={handleSearch}
            className="bg-white p-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col sm:flex-row items-center w-full max-w-3xl gap-2 transition-transform hover:-translate-y-1 duration-500"
          >
            <div className="flex-1 flex items-center px-6 w-full">
              <i className="fa-solid fa-location-dot text-slate-400 mr-3"></i>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-transparent text-slate-700 font-medium focus:outline-none appearance-none cursor-pointer py-3"
              >
                <option value="">Destinasi (Semua Area)</option>
                <option value="Bali">Bali & Nusa Tenggara</option>
                <option value="Yogyakarta">Jawa Tengah & DIY</option>
                <option value="Lombok">Lombok</option>
              </select>
            </div>

            <div className="hidden sm:block w-[1px] h-8 bg-slate-200"></div>

            <div className="flex-1 flex items-center px-6 w-full border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
              <i className="fa-regular fa-calendar text-slate-400 mr-3"></i>
              <input
                type="text"
                placeholder="Kapan Anda berangkat?"
                className="w-full bg-transparent text-slate-700 font-medium focus:outline-none py-3"
                readOnly
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 mt-2 sm:mt-0 flex items-center justify-center gap-2"
            >
              <span>Eksplorasi</span>
              <i className="fa-solid fa-arrow-right text-sm"></i>
            </button>
          </form>
        </div>
      </section>

      {/* 2. PROMO - Gaya Banner Majalah */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24 relative z-20">
        <div className="bg-slate-900 rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-slate-900/20">
          <div className="p-10 md:p-14 flex-1 flex flex-col justify-center">
            <div className="text-emerald-400 font-semibold tracking-widest text-sm mb-4">
              PENAWARAN TERBATAS
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-white font-bold mb-4">
              Pengalaman Premium, Harga Bersahabat.
            </h3>
            <p className="text-slate-400 font-light mb-8 max-w-md">
              Klaim potongan 20% untuk pemesanan pertama Anda menuju destinasi
              eksotis Indonesia.
            </p>
            <div className="flex items-center gap-4">
              <span className="bg-white/10 text-white border border-white/20 font-mono px-4 py-2 rounded-lg tracking-wider">
                TRAVELINDO20
              </span>
              <button className="text-white font-semibold hover:text-emerald-400 transition-colors flex items-center gap-2">
                Salin Kode <i className="fa-regular fa-copy"></i>
              </button>
            </div>
          </div>
          <div className="md:w-2/5 h-64 md:h-auto bg-[url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        </div>
      </section>

      {/* 3. DESTINASI - Grid Elegan */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-3">
              Destinasi Pilihan
            </h2>
            <p className="text-slate-500 font-light text-lg">
              Kurasi tempat-tempat menakjubkan untuk dicatat di jurnal Anda.
            </p>
          </div>
          <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center gap-2 group">
            Lihat Semua Destinasi
            <i className="fa-solid fa-arrow-right-long transform group-hover:translate-x-2 transition-transform"></i>
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {destinations.length > 0 ? (
              destinations.map((dest) => (
                <Link
                  to={`/destination/${dest.id}`}
                  key={dest.id}
                  className="group block cursor-pointer"
                >
                  <div className="relative h-[320px] mb-5 overflow-hidden rounded-2xl bg-slate-200">
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Gradient overlay for text readability if needed later */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1">
                      <i className="fa-solid fa-star text-slate-900 text-[10px]"></i>{" "}
                      {dest.rating}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                      {dest.location}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                      {dest.name}
                    </h3>

                    <div className="flex items-end justify-between mt-4">
                      <div>
                        <p className="text-slate-400 text-xs mb-1">
                          Mulai dari
                        </p>
                        <p className="font-semibold text-slate-900 text-lg">
                          Rp {dest.estimatedBudget.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white transition-all duration-300">
                        <i className="fa-solid fa-arrow-right -rotate-45"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-slate-500 text-lg font-light">
                  Belum ada destinasi yang sesuai dengan pencarian Anda.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
