import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import barco from "../assets/images/barco.png";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// using project barcode image instead of SVG placeholder

export default function Pembayaran() {
  const navigate = useNavigate();
  const query = useQuery();
  const months = query.get("months") || "1";
  const price = query.get("price") ? decodeURIComponent(query.get("price")) : "Rp 170.000";

  const features = useMemo(() => [
    "Akses semua video materi",
    "Latihan soal dasar & pembahasan",
    "Kelas konsep cepat",
    "Progress report mingguan",
    "Akses komunitas belajar",
  ], []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-poppins">
      <Navbar isNavbarVisible={true} />

      <main className="max-w-7xl mx-auto px-6 md:px-20 py-12">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-blue-900 font-semibold hover:text-blue-800"
          >
            ← Kembali
          </button>
        </div>

        <section className="mb-8">
          <h2 className="text-3xl font-extrabold mb-3">Apa yang Kamu Dapat dari Paket {months} Bulan?</h2>
          <p className="text-slate-600 mb-4">Cocok untuk coba dulu atau belajar intens dalam waktu singkat. Termasuk:</p>
          <ul className="list-disc pl-6 text-slate-700">
            {features.map((f, i) => (
              <li key={i} className="mb-1">{f}</li>
            ))}
          </ul>
        </section>

        <section className="bg-blue-900 text-white rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4">Tingkatkan Cara Belajarmu Hari Ini</h3>
          <p className="mb-6 text-blue-100 max-w-2xl">Belajar lebih terarah, materi lengkap, latihan soal interaktif, dan dukungan belajar yang konsisten. Pilih paket yang paling cocok untuk kebutuhanmu!</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[1,3,6,9,12].map((m) => {
              const isActive = String(m) === String(months);
              const label = m === 1 ? "Rp 170.000" : m === 3 ? "Rp 220.000" : m === 6 ? "Rp 330.000" : m === 9 ? "Rp 420.000" : "Rp 445.000";
              return (
                <div key={m} className={`p-4 rounded-xl ${isActive ? "bg-white text-slate-900 shadow-2xl" : "bg-white/90 text-slate-900"}`}>
                  <div className="text-sm font-medium mb-2">Paket {m} Bulan</div>
                  <div className="text-xl font-bold mb-2">{label}</div>
                  <div className="text-xs mb-4 text-yellow-600 font-semibold">{isActive ? "Terpilih" : ""}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="mt-6 bg-yellow-400 text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-500"
            >
              Pilih Paket {months} Bulan
            </button>
          </div>
        </section>

        <section className="bg-white rounded-xl p-8 shadow-md mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-bold mb-3">Qris</h4>
              <ol className="text-sm text-slate-700 list-decimal pl-5 space-y-2 mb-6">
                <li>Scan barcode di samping.</li>
                <li>Scan berhasil apabila barcode sudah berwarna abu-abu.</li>
                <li>Ketika selesai scan klik tombol "Saya sudah bayar" di bawah.</li>
                <li>Pembayaran selesai.</li>
              </ol>
            </div>

            <div className="flex items-center justify-center">
              <img src={barco} alt="QRIS Barcode" className="w-40 sm:w-44 md:w-56 lg:w-64 h-auto object-contain bg-white p-2 rounded" />
            </div>
          </div>

          {/* Full-width payment confirmation button under QR area */}
          <div className="mt-8">
            <div className="max-w-3xl mx-auto px-4">
              <button
                type="button"
                onClick={() => alert('Terima kasih — pembayaran akan diverifikasi.')}
                className="w-full bg-blue-900 text-white py-4 rounded-lg font-semibold shadow-md"
              >
                Saya sudah bayar
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
