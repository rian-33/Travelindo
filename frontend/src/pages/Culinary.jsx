import { useEffect, useState } from "react";
import { getCulinaryPlaces } from "../services/api";

export default function Culinary() {
  const [places, setPlaces] = useState([]);
  const [region, setRegion] = useState("");

  useEffect(() => {
    getCulinaryPlaces().then(setPlaces);
  }, []);

  const regions = [...new Set(places.map((place) => place.region))].sort();
  const visiblePlaces = region
    ? places.filter((place) => place.region === region)
    : places;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 font-sans lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="mb-2 font-serif text-4xl font-bold text-slate-900">
              Sajian Kuliner Khas
            </h1>
            <p className="text-slate-500">
              Cicipi kekayaan rasa Nusantara dari wilayah pilihan Anda.
            </p>
          </div>
          <select
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 md:w-72"
          >
            <option value="">Seluruh wilayah</option>
            {regions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visiblePlaces.map((place) => (
            <article
              key={place.id}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
            >
              <img
                src={place.imageUrl}
                alt={place.name}
                className="h-56 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  {place.region}
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  {place.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {place.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
