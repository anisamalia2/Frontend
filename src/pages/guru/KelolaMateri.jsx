import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthProvider";
import Navbar from "../../components/Navbar";
import { FiFileText, FiVideo } from "react-icons/fi";
import { FaStar, FaPlus } from "react-icons/fa";

export default function KelolaMateri() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [materi, setMateri] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    konten: "",
    tipe: "TEXT",
    kategori_id: "",
    kelas: "",
    durasi: "",
    file: null,
  });

  // ================= FETCH =================
  useEffect(() => {
    fetchMateri();
    fetchKategori();
  }, []);

  const fetchMateri = async () => {
    const res = await api.get("/api/materi");
    setMateri(res.data || []);
  };

  const fetchKategori = async () => {
    const res = await api.get("/api/kategori");
    setKategori(res.data || []);
  };

  // ================= PROTEKSI ROLE =================
  if (!user || user.role !== "GURU") {
    return <Navigate to="/" replace />;
  }

  // ================= HANDLER =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const resetForm = () => {
    setForm({
      judul: "",
      deskripsi: "",
      konten: "",
      tipe: "TEXT",
      kategori_id: "",
      kelas: "",
      durasi: "",
      file: null,
    });
    setEditingId(null);
    setFormVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v) fd.append(k, v);
    });

    try {
      if (editingId) {
        await api.put(`/api/materi/${editingId}`, fd);
      } else {
        await api.post("/api/materi", fd);
      }
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
      tipe: m.tipe || "TEXT",
      kategori_id: m.kategori_id || "",
      kelas: m.kelas || "",
      durasi: m.durasi || "",
      file: null,
    });
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus materi ini?")) return;
    await api.delete(`/api/materi/${id}`);
    fetchMateri();
  };

  // ================= UI Materi Card =================
  const MateriCard = ({ m }) => {
    const videoThumb =
      m.tipe === "VIDEO" && m.konten
        ? `https://img.youtube.com/vi/${
            m.konten.match(
              /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
            )?.[1]
          }/hqdefault.jpg`
        : null;
    const rating = m.rating || 5;

    return (
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col">
        <div className="h-40 rounded-t-xl overflow-hidden bg-slate-100 flex items-center justify-center">
          {m.tipe === "VIDEO" && videoThumb ? (
            <img
              src={videoThumb}
              alt={m.judul}
              className="w-full h-full object-cover"
            />
          ) : m.tipe === "FILE" ? (
            <FiFileText className="text-5xl text-red-500" />
          ) : (
            <FiVideo className="text-5xl text-slate-400" />
          )}
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-lg mb-1">{m.judul}</h3>
          <p className="text-sm text-slate-500 mb-2">Kelas {m.kelas}</p>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <FaStar
                key={i}
                className={i <= rating ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
            <span className="ml-2 text-sm font-semibold text-slate-600">
              {rating}.0
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
            {m.deskripsi}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleEdit(m)}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(m.id)}
              className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-32 px-6 space-y-6">
        <h1 className="text-2xl font-bold text-edubiru-900">Kelola Materi</h1>

        {/* KATEGORI */}
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

        {/* BUTTON TAMBAH */}
        {!formVisible && (
          <div className="flex justify-end">
            <button
              onClick={() => setFormVisible(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              <FaPlus /> Tambah Materi
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* FORM */}
          {formVisible && (
            <form
              onSubmit={handleSubmit}
              className="md:col-span-1 bg-white border rounded-xl p-6 space-y-4 shadow-sm"
            >
              <h2 className="font-semibold text-lg">
                {editingId ? "Edit Materi" : "Tambah Materi"}
              </h2>

              <input
                name="judul"
                value={form.judul}
                onChange={handleChange}
                placeholder="Judul Materi"
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                placeholder="Deskripsi singkat"
                className="w-full border p-2 rounded"
              />
              <select
                name="kategori_id"
                value={form.kategori_id}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Pilih Kategori</option>
                {kategori.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.nama}
                  </option>
                ))}
              </select>
              <select
                name="tipe"
                value={form.tipe}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="TEXT">Text</option>
                <option value="FILE">File</option>
                <option value="LINK">Link</option>
              </select>
              <textarea
                name="konten"
                value={form.konten}
                onChange={handleChange}
                placeholder="Isi materi / link YouTube"
                className="w-full border p-2 rounded"
              />
              {form.tipe === "FILE" && (
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  className="w-full"
                />
              )}
              <input
                name="kelas"
                value={form.kelas}
                onChange={handleChange}
                placeholder="Kelas"
                className="w-full border p-2 rounded"
              />
              <input
                name="durasi"
                value={form.durasi}
                onChange={handleChange}
                placeholder="Durasi (menit)"
                className="w-full border p-2 rounded"
              />
              <div className="flex gap-2">
                <button
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="border px-4 py-2 rounded"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          )}

          {/* LIST MATERI */}
          <section
            className={
              formVisible
                ? "md:col-span-2 grid md:grid-cols-2 gap-4"
                : "md:col-span-3 grid md:grid-cols-2 gap-4"
            }
          >
            {materi.length === 0 ? (
              <div className="border rounded-xl p-10 text-center text-gray-500">
                Belum ada materi
              </div>
            ) : (
              materi.map((m) => <MateriCard key={m.id} m={m} />)
            )}
          </section>
        </div>
      </div>
    </>
  );
}
