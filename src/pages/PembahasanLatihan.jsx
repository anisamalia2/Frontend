import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

export default function PembahasanLatihan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPembahasan = async () => {
      try {
        const res = await api.get(`/api/quiz/${id}/pembahasan`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPembahasan();
  }, [id]);

  if (!data) return <p className="p-6">Memuat pembahasan...</p>;

  const jumlahBenar = data.pembahasan.filter((s) => s.benar).length;
  const nilai = Math.round((jumlahBenar / data.total_soal) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar title="Pembahasan Soal" />

      {/* 🔥 PADDING ATAS */}
      <main className="max-w-4xl mx-auto px-6 py-32">
        <h1 className="text-2xl font-bold mb-12">
          Pembahasan Latihan Soal {data.judul_quiz}
        </h1>

        {/* ================= SOAL ================= */}
        <div className="space-y-14">
          {data.pembahasan.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow border p-6">
              {/* ===== HEADER ===== */}
              <div className="flex items-start gap-4 mb-4">
                <span className="bg-yellow-400 text-black font-bold text-sm px-4 py-2 rounded-lg">
                  Soal {item.nomor}
                </span>

                <div>
                  <h2 className="font-semibold text-lg">{item.pertanyaan}</h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Jawaban Anda:{" "}
                    <strong>
                      {item.jawaban_user ? item.jawaban_user : "Tidak dijawab"}
                    </strong>
                  </p>
                </div>
              </div>

              {/* ===== PENJELASAN ===== */}
              {item.penjelasan && (
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5 mb-6">
                  <p className="font-semibold text-blue-700 mb-1">
                    Penjelasan:
                  </p>
                  <p className="text-slate-700 text-sm">{item.penjelasan}</p>
                </div>
              )}

              {/* ===== OPSI ===== */}
              <div className="space-y-3">
                {item.opsi.map((o) => {
                  const isCorrect = o.key === item.jawaban_benar;
                  const isUser = o.key === item.jawaban_user;

                  let style = "bg-slate-100 border-l-4 border-slate-300";

                  if (isCorrect) {
                    style = "bg-green-100 border-l-4 border-green-500";
                  } else if (isUser && !isCorrect) {
                    style = "bg-red-100 border-l-4 border-red-500";
                  }

                  return (
                    <div
                      key={o.key}
                      className={`${style} rounded-lg px-5 py-4`}
                    >
                      <strong>{o.key}.</strong> {o.text}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ================= RINGKASAN ================= */}
        <div className="mt-20 bg-white rounded-2xl shadow p-10 text-center">
          <h2 className="text-xl font-bold mb-3">Ringkasan Hasil</h2>

          <p className="text-4xl font-bold text-edubiru mb-2">
            {jumlahBenar}/{data.total_soal}
          </p>

          <p className="text-slate-600 mb-8">
            Nilai Akhir: <strong>{nilai}%</strong>
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate(`/detail-latihan-soal/${id}`)}
              className="bg-edubiru text-white px-6 py-3 rounded-lg font-semibold"
            >
              Coba Lagi
            </button>

            <button
              onClick={() => navigate("/latihan-soal")}
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold"
            >
              Kembali
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
