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
    <div className="min-h-screen bg-slate-50">
      <Navbar isNavbarVisible />

      {/* ===== BANNER ===== */}
      <section className="pt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <img
            src={bannerImg}
            alt="Banner Materi"
            className="w-full h-[260px] object-cover rounded-2xl"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-20 mt-10">
        {/* ===== MAPEL ===== */}
        <div className="overflow-hidden">
          <div className="flex gap-3 overflow-x-auto pb-2 pr-1">
            <button
              onClick={() => setSelectedKategori(null)}
              className={`px-6 py-3 text-sm font-semibold rounded-xl whitespace-nowrap transition
          ${
            selectedKategori === null
              ? "bg-yellow-400 text-black"
              : "bg-edubiru text-white hover:bg-edubiru-700"
          }`}
            >
              Semua Materi
            </button>

            {kategori.map((k) => (
              <button
                key={k.id}
                onClick={() => setSelectedKategori(k.id)}
                className={`px-6 py-3 text-sm font-semibold rounded-xl whitespace-nowrap transition
            ${
              selectedKategori === k.id
                ? "bg-yellow-400 text-black"
                : "bg-edubiru text-white hover:bg-edubiru-700"
            }`}
              >
                {k.nama}
              </button>
            ))}
          </div>
        </div>

        {/* ===== SEARCH ===== */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Cari materi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border focus:ring-2 focus:ring-edubiru outline-none"
          />
        </div>
      </section>

      {/* ===== MATERI ===== */}
      <main className="max-w-7xl mx-auto px-6 md:px-20 py-12">
        {loading && <p>Memuat...</p>}

        {!loading && filteredMateri.length === 0 && (
          <p className="text-slate-500">Materi tidak ditemukan</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredMateri.map((m) => (
            <MateriCard key={m.id} materi={m} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
