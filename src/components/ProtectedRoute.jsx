import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  // 1️⃣ Masih cek auth → jangan render apa pun dulu
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // 2️⃣ Belum login → lempar ke login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Role tidak diizinkan
  if (allowedRoles && !allowedRoles.includes(user.role?.toUpperCase())) {
    return <Navigate to="/" replace />;
  }

  // 4️⃣ Aman
  return children;
}
