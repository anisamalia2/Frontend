import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { CheckCircle, XCircle, Info, RefreshCw, Check } from "lucide-react";

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

  if (!data)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">
            Memuat pembahasan...
          </p>
        </div>
      </div>
    );

  // ===== LOGIKA NILAI & SEMANGAT =====
  const jumlahBenar = data.pembahasan.filter((s) => s.benar).length;
  const nilai = Math.round((jumlahBenar / data.total_soal) * 100);

  let pesanSemangat = "";
  let warnaSemangat = "";

  if (nilai === 100) {
    pesanSemangat = "Wow! Sempurna! Kamu luar biasa! 🎉";
    warnaSemangat = "text-green-600";
  } else if (nilai >= 80) {
    pesanSemangat = "Hebat! Pertahankan prestasimu! 🌟";
    warnaSemangat = "text-edubiru";
  } else if (nilai >= 60) {
    pesanSemangat = "Cukup Bagus! Tingkatkan lagi belajarmu ya! 💪";
    warnaSemangat = "text-yellow-600";
  } else {
    pesanSemangat = "Jangan patah semangat! Ayo pelajari lagi materinya! 🔥";
    warnaSemangat = "text-slate-500";
  }

  return (
    <div className="min-h-screen bg-slate-50 font-poppins text-slate-900">
      <Topbar title="Pembahasan Soal" />

      <main className="max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-20">
        {/* ================= HEADER ================= */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
            Pembahasan: {data.judul_quiz}
          </h1>
          <p className="text-slate-500">
            Review jawaban dan pelajari penjelasannya di bawah ini.
          </p>
        </div>

        {/* ================= LIST SOAL ================= */}
        <div className="space-y-8">
          {data.pembahasan.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden"
            >
              {/* Header Soal */}
              <div className="bg-slate-50 border-b border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="bg-yellow-400 text-slate-900 font-bold text-sm px-4 py-1.5 rounded-full shadow-sm">
                    Soal {item.nomor}
                  </span>
                  {item.benar ? (
                    <span className="flex items-center gap-1 text-green-600 text-sm font-bold bg-green-100 px-3 py-1 rounded-full">
                      <CheckCircle size={14} /> Benar
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-500 text-sm font-bold bg-red-100 px-3 py-1 rounded-full">
                      <XCircle size={14} /> Salah
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Pertanyaan */}
                <h2 className="font-bold text-lg md:text-xl text-slate-800 mb-6 leading-relaxed">
                  {item.pertanyaan}
                </h2>

                {/* List Opsi */}
                <div className="space-y-3 mb-8">
                  {item.opsi.map((o) => {
                    const isCorrect = o.key === item.jawaban_benar;
                    const isUser = o.key === item.jawaban_user;

                    let containerStyle =
                      "border-slate-200 bg-white text-slate-500 opacity-70";
                    let icon = null;

                    if (isCorrect) {
                      containerStyle =
                        "border-green-500 bg-green-50 text-slate-900 shadow-sm opacity-100 ring-1 ring-green-500";
                      icon = (
                        <CheckCircle
                          className="text-green-600 flex-shrink-0"
                          size={20}
                        />
                      );
                    } else if (isUser && !isCorrect) {
                      containerStyle =
                        "border-red-500 bg-red-50 text-slate-900 shadow-sm opacity-100 ring-1 ring-red-500";
                      icon = (
                        <XCircle
                          className="text-red-500 flex-shrink-0"
                          size={20}
                        />
                      );
                    }

                    return (
                      <div
                        key={o.key}
                        className={`relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${containerStyle}`}
                      >
                        <div className="font-bold text-sm min-w-[24px]">
                          {o.key}.
                        </div>
                        <div className="flex-grow font-medium text-sm md:text-base leading-snug">
                          {o.text}
                        </div>
                        {icon}
                      </div>
                    );
                  })}
                </div>

                {/* Penjelasan */}
                {item.penjelasan && (
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 md:p-6 flex gap-4 items-start">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mt-1 flex-shrink-0">
                      <Info size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-800 mb-1 text-sm uppercase tracking-wide">
                        Pembahasan
                      </h3>
                      <p className="text-slate-700 text-sm md:text-base leading-relaxed text-justify">
                        {item.penjelasan}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ================= RINGKASAN BAWAH ================= */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 text-center max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-slate-900">
            Ringkasan Review
          </h2>

          <div className="mb-10">
            {/* Nilai Besar (Tanpa %) */}
            <div className="text-6xl md:text-7xl font-black text-edubiru mb-2 tracking-tighter">
              {nilai}
            </div>

            {/* Label */}
            <div className="inline-block bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              Nilai Akhir
            </div>

            {/* Detail Benar/Total */}
            <p className="text-slate-500 text-sm font-bold mb-2">
              Jawaban Benar:{" "}
              <span className="text-slate-900">{jumlahBenar}</span> dari{" "}
              {data.total_soal} Soal
            </p>

            {/* KALIMAT SEMANGAT (DINAMIS) */}
            <p className={`text-base md:text-lg font-bold ${warnaSemangat}`}>
              {pesanSemangat}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Tombol Coba Lagi */}
            <button
              onClick={() => navigate(`/detail-latihan-soal/${id}`)}
              className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-600 px-6 py-3.5 rounded-xl font-bold hover:border-edubiru hover:text-edubiru transition-all w-full sm:w-auto"
            >
              <RefreshCw size={18} />
              Coba Lagi
            </button>

            {/* Tombol Selesai (Dashboard) */}
            <button
              onClick={() => navigate("/latihan-soal")}
              className="flex items-center justify-center gap-2 bg-yellow-400 text-slate-900 px-10 py-3.5 rounded-xl font-bold hover:bg-yellow-500 shadow-lg hover:-translate-y-1 transition-all w-full sm:w-auto"
            >
              <Check size={20} strokeWidth={3} />
              Selesai
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
