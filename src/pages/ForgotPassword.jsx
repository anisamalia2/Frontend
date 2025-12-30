import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogRes from "../assets/images/LogRes.png";
import api from "../utils/api";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomor_whatsapp: "",
    username: "",
    new_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: "", text: "" }); // Hapus pesan saat mengetik
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Panggil API Backend yang baru dibuat
      const res = await api.post("/api/auth/reset-password", formData);

      setMessage({ type: "success", text: res.data.message });

      // Redirect ke login setelah 2 detik jika berhasil
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Gagal mereset password";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-poppins">
      {/* ===== LEFT SECTION - WHITE BACKGROUND ===== */}
      <div className="hidden lg:flex w-1/2 bg-white flex-col items-center justify-center text-center p-8">
        <div className="mb-12 flex items-center justify-center gap-2">
          <span className="text-3xl font-extrabold text-[#063E6A]">
            EDUTEKTIF
          </span>
        </div>

        <h2 className="text-4xl md:text-1xl font-bold text-[#063E6A] mb-12 leading-tight max-w-md">
          Lupa kata sandi? Tidak masalah, mari kita atur ulang untukmu.
        </h2>

        <div className="w-full max-w-xs h-64 sm:h-72 flex items-center justify-center">
          <img
            src={LogRes}
            alt="Forgot Password Illustration"
            className="w-auto h-full max-h-72 object-contain"
          />
        </div>
      </div>

      {/* ===== RIGHT SECTION - BLUE BACKGROUND ===== */}
      <div className="w-full lg:w-1/2 bg-gradient-to-r from-[#0F5A8C] to-[#063E6A] flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#063E6A] mb-2">
              Reset Password
            </h1>
            <p className="text-slate-600 text-sm">
              Kembali ke halaman{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 font-semibold hover:text-blue-800 transition"
              >
                Login
              </button>
            </p>
          </div>

          {/* Notifikasi Pesan */}
          {message.text && (
            <div
              className={`mb-4 p-3 rounded text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                name="nomor_whatsapp"
                value={formData.nomor_whatsapp}
                onChange={handleChange}
                placeholder="Contoh: 081234567899"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Username
              </label>
              <p className="text-xs text-slate-500 mb-2">
                *Digunakan untuk verifikasi kepemilikan akun
              </p>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan Username Anda"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Password Baru
              </label>
              <input
                type="password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                placeholder="Minimal 6 karakter"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#063E6A] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#052d52] transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading ? "Memproses..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
