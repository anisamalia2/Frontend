import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function Navbar({ isNavbarVisible = true }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ===== STYLE MENU =====
  const baseClass = "px-4 py-2 text-sm font-medium transition";
  const activeClass = "text-white font-bold";
  const inactiveClass = "text-white/70 hover:text-white";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-edubiru shadow-lg transition-transform duration-300 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-20 h-16 flex items-center">
        {/* ===== LOGO (KIRI) ===== */}
        <div
          className="text-2xl font-extrabold text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          EDUTEKTIF
        </div>

        {/* ===== MENU UTAMA (TENGAH) ===== */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
          {/* ===== BELUM LOGIN ===== */}
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

          {/* ===== SISWA ===== */}
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

          {/* ===== GURU ===== */}
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
            </>
          )}

          <NavLink
            to="/kelola-quiz"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Kelola Latihan Soal
          </NavLink>

          {/* ===== TENTANG KAMI (SELALU ADA) ===== */}
          <NavLink
            to="/kontak"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Tentang Kami
          </NavLink>
        </nav>

        {/* ===== AUTH BUTTON (KANAN) ===== */}
        <div className="ml-auto flex items-center gap-3">
          {!user && (
            <>
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
            </>
          )}

          {user && (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="px-3 py-1.5 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
