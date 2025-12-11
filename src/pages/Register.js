import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogRes from "../assets/images/LogRes.png";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    nomor_whatsapp: "",
    password: "",
    confirmPassword: "",
    role: "SISWA",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validasi
    if (!formData.username || !formData.nomor_whatsapp || !formData.password) {
      setError("Semua field harus diisi!");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok!");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter!");
      setLoading(false);
      return;
    }

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
      const apiUrl = `${apiBaseUrl}/auth/register`;

      console.log("API Base URL:", apiBaseUrl);
      console.log("Full Request URL:", apiUrl);

      const response = await axios.post(apiUrl, {
        username: formData.username,
        nomor_whatsapp: formData.nomor_whatsapp,
        password: formData.password,
        role: formData.role,
      });

      setSuccess("Registrasi berhasil! Redirecting...");
      console.log("Register response:", response.data);

      // Simpan user info
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect ke login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Registrasi gagal. Coba lagi!";
      setError(errorMessage);
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-poppins">
      {/* ===== LEFT SECTION - BLUE BACKGROUND ===== */}
      <div className="w-full lg:w-1/2 bg-gradient-to-r from-[#0F5A8C] to-[#063E6A] flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-slate-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#063E6A] mb-2">
              Register
            </h1>
            <p className="text-slate-600 text-sm">
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 font-semibold hover:text-blue-800 transition"
              >
                Login Akun
              </button>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan Username"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                required
              />
            </div>

            {/* WhatsApp Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
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

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Peran
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
              >
                <option value="SISWA">Siswa</option>
                <option value="GURU">Guru</option>
              </select>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan Password"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 transition pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-800 transition"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi Password"
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 transition pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-800 transition"
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <p className="text-xs text-slate-600 text-center">
              Dengan menggunakan layanan Edutektif kamu menyetujui{" "}
              <a href="#" className="text-blue-600 font-semibold hover:underline">
                Kebijakan Privasi
              </a>{" "}
              dari layanan kami
            </p>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#063E6A] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#052d52] transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sedang mendaftar..." : "Daftar"}
            </button>
          </form>
        </div>
      </div>

      {/* ===== RIGHT SECTION - WHITE BACKGROUND ===== */}
      <div className="hidden lg:flex w-1/2 bg-white flex-col items-center justify-center text-center p-8">
        {/* Logo */}
        <div className="mb-12 flex items-center justify-center gap-2">
          <span className="text-3xl font-extrabold text-[#063E6A]">EDUTEKTIF</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#063E6A] mb-12 leading-tight max-w-md">
          Setiap langkah kecil membuka peluang besar. Yuk daftar dan mulai belajar hari ini!
        </h2>

        {/* Illustration Image (match Login sizing) */}
        <div className="w-full max-w-xs h-64 sm:h-72 flex items-center justify-center">
          <img
            src={LogRes}
            alt="Register Illustration"
            className="w-auto h-full max-h-72 object-contain"
          />
        </div>
      </div>
    </div>
  );
}