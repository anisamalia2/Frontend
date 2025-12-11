import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import banner2 from "../assets/images/banner2.png";
import gambarCall from "../assets/images/gambarCall.png";
import gambarEmail from "../assets/images/gambarEmail.png";
import gambarLokasi from "../assets/images/gambarLokasi.png";
import garis from "../assets/images/garis.png";
import Navbar from "../components/Navbar";

export default function Kontak() {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-white text-slate-900 font-poppins">
     <Navbar isNavbarVisible={isNavbarVisible} />

      <main className="max-w-7xl mx-auto px-6 md:px-20 py-12">
        {/* ===== BANNER IMAGE ===== */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-lg h-48 md:h-64 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
        <img
            src={banner2}
            alt="banner2"
            className="w-full h-full object-cover"
        />
        </div>

        {/* ===== TENTANG KAMI ===== */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
            Tentang Kami
          </h2>

          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Edutektif adalah platform edukasi digital yang dibuat untuk membantu pelajar memahami materi dengan cara yang lebih cepat, mudah, dan menyenangkan. Kami menggabungkan latihan soal dan video pembelajaran dalam satu tempat agar proses belajar jadi lebih efektif.
          </p>
        </section>

        {/* ===== DIVIDER ===== */}
        <div className="flex justify-center mb-16">
          <img src={garis} alt="divider" className="w-3 md:w-3" />
        </div>

        {/* ===== VISI KAMI ===== */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
            Visi Kami
          </h2>

          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Edutektif memiliki visi untuk menjadi platform belajar yang membantu setiap pelajar Indonesia memahami materi dengan lebih mudah, mandiri, dan percaya diri. Kami ingin menciptakan lingkungan belajar yang modern, inklusif, dan dapat diakses siapa saja, kapan saja. Kami berkomitmen mendukung pelajar dalam mencapai tujuan akademik dan terus berkembang di era digital.
          </p>
        </section>

        {/* ===== DIVIDER ===== */}
        <div className="flex justify-center mb-16">
          <img src={garis} alt="divider" className="w-3 md:w-3" />
        </div>

        {/* ===== KONTAK KAMI ===== */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-slate-900">
            Kontak Kami
          </h2>

          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto text-center mb-12 leading-relaxed">
            Jika Anda memiliki pertanyaan, membutuhkan bantuan, atau ingin berdiskusi lebih lanjut mengenai materi pembelajaran, jangan ragu untuk menghubungi kami.
          </p>

          {/* ===== CONTACT CARDS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Phone Card */}
            <div className="bg-edubiru text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition text-center">
              <img src={gambarCall} alt="Phone Icon" className="w-6 h-6 mx-auto mb-3" />
              <p className="text-md text-blue-100 mb-3">
                kami siap membantu melalui WhatsApp atau telepon.
              </p>
              <p className="font-bold text-white text-md">08274984903</p>
            </div>

            {/* Email Card */}
            <div className="bg-edubiru text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition text-center">
              <img src={gambarEmail} alt="Email Icon" className="w-6 h-6 mx-auto mb-3" />
              <p className="text-md text-blue-100 mb-3">
                Punyai pertanyaan, saran, atau ingin kerjasama?
              </p>
              <p className="font-bold text-white text-md">edutektif@gmail.com</p>
            </div>

            {/* Address Card */}
            <div className="bg-edubiru text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition text-center">
              <img src={gambarLokasi} alt="Location Icon" className="w-6 h-6 mx-auto mb-3" />
              <p className="text-md text-blue-100 mb-3">
                Kunjungi atau hubungi kantor kami di Surabaya.
              </p>
              <p className="font-bold text-white text-md">
                Guyungan, Surabaya Jawa Timur
              </p>
            </div>
          </div>

          {/* ===== MAP ===== */}
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              title="location map"
              marginHeight={0}
              marginWidth={0}
              scrolling="no"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Universitas%20Negeri%20Surabaya+(Edutektif)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
        </section>
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