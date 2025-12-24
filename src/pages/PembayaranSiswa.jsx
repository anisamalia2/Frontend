import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import { CheckCircle, XCircle, CreditCard } from "lucide-react";

export default function VerifikasiPembayaran() {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== FETCH PEMBAYARAN =====
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get("/api/payment/list");
        setPayments(res.data || []);
      } catch (err) {
        console.error(err);
        alert("Gagal memuat daftar pembayaran");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.post("/api/payment/approve", { transaction_id: id });
      alert("Pembayaran disetujui");
      setPayments((prev) =>
        prev.map((p) =>
          p.transaction_id === id ? { ...p, status: "paid" } : p
        )
      );
    } catch (err) {
      console.error(err);
      alert("Gagal menyetujui pembayaran");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.post("/api/payment/reject", { transaction_id: id });
      alert("Pembayaran ditolak");
      setPayments((prev) =>
        prev.map((p) =>
          p.transaction_id === id ? { ...p, status: "rejected" } : p
        )
      );
    } catch (err) {
      console.error(err);
      alert("Gagal menolak pembayaran");
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "menunggu_verifikasi_admin":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-28">
        <h1 className="text-3xl font-bold text-edubiru-900 mb-6">
          Verifikasi Pembayaran Siswa
        </h1>

        {loading ? (
          <p>Memuat data...</p>
        ) : payments.length === 0 ? (
          <p className="text-gray-500">Belum ada pembayaran yang menunggu.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {payments.map((p) => (
              <div
                key={p.transaction_id}
                className="bg-white rounded-xl shadow p-6 flex flex-col gap-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">{p.user_name}</p>
                    <p className="text-sm text-gray-500">
                      Paket: {p.paket_name} ({p.duration_months} bulan)
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                      p.status
                    )}`}
                  >
                    {p.status.replaceAll("_", " ")}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Total Bayar:</p>
                  <p className="font-bold text-xl">
                    Rp {p.amount.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex gap-2 mt-2">
                  {p.status === "menunggu_verifikasi_admin" && (
                    <>
                      <button
                        onClick={() => handleApprove(p.transaction_id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                      >
                        <CheckCircle /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(p.transaction_id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                      >
                        <XCircle /> Reject
                      </button>
                    </>
                  )}
                  {p.status !== "menunggu_verifikasi_admin" && (
                    <button
                      onClick={() => navigate(`/pembayaran/${p.paket_id}/qr`)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                    >
                      <CreditCard /> Lihat Detail
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
