import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../utils/api"; // pastikan utils/api.js ada di src/utils/
import { useAuth } from "../../contexts/AuthProvider";
import Navbar from "../../components/Navbar"; // pastikan Navbar.jsx ada di src/components/

import { CheckCircle, XCircle } from "lucide-react";

export default function VerifikasiPembayaran() {
  const { user } = useAuth();

  // ================= STATE =================
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  // ================= FETCH PAYMENTS =================
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/payment/list");
      setPayments(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil data pembayaran");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // ================= PROTEKSI ROLE =================
  if (!user) return <p className="p-6">Loading...</p>;

  if (user.role !== "GURU") {
    return <Navigate to="/" replace />;
  }

  // ================= ACTION =================
  const approvePayment = async (id) => {
    try {
      setActionLoading(id);
      await api.post(`/api/payment/approve/${id}`);
      fetchPayments();
    } catch (err) {
      console.error(err);
      alert("Gagal menyetujui pembayaran");
    } finally {
      setActionLoading(null);
    }
  };

  const rejectPayment = async (id) => {
    try {
      setActionLoading(id);
      await api.post(`/api/payment/reject/${id}`);
      fetchPayments();
    } catch (err) {
      console.error(err);
      alert("Gagal menolak pembayaran");
    } finally {
      setActionLoading(null);
    }
  };

  // ================= RENDER =================
  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-28 space-y-6">
        <h1 className="text-2xl font-bold">Verifikasi Pembayaran</h1>

        {loading && <p>Memuat data...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && payments.length === 0 && (
          <p className="text-gray-500">Belum ada pembayaran</p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {payments.map((p) => (
            <div
              key={p.id}
              className="border rounded-xl p-5 flex flex-col justify-between bg-white shadow hover:shadow-md transition"
            >
              <div className="space-y-1">
                <p className="font-semibold text-lg">{p.user_name}</p>
                <p className="text-sm text-gray-600">
                  Paket: {p.paket_name} ({p.duration_months} bulan)
                </p>
                {p.created_at && (
                  <p className="text-xs text-gray-400">
                    Tanggal: {new Date(p.created_at).toLocaleDateString()}
                  </p>
                )}
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      p.status === "menunggu_verifikasi_admin"
                        ? "text-yellow-600"
                        : p.status === "paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {p.status.replaceAll("_", " ")}
                  </span>
                </p>
              </div>

              {p.status === "menunggu_verifikasi_admin" && (
                <div className="flex gap-2 mt-4">
                  <button
                    disabled={actionLoading === p.id}
                    onClick={() => approvePayment(p.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <CheckCircle /> Approve
                  </button>
                  <button
                    disabled={actionLoading === p.id}
                    onClick={() => rejectPayment(p.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <XCircle /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
