import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const testimonials = [
  {
    id: 1,
    name: "Alya Putri Ramadhani",
    role: "SMP Negeri 1 Surabaya",
    text: "Setelah pakai Edutektif, aku yang biasanya kesulitan sama materi sekolah jadi lebih cepat nangkep. Penjelasannya runtut banget dan nggak bikin pusing!",
  },
  {
    id: 2,
    name: "Rina Wulandari",
    role: "Guru Matematika",
    text: "Edutektif sangat membantu saya menyiapkan materi harian. Penjelasannya sederhana tapi tetap mendalam, cocok untuk berbagai kemampuan siswa.",
  },
  {
    id: 3,
    name: "Rafi Pratama",
    role: "SMA Negeri 15 Surabaya",
    text: "Latihan soalnya lengkap dan pembahasannya jelas. Aksi jadi lebih percaya diri saat ulangan karena sudah paham konsepnya dari dasar.",
  },
  {
    id: 4,
    name: "Andi Saputra",
    role: "Guru IPA",
    text: "Visual dan alur materinya bagus, membuat siswa lebih fokus. Kelas jadi lebih hidup karena mereka cepat paham.",
  },
  {
    id: 5,
    name: "Salsabila Nur Aini",
    role: "SMP Negeri 21 Surabaya",
    text: "Dulu suka bingung sama beberapa pelajaran, tapi sekarang pakai Edutektif jadi lebih mudah. Banyak contoh yang bikin cepat paham.",
  },
  {
    id: 6,
    name: "Kevin Alamsyah",
    role: "Guru Bahasa Indonesia",
    text: "Saya merekomendasikan website ini karena informasinya akurat dan mudah dipahami oleh siswa. Interfacenya simpel sehingga siswa tidak kesulitan mencari materi.",
  },
  {
    id: 7,
    name: "Rangga Aditya",
    role: "SMP Negeri 30 Surabaya",
    text: "Belajar dari website ini bikin saya lebih percaya diri saat ulangan. Materinya lengkap, mulai dari dasar sampai contoh soal yang mirip dengan ujian.",
  },
  {
    id: 8,
    name: "Laras Dewi",
    role: "Guru Bahasa Inggris",
    text: "Konten edukasinya berkualitas dan dapat diandalkan. Penjelasan konsep dan contoh praktiknya membuat siswa lebih cepat menangkap materi kompleks.",
  },
];

function Avatar({ name, src }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
      />
    );
  }
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="w-12 h-12 rounded-full bg-white/90 text-blue-900 font-bold flex items-center justify-center shadow-sm">
      {initials}
    </div>
  );
}

export default function Testi() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-20 py-32">
        {/* Tombol Kembali */}
        <div className="mb-6">
          {/* TOPBAR */}
          <Topbar title="Testimoni" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Testimoni Pengguna Edutektif
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="bg-yellow-400/95 text-slate-900 rounded-xl p-4 shadow-md hover:shadow-lg transition flex flex-col h-full"
            >
              <div className="flex items-start gap-3">
                <Avatar name={t.name} src={t.avatar} />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-slate-800/80">{t.role}</div>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-900/90 flex-1">{t.text}</p>

              <div className="mt-4 flex justify-end">
                {/* optional action or icon */}
                <span className="text-xs text-slate-800/70">
                  ✔ Terverifikasi
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
