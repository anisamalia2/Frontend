import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MateriCard from "../components/MateriCard";
import api from "../utils/api";
import bannerImg from "../assets/images/materi/Banner.png";
import Footer from "../components/Footer";

export default function MateriSiswa() {
  const [materi, setMateri] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedKategori, setSelectedKategori] = useState(null);

  useEffect(() => {
    Promise.all([api.get("/api/materi"), api.get("/api/kategori")])
      .then(([materiRes, kategoriRes]) => {
        setMateri(materiRes.data.data || materiRes.data);
        setKategori(kategoriRes.data.data || kategoriRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  // ===== FILTER =====
  const filteredMateri = materi.filter((m) => {
    const cocokSearch = m.judul.toLowerCase().includes(search.toLowerCase());

    const cocokKategori =
      !selectedKategori || m.kategori_id === selectedKategori;

    return cocokSearch && cocokKategori;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-poppins text-slate-900">
      <Navbar isNavbarVisible />

      {/* ===== BANNER ===== */}
      <section className="pt-28 pb-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200 group">
            <img
              src={bannerImg}
              alt="Banner Materi"
              className="w-full h-[200px] sm:h-[260px] object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay tipis agar teks banner (jika ada) lebih terbaca */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mt-8">
        {/* ===== MAPEL (Kategori) ===== */}
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedKategori(null)}
              className={`px-6 py-2.5 text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300 shadow-sm border ${
                selectedKategori === null
                  ? "bg-yellow-400 text-slate-900 border-yellow-400 shadow-yellow-200 scale-105"
                  : "bg-edubiru text-white border-edubiru hover:bg-edubiru-700 hover:shadow-md"
              }`}
            >
              Semua Materi
            </button>

            {kategori.map((k) => (
              <button
                key={k.id}
                onClick={() => setSelectedKategori(k.id)}
                className={`px-6 py-2.5 text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300 shadow-sm border ${
                  selectedKategori === k.id
                    ? "bg-yellow-400 text-slate-900 border-yellow-400 shadow-yellow-200 scale-105"
                    : "bg-edubiru text-white border-edubiru hover:bg-edubiru-700 hover:shadow-md"
                }`}
              >
                {k.nama}
              </button>
            ))}
          </div>
        </div>

        {/* ===== SEARCH ===== */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Cari judul materi pelajaran..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border border-slate-200 shadow-sm focus:border-edubiru focus:ring-4 focus:ring-edubiru/10 outline-none transition-all duration-300 bg-white text-base placeholder:text-slate-400"
          />
        </div>
      </section>

      {/* ===== MATERI GRID ===== */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 min-h-[50vh]">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-edubiru rounded-full animate-spin mb-4"></div>
            <p className="animate-pulse font-medium">Sedang memuat materi...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredMateri.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-800 font-bold text-lg">
              Materi tidak ditemukan
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Coba cari dengan kata kunci lain.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedKategori(null);
              }}
              className="mt-4 text-edubiru font-semibold hover:underline text-sm"
            >
              Reset Pencarian
            </button>
          </div>
        )}

        {/* Grid Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredMateri.map((m) => (
            <div key={m.id} className="h-full">
              <MateriCard materi={m} />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
