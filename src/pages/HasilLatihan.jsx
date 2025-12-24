import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

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

  if (loading) return <p className="p-6">Memuat hasil...</p>;
  if (!result) return <p className="p-6">Hasil tidak ditemukan</p>;

  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar title="Hasil" />

      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-6">Ringkasan Hasil</h1>

        <p className="text-4xl font-extrabold text-edubiru mb-2">
          {result.skor} / {result.total_soal}
        </p>

        <p className="text-lg mb-8">
          Nilai Akhir:{" "}
          <span className="font-bold text-yellow-500">
            {result.nilai_persen}%
          </span>
        </p>

        {/* ===== BUTTON ===== */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(`/detail-latihan-soal/${id}`)}
            className="bg-edubiru text-white px-6 py-3 rounded-lg font-semibold"
          >
            Coba Lagi
          </button>

          <button
            onClick={() => navigate(`/pembahasan/${id}`)}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold"
          >
            Pembahasan
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
