import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCulinaryPlaces, getDestinations } from "../services/api";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [culinaryPlaces, setCulinaryPlaces] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [destinationData, culinaryData] = await Promise.all([
        getDestinations("", true),
        getCulinaryPlaces(),
      ]);
      setDestinations(destinationData);
      setCulinaryPlaces(culinaryData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const regions = [
    ...new Set([
      ...destinations.map((destination) => destination.location),
      ...culinaryPlaces.map((place) => place.region),
    ]),
  ].sort();
  const visibleDestinations = selectedRegion
    ? destinations.filter(
        (destination) => destination.location === selectedRegion,
      )
    : destinations;
  const visibleCulinaryPlaces = selectedRegion
    ? culinaryPlaces.filter((place) => place.region === selectedRegion)
    : culinaryPlaces;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 font-sans lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="mb-2 font-serif text-4xl font-bold text-slate-900">
              Eksplorasi Berdasarkan Wilayah
            </h1>
            <p className="text-slate-500">
              Pilih wilayah untuk melihat wisata dan kuliner khas di sekitarnya.
            </p>
          </div>
          <label className="w-full md:w-72">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Pilih wilayah
            </span>
            <select
              value={selectedRegion}
              onChange={(event) => setSelectedRegion(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Seluruh Indonesia</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
          </div>
        ) : (
          <>
            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-slate-900">
                  Tempat Wisata
                </h2>
                <span className="text-sm text-slate-500">
                  {visibleDestinations.length} tempat
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {visibleDestinations.map((destination) => (
                  <Link
                    to={`/destination/${destination.id}`}
                    key={destination.id}
                    className="group block"
                  >
                    <div className="relative mb-4 h-64 overflow-hidden rounded-2xl bg-slate-200">
                      <img
                        src={destination.imageUrl}
                        alt={destination.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-bold text-slate-800 shadow-sm">
                        {destination.name}
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-1">
                      <p className="text-sm text-slate-500">
                        <i className="fa-solid fa-location-dot mr-1 text-blue-500" />
                        {destination.location}
                      </p>
                      <p className="font-semibold text-slate-900">
                        Rp {destination.estimatedBudget.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              {visibleDestinations.length === 0 && (
                <p className="py-12 text-center text-slate-500">
                  Belum ada tempat wisata di wilayah ini.
                </p>
              )}
            </section>

            <section className="mt-16">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-slate-900">
                    Kuliner Khas
                  </h2>
                  <p className="mt-1 text-slate-500">
                    Rasa lokal yang layak masuk daftar perjalanan Anda.
                  </p>
                </div>
                <span className="text-sm text-slate-500">
                  {visibleCulinaryPlaces.length} tempat
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visibleCulinaryPlaces.map((place) => (
                  <article
                    key={place.id}
                    className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
                  >
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      className="h-52 w-full object-cover"
                      loading="lazy"
                    />
                    <div className="p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
                        {place.region}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-slate-900">
                        {place.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        {place.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
              {visibleCulinaryPlaces.length === 0 && (
                <p className="py-12 text-center text-slate-500">
                  Belum ada data kuliner di wilayah ini.
                </p>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
