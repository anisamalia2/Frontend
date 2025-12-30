import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthProvider";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  BookOpen,
  ClipboardList,
  CreditCard,
  CheckCircle,
  XCircle,
  ArrowRight,
  PlusCircle,
  ShieldCheck,
  Lightbulb,
  Sparkles,
} from "lucide-react";

export default function DashboardGuru() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    materi: 0,
    quiz: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [materiRes, quizRes, paymentRes] = await Promise.all([
          api.get("/api/materi"),
          api.get("/api/quiz"),
          api.get("/api/payment/list"),
        ]);

        const materiGuru = materiRes.data.filter((m) => m.guru_id === user.id);
        const quizGuru = quizRes.data.filter((q) => q.guru_id === user.id);
        const payments = paymentRes.data || [];

        setStats({
          materi: materiGuru.length,
          quiz: quizGuru.length,
          pending: payments.filter(
            (p) => p.status === "menunggu_verifikasi_admin"
          ).length,
          approved: payments.filter((p) => p.status === "paid").length,
          rejected: payments.filter((p) => p.status === "rejected").length,
        });
      } catch (err) {
        console.error("Dashboard Guru Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user]);

  if (!user || user.role !== "GURU") {
    return <Navigate to="/" replace />;
  }

  // ===================== Sub-Components =====================
  const StatCard = ({ title, value, icon, color, textColor }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div
          className={`p-3 rounded-xl ${color} ${textColor} transition-transform group-hover:scale-110`}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  const QuickAction = ({ title, desc, icon, onClick, bgColor }) => (
    <button
      onClick={onClick}
      className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all text-left flex items-center gap-5"
    >
      <div className={`p-4 rounded-2xl ${bgColor} text-white shadow-inner`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-1">{desc}</p>
      </div>
      <ArrowRight
        className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
        size={20}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-12 lg:px-20 pt-32 pb-20">
        {/* Header Section */}
        <header className="mb-20 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Haloo,{" "}
              <span className="text-blue-600">
                {user?.username || user?.name || "Guru"}!
              </span>{" "}
              👋
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Siap untuk berbagi ilmu hari ini? Kelola materi dan pantau
              perkembangan siswa Anda.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/kelola-materi")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition shadow-md shadow-blue-200"
            >
              <PlusCircle size={18} /> Materi
            </button>
            <button
              onClick={() => navigate("/kelola-quiz")}
              className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition shadow-md"
            >
              <PlusCircle size={18} /> Quiz
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-gray-600 font-medium">
              Memuat data statistik...
            </span>
          </div>
        ) : (
          <div className="space-y-20">
            {/* Statistics Grid */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="h-6 w-1 bg-blue-600 rounded-full"></div>
                Ringkasan Data
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                <StatCard
                  title="Materi Saya"
                  value={stats.materi}
                  icon={<BookOpen size={24} />}
                  color="bg-blue-50"
                  textColor="text-blue-600"
                />
                <StatCard
                  title="Quiz Saya"
                  value={stats.quiz}
                  icon={<ClipboardList size={24} />}
                  color="bg-indigo-50"
                  textColor="text-indigo-600"
                />
                <StatCard
                  title="Pembayaran Pending"
                  value={stats.pending}
                  icon={<CreditCard size={24} />}
                  color="bg-amber-50"
                  textColor="text-amber-600"
                />
                <StatCard
                  title="Approved"
                  value={stats.approved}
                  icon={<CheckCircle size={24} />}
                  color="bg-emerald-50"
                  textColor="text-emerald-600"
                />
                <StatCard
                  title="Rejected"
                  value={stats.rejected}
                  icon={<XCircle size={24} />}
                  color="bg-rose-50"
                  textColor="text-rose-600"
                />
              </div>
            </section>

            {/* Quick Actions & Maintenance */}
            <section className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <div className="h-6 w-1 bg-blue-600 rounded-full"></div>
                  Aksi Cepat
                </h2>
                <div className="grid gap-4">
                  <QuickAction
                    title="Verifikasi Pembayaran"
                    desc="Konfirmasi bukti transfer dari siswa untuk akses premium"
                    icon={<ShieldCheck size={24} />}
                    bgColor="bg-blue-600"
                    onClick={() => navigate("/verifikasi-pembayaran")}
                  />
                  <QuickAction
                    title="Daftar Materi"
                    desc="Lihat dan edit semua materi yang telah diunggah"
                    icon={<BookOpen size={24} />}
                    bgColor="bg-indigo-600"
                    onClick={() => navigate("/kelola-materi")}
                  />
                </div>
              </div>

              {/* Widget Tips Mengajar */}
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-8 text-white flex flex-col justify-center relative overflow-hidden shadow-lg shadow-orange-100">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="text-white fill-white/20" size={24} />
                    <h3 className="text-xl font-bold">Tips Hari Ini</h3>
                  </div>
                  <p className="text-orange-50 font-medium leading-relaxed mb-4">
                    "Siswa lebih mudah memahami materi jika diselingi dengan
                    kuis interaktif setiap 10 menit pembelajaran."
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      #EfektifitasBelajar
                    </span>
                    <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      #Engagement
                    </span>
                  </div>
                </div>
                {/* Dekorasi */}
                <Sparkles className="absolute top-4 right-4 text-white/20 h-24 w-24 rotate-12" />
                <div className="absolute bottom-[-20%] left-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
