import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { FiFileText, FiVideo } from "react-icons/fi";
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

  // ===== THUMBNAIL VIDEO =====
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
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col">
      {/* THUMBNAIL */}
      <div className="h-40 rounded-t-xl overflow-hidden bg-slate-100 flex items-center justify-center">
        {materi.tipe === "VIDEO" && videoThumb ? (
          <img
            src={videoThumb}
            alt={materi.judul}
            className="w-full h-full object-cover"
          />
        ) : materi.tipe === "FILE" ? (
          <FiFileText className="text-5xl text-red-500" />
        ) : (
          <FiVideo className="text-5xl text-slate-400" />
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-1">{materi.judul}</h3>

        <p className="text-sm text-slate-500 mb-2">Kelas {materi.kelas}</p>

        {/* RATING */}
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <FaStar
              key={i}
              className={i <= rating ? "text-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className="ml-2 text-sm font-semibold text-slate-600">
            {rating}.0
          </span>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleClick}
          className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-edubiru font-bold py-2 rounded-lg transition"
        >
          Mulai Belajar
        </button>
      </div>
    </div>
  );
}
