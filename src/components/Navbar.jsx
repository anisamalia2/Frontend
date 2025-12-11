import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function Navbar({ isNavbarVisible = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const storedUser = user || (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch { return null; }
  })();

  const [open, setOpen] = useState(false); // account dropdown
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu
  const ref = useRef(null);

  const pathname = location.pathname || "/";
  const isActive = (base) => (base === "/" ? pathname === "/" : pathname === base || pathname.startsWith(base + "/"));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className={`sticky top-0 bg-[#063E6A] z-50 transition-transform duration-300 ${isNavbarVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-3 lg:py-4 flex items-center justify-between font-poppins">
        <div onClick={() => navigate("/")} className="flex-shrink-0 text-2xl md:text-lg lg:text-2xl font-extrabold text-white cursor-pointer hover:opacity-90 transition">EDUTEKTIF</div>

        <nav className="hidden md:flex flex-1 justify-center items-center gap-3 md:gap-6 lg:gap-8 text-sm md:text-xs lg:text-sm flex-wrap overflow-x-auto">
          <button type="button" onClick={() => navigate("/")} className={`transition text-white hover:opacity-90 ${isActive("/") ? "font-bold" : "font-medium"}`}>Beranda</button>
          <button type="button" onClick={() => navigate("/materi")} className={`transition text-white hover:opacity-90 ${isActive("/materi") ? "font-bold" : "font-medium"}`}>Materi</button>
          <button type="button" onClick={() => navigate("/latihan-soal")} className={`transition text-white hover:opacity-90 ${isActive("/latihan-soal") ? "font-bold" : "font-medium"}`}>Latihan Soal</button>
          <button type="button" onClick={() => navigate("/kontak")} className={`transition text-white hover:opacity-90 ${isActive("/kontak") ? "font-bold" : "font-medium"}`}>Tentang Kami</button>
        </nav>

        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          {!storedUser ? (
            <>
              <button type="button" onClick={() => navigate("/login")} className="hidden md:block bg-white/5 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md font-medium hover:bg-white/10 transition text-sm md:text-xs lg:text-sm">Masuk / Daftar</button>
              <button type="button" onClick={() => setMobileOpen((s) => !s)} className="md:hidden bg-white/5 text-white px-3 py-2 rounded-md hover:bg-white/10 transition" aria-label="Toggle menu">☰</button>
            </>
          ) : (
            <div className="relative" ref={ref}>
              <button type="button" onClick={() => setOpen((s) => !s)} className="flex items-center gap-3 bg-white/5 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md text-sm md:text-xs lg:text-sm">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-semibold">{(storedUser?.username || storedUser?.nomor_whatsapp || "U").charAt(0).toUpperCase()}</div>
                <div className="text-sm font-medium">Halo, {storedUser?.username || storedUser?.nomor_whatsapp}</div>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg text-slate-800 z-50 overflow-hidden">
                  <button type="button" onClick={() => { navigate("/profile"); setOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-100">Profile</button>
                  <button type="button" onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-slate-100">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#063E6A] text-white">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            <button type="button" onClick={() => { navigate('/'); setMobileOpen(false); }} className="text-left px-2 py-2">Beranda</button>
            <button type="button" onClick={() => { navigate('/materi'); setMobileOpen(false); }} className="text-left px-2 py-2">Materi</button>
            <button type="button" onClick={() => { navigate('/latihan-soal'); setMobileOpen(false); }} className="text-left px-2 py-2">Latihan Soal</button>
            <button type="button" onClick={() => { navigate('/kontak'); setMobileOpen(false); }} className="text-left px-2 py-2">Tentang Kami</button>
            {!storedUser && (<button type="button" onClick={() => { navigate('/login'); setMobileOpen(false); }} className="mt-2 bg-white/5 text-white px-4 py-2 rounded">Masuk / Daftar</button>)}
          </div>
        </div>
      )}
    </header>
  );
}