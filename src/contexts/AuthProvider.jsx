import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // FUNGSI BARU: Ambil data user terbaru dari server
  const fetchMe = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await api.get("/api/users/me");
      // Sesuaikan response backend (res.data.data atau res.data)
      const userData = res.data.data || res.data;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error("Gagal mengambil data user terbaru:", err);
      if (err.response && err.response.status === 401) {
        logout(); // Token expired
      }
    }
  };

  // ===== CEK LOGIN SAAT REFRESH =====
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        // Panggil fetchMe() agar data selalu fresh saat refresh
        await fetchMe();
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  // ===== LOGIN =====
  const login = async (payload) => {
    try {
      setLoading(true);
      const res = await api.post("/api/auth/login", payload);
      const { token, user } = res.data.data || res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      return { ok: true, user };
    } catch (err) {
      return {
        ok: false,
        error: err.response?.data?.message || "Login gagal",
      };
    } finally {
      setLoading(false);
    }
  };

  // ===== REGISTER =====
  const register = async (payload) => {
    try {
      setLoading(true);
      await api.post("/api/auth/register", payload);
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err.response?.data?.message || "Register gagal",
      };
    } finally {
      setLoading(false);
    }
  };

  // ===== LOGOUT =====
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        fetchMe, // Export fetchMe agar bisa dipakai di EditProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
