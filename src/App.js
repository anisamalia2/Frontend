import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";

import Home from "./pages/Home";
import DashboardSiswa from "./pages/siswa/DashboardSiswa";
import DashboardGuru from "./pages/guru/DashboardGuru";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Kontak from "./pages/Kontak";
import Testi from "./pages/Testi";

import MateriBin from "./pages/MateriSiswa";
import LatSoalBin from "./pages/LatSoalSiswa";
import DetailLatSoal from "./pages/DetailLatSoal";
import HasilLatihan from "./pages/HasilLatihan";
import PembahasanLatihan from "./pages/PembahasanLatihan";
import DetailMateri from "./pages/DetailMateri";
import PaketSiswa from "./pages/PaketSiswa";
import PembayaranSiswa from "./pages/PembayaranSiswa";

import KelolaMateri from "./pages/guru/KelolaMateri";
import KelolaQuiz from "./pages/guru/KelolaQuiz";
import VerifikasiPembayaran from "./pages/guru/VerifikasiPembayaran";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ===== PUBLIC ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/testimoni" element={<Testi />} />

          {/* ===== SISWA ===== */}
          <Route
            path="/dashboard-siswa"
            element={
              <ProtectedRoute allowedRoles={["SISWA"]}>
                <DashboardSiswa />
              </ProtectedRoute>
            }
          />

          <Route
            path="/paket"
            element={
              <ProtectedRoute allowedRoles={["SISWA"]}>
                <PaketSiswa />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pembayaran/:id"
            element={
              <ProtectedRoute allowedRoles={["SISWA"]}>
                <PembayaranSiswa />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pembayaran/:id/qr"
            element={
              <ProtectedRoute allowedRoles={["SISWA"]}>
                <PembayaranSiswa />
              </ProtectedRoute>
            }
          />

          {/* ===== GURU ===== */}
          <Route
            path="/dashboard-guru"
            element={
              <ProtectedRoute allowedRoles={["GURU"]}>
                <DashboardGuru />
              </ProtectedRoute>
            }
          />

          <Route
            path="/kelola-materi"
            element={
              <ProtectedRoute allowedRoles={["GURU"]}>
                <KelolaMateri />
              </ProtectedRoute>
            }
          />

          <Route
            path="/kelola-quiz"
            element={
              <ProtectedRoute allowedRoles={["GURU"]}>
                <KelolaQuiz />
              </ProtectedRoute>
            }
          />

          <Route
            path="/verifikasi-pembayaran"
            element={
              <ProtectedRoute allowedRoles={["GURU"]}>
                <VerifikasiPembayaran />
              </ProtectedRoute>
            }
          />

          {/* ===== UMUM LOGIN ===== */}

          <Route path="/materi" element={<MateriBin />} />
          <Route path="/detail-materi/:id" element={<DetailMateri />} />

          <Route path="/latihan-soal" element={<LatSoalBin />} />
          <Route
            path="/detail-latihan-soal/:id"
            element={
              <ProtectedRoute allowedRoles={["SISWA"]}>
                <DetailLatSoal />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hasil-latihan/:id"
            element={
              <ProtectedRoute allowedRoles={["SISWA"]}>
                <HasilLatihan />
              </ProtectedRoute>
            }
          />

          <Route path="/pembahasan/:id" element={<PembahasanLatihan />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
