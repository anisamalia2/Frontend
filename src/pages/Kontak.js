import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import banner2 from "../assets/images/banner2.png";
import gambarCall from "../assets/images/gambarCall.png";
import gambarEmail from "../assets/images/gambarEmail.png";
import gambarLokasi from "../assets/images/gambarLokasi.png";
import garis from "../assets/images/garis.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Kontak() {
  const navigate = useNavigate();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // STATE UNTUK MODAL FOOTER
  const [activeModal, setActiveModal] = useState(null);

  // PASTIKAN SETIAP MASUK HALAMAN INI MULAI DARI ATAS
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="min-h-screen bg-white text-slate-900 font-poppins">
      <Navbar isNavbarVisible={isNavbarVisible} />

      <main className="max-w-7xl mx-auto px-6 md:px-20 pt-28 pb-12">
        {/* ===== BANNER IMAGE ===== */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-lg h-48 md:h-64">
          <img
            src={banner2}
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ===== TENTANG KAMI ===== */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Tentang Kami</h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Edutektif adalah platform edukasi digital yang dibuat untuk membantu
            pelajar memahami materi dengan cara yang lebih cepat, mudah, dan
            menyenangkan.
          </p>
        </section>

        <div className="flex justify-center mb-16">
          <img src={garis} alt="divider" className="w-3" />
        </div>

        {/* ===== VISI ===== */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Visi Kami</h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Menjadi platform belajar yang membantu setiap pelajar Indonesia
            memahami materi dengan lebih mudah, mandiri, dan percaya diri.
          </p>
        </section>

        <div className="flex justify-center mb-16">
          <img src={garis} alt="divider" className="w-3" />
        </div>

        {/* ===== KONTAK ===== */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Kontak Kami
          </h2>

          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto text-center mb-12">
            Jangan ragu menghubungi kami jika ada pertanyaan atau kebutuhan
            lainnya.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-edubiru text-white rounded-xl p-6 text-center shadow-lg">
              <img src={gambarCall} alt="call" className="w-6 mx-auto mb-3" />
              <p className="text-blue-100 mb-2">Hubungi kami via telepon</p>
              <p className="font-bold">08274984903</p>
            </div>

            <div className="bg-edubiru text-white rounded-xl p-6 text-center shadow-lg">
              <img src={gambarEmail} alt="email" className="w-6 mx-auto mb-3" />
              <p className="text-blue-100 mb-2">Kirim email ke</p>
              <p className="font-bold">edutektif@gmail.com</p>
            </div>

            <div className="bg-edubiru text-white rounded-xl p-6 text-center shadow-lg">
              <img
                src={gambarLokasi}
                alt="lokasi"
                className="w-6 mx-auto mb-3"
              />
              <p className="text-blue-100 mb-2">Lokasi kantor</p>
              <p className="font-bold">Surabaya, Jawa Timur</p>
            </div>
          </div>

          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="maps"
              width="100%"
              height="100%"
              frameBorder="0"
              src="https://maps.google.com/maps?q=Universitas%20Negeri%20Surabaya&z=13&output=embed"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
