import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imgBanner from "../assets/images/materi/Banner.png";
import cardBin from "../assets/images/materi/MatBin.png";
import cardMtk from "../assets/images/materi/MatMtk.png";
import cardIpa from "../assets/images/materi/MatIpa.png";
import cardBing from "../assets/images/materi/MatBing.png";
import cardIps from "../assets/images/materi/MatIps.png";
import cardPpkn from "../assets/images/materi/MatPpkn.png";
import cardEko from "../assets/images/materi/MatEko.png";
import cardSb from "../assets/images/materi/MatSb.png";
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

// bahasa indonesia materials 
const materialsBI = [
  { id: 101, category: "Bahasa Indonesia", kelas: "Kelas 4 SD", title: "Memahami Teks Deskripsi Lingkungan Sekitar", rating: 5.0, soal: "Kelas 4 SD", img: cardBin },
  { id: 102, category: "Bahasa Indonesia", kelas: "Kelas 5 SD", title: "Menentukan Gagasan Pokok dan Gagasan Pendukung dalam Paragraf", rating: 4.8, soal: "Kelas 5 SD", img: cardBin },
  { id: 103, category: "Bahasa Indonesia", kelas: "Kelas 7 SMP", title: "Menganalisis Struktur Teks Cerita Fabel", rating: 4.9, soal: "Kelas 7 SMP", img: cardBin },
  { id: 104, category: "Bahasa Indonesia", kelas: "Kelas 6 SD", title: "Latihan Menulis Surat Pribadi yang Baik dan Benar", rating: 4.7, soal: "Kelas 6 SD", img: cardBin },
  { id: 105, category: "Bahasa Indonesia", kelas: "Kelas 11 SMA", title: "Menyusun Teks Negosiasi dengan Struktur yang Tepat", rating: 4.8, soal: "Kelas 11 SMA", img: cardBin, isLocked: true },
  { id: 106, category: "Bahasa Indonesia", kelas: "Kelas 10 SMA", title: "Menganalisis Teks Eksposisi dan Argumen Penulis", rating: 4.6, soal: "Kelas 10 SMA", img: cardBin, isLocked: true },
  { id: 107, category: "Bahasa Indonesia", kelas: "Kelas 8 SMP", title: "Memahami Puisi dan Analisis Unsur Puisi", rating: 4.9, soal: "Kelas 8 SMP", img: cardBin, isLocked: true },
  { id: 108, category: "Bahasa Indonesia", kelas: "Kelas 9 SMP", title: "Menulis Resensi Buku dengan Struktur yang Tepat", rating: 5.0, soal: "Kelas 9 SMP", img: cardBin, isLocked: true },
  { id: 109, category: "Bahasa Indonesia", kelas: "Kelas 12 SMA", title: "Analisis Karya Sastra Modern Indonesia", rating: 4.8, soal: "Kelas 12 SMA", img: cardBin, isLocked: true },
  { id: 110, category: "Bahasa Indonesia", kelas: "Kelas 5 SD", title: "Belajar Mengenali Unsur Cerita Pendek", rating: 4.9, soal: "Kelas 5 SD", img: cardBin, isLocked: true },
  { id: 111, category: "Bahasa Indonesia", kelas: "Kelas 6 SD", title: "Menulis Teks Prosedur Sederhana dengan Benar", rating: 4.7, soal: "Kelas 6 SD", img: cardBin, isLocked: true },
  { id: 112, category: "Bahasa Indonesia", kelas: "Kelas 7 SMP", title: "Teks Eksplanasi Tentang Fenomena Alam", rating: 4.8, soal: "Kelas 7 SMP", img: cardBin, isLocked: true },
];

// matematika materials
const materialsMath = [
  { id: 1, category: "Matematika", kelas: "Kelas 1 SD", title: "Penjumlahan dan Pengurangan Dasar", rating: 5.0, soal: "Kelas 1 SD", img: cardMtk },
  { id: 2, category: "Matematika", kelas: "Kelas 2 SD", title: "Pengukuran Panjang dan Waktu", rating: 5.0, soal: "Kelas 2 SD", img: cardMtk },
  { id: 3, category: "Matematika", kelas: "Kelas 3 SD", title: "Keliling dan Luas Bangun Datar", rating: 5.0, soal: "Kelas 3 SD", img: cardMtk },
  { id: 4, category: "Matematika", kelas: "Kelas 4 SD", title: "Belajar Mengenai Faktor dan Kelipatan", rating: 5.0, soal: "Kelas 4 SD", img: cardMtk },
  { id: 5, category: "Matematika", kelas: "Kelas 5 SD", title: "Mengenal Operasi Pecahan Campuran", rating: 5.0, soal: "Kelas 5 SD", img: cardMtk, isLocked: true },
  { id: 6, category: "Matematika", kelas: "Kelas 6 SD", title: "Statistika Sederhana (Mean, Median, Modus)", rating: 5.0, soal: "Kelas 6 SD", img: cardMtk, isLocked: true },
  { id: 7, category: "Matematika", kelas: "Kelas 7 SMP", title: "Belajar Bilangan Bulat dan Pecahan", rating: 5.0, soal: "Kelas 7 SMP", img: cardMtk, isLocked: true },
  { id: 8, category: "Matematika", kelas: "Kelas 8 SMP", title: "Sistem Persamaan Linear Dua Variabel", rating: 5.0, soal: "Kelas 8 SMP", img: cardMtk, isLocked: true },
  { id: 9, category: "Matematika", kelas: "Kelas 9 SMP", title: "Mengenal Fungsi dan Grafik Sederhana", rating: 5.0, soal: "Kelas 9 SMP", img: cardMtk, isLocked: true },
  { id: 10, category: "Matematika", kelas: "Kelas 10 SMA", title: "Belajar Trigonometri Dasar", rating: 5.0, soal: "Kelas 10 SMA", img: cardMtk, isLocked: true },
  { id: 11, category: "Matematika", kelas: "Kelas 11 SMA", title: "Belajar Mengenai Limit dan Turunan", rating: 5.0, soal: "Kelas 11 SMA", img: cardMtk, isLocked: true },
  { id: 12, category: "Matematika", kelas: "Kelas 12 SMA", title: "Mengenal Matriks dan Vektor", rating: 5.0, soal: "Kelas 12 SMA", img: cardMtk, isLocked: true },
];

// IPA materials
const materialsIPA = [
  { id: 201, category: "IPA", kelas: "Kelas 1 SD", title: "Hewan dan Tumbuhan di Sekitar", rating: 5.0, soal: "Kelas 1 SD", img: cardIpa },
  { id: 202, category: "IPA", kelas: "Kelas 2 SD", title: "Mengenali Klasifikasi Mahluk Hidup", rating: 4.8, soal: "Kelas 2 SD", img: cardIpa },
  { id: 203, category: "IPA", kelas: "Kelas 3 SD", title: "Belajar Mengenai Ekosistem Sederhana", rating: 4.9, soal: "Kelas 3 SD", img: cardIpa },
  { id: 204, category: "IPA", kelas: "Kelas 4 SD", title: "Sistem Pemasoksan dan Peredaran Darah", rating: 4.7, soal: "Kelas 4 SD", img: cardIpa },
  { id: 205, category: "IPA", kelas: "Kelas 5 SD", title: "Struktur Tumbuhan dan Fungsinya", rating: 4.8, soal: "Kelas 5 SD", img: cardIpa, isLocked: true },
  { id: 206, category: "IPA", kelas: "Kelas 6 SD", title: "Mengenali Bumi, Bulan, dan Tata Surya", rating: 4.6, soal: "Kelas 6 SD", img: cardIpa, isLocked: true },
  { id: 207, category: "IPA", kelas: "Kelas 7 SMP", title: "Interaksi Mahluk Hidup dalam Ekosistem", rating: 4.9, soal: "Kelas 7 SMP", img: cardIpa, isLocked: true },
  { id: 208, category: "IPA", kelas: "Kelas 8 SMP", title: "Sistem Reproduksi Manusia", rating: 5.0, soal: "Kelas 8 SMP", img: cardIpa, isLocked: true },
  { id: 209, category: "IPA", kelas: "Kelas 9 SMP", title: "Pengkuran dan Besaran Fisika", rating: 4.8, soal: "Kelas 9 SMP", img: cardIpa, isLocked: true },
  { id: 210, category: "IPA", kelas: "Kelas 10 SMA", title: "Mengenal Sistem Organ pada Manusia", rating: 5.0, soal: "Kelas 10 SMA", img: cardIpa, isLocked: true },
  { id: 211, category: "IPA", kelas: "Kelas 11 SMA", title: "Gelombang, Cahaya, dan Optik", rating: 4.8, soal: "Kelas 11 SMA", img: cardIpa, isLocked: true },
  { id: 212, category: "IPA", kelas: "Kelas 12 SMA", title: "Genetika, Cahaya, dan Optik", rating: 5.0, soal: "Kelas 12 SMA", img: cardIpa, isLocked: true },
];

// Bahasa Inggris materials
const materialsENG = [
  { id: 301, category: "Bahasa Inggris", kelas: "Kelas 1 SD", title: "Colors, Numbers, and Simple Vocabulary", rating: 5.0, soal: "Kelas 1 SD", img: cardBing },
  { id: 302, category: "Bahasa Inggris", kelas: "Kelas 2 SD", title: "Simple Classroom Expressions", rating: 5.0, soal: "Kelas 2 SD", img: cardBing },
  { id: 303, category: "Bahasa Inggris", kelas: "Kelas 3 SD", title: "Describing People and Things", rating: 5.0, soal: "Kelas 3 SD", img: cardBing },
  { id: 304, category: "Bahasa Inggris", kelas: "Kelas 4 SD", title: "Asking and Giving Information", rating: 5.0, soal: "Kelas 4 SD", img: cardBing },
  { id: 305, category: "Bahasa Inggris", kelas: "Kelas 5 SD", title: "Procedural Text (How to Make/Do Something)", rating: 5.0, soal: "Kelas 5 SD", img: cardBing, isLocked: true },
  { id: 306, category: "Bahasa Inggris", kelas: "Kelas 6 SD", title: "Short Functional Texts (Messages, Notices)", rating: 5.0, soal: "Kelas 6 SD", img: cardBing, isLocked: true },
  { id: 307, category: "Bahasa Inggris", kelas: "Kelas 7 SMP", title: "Introducing and Asking for Directions", rating: 5.0, soal: "Kelas 7 SMP", img: cardBing, isLocked: true },
  { id: 308, category: "Bahasa Inggris", kelas: "Kelas 8 SMP", title: "Procedure Text", rating: 5.0, soal: "Kelas 8 SMP", img: cardBing, isLocked: true },
  { id: 309, category: "Bahasa Inggris", kelas: "Kelas 9 SMP", title: "Report Text (Short Reports)", rating: 5.0, soal: "Kelas 9 SMP", img: cardBing, isLocked: true },
  { id: 310, category: "Bahasa Inggris", kelas: "Kelas 10 SMA", title: "Narrative Text (Plot and Character)", rating: 5.0, soal: "Kelas 10 SMA", img: cardBing, isLocked: true },
  { id: 311, category: "Bahasa Inggris", kelas: "Kelas 11 SMA", title: "Analytical Exposition", rating: 5.0, soal: "Kelas 11 SMA", img: cardBing, isLocked: true },
  { id: 312, category: "Bahasa Inggris", kelas: "Kelas 12 SMA", title: "Hortatory Exposition", rating: 5.0, soal: "Kelas 12 SMA", img: cardBing, isLocked: true },
];

// IPS materials
const materialsIPS = [
  { id: 401, category: "IPS", kelas: "Kelas 1 SD", title: "Mengenal Lingkungan Rumah dan Sekolah", rating: 5.0, soal: "Kelas 1 SD", img: cardIps },
  { id: 402, category: "IPS", kelas: "Kelas 2 SD", title: "Kegiatan Ekonomi di Lingkungan Sekitar", rating: 5.0, soal: "Kelas 2 SD", img: cardIps },
  { id: 403, category: "IPS", kelas: "Kelas 3 SD", title: "Perkembangan Teknologi Transportasi dan Komunikasi", rating: 5.0, soal: "Kelas 3 SD", img: cardIps },
  { id: 404, category: "IPS", kelas: "Kelas 4 SD", title: "Persebaran Sumber Daya Alam di Indonesia", rating: 5.0, soal: "Kelas 4 SD", img: cardIps },
  { id: 405, category: "IPS", kelas: "Kelas 5 SD", title: "Aktivitas Ekonomi: Produksi, Distribusi, Konsumsi", rating: 5.0, soal: "Kelas 5 SD", img: cardIps, isLocked: true },
  { id: 406, category: "IPS", kelas: "Kelas 6 SD", title: "Proklamasi dan Perjuangan Kemerdekaan Indonesia", rating: 5.0, soal: "Kelas 6 SD", img: cardIps, isLocked: true },
  { id: 407, category: "IPS", kelas: "Kelas 7 SMP", title: "Aktivitas Ekonomi di Indonesia", rating: 5.0, soal: "Kelas 7 SMP", img: cardIps, isLocked: true },
  { id: 408, category: "IPS", kelas: "Kelas 8 SMP", title: "Interaksi Sosial dan Lembaga Sosial", rating: 5.0, soal: "Kelas 8 SMP", img: cardIps, isLocked: true },
  { id: 409, category: "IPS", kelas: "Kelas 9 SMP", title: "Globalisasi dan Pengaruhnya", rating: 5.0, soal: "Kelas 9 SMP", img: cardIps, isLocked: true },
  { id: 410, category: "IPS", kelas: "Kelas 10 SMA", title: "Dinamika Atmosfer dan Hidrosfer", rating: 5.0, soal: "Kelas 10 SMA", img: cardIps, isLocked: true },
  { id: 411, category: "IPS", kelas: "Kelas 11 SMA", title: "Hubungan Internasional dan Diplomasi", rating: 5.0, soal: "Kelas 11 SMA", img: cardIps, isLocked: true },
  { id: 412, category: "IPS", kelas: "Kelas 12 SMA", title: "Pembangunan Berkelanjutan dan Lingkungan", rating: 5.0, soal: "Kelas 12 SMA", img: cardIps, isLocked: true },
];

// PPKn materials
const materialsPPKn = [
  { id: 501, category: "PPKn", kelas: "Kelas 1 SD", title: "Hidup Rukun di Rumah dan Sekolah", rating: 5.0, soal: "Kelas 1 SD", img: cardPpkn },
  { id: 502, category: "PPKn", kelas: "Kelas 2 SD", title: "Kerjasama dalam Kegiatan Sehari-hari", rating: 5.0, soal: "Kelas 2 SD", img: cardPpkn },
  { id: 503, category: "PPKn", kelas: "Kelas 3 SD", title: "Keberagaman Suku dan Budaya", rating: 5.0, soal: "Kelas 3 SD", img: cardPpkn },
  { id: 504, category: "PPKn", kelas: "Kelas 4 SD", title: "Makna Pancasila dalam Kehidupan Sehari-hari", rating: 5.0, soal: "Kelas 4 SD", img: cardPpkn },
  { id: 505, category: "PPKn", kelas: "Kelas 5 SD", title: "Lembaga-Lembaga di Lingkungan Masyarakat", rating: 5.0, soal: "Kelas 5 SD", img: cardPpkn,  isLocked: true },
  { id: 506, category: "PPKn", kelas: "Kelas 6 SD", title: "Sistem Pemerintahan Desa dan Kota", rating: 5.0, soal: "Kelas 6 SD", img: cardPpkn, isLocked: true },
  { id: 507, category: "PPKn", kelas: "Kelas 7 SMP", title: "Hak dan Kewajiban sebagai Warga Negara", rating: 5.0, soal: "Kelas 7 SMP", img: cardPpkn, isLocked: true },
  { id: 508, category: "PPKn", kelas: "Kelas 8 SMP", title: "Struktur Pemerintahan Indonesia", rating: 5.0, soal: "Kelas 8 SMP", img: cardPpkn, isLocked: true },
  { id: 509, category: "PPKn", kelas: "Kelas 9 SMP", title: "Kebinekaan dalam Kehidupan Berbangsa", rating: 5.0, soal: "Kelas 9 SMP", img: cardPpkn, isLocked: true },
  { id: 510, category: "PPKn", kelas: "Kelas 10 SMA", title: "Konstitusi dan UUD 1945", rating: 5.0, soal: "Kelas 10 SMA", img: cardPpkn, isLocked: true },
  { id: 511, category: "PPKn", kelas: "Kelas 11 SMA", title: "Negara Hukum dan Penegakan Hukum", rating: 5.0, soal: "Kelas 11 SMA", img: cardPpkn, isLocked: true },
  { id: 512, category: "PPKn", kelas: "Kelas 12 SMA", title: "Bela Negara dan Ketahanan Nasional", rating: 5.0, soal: "Kelas 12 SMA", img: cardPpkn, isLocked: true },
];

// Ekonomi materials
const materialsEko = [
  { id: 601, category: "Ekonomi", kelas: "Kelas 10 SMA", title: "Kebutuhan Manusia dan Skala Prioritas", rating: 5.0, soal: "Kelas 10 SMA", img: cardEko },
  { id: 602, category: "Ekonomi", kelas: "Kelas 10 SMA", title: "Sistem Ekonomi dan Peran Pemerintah dalam Ekonomi", rating: 5.0, soal: "Kelas 10 SMA", img: cardEko },
  { id: 603, category: "Ekonomi", kelas: "Kelas 10 SMA", title: "Pelaku Ekonomi dan Interaksi dalam Kegiatan Ekonomi", rating: 5.0, soal: "Kelas 10 SMA", img: cardEko },
  { id: 604, category: "Ekonomi", kelas: "Kelas 10 SMA", title: "Kegiatan Produksi, Distribusi, dan Konsumsi", rating: 5.0, soal: "Kelas 10 SMA", img: cardEko },
  { id: 605, category: "Ekonomi", kelas: "Kelas 11 SMA", title: "Permintaan, Penawaran, dan Keseimbangan Harga", rating: 5.0, soal: "Kelas 11 SMA", img: cardEko, isLocked: true },
  { id: 606, category: "Ekonomi", kelas: "Kelas 11 SMA", title: "Jenis-jenis Pasar dan Mekanisme Terjadinya Harga", rating: 5.0, soal: "Kelas 11 SMA", img: cardEko, isLocked: true },
  { id: 607, category: "Ekonomi", kelas: "Kelas 11 SMA", title: "Biaya Produksi dan Penerimaan Perusahaan", rating: 5.0, soal: "Kelas 11 SMA", img: cardEko, isLocked: true },
  { id: 608, category: "Ekonomi", kelas: "Kelas 11 SMA", title: "Pendapatan Nasional: Konsep dan Cara Perhitungannya", rating: 5.0, soal: "Kelas 11 SMA", img: cardEko, isLocked: true },
  { id: 609, category: "Ekonomi", kelas: "Kelas 12 SMA", title: "Pengangguran dan Masalah Ketenagakerjaan", rating: 5.0, soal: "Kelas 12 SMA", img: cardEko, isLocked: true },
  { id: 610, category: "Ekonomi", kelas: "Kelas 12 SMA", title: "Pertumbuhan dan Pembangunan Ekonomi", rating: 5.0, soal: "Kelas 12 SMA", img: cardEko, isLocked: true },
  { id: 611, category: "Ekonomi", kelas: "Kelas 12 SMA", title: "Perdagangan Internasional dan Neraca Pembayaran", rating: 5.0, soal: "Kelas 12 SMA", img: cardEko, isLocked: true },
  { id: 612, category: "Ekonomi", kelas: "Kelas 12 SMA", title: "Kebijakan Fiskal dan Moneter dalam Stabilitas Ekonomi", rating: 5.0, soal: "Kelas 12 SMA", img: cardEko, isLocked: true },
];

// Seni Budaya materials
const materialsSB = [
  { id: 701, category: "Seni Budaya", kelas: "Kelas 1 SD", title: "Mengenal Alat Musik Ritmis Sederhana", rating: 5.0, soal: "Kelas 1 SD", img: cardSb },
  { id: 702, category: "Seni Budaya", kelas: "Kelas 2 SD", title: "Menyanyikan Lagu dengan Irama Tepat", rating: 5.0, soal: "Kelas 2 SD", img: cardSb },
  { id: 703, category: "Seni Budaya", kelas: "Kelas 3 SD", title: "Teknik Menggambar dengan Gradasi Warna", rating: 5.0, soal: "Kelas 3 SD", img: cardSb },
  { id: 704, category: "Seni Budaya", kelas: "Kelas 4 SD", title: "Seni Rupa Dua Dimensi dan Cirinya", rating: 5.0, soal: "Kelas 4 SD", img: cardSb },
  { id: 705, category: "Seni Budaya", kelas: "Kelas 5 SD", title: "Unsur-unsur Seni Rupa (Garis, Bentuk, Warna)", rating: 5.0, soal: "Kelas 5 SD", img: cardSb, isLocked: true },
  { id: 706, category: "Seni Budaya", kelas: "Kelas 6 SD", title: "Apresiasi Karya Seni Rupa Nusantara", rating: 5.0, soal: "Kelas 6 SD", img: cardSb, isLocked: true },
  { id: 707, category: "Seni Budaya", kelas: "Kelas 7 SMP", title: "Seni Rupa Dua Dimensi (Batik, Poster, Ilustrasi)", rating: 5.0, soal: "Kelas 7 SMP", img: cardSb, isLocked: true },
  { id: 708, category: "Seni Budaya", kelas: "Kelas 8 SMP", title: "Menggambar Dengan Teknik Perspektif", rating: 5.0, soal: "Kelas 8 SMP", img: cardSb, isLocked: true },
  { id: 709, category: "Seni Budaya", kelas: "Kelas 9 SMP", title: "Seni Lukis: Tema, Teknik, dan Gaya", rating: 5.0, soal: "Kelas 9 SMP", img: cardSb, isLocked: true},
  { id: 710, category: "Seni Budaya", kelas: "Kelas 10 SMA", title: "Apresiasi Seni Rupa Tradisional dan Modern", rating: 5.0, soal: "Kelas 10 SMA", img: cardSb, isLocked: true },
  { id: 711, category: "Seni Budaya", kelas: "Kelas 11 SMA", title: "Karya Seni Rupa Kontemporer", rating: 5.0, soal: "Kelas 11 SMA", img: cardSb, isLocked: true },
  { id: 712, category: "Seni Budaya", kelas: "Kelas 12 SMA", title: "Teater Kolaboratif dan Pementasan Penuh", rating: 5.0, soal: "Kelas 12 SMA", img: cardSb, isLocked: true },
];

export default function MateriBin() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Bahasa Indonesia");
  const [query, setQuery] = useState("");

  // navbar visibility state + scroll tracking to avoid ReferenceError
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

  // choose data set depending on selected category
  let sourceMaterials = materialsBI;
  if (activeCategory === "Matematika") {
    sourceMaterials = materialsMath;
  } else if (activeCategory === "IPA") {
    sourceMaterials = materialsIPA;
  } else if (activeCategory === "Bahasa Inggris") {
    sourceMaterials = materialsENG;
  } else if (activeCategory === "IPS") {
    sourceMaterials = materialsIPS;
  } else if (activeCategory === "PPKn") {
    sourceMaterials = materialsPPKn;
  } else if (activeCategory === "Ekonomi") {
    sourceMaterials = materialsEko;
  } else if (activeCategory === "Seni Budaya") {
    sourceMaterials = materialsSB;
  }

  const filtered = sourceMaterials.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  const renderStars = (rating, locked = false) => {
    const starClass = locked ? "text-slate-400" : "text-yellow-400";
    const ratingClass = locked ? "text-xs text-slate-400 font-medium" : "text-xs text-slate-600 font-medium";
    return (
      <div className="flex items-center gap-1">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={starClass}>★</span>
          ))}
        </div>
        <span className={ratingClass}>{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-poppins">
    <Navbar isNavbarVisible={isNavbarVisible} />

      <main className="max-w-7xl mx-auto px-6 md:px-20 py-8">
        {/* ===== BANNER ===== */}
        <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
          <div
            className="relative bg-gradient-to-r from-blue-900 to-blue-800 h-40 md:h-48 flex items-center justify-start bg-cover bg-center"
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

        {/* ===== CATEGORIES ===== */}
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCategory(c)}
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

        {/* ===== SEARCH & FILTER ===== */}
        <div className="mt-8 flex items-center gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul materi..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-900"
          />
        </div>

        {/* ===== MATERIAL CARDS ===== */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-xl overflow-hidden shadow-md transition duration-300 flex flex-col h-full hover:shadow-lg"
            >
              {/* Card Image */}
              <div className="relative h-48 bg-slate-200 overflow-hidden flex-shrink-0">
                <img
                  src={m.img || cardBin}
                  alt={m.title}
                  className="w-full h-full object-cover"
                />
                {m.isLocked && (
                  <div className="absolute top-3 right-3 bg-white/90 text-slate-800 px-2 py-1 rounded-md text-xs font-semibold">
                    Terkunci
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4 flex flex-col gap-4 flex-grow">
                <div className="flex-grow">
                  <h3 className="text-sm font-bold text-slate-800 line-clamp-2">
                    {m.title}
                  </h3>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-slate-500 font-medium h-5">
                    {m.soal}
                  </div>

                  <div className="h-6 flex items-center">
                    {renderStars(m.rating, m.isLocked)}
                  </div>
                </div>

                {m.isLocked ? (
                  <button
                    type="button"
                    disabled
                    className="w-full bg-gray-200 text-slate-500 py-2 rounded-lg text-sm font-bold border border-gray-300 cursor-not-allowed"
                    title="Materi terkunci"
                  >
                    Terkunci
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate(`/detail-materi/${m.id}`)}
                    className="w-full bg-white text-slate-900 py-2 rounded-lg text-sm font-bold hover:bg-edubiru-900 transition border border-edubiru-900 hover:text-white"
                  >
                    Mulai Belajar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ===== NO RESULTS ===== */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p className="text-lg font-medium">Tidak ada materi yang cocok.</p>
          </div>
        )}
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