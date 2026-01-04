import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, AlertTriangle } from "lucide-react";

const STATIC_QRIS_URL =
  "https://res.cloudinary.com/do8wvbl0q/image/upload/v1765486219/SCAN_ME_ezdtpa.jpg";

export default function PembayaranSiswa() {
  const { id } = useParams(); // id ini adalah paket_id
  const navigate = useNavigate();

  const [allPaket, setAllPaket] = useState([]);
  const [currentPaket, setCurrentPaket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // State untuk loading tombol

  // State QRIS
  const [qrisUrl, setQrisUrl] = useState(STATIC_QRIS_URL);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Ambil Semua Paket (untuk keperluan UI jika dibutuhkan)
        const resAll = await api.get("/api/paket");
        setAllPaket(resAll.data.data || resAll.data);

        // 2. Ambil Detail Paket yang dipilih
        if (id) {
          const resCurrent = await api.get(`/api/paket/${id}`);
          const paketData = resCurrent.data.data || resCurrent.data;
          setCurrentPaket(paketData);

          // 3. Cek QRIS Backend (Jika ada dynamic QRIS dari paket)
          if (paketData.qris_url) {
            setQrisUrl(paketData.qris_url);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSudahBayar = async () => {
    // 1. Konfirmasi User
    if (
      !window.confirm(
        "Apakah anda yakin sudah melakukan transfer sesuai nominal?"
      )
    )
      return;

    setSubmitting(true);
    try {
      // 2. CREATE TRANSACTION
      // Kita buat transaksi dulu di database
      const createRes = await api.post("/api/payment/create", {
        paket_id: id,
        payment_method: "QRIS",
      });

      const transactionId = createRes.data.transaction_id;

      // 3. CONFIRM TRANSACTION
      // Setelah created, kita langsung confirm agar statusnya jadi 'menunggu_verifikasi_admin'
      await api.post("/api/payment/confirm", {
        transaction_id: transactionId,
      });

      alert(
        "Terima kasih! Pembayaran Anda berhasil dikirim dan sedang diverifikasi sistem."
      );
      navigate("/dashboard-siswa");
    } catch (err) {
      console.error(err);
      // Handle error spesifik dari backend
      const errorMessage =
        err.response?.data?.message || "Gagal memproses pembayaran.";

      // Jika errornya karena "Selesaikan transaksi sebelumnya", kita arahkan user cek dashboard atau hubungi admin
      if (
        err.response?.status === 400 &&
        errorMessage.includes("Selesaikan transaksi")
      ) {
        alert(
          "Anda memiliki transaksi yang belum selesai. Mohon tunggu verifikasi guru atau hubungi admin."
        );
        navigate("/dashboard-siswa");
      } else {
        alert(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">
            Memuat data pembayaran...
          </p>
        </div>
      </div>
    );

  if (!currentPaket) return null;

  return (
    <div className="min-h-screen bg-white font-poppins text-slate-900">
      <Navbar isNavbarVisible />

      <main className="max-w-7xl mx-auto px-6 md:px-20 pt-32 pb-20">
        {/* ================= BAGIAN 1: INFO MANFAAT ================= */}
        <section className="mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900 leading-tight">
            Apa yang Kamu Dapat dari{" "}
            <span className="text-edubiru">
              Paket {currentPaket.duration_months} Bulan?
            </span>
          </h1>
          <p className="text-slate-500 text-lg mb-8 max-w-3xl">
            Cocok untuk coba dulu atau belajar intens dalam waktu singkat.
          </p>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <p className="font-bold mb-4 text-slate-800 text-lg">Termasuk:</p>
            <ul className="space-y-4 text-slate-700">
              {[
                "Akses semua video materi pembelajaran",
                "Bank latihan soal dasar & pembahasan",
                "Kelas konsep cepat (Quick Concept)",
                "Progress report mingguan",
                "Akses komunitas belajar",
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle
                    size={20}
                    className="text-green-500 flex-shrink-0"
                  />
                  <span className="text-base font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= BAGIAN 2: BANNER PAKET ================= */}
        <section className="bg-[#0b3c65] rounded-[2.5rem] p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="text-center text-white mb-10 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Tingkatkan Cara Belajarmu Hari Ini
            </h2>
            <p className="text-blue-100 text-sm md:text-base max-w-2xl mx-auto">
              Belajar lebih terarah, materi lengkap, latihan soal interaktif,
              dan dukungan belajar yang konsisten.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
            {allPaket.map((p) => {
              const isSelected = String(p.id) === String(id);
              return (
                <div
                  key={p.id}
                  onClick={() => navigate(`/pembayaran/${p.id}`)}
                  className={`
                    cursor-pointer rounded-2xl p-4 text-center transition-all duration-300 flex flex-col justify-between h-full
                    ${
                      isSelected
                        ? "bg-white transform scale-105 ring-4 ring-yellow-400 shadow-xl"
                        : "bg-white/90 hover:bg-white hover:scale-105 opacity-90"
                    }
                  `}
                >
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-3 uppercase tracking-wide">
                      Paket {p.duration_months} Bulan
                    </h3>
                    <div className="text-xl font-black text-slate-900 mb-1">
                      Rp {p.harga / 1000}rb
                    </div>
                    <div className="text-xs text-slate-400 line-through mb-2">
                      Rp {((p.harga * 1.2) / 1000).toFixed(0)}.000
                    </div>
                    <div className="inline-block bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded mb-4">
                      Hemat 20%
                    </div>
                  </div>

                  <button
                    className={`w-full py-2.5 rounded-lg font-bold text-xs transition-colors
                      ${
                        isSelected
                          ? "bg-slate-800 text-white"
                          : "bg-yellow-400 hover:bg-yellow-500 text-black"
                      }
                    `}
                  >
                    {isSelected ? "Paket Ini" : "Pilih Paket"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= BAGIAN 3: BOX QRIS (PEMBAYARAN) ================= */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Pilih Pembayaran
          </h2>

          <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Header Metode Pembayaran */}
              <div className="mb-8">
                <p className="text-slate-500 text-lg mb-4">
                  Metode Pembayaran:
                </p>
                <div className="border rounded-2xl p-4 flex items-center gap-4 bg-slate-50 w-full md:w-fit pr-10">
                  <svg
                    className="h-8 w-auto"
                    viewBox="0 0 100 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.5 0H0V12.5H12.5V0Z" fill="black" />
                    <path d="M10.5 2H2V10.5H10.5V2Z" fill="white" />
                    <path d="M8.5 4H4V8.5H8.5V4Z" fill="black" />
                    <rect x="16" y="4" width="30" height="6" fill="black" />
                    <rect x="16" y="14" width="20" height="4" fill="black" />
                  </svg>
                  <span className="font-bold text-xl tracking-widest text-slate-700">
                    QRIS
                  </span>
                </div>
              </div>

              {/* Flex Container: Instruksi & QR */}
              <div className="flex flex-col-reverse md:flex-row gap-12 md:gap-20 items-start mb-10">
                {/* Kiri: Instruksi & Total */}
                <div className="flex-1 w-full">
                  <div className="mb-8">
                    <p className="text-slate-500 text-sm mb-1">Total Harga</p>
                    <div className="text-4xl font-black text-edubiru">
                      Rp {currentPaket.harga.toLocaleString("id-ID")}
                    </div>
                  </div>

                  <p className="font-bold text-lg mb-4 text-slate-800">
                    Tata Cara Pembayaran:
                  </p>
                  <ol className="space-y-3 text-slate-600 list-decimal list-outside pl-5 leading-relaxed text-base">
                    <li>Scan barcode di samping.</li>
                    <li>
                      Pastikan nama penerima{" "}
                      <strong>EDUTEKTIF INDONESIA</strong>.
                    </li>
                    <li>
                      Scan berhasil apabila barcode sudah terbaca aplikasi.
                    </li>
                    <li>
                      Pembayaran akan diverifikasi otomatis setelah Anda menekan
                      tombol di bawah.
                    </li>
                  </ol>
                </div>

                {/* Kanan: QR Code */}
                <div className="flex-none w-full md:w-auto flex flex-col items-center">
                  <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm relative group">
                    <img
                      src={qrisUrl}
                      alt="QR Code QRIS"
                      className="w-56 h-56 md:w-64 md:h-64 object-contain"
                    />
                    <div className="absolute top-0 right-0 bg-slate-100 text-[10px] font-bold px-2 py-1 rounded-bl-lg text-slate-500">
                      SCAN ME
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-slate-400">
                    <CheckCircle size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Verified Merchant
                    </span>
                  </div>
                </div>
              </div>

              {/* ===== ALERT FULL WIDTH (PANJANG KE SAMPING) ===== */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
                <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full flex-shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-yellow-800 text-lg mb-1">
                    PENTING!
                  </h4>
                  <p className="text-yellow-700 text-sm md:text-base leading-relaxed">
                    QRIS ini mengecek pembayaran secara otomatis. Pastikan
                    nominal yang Anda bayar <strong>SESUAI PERSIS</strong>{" "}
                    dengan Total Harga di atas (hingga 3 digit terakhir) agar
                    verifikasi berhasil.
                  </p>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={handleSudahBayar}
                  disabled={submitting}
                  className={`w-full text-white font-bold text-lg py-5 rounded-xl shadow-lg transition-all duration-300 ${
                    submitting
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-[#0b3c65] hover:bg-[#082a46] hover:-translate-y-1"
                  }`}
                >
                  {submitting ? "Memproses..." : "Saya Sudah Bayar"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
