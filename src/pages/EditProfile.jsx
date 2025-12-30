import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthProvider";
import api from "../utils/api";
import { User, Camera, Save, XCircle } from "lucide-react";

export default function EditProfile() {
  const { user, fetchMe } = useAuth(); // Ambil fetchMe dari AuthContext
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    nomor_whatsapp: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Load data user saat pertama kali buka
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        nomor_whatsapp: user.nomor_whatsapp || "",
      });

      // LOGIKA PREVIEW GAMBAR (CACHE BUSTING)
      if (user.avatar_url) {
        setPreviewUrl(`${user.avatar_url}?t=${new Date().getTime()}`);
      } else {
        setPreviewUrl(null);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // 1. Update Data Teks
      await api.put("/api/users/me", formData);

      // 2. Update Foto (Jika ada file baru)
      if (avatarFile) {
        if (avatarFile.size > 2 * 1024 * 1024) {
          throw new Error("Ukuran file terlalu besar (Max 2MB)");
        }

        const formDataAvatar = new FormData();
        formDataAvatar.append("file", avatarFile);

        await api.post("/api/users/me/avatar", formDataAvatar, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // 3. PANGGIL DATA TERBARU (Update Navbar & Context)
      await fetchMe();

      setMessage({ type: "success", text: "Profil berhasil disimpan!" });

      // Update preview lokal jika ada upload baru
      if (avatarFile) {
        setPreviewUrl(URL.createObjectURL(avatarFile));
      }
    } catch (err) {
      console.error(err);
      let errorMsg = "Gagal memperbarui profil.";

      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.message) {
        errorMsg = err.message;
      }

      setMessage({
        type: "error",
        text: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 font-poppins">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-edubiru px-8 py-6 text-center">
            <h1 className="text-2xl font-bold text-white">Edit Profil</h1>
            <p className="text-blue-100 text-sm mt-1">
              Perbarui informasi akun Anda
            </p>
          </div>

          <div className="p-8">
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-lg text-sm font-medium ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* === SECTION FOTO PROFIL === */}
              <div className="flex flex-col items-center -mt-16">
                <div className="relative group mt-4">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview Foto"
                        className="w-full h-full object-cover"
                        key={previewUrl} // Force re-render gambar
                      />
                    ) : (
                      <User size={48} className="text-gray-400" />
                    )}
                  </div>

                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2.5 rounded-full cursor-pointer hover:bg-blue-700 transition shadow-lg border-2 border-white"
                  >
                    <Camera size={18} />
                    <input
                      id="avatar-upload" // ID Sesuai htmlFor
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  Ketuk ikon kamera untuk mengganti foto
                </p>
              </div>

              {/* === SECTION FORM INPUT === */}
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Username
                  </label>
                  <input
                    id="username" // ID Sesuai htmlFor
                    type="text"
                    name="username"
                    autoComplete="username" // AutoComplete
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="nomor_whatsapp"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Nomor WhatsApp
                  </label>
                  <input
                    id="nomor_whatsapp" // ID Sesuai htmlFor
                    type="text"
                    name="nomor_whatsapp"
                    autoComplete="tel" // AutoComplete
                    value={formData.nomor_whatsapp}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
                    disabled
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    *Nomor WhatsApp tidak dapat diubah
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Peran (Role)
                  </label>
                  <input
                    type="text"
                    value={user?.role || ""}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed capitalize"
                    disabled
                  />
                </div>
              </div>

              {/* === TOMBOL ACTION === */}
              <div className="pt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-full sm:w-1/2 py-3.5 rounded-xl font-bold text-slate-600 border border-slate-300 hover:bg-slate-50 transition flex items-center justify-center gap-2"
                >
                  <XCircle size={20} /> Batal
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-1/2 bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    "Menyimpan..."
                  ) : (
                    <>
                      <Save size={20} /> Simpan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
