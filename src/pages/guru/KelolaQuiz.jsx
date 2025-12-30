import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthProvider";
import Navbar from "../../components/Navbar";
import { FaPlus, FaTrash, FaEdit, FaSave, FaArrowLeft } from "react-icons/fa";

export default function KelolaQuiz() {
  const { user } = useAuth();

  const [quizList, setQuizList] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // State untuk filter kategori
  const [selectedKategori, setSelectedKategori] = useState(null);

  const [quiz, setQuiz] = useState({
    judul: "",
    kategori_id: "",
    kelas: "",
  });

  const [soal, setSoal] = useState([]);

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchQuiz();
    fetchKategori();
  }, []);

  const fetchQuiz = async () => {
    try {
      const res = await api.get("/api/quiz");
      setQuizList(res.data || []);
    } catch (error) {
      console.error("Gagal load quiz", error);
    }
  };

  const fetchKategori = async () => {
    try {
      const res = await api.get("/api/kategori");
      setKategori(res.data || []);
    } catch (error) {
      console.error("Gagal load kategori", error);
    }
  };

  // ================= LOGIKA FILTER =================
  const filteredQuizzes = selectedKategori
    ? quizList.filter((q) => q.kategori_id === selectedKategori)
    : quizList;

  // ================= PROTEKSI ROLE =================
  if (!user || user.role !== "GURU") {
    return <Navigate to="/" replace />;
  }

  // ================= HANDLERS FORM =================
  const handleQuizChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const addSoal = (tipe) => {
    setSoal((prev) => [
      ...prev,
      {
        tipe,
        pertanyaan: "",
        opsi:
          tipe === "MCQ"
            ? [
                { key: "A", text: "" },
                { key: "B", text: "" },
                { key: "C", text: "" },
                { key: "D", text: "" },
              ]
            : [],
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
    copy[sIndex].opsi = copy[sIndex].opsi.map((o) =>
      o.key === key ? { ...o, text: value } : o
    );
    setSoal(copy);
  };

  const removeSoal = (index) => {
    if (!window.confirm("Hapus soal ini?")) return;
    setSoal((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditQuiz = async (q) => {
    setShowForm(true);
    setEditingId(q.id);
    setQuiz({
      judul: q.judul,
      kategori_id: q.kategori_id,
      kelas: q.kelas,
    });

    try {
      const res = await api.get(`/api/quiz/${q.id}`);
      const soalMapped = (res.data.soal || []).map((s) => {
        const opsiParsed = s.tipe === "MCQ" ? [...(s.opsi || [])] : [];

        if (s.tipe === "MCQ") {
          ["A", "B", "C", "D"].forEach((key) => {
            if (!opsiParsed.find((o) => o.key === key))
              opsiParsed.push({ key, text: "" });
          });
          opsiParsed.sort((a, b) => a.key.localeCompare(b.key));
        }

        return { ...s, opsi: opsiParsed, penjelasan: s.penjelasan || "" };
      });

      setSoal(soalMapped);
    } catch (err) {
      alert("Gagal memuat detail soal");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    for (const [index, s] of soal.entries()) {
      if (s.tipe === "MCQ") {
        const filledOpsi = s.opsi.filter((o) => o.text.trim() !== "");
        if (filledOpsi.length < 2) {
          alert(`Soal No. ${index + 1} (MCQ) minimal punya 2 opsi terisi.`);
          setLoading(false);
          return;
        }
        if (!s.jawaban) {
          alert(`Soal No. ${index + 1} belum ada Kunci Jawaban.`);
          setLoading(false);
          return;
        }
      }
    }

    try {
      const payload = { ...quiz, soal };
      if (editingId) {
        await api.put(`/api/quiz/${editingId}`, payload);
      } else {
        await api.post("/api/quiz", payload);
      }
      setShowForm(false);
      resetForm();
      fetchQuiz();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal menyimpan quiz");
    } finally {
      setLoading(false);
    }
  };

  const deleteQuiz = async (id) => {
    if (!window.confirm("Yakin hapus quiz ini beserta seluruh soalnya?"))
      return;
    try {
      await api.delete(`/api/quiz/${id}`);
      fetchQuiz();
    } catch (err) {
      alert("Gagal menghapus quiz");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setQuiz({ judul: "", kategori_id: "", kelas: "" });
    setSoal([]);
  };

  const getSoalSummary = (soalList) => {
    if (!soalList || soalList.length === 0) return "0 Soal";
    const mcqCount = soalList.filter((s) => s.tipe === "MCQ").length;
    const essayCount = soalList.filter((s) => s.tipe === "ESSAY").length;
    let text = `${soalList.length} Soal`;
    if (mcqCount > 0 || essayCount > 0) {
      text += ` (`;
      if (mcqCount > 0) text += `${mcqCount} MCQ`;
      if (mcqCount > 0 && essayCount > 0) text += `, `;
      if (essayCount > 0) text += `${essayCount} Essay`;
      text += `)`;
    }
    return text;
  };

  return (
    <>
      <Navbar />

      {showForm ? (
        <div className="min-h-screen bg-gray-50 pt-24 pb-32 px-12 lg:px-20">
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8 space-y-6"
          >
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingId ? "Edit Quiz" : "Buat Quiz Baru"}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <FaArrowLeft /> Batal
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Judul Quiz
                </label>
                <input
                  name="judul"
                  value={quiz.judul}
                  onChange={handleQuizChange}
                  placeholder="Contoh: Ulangan Harian Biologi Bab 1"
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mata Pelajaran / Kategori
                </label>
                <select
                  name="kategori_id"
                  value={quiz.kategori_id}
                  onChange={handleQuizChange}
                  className="w-full border border-gray-300 p-2.5 rounded-lg bg-white"
                  required
                >
                  <option value="">-- Pilih Kategori --</option>
                  {kategori.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Kelas
                </label>
                <input
                  name="kelas"
                  value={quiz.kelas}
                  onChange={handleQuizChange}
                  placeholder="Contoh: 10 IPA 1"
                  className="w-full border border-gray-300 p-2.5 rounded-lg"
                  required
                />
              </div>
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <h3 className="text-lg font-bold text-gray-800">Daftar Soal</h3>
                <span className="text-sm text-gray-500">
                  Total: {soal.length} Soal
                </span>
              </div>

              {soal.length === 0 && (
                <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg text-gray-400">
                  Belum ada soal ditambahkan. Klik tombol di bawah.
                </div>
              )}

              {soal.map((s, i) => (
                <div
                  key={i}
                  className={`relative bg-gray-50 border rounded-xl p-5 shadow-sm transition-all hover:shadow-md ${
                    s.tipe === "MCQ"
                      ? "border-l-4 border-l-blue-500"
                      : "border-l-4 border-l-purple-500"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
                        #{i + 1}
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          s.tipe === "MCQ"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {s.tipe}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSoal(i)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Hapus Soal"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                      Pertanyaan
                    </label>
                    <textarea
                      value={s.pertanyaan}
                      onChange={(e) =>
                        updateSoal(i, "pertanyaan", e.target.value)
                      }
                      placeholder="Tulis pertanyaan disini..."
                      className="w-full border p-3 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                      rows={3}
                      required
                    />
                  </div>

                  {s.tipe === "MCQ" && (
                    <div className="mb-4 bg-white p-4 rounded-lg border border-gray-200">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                        Opsi Jawaban
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {s.opsi.map((o) => (
                          <div key={o.key} className="flex items-center gap-2">
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 font-bold text-gray-600 rounded">
                              {o.key}
                            </div>
                            <input
                              value={o.text}
                              onChange={(e) =>
                                updateOpsi(i, o.key, e.target.value)
                              }
                              placeholder={`Pilihan ${o.key}`}
                              className="w-full border p-2 rounded focus:border-blue-500 outline-none"
                              required
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                          Kunci Jawaban (Benar)
                        </label>
                        <div className="flex gap-4">
                          {["A", "B", "C", "D"].map((k) => (
                            <label
                              key={k}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name={`jawaban-${i}`}
                                value={k}
                                checked={s.jawaban === k}
                                onChange={(e) =>
                                  updateSoal(i, "jawaban", e.target.value)
                                }
                                className="w-4 h-4 text-blue-600"
                                required
                              />
                              <span className="font-medium text-gray-700">
                                {k}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {s.tipe === "ESSAY" && (
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                        Kunci Jawaban (Referensi Guru)
                      </label>
                      <textarea
                        value={s.jawaban}
                        onChange={(e) =>
                          updateSoal(i, "jawaban", e.target.value)
                        }
                        placeholder="Tulis kunci jawaban essay disini (untuk referensi penilaian)..."
                        className="w-full border p-3 rounded-lg bg-green-50 border-green-200"
                        rows={3}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
                      Penjelasan / Pembahasan (Opsional)
                    </label>
                    <textarea
                      value={s.penjelasan}
                      onChange={(e) =>
                        updateSoal(i, "penjelasan", e.target.value)
                      }
                      placeholder="Penjelasan yang akan muncul setelah siswa selesai mengerjakan..."
                      className="w-full border p-2 rounded-lg text-sm bg-gray-100"
                      rows={2}
                    />
                  </div>
                </div>
              ))}

              <div className="flex gap-3 justify-center pt-4">
                <button
                  type="button"
                  onClick={() => addSoal("MCQ")}
                  className="flex items-center gap-2 border-2 border-blue-500 text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-50 transition"
                >
                  <FaPlus /> Tambah Pilihan Ganda
                </button>
                <button
                  type="button"
                  onClick={() => addSoal("ESSAY")}
                  className="flex items-center gap-2 border-2 border-purple-500 text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-purple-50 transition"
                >
                  <FaPlus /> Tambah Essay
                </button>
              </div>
            </div>

            <div className="sticky bottom-4 bg-white p-4 border rounded-xl shadow-xl flex justify-between items-center z-10">
              <span className="text-gray-500 text-sm hidden md:block">
                Pastikan semua kunci jawaban terisi sebelum menyimpan.
              </span>
              <div className="flex gap-3 w-full md:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-100 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition disabled:opacity-50"
                >
                  {loading ? (
                    "Menyimpan..."
                  ) : (
                    <>
                      <FaSave /> Simpan Quiz
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 pt-24 px-12 lg:px-20 pb-20">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Kelola Quiz
                </h1>
                <p className="text-gray-500 mt-1">
                  Buat, edit, dan atur soal ujian untuk siswa.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowForm(true);
                  resetForm();
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg font-semibold"
              >
                <FaPlus /> Buat Quiz Baru
              </button>
            </div>

            {/* Filter Kategori Chips - SEKARANG SEMUA IDENTIK KUNING */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {/* Tombol "Semua" */}
              <button
                onClick={() => setSelectedKategori(null)}
                className={`px-4 py-1.5 border rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-all ${
                  selectedKategori === null
                    ? "bg-yellow-400 text-black border-yellow-500 font-bold shadow-md"
                    : "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200"
                }`}
              >
                Semua
              </button>

              {/* Tombol Mapel Lainnya */}
              {kategori.map((k) => (
                <button
                  key={k.id}
                  onClick={() => setSelectedKategori(k.id)}
                  className={`px-4 py-1.5 border rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-all ${
                    selectedKategori === k.id
                      ? "bg-yellow-400 text-black border-yellow-500 font-bold shadow-md"
                      : "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200"
                  }`}
                >
                  {k.nama}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.length === 0 ? (
                <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
                  <img
                    src="https://illustrations.popsy.co/gray/question-mark.svg"
                    alt="Empty"
                    className="h-32 mx-auto opacity-50 mb-4"
                  />
                  <p className="text-gray-500 text-lg">
                    {selectedKategori
                      ? "Tidak ada quiz dalam kategori ini."
                      : "Belum ada quiz yang dibuat."}
                  </p>
                </div>
              ) : (
                filteredQuizzes.map((q) => (
                  <div
                    key={q.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wider">
                          {kategori.find((k) => k.id === q.kategori_id)?.nama ||
                            "Umum"}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">
                          ID: {q.id}
                        </span>
                      </div>

                      <h3
                        className="text-xl font-bold text-gray-800 mb-1 line-clamp-2"
                        title={q.judul}
                      >
                        {q.judul}
                      </h3>

                      <div className="text-sm text-gray-500 mb-4 flex flex-col gap-1">
                        <span className="flex items-center gap-2">
                          🎓 Kelas:{" "}
                          <span className="font-medium text-gray-700">
                            {q.kelas}
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          📝 {getSoalSummary(q.soal)}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 border-t pt-4 mt-2">
                      <button
                        onClick={() => handleEditQuiz(q)}
                        className="flex-1 flex items-center justify-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-100 transition font-medium text-sm border border-yellow-200"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => deleteQuiz(q.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium text-sm border border-red-200"
                      >
                        <FaTrash /> Hapus
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
