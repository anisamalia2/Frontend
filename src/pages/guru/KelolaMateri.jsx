import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthProvider";
import Navbar from "../../components/Navbar";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSave,
  FaArrowLeft,
  FaStar,
  FaYoutube,
  FaFilePdf,
  FaFilePowerpoint,
  FaCrown,
} from "react-icons/fa";

export default function KelolaMateri() {
  const { user } = useAuth();
  const [materi, setMateri] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  // STATE BARU UNTUK FILTER
  const [selectedKategori, setSelectedKategori] = useState("Semua");

  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    konten: "",
    tipe: "VIDEO",
    kategori_id: "",
    kelas: "",
    durasi: "",
    file: null,
    is_premium: false,
  });

  // ================= FETCH =================
  useEffect(() => {
    fetchMateri();
    fetchKategori();
  }, []);

  const fetchMateri = async () => {
    try {
      const res = await api.get("/api/materi");
      setMateri(res.data || []);
    } catch (err) {
      console.error("Gagal load materi", err);
    }
  };

  const fetchKategori = async () => {
    try {
      const res = await api.get("/api/kategori");
      setKategori(res.data || []);
    } catch (err) {
      console.error("Gagal load kategori", err);
    }
  };

  // ================= LOGIK FILTER =================
  const filteredMateri =
    selectedKategori === "Semua"
      ? materi
      : materi.filter((m) => {
          const kat = kategori.find((k) => k.id === m.kategori_id);
          return kat?.nama === selectedKategori;
        });

  // ================= PROTEKSI ROLE =================
  if (!user || user.role !== "GURU") {
    return <Navigate to="/" replace />;
  }

  // ================= HANDLER =================
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    let fieldValue;
    if (type === "file") fieldValue = files[0];
    else if (type === "checkbox") fieldValue = checked;
    else if (type === "radio" && name === "is_premium")
      fieldValue = value === "true";
    else fieldValue = value;

    setForm((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const resetForm = () => {
    setForm({
      judul: "",
      deskripsi: "",
      konten: "",
      tipe: "VIDEO",
      kategori_id: "",
      kelas: "",
      durasi: "",
      file: null,
      is_premium: false,
    });
    setEditingId(null);
    setFormVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.tipe === "VIDEO" && !form.konten.trim()) {
      alert("Link YouTube wajib diisi");
      setLoading(false);
      return;
    }
    if (
      (form.tipe === "PDF" || form.tipe === "SLIDE") &&
      !form.file &&
      !editingId
    ) {
      alert("File wajib diupload");
      setLoading(false);
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === "is_premium") fd.append(k, v ? "true" : "false");
      else if (v !== null && v !== undefined) fd.append(k, v);
    });

    try {
      if (editingId) await api.put(`/api/materi/${editingId}`, fd);
      else await api.post("/api/materi", fd);

      resetForm();
      fetchMateri();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menyimpan materi");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (m) => {
    setEditingId(m.id);
    setForm({
      judul: m.judul,
      deskripsi: m.deskripsi || "",
      konten: m.konten || "",
      tipe: m.tipe || "VIDEO",
      kategori_id: m.kategori_id || "",
      kelas: m.kelas || "",
      durasi: m.durasi || "",
      file: null,
      is_premium: !!m.is_premium,
    });
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus materi ini?")) return;
    try {
      await api.delete(`/api/materi/${id}`);
      fetchMateri();
    } catch (err) {
      alert("Gagal menghapus materi");
    }
  };

  const extractYoutubeID = (url) => {
    if (!url) return null;
    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  // ================= UI COMPONENTS =================
  const MateriCard = ({ m }) => {
    const videoThumb =
      m.tipe === "VIDEO" && extractYoutubeID(m.konten)
        ? `https://img.youtube.com/vi/${extractYoutubeID(
            m.konten
          )}/hqdefault.jpg`
        : null;
    const rating = m.rating || 5;

    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all flex flex-col overflow-hidden group">
        <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
          {m.tipe === "VIDEO" && videoThumb ? (
            <>
              <img
                src={videoThumb}
                alt={m.judul}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <FaYoutube className="text-5xl text-red-600 drop-shadow-lg" />
              </div>
            </>
          ) : m.tipe === "PDF" ? (
            <FaFilePdf className="text-6xl text-red-500" />
          ) : m.tipe === "SLIDE" ? (
            <FaFilePowerpoint className="text-6xl text-orange-500" />
          ) : (
            <FaYoutube className="text-6xl text-slate-400" />
          )}

          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
            {m.is_premium ? (
              <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow flex items-center gap-1">
                <FaCrown /> Premium
              </span>
            ) : (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                Gratis
              </span>
            )}
            <span className="bg-gray-800/80 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
              {m.tipe}
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wider">
              {kategori.find((k) => k.id === m.kategori_id)?.nama || "Umum"}
            </span>
            <span className="text-xs text-gray-400 font-mono">
              Kelas {m.kelas}
            </span>
          </div>

          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 leading-tight">
            {m.judul}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-400 flex gap-0.5 text-sm">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar
                  key={i}
                  className={i <= rating ? "text-yellow-400" : "text-gray-200"}
                />
              ))}
            </span>
            <span className="text-xs text-gray-500 ml-1">({rating}.0)</span>
            {m.durasi && (
              <span className="text-xs text-gray-400 ml-auto">
                • {m.durasi} menit
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {m.deskripsi || "Tidak ada deskripsi."}
          </p>

          <div className="mt-auto flex gap-2 border-t pt-4">
            <button
              onClick={() => handleEdit(m)}
              className="flex-1 flex items-center justify-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-2 rounded-lg hover:bg-yellow-100 transition font-medium text-sm border border-yellow-200"
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={() => handleDelete(m.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg hover:bg-red-100 transition font-medium text-sm border border-red-200"
            >
              <FaTrash /> Hapus
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />

      {formVisible ? (
        /* ================= FORM MODE ================= */
        <div className="min-h-screen bg-gray-50 pt-24 pb-32 px-4">
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8 space-y-6"
          >
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingId ? "Edit Materi" : "Tambah Materi Baru"}
              </h2>
              <button
                type="button"
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <FaArrowLeft /> Batal
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Judul Materi
                </label>
                <input
                  name="judul"
                  value={form.judul}
                  onChange={handleChange}
                  placeholder="Judul Materi"
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Kategori
                </label>
                <select
                  name="kategori_id"
                  value={form.kategori_id}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2.5 rounded-lg bg-white"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {kategori.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Kelas Target
                </label>
                <input
                  name="kelas"
                  value={form.kelas}
                  onChange={handleChange}
                  placeholder="Contoh: 10, 11, 12"
                  className="w-full border border-gray-300 p-2.5 rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Deskripsi Singkat
              </label>
              <textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                placeholder="Jelaskan isi materi secara singkat..."
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                rows={3}
              />
            </div>

            <hr className="border-gray-100" />

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Tipe Materi
                  </label>
                  <select
                    name="tipe"
                    value={form.tipe}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2.5 rounded-lg bg-white"
                  >
                    <option value="VIDEO">Video (YouTube)</option>
                    <option value="PDF">Dokumen PDF</option>
                    <option value="SLIDE">Slide Presentasi (PPT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Durasi (Menit)
                  </label>
                  <input
                    name="durasi"
                    value={form.durasi}
                    onChange={handleChange}
                    placeholder="Contoh: 45"
                    type="number"
                    className="w-full border border-gray-300 p-2.5 rounded-lg"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border">
                {form.tipe === "VIDEO" ? (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Link YouTube
                    </label>
                    <div className="flex gap-2">
                      <span className="bg-red-100 text-red-600 px-3 py-2 rounded-l-lg border border-r-0 border-red-200 flex items-center">
                        <FaYoutube />
                      </span>
                      <input
                        name="konten"
                        value={form.konten}
                        onChange={handleChange}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full border border-gray-300 p-2.5 rounded-r-lg focus:ring-1 focus:ring-red-500 outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Upload File
                    </label>
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      accept={
                        form.tipe === "PDF" ? "application/pdf" : ".ppt,.pptx"
                      }
                      className="w-full bg-white border border-gray-300 p-2 rounded-lg"
                      required={!editingId}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <FaCrown className="text-yellow-600" /> Akses Materi
                </h4>
              </div>
              <div className="flex items-center gap-4 bg-white p-2 rounded-lg border shadow-sm">
                <label
                  className={`px-3 py-1 rounded cursor-pointer transition ${
                    !form.is_premium
                      ? "bg-green-100 text-green-700 font-bold"
                      : "text-gray-500"
                  }`}
                >
                  <input
                    type="radio"
                    name="is_premium"
                    value="false"
                    checked={form.is_premium === false}
                    onChange={handleChange}
                    className="hidden"
                  />{" "}
                  Gratis
                </label>
                <label
                  className={`px-3 py-1 rounded cursor-pointer transition ${
                    form.is_premium
                      ? "bg-yellow-100 text-yellow-700 font-bold"
                      : "text-gray-500"
                  }`}
                >
                  <input
                    type="radio"
                    name="is_premium"
                    value="true"
                    checked={form.is_premium === true}
                    onChange={handleChange}
                    className="hidden"
                  />{" "}
                  Premium
                </label>
              </div>
            </div>

            <div className="sticky bottom-4 bg-white p-4 border rounded-xl shadow-xl flex justify-end gap-3 z-10">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100 font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold disabled:opacity-50"
              >
                {loading ? (
                  "Menyimpan..."
                ) : (
                  <>
                    <FaSave /> Simpan Materi
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* ================= LIST MODE ================= */
        <div className="min-h-screen bg-gray-50 pt-24 px-12 lg:px-20 pb-20">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Kelola Materi
                </h1>
                <p className="text-gray-500 mt-1">
                  Upload video, PDF, atau slide untuk bahan ajar siswa.
                </p>
              </div>
              <button
                onClick={() => setFormVisible(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg font-semibold"
              >
                <FaPlus /> Tambah Materi
              </button>
            </div>

            {/* FILTER KATEGORI CHIPS (MAPEL) */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setSelectedKategori("Semua")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition border ${
                  selectedKategori === "Semua"
                    ? "bg-yellow-400 text-black border-yellow-500 font-bold shadow-md"
                    : "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200"
                }`}
              >
                Semua
              </button>
              {kategori.map((k) => (
                <button
                  key={k.id}
                  onClick={() => setSelectedKategori(k.nama)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition border ${
                    selectedKategori === k.nama
                      ? "bg-yellow-400 text-black border-yellow-500 font-bold shadow-md"
                      : "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200"
                  }`}
                >
                  {k.nama}
                </button>
              ))}
            </div>

            {/* GRID MATERI (MENGGUNAKAN filteredMateri) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMateri.length === 0 ? (
                <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
                  <img
                    src="https://illustrations.popsy.co/gray/digital-nomad.svg"
                    alt="Empty"
                    className="h-40 mx-auto opacity-60 mb-4"
                  />
                  <p className="text-gray-500 text-lg">
                    Belum ada materi untuk kategori{" "}
                    <strong>"{selectedKategori}"</strong>.
                  </p>
                </div>
              ) : (
                filteredMateri.map((m) => <MateriCard key={m.id} m={m} />)
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
