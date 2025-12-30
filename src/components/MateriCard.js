import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { FiFileText, FiVideo, FiPlayCircle } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export default function MateriCard({ materi }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/detail-materi/${materi.id}`);
  };

  // ===== THUMBNAIL HELPER =====
  const getYoutubeThumbnail = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
    );
    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : null;
  };

  const videoThumb =
    materi.tipe === "VIDEO" ? getYoutubeThumbnail(materi.konten) : null;

  const rating = materi.rating || 5; // default 5

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      {/* ===== THUMBNAIL SECTION ===== */}
      <div className="h-44 sm:h-48 bg-slate-100 relative flex items-center justify-center overflow-hidden">
        {materi.tipe === "VIDEO" && videoThumb ? (
          <>
            <img
              src={videoThumb}
              alt={materi.judul}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay Play Icon */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition flex items-center justify-center">
              <FiPlayCircle className="text-white text-4xl opacity-80 group-hover:scale-110 transition" />
            </div>
          </>
        ) : materi.tipe === "FILE" ? (
          <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-red-500 transition">
            <FiFileText className="text-5xl" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Dokumen
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-edubiru transition">
            <FiVideo className="text-5xl" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Video
            </span>
          </div>
        )}

        {/* Badge Kelas (Pojok Kiri Atas) */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 border border-slate-100">
          Kelas {materi.kelas}
        </span>
      </div>

      {/* ===== CONTENT SECTION ===== */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Judul (Dibatasi 2 baris agar tinggi kartu rata) */}
        <h3
          className="font-bold text-base text-slate-900 leading-snug line-clamp-2 mb-2 group-hover:text-edubiru transition-colors"
          title={materi.judul}
        >
          {materi.judul}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <FaStar
              key={i}
              size={14}
              className={i <= rating ? "text-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className="ml-2 text-xs font-bold text-slate-500 mt-0.5">
            ({rating}.0)
          </span>
        </div>

        {/* Tombol (Didorong ke bawah menggunakan mt-auto) */}
        <button
          onClick={handleClick}
          className="mt-auto w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-2.5 rounded-xl transition shadow-sm hover:shadow-md text-sm"
        >
          Mulai Belajar
        </button>
      </div>
    </div>
  );
}
