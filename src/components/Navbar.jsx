import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import {
  Crown,
  Menu,
  X,
  LogOut,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";

export default function Navbar({ isNavbarVisible = true }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State untuk Dropdown Profil
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ===== LOGIC KLIK OUTSIDE =====
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ===== STYLE MENU (DESKTOP) =====
  const baseClass = "px-4 py-2 text-sm font-medium transition";
  const activeClass = "text-white font-bold";
  const inactiveClass = "text-white/70 hover:text-white";

  // ===== STYLE MENU (MOBILE) =====
  const mobileLinkClass =
    "px-6 py-3 text-sm font-medium transition w-full text-left flex items-center gap-3";
  const mobileActive =
    "bg-white/10 text-white font-bold border-r-4 border-white";
  const mobileInactive = "text-white/70 hover:bg-white/5 hover:text-white";

  const isPremiumActive = () => {
    if (!user?.premium_until) return false;
    return new Date(user.premium_until) > new Date();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] bg-edubiru shadow-lg transition-transform duration-300 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-20 h-16 flex items-center justify-between">
        {/* ===== LOGO ===== */}
        {/* z-index 110. Sidebar nanti z-index 150 supaya logo tertutup sidebar saat dibuka */}
        <div
          className="text-2xl font-extrabold text-white cursor-pointer z-[110]"
          onClick={() => {
            navigate("/");
            closeMenu();
          }}
        >
          EDUTEKTIF
        </div>

        {/* ===== NAVIGASI DESKTOP ===== */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2">
          {!user && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                Beranda
              </NavLink>
              <NavLink
                to="/materi"
                className={({ isActive }) =>
                  `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                Materi
              </NavLink>
            </>
          )}

          {user?.role === "SISWA" && (
            <>
              <NavLink
                to="/dashboard-siswa"
                className={({ isActive }) =>
                  `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                Beranda
              </NavLink>
              <NavLink
                to="/materi"
                className={({ isActive }) =>
                  `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                Materi
              </NavLink>
              <NavLink
                to="/latihan-soal"
                className={({ isActive }) =>
                  `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                Latihan Soal
              </NavLink>
            </>
          )}

          {user?.role === "GURU" && (
            <>
              <NavLink
                to="/dashboard-guru"
                className={({ isActive }) =>
                  `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                Beranda
              </NavLink>
              <NavLink
                to="/kelola-materi"
                className={({ isActive }) =>
                  `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                Kelola Materi
              </NavLink>
              <NavLink
                to="/kelola-quiz"
                className={({ isActive }) =>
                  `${baseClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                Kelola Quiz
              </NavLink>
            </>
          )}

          <NavLink
            to="/kontak"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Tentang Kami
          </NavLink>
        </nav>

        {/* ===== KANAN: PREMIUM & PROFIL (DESKTOP) ===== */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {user?.role === "SISWA" && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                isPremiumActive()
                  ? "bg-yellow-400 text-yellow-900"
                  : "bg-white/20 text-white/80"
              }`}
            >
              <Crown size={14} /> {isPremiumActive() ? "Premium" : "Gratis"}
            </div>
          )}

          {!user ? (
            <div className="flex items-center gap-2">
              <NavLink
                to="/login"
                className="px-3 py-1.5 rounded-md bg-white text-edubiru text-sm font-semibold hover:bg-gray-100 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-3 py-1.5 rounded-md border border-white text-white text-sm font-semibold hover:bg-white/10 transition"
              >
                Register
              </NavLink>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden bg-white/20 flex items-center justify-center hover:border-white transition shadow-sm">
                  {user.avatar_url ? (
                    // CACHE BUSTING DI SINI
                    <img
                      src={`${user.avatar_url}?t=${new Date().getTime()}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="text-white" size={20} />
                  )}
                </div>
                <ChevronDown
                  size={16}
                  className={`text-white transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 z-[120]">
                  <div className="px-4 py-3 border-b border-gray-100 mb-1">
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.role.toLowerCase()}
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      navigate("/edit-profile");
                      setIsProfileOpen(false);
                    }}
                    className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center gap-2 transition"
                  >
                    <Settings size={16} className="text-gray-500" /> Edit Profil
                  </div>
                  <div
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2 transition"
                  >
                    <LogOut size={16} /> Logout
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ===== TOMBOL HAMBURGER (MOBILE) ===== */}
        {/* Z-Index 160 supaya selalu paling atas */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 z-[160] relative"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* ===== SIDEBAR (MOBILE) ===== */}
        {/* Z-Index 150 supaya menutupi LOGO (110) */}
        <aside
          className={`fixed top-0 right-0 h-screen w-64 bg-edubiru shadow-2xl transition-transform duration-300 z-[150] md:hidden flex flex-col pt-20 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Info User di Mobile */}
          {user && (
            <div className="px-6 mb-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border border-white/30 flex-shrink-0">
                {user.avatar_url ? (
                  <img
                    src={`${user.avatar_url}?t=${new Date().getTime()}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-white" size={24} />
                )}
              </div>
              <div className="overflow-hidden">
                <p className="text-white font-bold text-sm truncate">
                  {user.username}
                </p>
                <p className="text-white/60 text-xs capitalize">
                  {user.role.toLowerCase()}
                </p>
              </div>
            </div>
          )}

          {/* LIST MENU MOBILE */}
          <div className="flex flex-col gap-1 overflow-y-auto">
            {/* 1. PUBLIC (Belum Login) */}
            {!user && (
              <>
                <NavLink
                  to="/"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `${mobileLinkClass} ${
                      isActive ? mobileActive : mobileInactive
                    }`
                  }
                >
                  Beranda
                </NavLink>
                <NavLink
                  to="/materi"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `${mobileLinkClass} ${
                      isActive ? mobileActive : mobileInactive
                    }`
                  }
                >
                  Materi
                </NavLink>
              </>
            )}

            {/* 2. MENU SISWA */}
            {user?.role === "SISWA" && (
              <>
                <NavLink
                  to="/dashboard-siswa"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `${mobileLinkClass} ${
                      isActive ? mobileActive : mobileInactive
                    }`
                  }
                >
                  Beranda
                </NavLink>
                <NavLink
                  to="/materi"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `${mobileLinkClass} ${
                      isActive ? mobileActive : mobileInactive
                    }`
                  }
                >
                  Materi
                </NavLink>
                <NavLink
                  to="/latihan-soal"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `${mobileLinkClass} ${
                      isActive ? mobileActive : mobileInactive
                    }`
                  }
                >
                  Latihan Soal
                </NavLink>
              </>
            )}

            {/* 3. MENU GURU */}
            {user?.role === "GURU" && (
              <>
                <NavLink
                  to="/dashboard-guru"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `${mobileLinkClass} ${
                      isActive ? mobileActive : mobileInactive
                    }`
                  }
                >
                  Beranda
                </NavLink>
                <NavLink
                  to="/kelola-materi"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `${mobileLinkClass} ${
                      isActive ? mobileActive : mobileInactive
                    }`
                  }
                >
                  Kelola Materi
                </NavLink>
                <NavLink
                  to="/kelola-quiz"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `${mobileLinkClass} ${
                      isActive ? mobileActive : mobileInactive
                    }`
                  }
                >
                  Kelola Quiz
                </NavLink>
              </>
            )}

            {/* 4. MENU UMUM */}
            <NavLink
              to="/kontak"
              onClick={closeMenu}
              className={({ isActive }) =>
                `${mobileLinkClass} ${isActive ? mobileActive : mobileInactive}`
              }
            >
              Tentang Kami
            </NavLink>

            {/* 5. EDIT PROFIL */}
            {user && (
              <NavLink
                to="/edit-profile"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${mobileLinkClass} ${
                    isActive ? mobileActive : mobileInactive
                  }`
                }
              >
                Edit Profil
              </NavLink>
            )}
          </div>

          {/* FOOTER (LOGIN/LOGOUT) */}
          <div className="mt-auto mb-10 px-4 flex flex-col gap-2 border-t border-white/10 pt-6">
            {!user ? (
              <NavLink
                to="/login"
                onClick={closeMenu}
                className="w-full py-2 bg-white text-edubiru rounded-lg font-bold text-center text-xs"
              >
                Login
              </NavLink>
            ) : (
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                  closeMenu();
                }}
                className="w-full py-2 bg-red-500 text-white rounded-lg font-bold flex items-center justify-center gap-2 text-xs"
              >
                <LogOut size={14} /> Logout
              </button>
            )}
          </div>
        </aside>

        {/* OVERLAY */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[120] md:hidden"
            onClick={closeMenu}
          ></div>
        )}
      </div>
    </header>
  );
}
