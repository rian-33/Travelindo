import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDestinationById } from "../services/api";

export default function DetailDestination() {
  const { id } = useParams(); // Mengambil ID dari URL React
  const [dest, setDest] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await getDestinationById(id);
      setDest(data);
    };
    fetchDetail();
  }, [id]);

  if (!dest) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Link to="/" className="text-blue-600 mb-5 inline-block font-bold">
        <i className="fa-solid fa-arrow-left"></i> Kembali
      </Link>
      <img
        src={dest.imageUrl}
        alt={dest.name}
        className="w-full h-80 object-cover rounded-2xl mb-6 shadow-lg"
      />
      <h1 className="text-4xl font-extrabold text-slate-900">{dest.name}</h1>
      <p className="text-lg text-slate-500 mb-4">
        <i className="fa-solid fa-location-dot text-blue-500"></i>{" "}
        {dest.location}
      </p>
      <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
        <p className="text-sm text-slate-500">Estimasi Budget</p>
        <p className="text-3xl font-bold text-orange-600">
          Rp {dest.estimatedBudget.toLocaleString("id-ID")}
        </p>
        <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">
          Pesan Tiket Sekarang
        </button>
      </div>
    </div>
  );
}
