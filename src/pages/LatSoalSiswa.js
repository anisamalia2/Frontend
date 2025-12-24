import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LatihanCard from "../components/LatihanCard";
import api from "../utils/api";

export default function LatSoalSiswa() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/quiz")
      .then((res) => {
        setData(res.data.data || res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar isNavbarVisible />

      <main className="max-w-7xl mx-auto px-6 md:px-20 py-32">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Latihan Soal</h1>

        {loading && <p>Memuat latihan soal...</p>}

        <div className="space-y-4">
          {data.map((latihan) => (
            <LatihanCard key={latihan.id} latihan={latihan} />
          ))}
        </div>
      </main>
    </div>
  );
}
