import { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../utils/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== CEK LOGIN SAAT REFRESH =====
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setAuthToken(token);
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  // ===== LOGIN =====
  const login = async (payload) => {
    try {
      setLoading(true);

      const res = await api.post("/api/auth/login", payload);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setAuthToken(token);
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

  // ===== REGISTER (INI YANG TADI HILANG) =====
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
    setAuthToken(null);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
