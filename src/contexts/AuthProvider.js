import React, { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set token on axios instance when available
    if (token) setAuthToken(token);

    const fetchSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user || null);
        if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (err) {
        console.error("fetchSession error:", err);
        // invalid token — clear it
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // debug
    console.log("AuthProvider:init token:", token);
    fetchSession();
  }, [token]);

  useEffect(() => {
    console.log("AuthProvider:user changed:", user);
  }, [user]);

  const login = async ({ nomor_whatsapp, password }) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { nomor_whatsapp, password });
      const { token: newToken, user: userData } = res.data;
      if (newToken) {
        localStorage.setItem("token", newToken);
        setAuthToken(newToken);
        setToken(newToken);
      }
      setUser(userData || null);
      if (userData) localStorage.setItem("user", JSON.stringify(userData));
      return { ok: true, data: res.data };
    } catch (err) {
      console.error("login error:", err);
      return { ok: false, error: err.response?.data || err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
