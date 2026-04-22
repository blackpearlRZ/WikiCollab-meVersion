import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type User = {
  _id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setLoading(false);
    return;
  }

  axios
  .get("http://localhost:5000/api/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((res) => {
    console.log("ME RESPONSE:", res.data);
    setUser(res.data);
  })
  .catch((err) => {
    console.log("ME ERROR:", err.response?.data);
    setUser(null);
  }).finally(() => setLoading(false));
}, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}