import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import Dashboard from "./pages/Dashboard";
import MateriBin from "./pages/MateriBin";
import LatSoalBin from "./pages/LatSoalBin";
import DetailLatSoal from "./pages/DetailLatSoal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DetailMat from "./pages/DetailMat";
import Kontak from "./pages/Kontak";
import Pembayaran from "./pages/Pembayaran";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        {/* Main Pages */}
        <Route path="/detail-materi/:id" element={<DetailMat />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/materi" element={<MateriBin />} />
        <Route path="/pembayaran" element={<Pembayaran />} />
        <Route path="/latihan-soal" element={<LatSoalBin />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/latihan-soal" element={<LatSoalBin />} />
        <Route path="/detail-latihan-soal/:id" element={<DetailLatSoal />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;