import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthProvider";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Package,
  Calendar,
  AlertCircle,
} from "lucide-react";

export default function VerifikasiPembayaran() {
  const { user } = useAuth();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/payment/list");

      // DISESUAIKAN: Memastikan hanya status pending verifikasi yang tampil
      const dataPending = (res.data || []).filter(
        (p) => p.status === "menunggu_verifikasi_admin"
      );

      setPayments(dataPending);
    } catch (err) {
      setError("Gagal mengambil data pembayaran");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (!user) return null;
  if (user.role !== "GURU") return <Navigate to="/" replace />;

  const approvePayment = async (id) => {
    if (!window.confirm("Setujui pembayaran ini?")) return;
    try {
      setActionLoading(id);
      await api.post(`/api/payment/approve/${id}`);
      fetchPayments();
    } catch (err) {
      alert("Gagal menyetujui pembayaran");
    } finally {
      setActionLoading(null);
    }
  };

  const rejectPayment = async (id) => {
    if (!window.confirm("Tolak pembayaran ini?")) return;
    try {
      setActionLoading(id);
      await api.post(`/api/payment/reject/${id}`);
      fetchPayments();
    } catch (err) {
      alert("Gagal menolak pembayaran");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <main className="flex-grow w-full max-w-7xl mx-auto px-12 lg:px-20 pt-32 pb-20">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Verifikasi <span className="text-blue-600">Pembayaran</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Tinjau dan konfirmasi bukti transaksi dari siswa untuk mengaktifkan
            paket belajar mereka.
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-500 font-medium">
              Memvalidasi data transaksi...
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-100 text-red-700 p-6 rounded-2xl flex items-center gap-4">
            <AlertCircle size={24} />
            <p className="font-medium">{error}</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-200 rounded-3xl py-20 flex flex-col items-center">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
              <Clock className="text-gray-300" size={48} />
            </div>
            <p className="text-gray-500 text-lg font-medium">
              Belum ada antrean pembayaran baru.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {payments.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                      <User size={24} />
                    </div>
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-600">
                      {p.status.replaceAll("_", " ")}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      {p.user_name || "Siswa Tanpa Nama"}
                    </h3>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Package size={16} className="text-gray-400" />
                        <span className="text-sm">
                          Paket:{" "}
                          <span className="font-semibold text-gray-800">
                            {p.paket_name || "Premium"}
                          </span>
                          {p.duration_months && ` (${p.duration_months} Bulan)`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-sm">
                          {p.created_at
                            ? new Date(p.created_at).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )
                            : "Tanggal tidak tercatat"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-8">
                  <button
                    disabled={actionLoading === p.id}
                    onClick={() => approvePayment(p.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-emerald-100"
                  >
                    <CheckCircle size={18} /> Approve
                  </button>
                  <button
                    disabled={actionLoading === p.id}
                    onClick={() => rejectPayment(p.id)}
                    className="bg-white border-2 border-rose-100 text-rose-600 hover:bg-rose-50 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
