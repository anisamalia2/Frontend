import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

export default function PaketSiswa() {
  const [paket, setPaket] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaket = async () => {
      const res = await api.get("/api/paket");
      setPaket(res.data.data);
    };
    fetchPaket();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar title="Paket Bulanan" />

      <main className="max-w-6xl mx-auto px-6 py-32">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Upgrade Akses Belajarmu
        </h1>

        <p className="text-slate-600 text-lg text-center mb-12">
          Pilih paket belajar untuk membuka seluruh materi dan latihan soal
          tanpa batas.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {paket.map((p) => (
            <div
              key={p.id}
              className="
                bg-white
                border-2 border-slate-200
                rounded-xl
                shadow-lg
                p-8
                text-center
                hover:border-yellow-400
                hover:shadow-2xl
                hover:scale-105
                transition
                duration-300
              "
            >
              {/* Label paket */}
              <div className="text-sm font-medium text-slate-500 mb-3">
                Paket {p.duration_months} Bulan
              </div>

              {/* Harga */}
              <div className="text-3xl font-bold mb-4">
                Rp {p.harga.toLocaleString("id-ID")}
              </div>

              {/* Note */}
              <div className="text-xs font-semibold text-yellow-600 mb-6 bg-yellow-100 py-1.5 rounded">
                Akses penuh semua materi
              </div>

              {/* Button */}
              <button
                onClick={() => navigate(`/pembayaran/${p.id}`)}
                className="
                  w-full
                  bg-yellow-400
                  text-black
                  py-3
                  rounded-lg
                  font-bold
                  hover:bg-yellow-500
                  transition
                "
              >
                Pilih Paket
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
