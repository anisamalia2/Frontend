import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imgBanner from "../assets/images/materi/Banner.png";
import Navbar from "../components/Navbar";

const categories = [
  "Bahasa Indonesia",
  "Matematika",
  "IPA",
  "Bahasa Inggris",
  "IPS",
  "PPKn",
  "Ekonomi",
  "Seni Budaya",
];

// Bahasa Indonesia exercises (updated from screenshots)
const exercisesBI = [
  { id: 101, category: "Bahasa Indonesia", kelas: "Kelas 4 SD", title: "Memahami Teks Deskripsi Lingkungan Sekitar", soal: 10, isLocked: false },
  { id: 102, category: "Bahasa Indonesia", kelas: "Kelas 5 SD", title: "Menentukan Gagasan Pokok dan Gagasan Pendukung dalam Paragraf", soal: 10, isLocked: false },
  { id: 103, category: "Bahasa Indonesia", kelas: "Kelas 7 SMP", title: "Menganalisis Struktur Teks Cerita Fabel", soal: 10, isLocked: true },
  { id: 104, category: "Bahasa Indonesia", kelas: "Kelas 6 SD", title: "Latihan Menulis Surat Pribadi yang Baik dan Benar", soal: 10, isLocked: true },
  { id: 105, category: "Bahasa Indonesia", kelas: "Kelas 10 SMA", title: "Menyusun Teks Negosiasi dengan Struktur yang Tepat", soal: 10, isLocked: true },
  { id: 106, category: "Bahasa Indonesia", kelas: "Kelas 10 SMA", title: "Menganalisis Teks Eksposisi dan Argumen Penulis", soal: 10, isLocked: true },
];

// Matematika exercises (updated from screenshots)
const exercisesMath = [
  { id: 201, category: "Matematika", kelas: "Kelas 3 SD", title: "Operasi Hitung Bilangan Cacah", soal: 10, isLocked: false },
  { id: 202, category: "Matematika", kelas: "Kelas 4 SD", title: "Pemahaman Pecahan Sederhana dan Penggambarannya", soal: 10, isLocked: false },
  { id: 203, category: "Matematika", kelas: "Kelas 6 SD", title: "Perbandingan dan Skala dalam Kehidupan Sehari-hari", soal: 10, isLocked: true },
  { id: 204, category: "Matematika", kelas: "Kelas 8 SMP", title: "Sistem Persamaan Linear Dua Variabel (SPLDV)", soal: 10, isLocked: true },
  { id: 205, category: "Matematika", kelas: "Kelas 10 SMA", title: "Fungsi dan Grafik Sederhana", soal: 10, isLocked: true },
  { id: 206, category: "Matematika", kelas: "Kelas 11 SMA", title: "Limit dan Turunan Dasar", soal: 10, isLocked: true },
];

// IPA exercises (updated from screenshots)
const exercisesIPA = [
  { id: 301, category: "IPA", kelas: "Kelas 4 SD", title: "Klasifikasi Makhluk Hidup Berdasarkan Ciri-Cirinya", soal: 10, isLocked: false },
  { id: 302, category: "IPA", kelas: "Kelas 6 SD", title: "Gaya dan Gerak dalam Kehidupan Sehari-hari", soal: 10, isLocked: false },
  { id: 303, category: "IPA", kelas: "Kelas 7 SMP", title: "Interaksi Makhluk Hidup dalam Ekosistem", soal: 10, isLocked: true },
  { id: 304, category: "IPA", kelas: "Kelas 9 SMP", title: "Gerak Harmonik dan Getaran", soal: 10, isLocked: true },
  { id: 305, category: "IPA", kelas: "Kelas 10 SMA", title: "Struktur Atom dan Sistem Periodik Unsur", soal: 10, isLocked: true },
  { id: 306, category: "IPA", kelas: "Kelas 8 SMP", title: "Struktur dan Fungsi Organ Tumbuhan", soal: 10, isLocked: true },
];

// Bahasa Inggris exercises (updated from screenshots)
const exercisesENG = [
  { id: 401, category: "Bahasa Inggris", kelas: "Kelas 5 SD", title: "Describing People, Animals, and Things (Mendeskripsikan Orang, Hewan, dan Benda)", soal: 10, isLocked: false },
  { id: 402, category: "Bahasa Inggris", kelas: "Kelas 7 SMP", title: "Asking and Giving Directions (Meminta dan Memberi Arah)", soal: 10, isLocked: false },
  { id: 403, category: "Bahasa Inggris", kelas: "Kelas 8 SMP", title: "Procedure Text: Steps and Sequence Words", soal: 10, isLocked: true },
  { id: 404, category: "Bahasa Inggris", kelas: "Kelas 9 SMP", title: "Simple Past Tense in Short Stories", soal: 10, isLocked: true },
  { id: 405, category: "Bahasa Inggris", kelas: "Kelas 10 SMA", title: "Narrative Text: Analyzing Plot, Characters, and Setting", soal: 10, isLocked: true },
  { id: 406, category: "Bahasa Inggris", kelas: "Kelas 11 SMA", title: "Analytical Exposition: Thesis, Arguments, and Conclusion", soal: 10, isLocked: true },
];

// IPS exercises (updated from screenshots)
const exercisesIPS = [
  { id: 501, category: "IPS", kelas: "Kelas 4 SD", title: "Kegiatan Ekonomi Masyarakat dan Pemanfaatan Sumber Daya Alam", soal: 10, isLocked: false },
  { id: 502, category: "IPS", kelas: "Kelas 7 SMP", title: "Interaksi Sosial dalam Kehidupan Sehari-hari", soal: 10, isLocked: false },
  { id: 503, category: "IPS", kelas: "Kelas 8 SMP", title: "Kondisi Geografis Indonesia dan Pengaruhnya terhadap Kehidupan Sosial", soal: 10, isLocked: true },
  { id: 504, category: "IPS", kelas: "Kelas 9 SMP", title: "Perubahan Sosial dan Dampaknya", soal: 10, isLocked: true },
  { id: 505, category: "IPS", kelas: "Kelas 10 SMA", title: "Globalisasi dan Pengaruhnya terhadap Budaya Lokal", soal: 10, isLocked: true },
  { id: 506, category: "IPS", kelas: "Kelas 11 SMA", title: "Pasar, Harga, dan Mekanisme Permintaan—Penawaran", soal: 10, isLocked: true },
];

// PPKn exercises (updated from screenshots)
const exercisesPPKn = [
  { id: 601, category: "PPKn", kelas: "Kelas 4 SD", title: "Nilai-Nilai Pancasila dalam Kehidupan Sehari-hari", soal: 10, isLocked: false },
  { id: 602, category: "PPKn", kelas: "Kelas 6 SD", title: "Keberagaman dalam Bingkai Bhinneka Tunggal Ika", soal: 10, isLocked: false },
  { id: 603, category: "PPKn", kelas: "Kelas 7 SMP", title: "Lembaga-Lembaga Negara dalam Sistem Pemerintahan Indonesia", soal: 10, isLocked: true },
  { id: 604, category: "PPKn", kelas: "Kelas 9 SMP", title: "Sistem Hukum dan Peradilan di Indonesia", soal: 10, isLocked: true },
  { id: 605, category: "PPKn", kelas: "Kelas 10 SMA", title: "Hak Asasi Manusia (HAM) dan Implementasinya", soal: 10, isLocked: true },
  { id: 606, category: "PPKn", kelas: "Kelas 11 SMA", title: "Demokrasi Pancasila dan Pelaksanaannya", soal: 10, isLocked: true },
];

// Ekonomi exercises (updated from screenshots)
const exercisesEko = [
  { id: 701, category: "Ekonomi", kelas: "Kelas 10 SMA", title: "Konsep Kebutuhan, Keinginan, dan Skala Prioritas", soal: 10, isLocked: false },
  { id: 702, category: "Ekonomi", kelas: "Kelas 10 SMA", title: "Kegiatan Ekonomi: Produksi, Distribusi, dan Konsumsi", soal: 10, isLocked: false },
  { id: 703, category: "Ekonomi", kelas: "Kelas 11 SMA", title: "Manajemen dan Fungsi-Fungsinya dalam Perusahaan", soal: 10, isLocked: true },
  { id: 704, category: "Ekonomi", kelas: "Kelas 10 SMA", title: "Perdagangan Internasional dan Neraca Pembayaran", soal: 10, isLocked: true },
  { id: 705, category: "Ekonomi", kelas: "Kelas 12 SMA", title: "Inflasi, Pengangguran, dan Pertumbuhan Ekonomi", soal: 10, isLocked: true },
  { id: 706, category: "Ekonomi", kelas: "Kelas 12 SMA", title: "Pendapatan Nasional dan Indikator Ekonomi", soal: 10, isLocked: true },
];

// Seni Budaya exercises
const exercisesSB = [
  { id: 701, category: "Seni Budaya", kelas: "Kelas 1 SD", title: "Alat Musik Ritmis", soal: 10, isLocked: false },
  { id: 702, category: "Seni Budaya", kelas: "Kelas 2 SD", title: "Menyanyikan Lagu", soal: 12, isLocked: false },
  { id: 703, category: "Seni Budaya", kelas: "Kelas 3 SD", title: "Teknik Menggambar", soal: 14, isLocked: true },
  { id: 704, category: "Seni Budaya", kelas: "Kelas 4 SD", title: "Seni Rupa 2D", soal: 16, isLocked: false },
  { id: 705, category: "Seni Budaya", kelas: "Kelas 5 SD", title: "Unsur Seni Rupa", soal: 18, isLocked: true },
];

export default function LatSoalBin() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Bahasa Indonesia");
  const [query, setQuery] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;

      if (currentScrollY < lastScrollY) {
        setIsNavbarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Choose data set depending on selected category
  let sourceExercises = exercisesBI;
  if (activeCategory === "Matematika") {
    sourceExercises = exercisesMath;
  } else if (activeCategory === "IPA") {
    sourceExercises = exercisesIPA;
  } else if (activeCategory === "Bahasa Inggris") {
    sourceExercises = exercisesENG;
  } else if (activeCategory === "IPS") {
    sourceExercises = exercisesIPS;
  } else if (activeCategory === "PPKn") {
    sourceExercises = exercisesPPKn;
  } else if (activeCategory === "Ekonomi") {
    sourceExercises = exercisesEko;
  } else if (activeCategory === "Seni Budaya") {
    sourceExercises = exercisesSB;
  }

  const filtered = sourceExercises.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleKerjakan = (item) => {
    if (item.isLocked) {
      setSelectedExercise(item);
      setShowPaymentModal(true);
      return;
    }
    navigate(`/detail-latihan-soal/${item.id}`);
  };

  const handlePayment = () => {
    if (selectedExercise) {
      alert(`Pembayaran untuk "${selectedExercise.title}" berhasil!`);
      setShowPaymentModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-poppins">
      <Navbar isNavbarVisible={isNavbarVisible} />
      
      <main className="max-w-7xl mx-auto px-6 md:px-20 py-8">
        {/* ===== BANNER ===== */}
        <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
          <div
            className="relative bg-white h-40 md:h-48 flex items-center justify-start bg-cover bg-center"
            style={{ backgroundImage: `url(${imgBanner})` }}
          >
            <div className="relative z-10 w-full max-w-7xl px-6 md:px-20">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <h2 className="text-2xl md:text-5xl font-bold text-white">AFTER SCHOOL</h2>
                  <h2 className="text-2xl md:text-5xl font-bold text-white">PROGRAM</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== CATEGORIES BUTTON ===== */}
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => {
                setActiveCategory(c);
                setQuery("");
              }}
              className={`px-7 py-3 rounded-[10px] text-sm font-bold tracking-wide transition-all duration-200
                ${
                  activeCategory === c
                    ? "bg-yellow-400 text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                    : "bg-edubiru text-white hover:bg-edubiru-900"
                }
              `}
            >
              {c}
            </button>
          ))}
        </div>

        {/* ===== SEARCH BAR ===== */}
        <div className="mt-8 flex items-center gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul latihan soal..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-900"
          />
        </div>

        {/* ===== EXERCISE LIST ===== */}
        <div className="mt-8 space-y-4">
          {filtered.map((e) => (
            <div
              key={e.id}
              className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 rounded-lg border transition ${
                e.isLocked
                  ? "bg-gray-100 border-gray-300"
                  : "bg-white border-slate-200 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Left Section - Class Badge & Title */}
              <div className="flex items-start gap-4 flex-1">
                {/* Class Badge */}
                <span
                  className={`px-4 py-2 rounded-md text-xs font-bold whitespace-nowrap ${
                    e.isLocked
                      ? "bg-gray-400 text-white"
                      : "bg-blue-900 text-white"
                  }`}
                >
                  {e.kelas}
                </span>

                {/* Title */}
                <h3
                  className={`text-sm md:text-base font-semibold ${
                    e.isLocked ? "text-gray-600" : "text-slate-800"
                  }`}
                >
                  {e.title}
                </h3>
              </div>

              {/* Right Section - Soal Count & Button */}
              <div className="flex items-center gap-6 md:justify-end">
                {/* Soal Count */}
                <span
                  className={`text-sm font-medium whitespace-nowrap ${
                    e.isLocked ? "text-gray-500" : "text-slate-600"
                  }`}
                >
                  {e.soal} Soal
                </span>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => handleKerjakan(e)}
                  disabled={e.isLocked}
                  className={`px-6 py-2 rounded-lg font-bold text-sm transition whitespace-nowrap ${
                    e.isLocked
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-yellow-400 text-slate-900 hover:bg-yellow-500"
                  }`}
                >
                  {e.isLocked ? "Terkunci" : "Kerjakan"}
                </button>
              </div>
            </div>
          ))}

          {/* No Results Message */}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <p className="text-lg font-medium">Tidak ada latihan yang cocok.</p>
            </div>
          )}
        </div>
      </main>

      {/* ===== PAYMENT MODAL ===== */}
      {showPaymentModal && selectedExercise && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🔒</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Materi Terkunci</h2>
              <p className="text-sm text-slate-600">
                Anda perlu melakukan pembayaran untuk mengakses materi ini
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-slate-900 text-sm mb-2">
                {selectedExercise.title}
              </h3>
              <p className="text-xs text-slate-600 mb-3">{selectedExercise.kelas}</p>

              <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                <span className="text-sm text-slate-600">Harga Akses:</span>
                <span className="text-xl font-bold text-blue-900">Rp 49.000</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handlePayment}
                className="w-full bg-yellow-400 text-slate-900 py-3 rounded-lg font-bold hover:bg-yellow-500 transition"
              >
                Lanjut ke Pembayaran
              </button>
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="w-full bg-slate-200 text-slate-900 py-3 rounded-lg font-bold hover:bg-slate-300 transition"
              >
                Batal
              </button>
            </div>

            <p className="text-center text-xs text-slate-500 mt-4">
              Pembayaran aman menggunakan berbagai metode
            </p>
          </div>
        </div>
      )}

      {/* ===== FOOTER ===== */}
      <footer className="bg-edubiru text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-14">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl font-extrabold">EDUTEKTIF</div>
              </div>
              <p className="text-sm text-edubiru-100 max-w-md leading-relaxed">
                Kami percaya setiap orang berhak mendapatkan pendidikan bermutu, dan kami berusaha mewujudkannya untuk siapa saja, di mana saja.
              </p>
            </div>

            <nav aria-label="Sosial Media" className="text-sm">
              <h4 className="font-semibold mb-3">Sosial Media</h4>
              <ul className="space-y-2 text-edubiru-100">
                <li><a href="#" className="hover:underline">Instagram</a></li>
                <li><a href="#" className="hover:underline">WhatsApp</a></li>
                <li><a href="#" className="hover:underline">YouTube</a></li>
                <li><a href="#" className="hover:underline">TikTok</a></li>
              </ul>
            </nav>

            <nav aria-label="Company" className="text-sm">
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-edubiru-100">
                <li><a href="#" className="hover:underline">Kontak Kami</a></li>
                <li><a href="#" className="hover:underline">Tentang Kami</a></li>
                <li><a href="#" className="hover:underline">Testimoni</a></li>
              </ul>
            </nav>

            <nav aria-label="Bantuan & Panduan" className="text-sm">
              <h4 className="font-semibold mb-3">Bantuan & Panduan</h4>
              <ul className="space-y-2 text-edubiru-100">
                <li><a href="#" className="hover:underline">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:underline">Ketentuan Penggunaan</a></li>
                <li><a href="#" className="hover:underline">Bantuan</a></li>
              </ul>
            </nav>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-edubiru-100">©2025 Edutektif. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}