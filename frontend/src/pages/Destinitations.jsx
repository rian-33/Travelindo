import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDestinations } from "../services/api";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mengambil semua data destinasi dari Backend saat halaman dibuka
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getDestinations("");
      setDestinations(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-10 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-slate-900 mb-2">
          Semua Destinasi
        </h1>
        <p className="text-slate-500 mb-10">
          Jelajahi seluruh keindahan nusantara dari Sabang hingga Merauke.
        </p>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Link
                to={`/destination/${dest.id}`}
                key={dest.id}
                className="group block cursor-pointer"
              >
                <div className="relative h-64 mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-sm font-bold text-slate-800 shadow-sm">
                    {dest.name}
                  </div>
                </div>
                <div className="flex justify-between items-center px-1">
                  <p className="text-slate-500 text-sm">
                    <i className="fa-solid fa-location-dot text-blue-500 mr-1"></i>
                    {dest.location}
                  </p>
                  <p className="font-semibold text-slate-900">
                    Rp {dest.estimatedBudget.toLocaleString("id-ID")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
