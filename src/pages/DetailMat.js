import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const materiDatabase = {
  101: {
    id: 101,
    title: "Mengenal Huruf dan Kalimat Sederhana",
    category: "Bahasa Indonesia",
    kelas: "Kelas 1 SD",
    rating: 5.0,
    // specific YouTube embed provided by user
    videoUrl: "https://www.youtube.com/embed/ipmcPCLnRTY?si=vGk2zn6SqWXa440_",
    duration: "9:10",
    description: "Video ini membantu siswa mengenal huruf serta memahami cara menyusun kalimat sederhana. Melalui contoh-contoh yang mudah diikuti, siswa belajar membedakan huruf vokal dan konsonan, membaca kata dasar, serta menggabungkannya menjadi kalimat pendek yang bermakna.",
    content: [
      { id: 1, title: "Pengenalan Huruf Vokal", time: "0:00" },
      { id: 2, title: "Pengenalan Huruf Konsonan", time: "2:15" },
      { id: 3, title: "Membaca Kata Sederhana", time: "4:30" },
      { id: 4, title: "Menyusun Kalimat Pendek", time: "6:45" },
    ],
  },
  102: {
    id: 102,
    title: "Menentukan Gagasan Pokok dan Gagasan Pendukung",
    category: "Bahasa Indonesia",
    kelas: "Kelas 5 SD",
    rating: 4.8,
    // specific YouTube embed provided by user
    videoUrl: "https://www.youtube.com/embed/F1ZByBCF8VA?si=n3MoMZl-K_D68KLG",
    duration: "10:30",
    description: "Video pembelajaran tentang cara mengidentifikasi gagasan pokok dan gagasan pendukung dalam sebuah paragraf. Materi ini sangat penting untuk meningkatkan kemampuan pemahaman bacaan.",
    content: [
      { id: 1, title: "Pengertian Gagasan Pokok", time: "0:00" },
      { id: 2, title: "Pengertian Gagasan Pendukung", time: "2:50" },
      { id: 3, title: "Cara Mengidentifikasi", time: "5:20" },
      { id: 4, title: "Latihan Soal", time: "8:10" },
    ],
  },
};

export default function DetailMateri() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [materi, setMateri] = useState(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (materiDatabase[id]) {
      setMateri(materiDatabase[id]);
    } else {
      navigate("/materi");
    }
  }, [id, navigate]);

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

  if (!materi) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-xl text-slate-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-poppins">
      <Navbar isNavbarVisible={isNavbarVisible} />

      <main className="max-w-6xl mx-auto px-6 md:px-20 py-12">
        {/* ===== BACK BUTTON ===== */}
        <button
          type="button"
          onClick={() => navigate("/materi")}
          className="mb-8 flex items-center gap-2 text-blue-900 font-semibold hover:text-blue-800 transition"
        >
          ← Kembali
        </button>

        {/* ===== HANYA VIDEO & PENJELASAN ===== */}
        <div className="bg-white rounded overflow-hidden mb-8">
          <div className="relative w-full bg-black aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={materi.videoUrl}
              title={materi.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0"
            />
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{materi.title}</h1>
            <p className="text-sm text-slate-500 mb-6">{materi.kelas} • {materi.category} • {materi.duration}</p>
            <p className="text-slate-600 leading-relaxed text-base">{materi.description}</p>
          </div>
        </div>
      </main>

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