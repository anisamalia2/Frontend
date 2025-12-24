import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function LatihanCard({ latihan }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition border flex items-center justify-between">
      <div>
        <span className="text-xs bg-edubiru-900 text-white px-3 py-1 rounded-full font-semibold">
          Kelas {latihan.kelas || "-"}
        </span>

        <h3 className="font-bold mt-2">{latihan.judul}</h3>
        <p className="text-sm text-slate-600">{latihan.deskripsi}</p>
      </div>

      <div className="text-right">
        <p className="text-sm mb-2">{latihan.total_soal} soal</p>

        {user?.role === "SISWA" ? (
          <button
            onClick={() => navigate(`/detail-latihan-soal/${latihan.id}`)}
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-semibold text-sm"
          >
            Kerjakan
          </button>
        ) : (
          <button className="bg-gray-400 px-4 py-2 rounded-lg text-sm">
            Terkunci
          </button>
        )}
      </div>
    </div>
  );
}
