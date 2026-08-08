export default function Destinations() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full mb-8 text-4xl shadow-inner">
        <i className="fa-solid fa-map-location-dot"></i>
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
        Eksplorasi Tempat Wisata
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Halaman ini nantinya akan menampilkan daftar lengkap semua direktori
        destinasi wisata di Indonesia beserta filter pencarian yang lebih
        detail.
      </p>
      <button className="mt-8 bg-slate-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-600 transition-colors">
        Segera Hadir
      </button>
    </div>
  );
}
