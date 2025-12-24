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
      <span className="text-slate-800 font-bold ml-1">{rating}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-poppins">
      <Navbar isNavbarVisible={isNavbarVisible} />

      <main>
        {/* ================= HERO ================= */}
        <section className="bg-white py-12 md:py-32 md:h-[700px]">
          <div className="max-w-7xl mx-auto px-6 md:px-20 flex flex-col-reverse md:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-5xl md:text-5xl font-extrabold leading-[68px] tracking-tight text-slate-900">
                Halo, {user?.username} 👋
                <br />
                Yuk Lanjutkan
                <br />
                Progres Belajarmu
              </h1>

              <p className="mt-6 text-slate-600 max-w-xl text-[15px] leading-relaxed">
                Semua materi pembelajaran, video interaktif, serta latihan soal
                di Edutektif sudah siap menemani proses belajarmu. Tetap
                konsisten dan tingkatkan pemahamanmu sedikit demi sedikit setiap
                hari.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/materi")}
                  className="w-full sm:w-auto bg-edubiru text-white px-8 py-2.5 rounded-xl font-semibold hover:bg-edubiru-900 transition shadow-lg"
                >
                  Mulai Belajar
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/latihan-soal")}
                  className="w-full sm:w-auto bg-white border-2 border-slate-800 text-slate-800 px-8 py-2.5 rounded-xl font-semibold hover:bg-edubiru hover:text-white transition shadow-lg"
                >
                  Latihan Soal
                </button>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <img
                src={heroImg}
                alt="hero"
                className="w-64 sm:w-80 md:w-96 lg:w-[320px] xl:w-[400px]"
              />
            </div>
          </div>
        </section>

        {/* ================= POPULAR ================= */}
        <section className="bg-edubiru text-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Materi Populer
            </h2>
            <p className="text-edubiru-100 text-center mb-10">
              Materi yang paling sering dipelajari oleh siswa Edutektif
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {popular.map((p) => (
                <article
                  key={p.id}
                  className="bg-white text-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 flex flex-col"
                >
                  <div className="relative h-44 bg-slate-200">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute left-4 top-4 bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-md">
                      {p.tag}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col gap-4 flex-grow">
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-2">
                      {p.title}
                    </h3>

                    <div className="space-y-2">
                      <div className="text-xs text-slate-500 font-medium">
                        Materi Pilihan
                      </div>
                      {renderStars(p.rating)}
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/materi")}
                      className="w-full bg-white text-slate-900 py-2 rounded-lg text-sm font-bold hover:bg-edubiru-900 transition border border-edubiru-900 hover:text-white"
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
          <div className="max-w-7xl mx-auto px-6 md:px-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Kenapa Belajar di Edutektif?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-12">
              Kami merancang pengalaman belajar yang lebih terarah, interaktif,
              dan mudah dipahami agar kamu bisa belajar dengan nyaman dan
              percaya diri.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-yellow-400 p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
                >
                  <h4 className="font-bold text-lg mb-4">{f.title}</h4>
                  <p className="text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MISSION ================= */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src={heroImg2}
                alt="hero2"
                className="w-[280px] sm:w-[350px] md:w-[480px] lg:w-[600px]"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-extrabold mb-4">
                Dampak Nyata untuk Perjalanan Belajarmu
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Dengan Edutektif, kamu tidak hanya belajar materi sekolah,
                tetapi juga membangun kebiasaan belajar yang konsisten, terarah,
                dan berkelanjutan untuk masa depanmu.
              </p>
              <button
                onClick={() => navigate("/materi")}
                className="bg-edubiru text-white px-10 py-2 rounded-lg font-semibold hover:bg-edubiru-900 transition shadow-lg"
              >
                Jelajahi Materi
              </button>
            </div>
          </div>
        </section>

        {/* ================= REVIEWS ================= */}
        <section className="bg-edubiru text-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kesan & Pengalaman Pengguna
            </h2>
            <p className="text-edubiru-100 mb-12">
              Cerita nyata dari siswa dan pendidik yang sudah belajar bersama
              Edutektif
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="bg-white/95 text-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-xl text-slate-900 flex-shrink-0">
                      {r.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-800">{r.name}</div>
                      <div className="text-xs text-slate-500">{r.role}</div>
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PRICING ================= */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upgrade Akses Belajarmu
            </h2>
            <p className="text-slate-600 text-lg mb-12">
              Pilih paket belajar untuk membuka seluruh materi, video
              pembelajaran, dan latihan soal tanpa batas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {plans.map((p, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-slate-200 rounded-xl shadow-lg p-6 hover:border-yellow-400 hover:shadow-2xl hover:scale-105 transition duration-300"
                >
                  <div className="text-sm font-medium text-slate-500 mb-3">
                    Paket {p.months} Bulan
                  </div>
                  <div className="text-2xl font-bold mb-2">{p.price}</div>
                  <div className="text-xs font-semibold text-yellow-600 mb-6 bg-yellow-100 py-1 rounded">
                    {p.note}
                  </div>
                  <button
                    onClick={() => navigate("/paket")}
                    className="w-full bg-yellow-400 py-3 rounded-lg font-bold hover:bg-yellow-500 transition"
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
