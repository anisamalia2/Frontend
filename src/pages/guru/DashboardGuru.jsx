import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthProvider";
import Navbar from "../../components/Navbar";
import {
  BookOpen,
  ClipboardList,
  CreditCard,
  CheckCircle,
  XCircle,
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

        // Filter hanya milik guru login
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

  // Proteksi role
  if (!user || user.role !== "GURU") {
    return <Navigate to="/" replace />;
  }

  // ===================== Stat Card =====================
  const StatCard = ({ title, value, icon, color }) => (
    <div
      className={`bg-white rounded-2xl p-6 shadow hover:shadow-lg transition flex items-center gap-4 border hover:border-blue-300`}
    >
      <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );

  // ===================== Quick Action Card =====================
  const ActionCard = ({ title, desc, onClick }) => (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow text-left hover:shadow-lg transition flex flex-col"
    >
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </button>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-32 space-y-10">
        {/* Hero */}
        <h1 className="text-3xl font-bold text-edubiru-900">
          Halo, {user?.username || user?.name || "Guru"}!
        </h1>
        <p className="text-gray-700 mt-2">
          Yuk, mulai mengelola materi, buat quiz baru, dan pantau pembayaran
          siswa.
        </p>

        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <>
            {/* STAT CARD 5 */}
            <section className="grid md:grid-cols-5 gap-6">
              <StatCard
                title="Materi Saya"
                value={stats.materi}
                icon={<BookOpen className="text-blue-600" />}
                color="bg-blue-100"
              />
              <StatCard
                title="Quiz Saya"
                value={stats.quiz}
                icon={<ClipboardList className="text-indigo-600" />}
                color="bg-indigo-100"
              />
              <StatCard
                title="Pending"
                value={stats.pending}
                icon={<CreditCard className="text-yellow-600" />}
                color="bg-yellow-100"
              />
              <StatCard
                title="Approved"
                value={stats.approved}
                icon={<CheckCircle className="text-green-600" />}
                color="bg-green-100"
              />
              <StatCard
                title="Rejected"
                value={stats.rejected}
                icon={<XCircle className="text-red-600" />}
                color="bg-red-100"
              />
            </section>

            {/* QUICK ACTION */}
            <section className="grid md:grid-cols-1 gap-6">
              <ActionCard
                title="Verifikasi Pembayaran"
                desc="Approve atau reject pembayaran siswa"
                onClick={() => navigate("/guru/verifikasi-pembayaran")}
              />
            </section>
          </>
        )}
      </div>
    </>
  );
}
