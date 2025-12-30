import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import heroImg from "../../assets/images/Group1.png";
import heroImg2 from "../../assets/images/Group2.png";
import imgMatematika from "../../assets/images/materiPopuler/matematika.png";
import imgBin from "../../assets/images/materiPopuler/bin.png";
import imgPpkn from "../../assets/images/materiPopuler/ppkn.png";
import imgBing from "../../assets/images/materiPopuler/bing.png";

const popular = [
  {
    id: 1,
    tag: "Matematika",
    title: "Pengenalan Konsep Bilangan dan Operasi Hitung",
    rating: 5,
    img: imgMatematika,
  },
  {
    id: 2,
    tag: "Bahasa Indonesia",
    title: "Memahami Teks dan Keterampilan Berbahasa",
    rating: 5,
    img: imgBin,
  },
  {
    id: 3,
    tag: "PPKn",
    title: "Mengenal Nilai-Nilai Pancasila dalam Kehidupan Sehari-hari",
    rating: 5,
    img: imgPpkn,
  },
  {
    id: 4,
    tag: "Bahasa Inggris",
    title: "Basic English: Vocabulary and Daily Conversation",
    rating: 5,
    img: imgBing,
  },
];

const features = [
  {
    title: "Pendekatan Belajar yang Bikin Paham",
    desc: "Edutektif menghadirkan pembelajaran yang runtut, mudah diikuti, dan fokus pada pemahaman konsep supaya kamu nggak cuma hafal, tapi benar-benar ngerti.",
  },
  {
    title: "Mentor Terpilih dan Berpengalaman",
    desc: "Materi disusun oleh pengajar berpengalaman yang sudah terbiasa membantu siswa dari berbagai tingkat kemampuan untuk mencapai hasil terbaik.",
  },
  {
    title: "Ratusan Materi & Soal Interaktif",
    desc: "Dilengkapi latihan soal, pembahasan jelas, dan konten multimedia yang membuat belajar jadi lebih menyenangkan dan nggak monoton.",
  },
];

const reviews = [
  {
    name: "Alya Putri Ramadhani",
    role: "SMP Negeri 1 Surabaya",
    text: "Setelah pakai Edutektif, aku jadi lebih paham. Penjelasannya jelas banget!",
  },
  {
    name: "Rina Wulandari",
    role: "Guru Matematika",
    text: "Materi sangat membantu saya mempersiapkan pembelajaran harian.",
  },
  {
    name: "Rafi Pratama",
    role: "SMA Negeri 2 Surabaya",
    text: "Latihan soalnya lengkap dan pembahasan jelas.",
  },
];

const plans = [
  { months: 1, price: "Rp 170.000", note: "Hemat 0%" },
  { months: 3, price: "Rp 220.000", note: "Hemat 15%" },
  { months: 6, price: "Rp 330.000", note: "Hemat 20%" },
  { months: 9, price: "Rp 420.000", note: "Hemat 25%" },
  { months: 12, price: "Rp 445.000", note: "Hemat 30%" },
];

/* ================= COMPONENT ================= */

export default function DashboardSiswa() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  /* ===== NAVBAR SCROLL ===== */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setIsNavbarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const renderStars = (rating) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={
            i < rating ? "text-yellow-400 text-lg" : "text-gray-300 text-lg"
          }
        >
          ★
        </span>
      ))}
      <span className="text-slate-800 font-bold ml-1 text-sm">{rating}.0</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-poppins overflow-x-hidden">
      <Navbar isNavbarVisible={isNavbarVisible} />

      <main>
        {/* ================= HERO ================= */}
        <section className="bg-white pt-24 pb-16 md:pt-32 md:pb-24 lg:h-auto overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left z-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900">
                Halo,{" "}
                <span className="text-edubiru">
                  {user?.username || "Siswa"}
                </span>{" "}
                👋
                <br />
                <span className="text-slate-800">Yuk Lanjutkan</span>
                <br />
                <span className="text-yellow-500">Progres Belajarmu</span>
              </h1>

              <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Semua materi pembelajaran, video interaktif, serta latihan soal
                di Edutektif sudah siap menemani proses belajarmu. Tetap
                konsisten dan tingkatkan pemahamanmu sedikit demi sedikit setiap
                hari.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => navigate("/materi")}
                  className="px-8 py-3.5 bg-edubiru text-white rounded-xl font-bold shadow-lg shadow-edubiru/30 hover:bg-edubiru-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                >
                  Mulai Belajar
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/latihan-soal")}
                  className="px-8 py-3.5 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:border-edubiru hover:text-edubiru hover:bg-slate-50 transition-all duration-300 w-full sm:w-auto"
                >
                  Latihan Soal
                </button>
              </div>
            </div>

            {/* Image Content */}
            <div className="flex-1 flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px]">
                {/* Decorative Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-edubiru/5 rounded-full blur-3xl -z-10"></div>
                <img
                  src={heroImg}
                  alt="Hero Dashboard"
                  className="w-full h-auto drop-shadow-xl animate-fade-in-up"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= POPULAR ================= */}
        <section className="bg-edubiru py-16 md:py-24 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Materi Populer
              </h2>
              <p className="text-edubiru-100 text-lg max-w-2xl mx-auto">
                Materi yang paling sering dipelajari oleh siswa Edutektif minggu
                ini.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {popular.map((p) => (
                <article
                  key={p.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute left-4 top-4 bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {p.tag}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col gap-3 flex-grow">
                    <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 mb-1 group-hover:text-edubiru transition-colors">
                      {p.title}
                    </h3>

                    <div className="space-y-2 mt-auto">
                      <div className="text-xs text-slate-500 font-medium bg-slate-100 inline-block px-2 py-1 rounded">
                        Materi Pilihan
                      </div>
                      {renderStars(p.rating)}
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/materi")}
                      className="w-full mt-4 py-2.5 rounded-xl text-sm font-bold border-2 border-edubiru text-edubiru hover:bg-edubiru hover:text-white transition-all duration-300"
                    >
                      Pelajari Sekarang
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Kenapa Belajar di <span className="text-edubiru">Edutektif?</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-16">
              Kami merancang pengalaman belajar yang lebih terarah, interaktif,
              dan mudah dipahami agar kamu bisa belajar dengan nyaman dan
              percaya diri.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-yellow-50 border border-yellow-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:bg-yellow-400 hover:text-slate-900 transition-all duration-300 group text-left sm:text-center"
                >
                  <h4 className="font-bold text-xl mb-3 text-slate-900 group-hover:text-black">
                    {f.title}
                  </h4>
                  <p className="text-slate-600 group-hover:text-slate-800 leading-relaxed text-sm md:text-base">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MISSION ================= */}
        <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col lg:flex-row items-center gap-12 border border-slate-100">
              <div className="lg:w-1/2 order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                  Dampak Nyata untuk <br />{" "}
                  <span className="text-edubiru">Perjalanan Belajarmu</span>
                </h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  Dengan Edutektif, kamu tidak hanya belajar materi sekolah,
                  tetapi juga membangun kebiasaan belajar yang konsisten,
                  terarah, dan berkelanjutan untuk masa depanmu.
                </p>
                <button
                  onClick={() => navigate("/materi")}
                  className="bg-edubiru text-white px-10 py-3.5 rounded-xl font-bold hover:bg-edubiru-900 hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  Jelajahi Materi
                </button>
              </div>

              <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center">
                <img
                  src={heroImg2}
                  alt="Mission Illustration"
                  className="w-full max-w-md lg:max-w-full drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= REVIEWS ================= */}
        <section className="bg-edubiru text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Kesan & Pengalaman Pengguna
              </h2>
              <p className="text-edubiru-100 text-lg">
                Cerita nyata dari siswa dan pendidik yang sudah belajar bersama
                Edutektif.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="bg-white text-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 flex flex-col h-full relative"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-xl text-slate-900 shadow-sm flex-shrink-0">
                      {r.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-900 text-lg">
                        {r.name}
                      </div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                        {r.role}
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 italic leading-relaxed">
                    "{r.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PRICING ================= */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Upgrade Akses Belajarmu
            </h2>
            <p className="text-slate-600 text-lg mb-16 max-w-2xl mx-auto">
              Pilih paket belajar untuk membuka seluruh materi, video
              pembelajaran, dan latihan soal tanpa batas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {plans.map((p, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-yellow-400 hover:ring-4 hover:ring-yellow-400/20 hover:-translate-y-2 transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full mb-2">
                      Paket {p.months} Bulan
                    </span>
                    <div className="text-2xl font-extrabold text-slate-900">
                      {p.price}
                    </div>
                  </div>

                  <div className="flex-grow mb-6">
                    <div className="text-sm font-semibold text-green-600 flex items-center justify-center gap-1 bg-green-50 py-1 rounded-lg">
                      {p.note}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/paket")}
                    className="w-full bg-yellow-400 text-slate-900 py-3 rounded-xl font-bold hover:bg-yellow-500 hover:shadow-md transition-all active:scale-95"
                  >
                    Lihat Paket
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
