import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import heroImg from "../assets/images/Group1.png";
import heroImg2 from "../assets/images/Group2.png";
import imgMatematika from "../assets/images/materiPopuler/matematika.png";
import imgBin from "../assets/images/materiPopuler/bin.png";
import imgPpkn from "../assets/images/materiPopuler/ppkn.png";
import imgBing from "../assets/images/materiPopuler/bing.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

// Mapping kategori ke slug URL
const categoryMap = {
  Matematika: "matematika",
  "Bahasa Indonesia": "bahasa-indonesia",
  PPKn: "ppkn",
  "Bahasa Inggris": "bahasa-inggris",
  IPA: "ipa",
  IPS: "ips",
  Ekonomi: "ekonomi",
  "Seni Budaya": "seni-budaya",
};

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (user) {
      if (user.role === "siswa") {
        navigate("/dashboard-siswa", { replace: true });
      } else if (user.role === "guru") {
        navigate("/dashboard-guru", { replace: true });
      }
    }
  }, [user, navigate]);

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

  const handleMulaiBelajarClick = (tag) => {
    const slug = categoryMap[tag];
    navigate(`/materi/${slug}`);
  };

  const renderStars = (rating) => {
    return (
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
        <span className="text-slate-800 font-bold ml-1 text-sm">
          {rating}.0
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-poppins overflow-x-hidden">
      <Navbar isNavbarVisible={isNavbarVisible} />

      <main>
        {/* ===== HERO SECTION ===== */}
        <section className="bg-white pt-24 pb-16 md:pt-32 md:pb-24 lg:h-auto overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left z-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900">
                Belajar Lebih <span className="text-edubiru">Gampang</span>,{" "}
                <br className="hidden lg:block" />
                Hasil Lebih <span className="text-yellow-500">Maksimal</span>
              </h1>

              <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Pelajari apa pun dengan cara yang mudah dipahami melalui video
                menarik, latihan interaktif, dan panduan belajar yang
                disesuaikan khusus untuk Anda.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => {
                    if (user) {
                      navigate("/latihan-soal");
                    } else {
                      navigate("/login");
                    }
                  }}
                  className="px-8 py-3.5 bg-edubiru text-white rounded-xl font-bold shadow-lg shadow-edubiru/30 hover:bg-edubiru-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                >
                  Mulai Belajar
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/materi")}
                  className="px-8 py-3.5 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:border-edubiru hover:text-edubiru hover:bg-slate-50 transition-all duration-300 w-full sm:w-auto"
                >
                  Lihat Materi
                </button>
              </div>
            </div>

            {/* Image Content */}
            <div className="flex-1 flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px]">
                {/* Blob background effect (optional) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-edubiru/5 rounded-full blur-3xl -z-10"></div>
                <img
                  src={heroImg}
                  alt="Students learning"
                  className="w-full h-auto drop-shadow-xl animate-fade-in-up"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== POPULAR MATERI SECTION ===== */}
        <section className="bg-edubiru py-16 md:py-24 relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Materi Populer
              </h2>
              <p className="text-edubiru-100 text-lg max-w-2xl mx-auto">
                Pilihan materi favorit yang paling banyak dipelajari oleh siswa
                lain.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {popular.map((p) => (
                <article
                  key={p.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
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
                    <div className="flex-grow">
                      <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 mb-2 group-hover:text-edubiru transition-colors">
                        {p.title}
                      </h3>
                      <div className="text-xs text-slate-500 font-medium mb-2 bg-slate-100 inline-block px-2 py-1 rounded">
                        Kelas 5-6
                      </div>
                      <div>{renderStars(p.rating)}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/materi")}
                      className="w-full mt-2 py-2.5 rounded-xl text-sm font-bold border-2 border-edubiru text-edubiru hover:bg-edubiru hover:text-white transition-all duration-300"
                    >
                      Mulai Belajar
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => navigate("/materi")}
                className="text-white underline underline-offset-4 hover:text-yellow-300 font-medium transition"
              >
                Lihat Semua Materi &rarr;
              </button>
            </div>
          </div>
        </section>

        {/* ===== FEATURES SECTION ===== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Kenapa harus belajar di{" "}
              <span className="text-edubiru">Edutektif?</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-16">
              Belajar lebih mudah, lebih interaktif, dan lebih seru dengan
              materi yang dirancang untuk bikin kamu cepat paham!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-yellow-50 border border-yellow-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:bg-yellow-400 hover:text-slate-900 transition-all duration-300 group text-left sm:text-center"
                >
                  <div className="w-12 h-12 bg-yellow-400 group-hover:bg-white text-slate-900 rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold shadow-sm transition-colors mx-auto sm:mx-auto">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-xl mb-3 text-slate-900">
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

        {/* ===== MISSION SECTION ===== */}
        <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col lg:flex-row items-center gap-12 border border-slate-100">
              <div className="lg:w-1/2 order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                  Untuk semua pelajar, <br /> semua jenjang. <br />
                  <span className="text-edubiru">Dampak yang nyata.</span>
                </h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  Edutektif hadir dengan misi membuka akses belajar berkualitas
                  untuk siapa saja, di mana saja agar setiap siswa bisa
                  berkembang dengan percaya diri.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="bg-edubiru text-white px-10 py-3.5 rounded-xl font-bold hover:bg-edubiru-900 hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  Bergabung Sekarang
                </button>
              </div>

              <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center">
                <img
                  src={heroImg2}
                  alt="Mission illustration"
                  className="w-full max-w-md lg:max-w-full drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== REVIEWS SECTION ===== */}
        <section className="bg-edubiru text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Apa Kata Mereka?
              </h2>
              <p className="text-edubiru-100 text-lg">
                Jejak kesan dari ribuan siswa dan guru yang telah merasakan
                manfaat Edutektif.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="bg-white text-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 flex flex-col h-full relative"
                >
                  {/* Quote icon decoration */}
                  <div className="absolute top-6 right-8 text-6xl text-slate-100 font-serif leading-none select-none">
                    "
                  </div>

                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center font-bold text-xl text-slate-900 shadow-md flex-shrink-0">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-lg">
                        {r.name}
                      </div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                        {r.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 italic leading-relaxed flex-grow relative z-10">
                    "{r.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PRICING SECTION ===== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Investasi Pintar untuk Masa Depan
              </h2>
              <p className="text-slate-600 text-lg">
                Pilih paket belajar yang fleksibel sesuai kebutuhanmu.
              </p>
            </div>

            {/* Grid disesuaikan agar tidak gepeng di tablet */}
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
                    <div className="text-sm font-semibold text-green-600 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {p.note}
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Akses penuh ke semua materi dan latihan.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (user) {
                        navigate(
                          `/pembayaran?months=${
                            p.months
                          }&price=${encodeURIComponent(p.price)}`
                        );
                      } else {
                        navigate("/login");
                      }
                    }}
                    className="w-full bg-yellow-400 text-slate-900 py-3 rounded-xl font-bold hover:bg-yellow-500 hover:shadow-md transition-all active:scale-95"
                  >
                    Pilih Paket
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
