import { Link } from "react-router-dom";

export default function Promo() {
  const promos = [
    {
      id: 1,
      title: "Diskon Pengguna Baru",
      code: "TRAVELINDO20",
      desc: "Potongan 20% untuk pemesanan pertama destinasi manapun.",
      color: "from-blue-600 to-indigo-700",
    },
    {
      id: 2,
      title: "Liburan Keluarga",
      code: "FAMILYFUN",
      desc: "Cashback Rp 500.000 untuk pemesanan penginapan tipe Villa.",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 3,
      title: "Eksplorasi Timur",
      code: "TIMURINDAH",
      desc: "Diskon khusus penerbangan dan tur ke wilayah NTT & Papua.",
      color: "from-emerald-500 to-teal-700",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-10 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-slate-900 mb-2">
          Promo & Penawaran
        </h1>
        <p className="text-slate-500 mb-10">
          Gunakan kode kupon di bawah ini saat melakukan pembayaran.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className={`bg-gradient-to-br ${promo.color} rounded-2xl p-6 text-white shadow-lg relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
              <p className="text-white/80 text-sm mb-6 min-h-[40px]">
                {promo.desc}
              </p>
              <div className="bg-white/20 border border-white/40 border-dashed rounded-lg p-3 flex justify-between items-center backdrop-blur-sm">
                <span className="font-mono font-bold tracking-wider">
                  {promo.code}
                </span>
                <button className="bg-white text-slate-900 text-xs px-3 py-1.5 rounded-md font-bold hover:bg-slate-100">
                  Salin
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
