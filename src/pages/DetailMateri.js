import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { Clock, BookOpen, Download, AlertCircle } from "lucide-react";

export default function DetailMateri() {
  const { id } = useParams();
  const [materi, setMateri] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMateri = async () => {
      try {
        const res = await api.get(`/api/materi/${id}`);
        setMateri(res.data.data || res.data);
      } catch {
        setMateri(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMateri();
  }, [id]);

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("embed")) return url;
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be/"))
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    return url;
  };

  // ===== LOADING STATE =====
  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Topbar title="Detail Materi" />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-edubiru rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">
              Sedang memuat materi...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );

  // ===== ERROR STATE =====
  if (!materi)
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Topbar title="Detail Materi" />
        <div className="flex-grow flex items-center justify-center px-6">
          <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="inline-flex p-4 bg-red-50 text-red-500 rounded-full mb-4">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Materi Tidak Ditemukan
            </h2>
            <p className="text-slate-500">
              Mungkin materi telah dihapus atau URL yang Anda tuju salah.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );

  const isVideo = materi.tipe === "VIDEO";
  const isText = materi.tipe === "TEXT";
  const isFile = materi.tipe === "FILE";
  const videoUrl = isVideo ? getEmbedUrl(materi.konten) : null;

  return (
    <div className="min-h-screen bg-slate-50 font-poppins text-slate-900">
      {/* TOPBAR */}
      <Topbar title="Detail Materi" />

      {/* ===== MAIN CONTENT ===== */}
      <main className="pt-28 pb-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* CONTAINER MATERI */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            {/* HEADER BAGIAN ATAS (JUDUL DI TENGAH) */}
            <div className="p-6 md:p-10 border-b border-slate-100 text-center">
              {/* Meta Badges (Rata Tengah) */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-edubiru/10 text-edubiru text-xs font-bold uppercase tracking-wider">
                  <BookOpen size={14} /> Kelas {materi.kelas}
                </span>
                {materi.durasi && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-wider">
                    <Clock size={14} /> {materi.durasi} Menit
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                  {materi.tipe}
                </span>
              </div>

              {/* Judul Besar (Rata Tengah) */}
              <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight mx-auto max-w-3xl">
                {materi.judul}
              </h1>
            </div>

            {/* KONTEN UTAMA */}
            <div className="p-6 md:p-10">
              {/* 1. VIDEO PLAYER */}
              {isVideo && videoUrl && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg mb-8 ring-1 ring-slate-900/5">
                  <iframe
                    src={videoUrl}
                    title={materi.judul}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              )}

              {/* 2. PDF VIEWER */}
              {isFile && materi.konten && (
                <div className="w-full h-[500px] md:h-[700px] mb-8 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                  <iframe
                    src={materi.konten}
                    title={materi.judul}
                    className="w-full h-full"
                  />
                </div>
              )}

              {/* DESKRIPSI TEXT (JUSTIFY / RATA KANAN KIRI) */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 mb-3 text-center md:text-left">
                  Tentang Materi Ini
                </h3>
                <p className="text-slate-600 leading-relaxed text-base md:text-lg text-justify">
                  {materi.deskripsi}
                </p>
              </div>

              {/* 3. HTML CONTENT (TEXT) */}
              {isText && materi.konten && (
                <div
                  className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-edubiru prose-img:rounded-xl text-justify"
                  dangerouslySetInnerHTML={{ __html: materi.konten }}
                />
              )}

              {/* 4. DOWNLOAD BUTTON */}
              {isFile && (
                <div className="mt-8 pt-8 border-t border-slate-100 text-center md:text-left">
                  <a
                    href={materi.konten}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-edubiru text-white px-8 py-3.5 rounded-xl font-bold hover:bg-edubiru-900 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <Download
                      size={20}
                      className="group-hover:animate-bounce"
                    />
                    Unduh Dokumen Materi
                  </a>
                  <p className="text-xs text-slate-400 mt-2 ml-1">
                    *Klik tombol di atas untuk menyimpan file ke perangkat Anda.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
