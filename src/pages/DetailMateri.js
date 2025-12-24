import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

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

  if (loading) return <div className="p-10">Memuat...</div>;
  if (!materi) return <div className="p-10">Materi tidak ditemukan</div>;

  const isVideo = materi.tipe === "VIDEO";
  const isText = materi.tipe === "TEXT";
  const isFile = materi.tipe === "FILE";
  const videoUrl = isVideo ? getEmbedUrl(materi.konten) : null;

  return (
    <div className="min-h-screen bg-slate-100 pt-32">
      {/* TOPBAR */}
      <Topbar title="Detail Materi" />

      {/* ===== CARD MATERI ===== */}
      <main className="max-w-4xl mx-auto px-6 mb-20">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* JUDUL */}
          <h1 className="text-3xl font-bold mb-2">{materi.judul}</h1>

          {/* VIDEO */}
          {isVideo && videoUrl && (
            <div className="aspect-video w-full mb-6 rounded-lg overflow-hidden bg-black">
              <iframe
                src={videoUrl}
                title={materi.judul}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}

          {/* PDF VIEWER */}
          {isFile && materi.konten && (
            <div className="w-full h-[500px] mb-6 rounded-lg overflow-hidden border">
              <iframe
                src={materi.konten}
                title={materi.judul}
                className="w-full h-full"
              />
            </div>
          )}

          {/* META */}
          <p className="text-sm text-slate-500 mb-6">
            Kelas {materi.kelas} • {materi.durasi} menit
          </p>

          {/* DESKRIPSI */}
          <p className="text-slate-600 mb-6">{materi.deskripsi}</p>

          {/* TEXT */}
          {isText && materi.konten && (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: materi.konten }}
            />
          )}

          {/* DOWNLOAD FILE */}
          {isFile && (
            <a
              href={materi.konten}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-edubiru-900 text-white px-6 py-3 rounded-lg font-semibold"
            >
              📄 Unduh Materi
            </a>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
