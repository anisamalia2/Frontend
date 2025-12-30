import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { Trophy, RefreshCw, BookOpen } from "lucide-react";

export default function HasilLatihan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await api.get(`/api/quiz/${id}/result`);
        setResult(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  /* ================= LOADING STATE ================= */
  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">
            Memuat hasil...
          </p>
        </div>
      </div>
    );

  /* ================= ERROR STATE ================= */
  if (!result)
    return (
      <div className="min-h-screen bg-slate-50 pt-32 px-6 text-center">
        <p className="text-xl font-bold text-slate-800">
          Hasil tidak ditemukan
        </p>
        <button
          onClick={() => navigate("/latihan-soal")}
          className="mt-4 text-edubiru hover:underline"
        >
          Kembali ke Daftar
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 font-poppins text-slate-900">
      <Topbar title="Hasil" />

      {/* Padding disesuaikan (pt-32 pb-20) */}
      <main className="max-w-2xl mx-auto px-6 md:px-12 pt-32 pb-20 text-center">
        {/* ================= CARD HASIL ================= */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
          {/* Ikon Trophy */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center shadow-sm">
              <Trophy size={40} />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-slate-900">
            Ringkasan Hasil
          </h1>
          <p className="text-slate-500 mb-8">
            Berikut adalah pencapaianmu pada latihan ini.
          </p>

          {/* Skor Besar (Tanpa Persen) */}
          <div className="mb-10">
            {/* Angka Nilai */}
            <div className="text-6xl md:text-7xl font-black text-edubiru tracking-tighter mb-3">
              {result.nilai_persen}
            </div>

            {/* Label Nilai */}
            <div className="inline-block bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-sm font-bold mb-2">
              Nilai Akhir
            </div>

            {/* Detail Benar/Total */}
            <p className="text-slate-400 text-sm font-medium">
              Jawaban Benar: {result.skor} dari {result.total_soal} Soal
            </p>
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate(`/detail-latihan-soal/${id}`)}
              className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-600 px-6 py-3.5 rounded-xl font-bold hover:border-edubiru hover:text-edubiru transition-all w-full sm:w-auto"
            >
              <RefreshCw size={18} />
              Coba Lagi
            </button>

            <button
              onClick={() => navigate(`/pembahasan/${id}`)}
              className="flex items-center justify-center gap-2 bg-yellow-400 text-slate-900 px-8 py-3.5 rounded-xl font-bold hover:bg-yellow-500 shadow-lg hover:-translate-y-1 transition-all w-full sm:w-auto"
            >
              <BookOpen size={18} />
              Lihat Pembahasan
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
