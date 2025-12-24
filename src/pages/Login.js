import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogRes from "../assets/images/LogRes.png";
import { useAuth } from "../contexts/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      const role = user.role?.toUpperCase();
      if (role === "SISWA") navigate("/dashboard-siswa", { replace: true });
      else if (role === "GURU") navigate("/dashboard-guru", { replace: true });
      else navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const [nomorWhatsapp, setNomorWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login({
        nomor_whatsapp: nomorWhatsapp,
        password,
      });

      if (res.ok) {
        const role = res.user?.role?.toUpperCase(); // 🔥 ambil role dan pastikan uppercase
        if (role === "SISWA") {
          navigate("/dashboard-siswa", { replace: true }); // redirect siswa
        } else if (role === "GURU") {
          navigate("/dashboard-guru", { replace: true }); // redirect guru
        } else {
          navigate("/"); // fallback
        }
      } else {
        setError(res.error?.message || "Login gagal. Cek kredensial.");
      }
    } catch (err) {
      setError("Login gagal");
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
          Senang bertemu lagi! Masuk untuk melanjutkan proses belajarmu.
        </h2>

        <div className="w-full max-w-xs h-64 sm:h-72 flex items-center justify-center">
          <img
            src={LogRes}
            alt="Login Illustration"
            className="w-auto h-full max-h-72 object-contain"
          />
        </div>
      </div>

      {/* ===== RIGHT SECTION - BLUE BACKGROUND ===== */}
      <div className="w-full lg:w-1/2 bg-gradient-to-r from-[#0F5A8C] to-[#063E6A] flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#063E6A] mb-2">
              Login
            </h1>
            <p className="text-slate-600 text-sm">
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-600 font-semibold hover:text-blue-800 transition"
              >
                Daftar Sekarang
              </button>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                value={nomorWhatsapp}
                onChange={(e) => setNomorWhatsapp(e.target.value)}
                placeholder="Contoh: 081234567899"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-2 border-slate-300 rounded"
                />
                <span className="text-sm text-slate-600">Ingat saya</span>
              </label>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-blue-600 font-semibold hover:text-blue-800 transition"
              >
                Lupa Password?
              </button>
            </div>

            <p className="text-xs text-slate-600 text-center">
              Dengan menggunakan layanan Edutektif kamu menyetujui{" "}
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline"
              >
                Kebijakan Privasi
              </a>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#063E6A] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#052d52] transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sedang masuk..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
