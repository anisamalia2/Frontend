import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

export default function DetailLatSoal() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  /* ================= FETCH QUIZ ================= */
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/api/quiz/${id}`);
        setQuiz(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) return <p className="p-6">Memuat...</p>;
  if (!quiz) return <p className="p-6">Quiz tidak ditemukan</p>;

  const soal = quiz.soal[currentIndex];
  const totalSoal = quiz.soal.length;
  const progress = ((currentIndex + 1) / totalSoal) * 100;

  const handleSelect = (soalId, key) => {
    setAnswers((prev) => ({ ...prev, [soalId]: key }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        jawaban: Object.entries(answers).map(([soal_id, opsi]) => ({
          soal_id: Number(soal_id),
          jawaban: opsi,
        })),
      };

      await api.post(`/api/quiz/${id}/submit`, payload);

      navigate(`/hasil-latihan/${id}`);
    } catch (err) {
      alert("Gagal submit jawaban");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar title="Soal" />

      <main className="max-w-4xl mx-auto px-6 md:px-20 py-10">
        {/* ================= JUDUL ================= */}
        <h1 className="text-2xl font-bold mb-6">{quiz.judul}</h1>

        {/* ================= NAV SOAL ================= */}
        <div className="flex gap-2 overflow-x-auto mb-4">
          {quiz.soal.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap
                ${
                  idx === currentIndex
                    ? "bg-yellow-400 text-black"
                    : "bg-slate-200 text-slate-700"
                }`}
            >
              Soal {idx + 1}
            </button>
          ))}
        </div>

        {/* ================= PROGRESS ================= */}
        <div className="h-2 bg-slate-200 rounded-full mb-6">
          <div
            className="h-full bg-yellow-400 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* ================= KARTU SOAL ================= */}
        <div className="bg-white rounded-xl shadow p-8">
          <div className="bg-yellow-400 text-black font-semibold text-center py-3 rounded-lg mb-6">
            {soal.pertanyaan}
          </div>

          <div className="space-y-4">
            {soal.opsi.map((opsi) => (
              <label
                key={opsi.key}
                className={`block border rounded-lg p-4 cursor-pointer transition
                  ${
                    answers[soal.id] === opsi.key
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-slate-300 hover:border-yellow-400"
                  }`}
              >
                <input
                  type="radio"
                  name={`soal-${soal.id}`}
                  className="hidden"
                  checked={answers[soal.id] === opsi.key}
                  onChange={() => handleSelect(soal.id, opsi.key)}
                />
                <strong>{opsi.key}.</strong> {opsi.text}
              </label>
            ))}
          </div>

          {/* ================= NAV BUTTON ================= */}
          <div className="flex justify-between mt-10">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
              className={`px-6 py-2 rounded-lg font-semibold
    ${
      currentIndex === 0
        ? "bg-slate-300 text-slate-600 cursor-not-allowed"
        : "bg-edubiru text-white hover:bg-edubiru/90"
    }`}
            >
              Soal Sebelumnya
            </button>

            <button
              onClick={async () => {
                if (currentIndex === totalSoal - 1) {
                  try {
                    const payload = {
                      answers: Object.entries(answers).map(
                        ([soal_id, jawaban]) => ({
                          soal_id: Number(soal_id),
                          jawaban,
                        })
                      ),
                    };

                    const res = await api.post(
                      `/api/quiz/${id}/submit`,
                      payload
                    );

                    navigate(`/hasil-latihan/${id}`, {
                      state: { result: res.data },
                    });
                  } catch (err) {
                    console.error(err.response?.data);
                    alert("Gagal submit jawaban");
                  }
                } else {
                  setCurrentIndex((i) => i + 1);
                }
              }}
              className="px-6 py-2 rounded-lg bg-yellow-400 text-black font-semibold"
            >
              {currentIndex === totalSoal - 1 ? "Selesai" : "Soal Selanjutnya"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
