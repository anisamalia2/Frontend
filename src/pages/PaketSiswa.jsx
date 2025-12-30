import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { CheckCircle, Zap } from "lucide-react"; // Opsional: Ikon pelengkap

export default function PaketSiswa() {
  const [paket, setPaket] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const res = await api.get("/api/paket");
        setPaket(res.data.data || res.data); // Handle kemungkinan format response
      } catch (error) {
        console.error("Gagal memuat paket:", error);
      }
    };
    fetchPaket();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-poppins text-slate-900">
      <Topbar title="Paket Bulanan" />

      {/* Padding disesuaikan: pt-32 (atas), pb-20 (bawah), px responsive */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20">
        {/* ===== HEADER SECTION ===== */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Upgrade Akses Belajarmu
          </h1>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            Pilih paket belajar terbaik untuk membuka seluruh materi dan latihan
            soal tanpa batas. Investasi terbaik untuk masa depanmu.
          </p>
        </div>

        {/* ===== GRID PAKET ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {paket.map((p) => (
            <div
              key={p.id}
              className="
                group
                bg-white
                border border-slate-200
                rounded-3xl
                shadow-lg hover:shadow-2xl
                hover:-translate-y-2
                p-8
                flex flex-col
                items-center
                text-center
                transition-all
                duration-300
                relative
                overflow-hidden
              "
            >
              {/* Dekorasi Hover Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 rounded-3xl transition-all duration-300 pointer-events-none"></div>

              {/* Ikon / Header Kecil */}
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                <Zap size={24} fill="currentColor" />
              </div>

              {/* Nama Paket */}
              <h3 className="text-lg font-bold text-slate-500 uppercase tracking-wider mb-2">
                Paket {p.duration_months} Bulan
              </h3>

              {/* Harga */}
              <div className="flex items-baseline justify-center gap-1 mb-6">
                <span className="text-sm font-semibold text-slate-400">Rp</span>
                <span className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  {p.harga.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Garis Pemisah */}
              <div className="w-full h-px bg-slate-100 mb-6"></div>

              {/* Benefit / Note */}
              <div className="mb-8 w-full">
                <div className="flex items-center gap-3 text-left bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <CheckCircle
                    className="text-green-500 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-sm font-semibold text-slate-700">
                    Akses penuh semua materi & soal
                  </span>
                </div>
              </div>

              {/* Button (Pushed to bottom) */}
              <button
                onClick={() => navigate(`/pembayaran/${p.id}`)}
                className="
                  mt-auto
                  w-full
                  bg-yellow-400
                  text-slate-900
                  py-3.5
                  rounded-xl
                  font-bold
                  shadow-md
                  shadow-yellow-400/20
                  hover:bg-yellow-500
                  hover:shadow-lg
                  active:scale-95
                  transition-all
                  duration-200
                "
              >
                Pilih Paket Ini
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
