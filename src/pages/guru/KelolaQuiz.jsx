import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthProvider";
import Navbar from "../../components/Navbar";

export default function KelolaQuiz() {
  const { user } = useAuth();

  // ================= STATE =================
  const [quizList, setQuizList] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [quiz, setQuiz] = useState({
    judul: "",
    kategori_id: "",
    kelas: "",
  });

  const [soal, setSoal] = useState([]);

  // ================= FETCH =================
  useEffect(() => {
    fetchQuiz();
    fetchKategori();
  }, []);

  const fetchQuiz = async () => {
    const res = await api.get("/api/quiz");
    setQuizList(res.data || []);
  };

  const fetchKategori = async () => {
    const res = await api.get("/api/kategori");
    setKategori(res.data || []);
  };

  // ================= PROTEKSI ROLE =================
  if (!user || user.role !== "GURU") {
    return <Navigate to="/" replace />;
  }

  // ================= FORM HANDLER =================
  const handleQuizChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const addSoal = (tipe) => {
    setSoal((prev) => [
      ...prev,
      {
        tipe,
        pertanyaan: "",
        opsi: tipe === "MCQ" ? { A: "", B: "", C: "", D: "" } : {},
        jawaban: "",
        penjelasan: "",
      },
    ]);
  };

  const updateSoal = (index, field, value) => {
    const copy = [...soal];
    copy[index][field] = value;
    setSoal(copy);
  };

  const updateOpsi = (sIndex, key, value) => {
    const copy = [...soal];
    copy[sIndex].opsi[key] = value;
    setSoal(copy);
  };

  const removeSoal = (index) => {
    setSoal((prev) => prev.filter((_, i) => i !== index));
  };

  // ================= EDIT =================
  const handleEditQuiz = async (q) => {
    setShowForm(true);
    setEditingId(q.id);
    setQuiz({
      judul: q.judul,
      kategori_id: q.kategori_id,
      kelas: q.kelas,
    });

    const res = await api.get(`/api/quiz/${q.id}`);
    // Mapping soal agar opsi MCQ tetap muncul
    const soalMapped = (res.data.soal || []).map((s) => {
      let opsiParsed = {};
      if (s.tipe === "MCQ") {
        try {
          opsiParsed =
            typeof s.opsi === "string" ? JSON.parse(s.opsi) : s.opsi || {};
          ["A", "B", "C", "D"].forEach((key) => {
            if (!opsiParsed[key]) opsiParsed[key] = "";
          });
        } catch {
          opsiParsed = { A: "", B: "", C: "", D: "" };
        }
      }
      return { ...s, opsi: opsiParsed };
    });
    setSoal(soalMapped);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await api.put(`/api/quiz/${editingId}`, { ...quiz, soal });
      } else {
        await api.post("/api/quiz", { ...quiz, soal });
      }
      setShowForm(false);
      setEditingId(null);
      setQuiz({ judul: "", kategori_id: "", kelas: "" });
      setSoal([]);
      fetchQuiz();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menyimpan quiz");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const deleteQuiz = async (id) => {
    if (!window.confirm("Hapus quiz ini?")) return;
    await api.delete(`/api/quiz/${id}`);
    fetchQuiz();
  };

  // ================= UI =================
  const Badge = ({ tipe }) => (
    <span
      className={`text-xs px-2 py-1 rounded ${
        tipe === "MCQ"
          ? "bg-blue-100 text-blue-700"
          : "bg-purple-100 text-purple-700"
      }`}
    >
      {tipe}
    </span>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-32 px-6 space-y-8">
        <h1 className="text-2xl font-bold text-edubiru-900">Kelola Quiz</h1>

        {/* ================= KATEGORI ================= */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {kategori.map((k) => (
            <div
              key={k.id}
              className="px-3 py-1 bg-yellow-300 text-black rounded-lg text-sm whitespace-nowrap"
            >
              {k.nama} (ID: {k.id})
            </div>
          ))}
        </div>

        {/* ================= TOMBOL TAMBAH ================= */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setQuiz({ judul: "", kategori_id: "", kelas: "" });
              setSoal([]);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            + Tambah Quiz
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-4">
          {/* ================= FORM ================= */}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="md:col-span-2 bg-white border rounded-xl p-6 space-y-6 shadow-sm"
            >
              <h2 className="font-semibold text-lg">
                {editingId ? "Edit Quiz" : "Buat Quiz Baru"}
              </h2>

              <input
                name="judul"
                value={quiz.judul}
                onChange={handleQuizChange}
                placeholder="Judul Quiz"
                className="w-full border p-2 rounded"
                required
              />

              <div className="grid md:grid-cols-2 gap-4">
                <select
                  name="kategori_id"
                  value={quiz.kategori_id}
                  onChange={handleQuizChange}
                  className="border p-2 rounded"
                  required
                >
                  <option value="">Pilih Mata Pelajaran</option>
                  {kategori.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.nama}
                    </option>
                  ))}
                </select>

                <input
                  name="kelas"
                  value={quiz.kelas}
                  onChange={handleQuizChange}
                  placeholder="Kelas"
                  className="border p-2 rounded"
                  required
                />
              </div>

              {/* ================= SOAL ================= */}
              <div className="space-y-6">
                {soal.map((s, i) => (
                  <div key={i} className="border rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <strong>Soal {i + 1}</strong>
                      <Badge tipe={s.tipe} />
                    </div>

                    <textarea
                      value={s.pertanyaan}
                      onChange={(e) =>
                        updateSoal(i, "pertanyaan", e.target.value)
                      }
                      placeholder="Pertanyaan"
                      className="w-full border p-2 rounded"
                      required
                    />

                    {s.tipe === "MCQ" && (
                      <>
                        {["A", "B", "C", "D"].map((key) => (
                          <input
                            key={key}
                            value={s.opsi[key]}
                            onChange={(e) => updateOpsi(i, key, e.target.value)}
                            placeholder={`Opsi ${key}`}
                            className="w-full border p-2 rounded"
                            required
                          />
                        ))}

                        <select
                          value={s.jawaban}
                          onChange={(e) =>
                            updateSoal(i, "jawaban", e.target.value)
                          }
                          className="w-full border p-2 rounded"
                          required
                        >
                          <option value="">Jawaban Benar</option>
                          {["A", "B", "C", "D"].map((k) => (
                            <option key={k} value={k}>
                              {k}
                            </option>
                          ))}
                        </select>
                      </>
                    )}

                    {s.tipe === "ESSAY" && (
                      <>
                        <textarea
                          value={s.jawaban}
                          onChange={(e) =>
                            updateSoal(i, "jawaban", e.target.value)
                          }
                          placeholder="Jawaban (guru)"
                          className="w-full border p-2 rounded"
                        />
                        <textarea
                          value={s.penjelasan}
                          onChange={(e) =>
                            updateSoal(i, "penjelasan", e.target.value)
                          }
                          placeholder="Penjelasan"
                          className="w-full border p-2 rounded"
                        />
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => removeSoal(i)}
                      className="text-sm text-red-600"
                    >
                      Hapus Soal
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addSoal("MCQ")}
                  className="border px-3 py-2 rounded"
                >
                  + MCQ
                </button>
                <button
                  type="button"
                  onClick={() => addSoal("ESSAY")}
                  className="border px-3 py-2 rounded"
                >
                  + Essay
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  disabled={loading}
                  className="bg-edubiru-500 hover:bg-edubiru-600 text-white px-6 py-2 rounded"
                >
                  {loading ? "Menyimpan..." : "Simpan Quiz"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="border px-4 py-2 rounded"
                >
                  Batal
                </button>
              </div>
            </form>
          )}

          {/* ================= LIST ================= */}
          <section className="md:col-span-1 space-y-4">
            <h2 className="font-semibold">Daftar Quiz</h2>

            {quizList.length === 0 ? (
              <div className="border rounded-xl p-6 text-center text-gray-500">
                Belum ada quiz
              </div>
            ) : (
              quizList.map((q) => (
                <div
                  key={q.id}
                  className="bg-white border rounded-xl p-4 shadow-sm space-y-2"
                >
                  <p className="text-sm text-gray-500">ID: {q.id}</p>
                  <p className="font-medium">{q.judul}</p>
                  <p className="text-sm text-gray-600">
                    Kelas {q.kelas} • {q.jumlah_soal} soal
                  </p>
                  <p className="text-sm text-gray-500">
                    {kategori.find((k) => k.id === q.kategori_id)?.nama || "-"}
                  </p>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEditQuiz(q)}
                      className="bg-edubiru-500 hover:bg-edubiru-600 text-white px-3 py-2 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteQuiz(q.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      </div>
    </>
  );
}
