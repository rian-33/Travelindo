// frontend/src/pages/Hotels.jsx
import { Link } from "react-router-dom";

export default function Hotels() {
  const hotels = [
    {
      id: 1,
      name: "Ayana Resort",
      location: "Bali",
      price: 3500000,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1566073171639-4420161083ea?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Tentrem Hotel",
      location: "Yogyakarta",
      price: 1800000,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c0d589rx?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Padma Hotel",
      location: "Bandung",
      price: 2100000,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1542314831-c6a4d27160c9?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Plataran Komodo",
      location: "Labuan Bajo",
      price: 4200000,
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-10 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-slate-900 mb-2">
          Penginapan Eksklusif
        </h1>
        <p className="text-slate-500 mb-10">
          Tempat beristirahat terbaik setelah seharian menjelajah.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden border border-slate-100 group"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-xs font-bold shadow flex items-center gap-1">
                  <i className="fa-solid fa-star text-amber-500"></i>{" "}
                  {hotel.rating}
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                  {hotel.location}
                </p>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">
                  {hotel.name}
                </h3>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-blue-600 font-bold text-lg">
                      Rp {hotel.price.toLocaleString("id-ID")}
                    </p>
                    <p className="text-slate-400 text-xs">per malam</p>
                  </div>
                  <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                    Pesan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
