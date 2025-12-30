import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LatihanCard from "../components/LatihanCard";
import api from "../utils/api";
import { AlertCircle } from "lucide-react";

export default function LatSoalSiswa() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/quiz")
      .then((res) => {
        setData(res.data.data || res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-poppins text-slate-900">
      <Navbar isNavbarVisible />

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32">
        {/* ===== HEADER ===== */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
            Latihan Soal
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Kumpulan soal untuk mengasah pemahaman materi belajarmu.
          </p>
        </div>

        {/* ===== LOADING STATE ===== */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mb-3"></div>
            <p className="text-slate-500 font-medium animate-pulse">
              Memuat daftar soal...
            </p>
          </div>
        )}

        {/* ===== EMPTY STATE (Jika Data Kosong) ===== */}
        {!loading && data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 text-center px-4">
            <div className="p-3 bg-slate-50 rounded-full mb-3 text-slate-400">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Belum Ada Soal</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-md">
              Saat ini belum ada latihan soal yang tersedia. Silakan cek kembali
              nanti.
            </p>
          </div>
        )}

        {/* ===== LIST SECTION (TETAP VERTIKAL) ===== */}
        {/* Menggunakan space-y-5 agar jarak antar kartu sedikit lebih lega dan rapi */}
        <div className="space-y-5">
          {data.map((latihan) => (
            <LatihanCard key={latihan.id} latihan={latihan} />
          ))}
        </div>
      </main>
    </div>
  );
}
