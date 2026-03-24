import { createContext, useContext, useState, useEffect } from "react";
import API from "@/services/api";
import type { User } from "@/types/index";

type AuthContextType = {
  user: User | null;
  setAuthUser: (data: any) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load from localStorage first (fast UI)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const token = localStorage.getItem("token");

    if (token) {
      fetchUser(); // verify from backend
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch latest user from backend
  const fetchUser = async () => {
    try {
      const res = await API.get("/user/profile");

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data)); // keep synced
    } catch (error) {
      console.error("Fetch user failed");
      logout();
    } finally {
      setLoading(false);
    }
  };

  const setAuthUser = (data: any) => {
    if (!data || !data.token) {
      console.error("Invalid auth data:", data);
      return;
    }

    const userData = {
      id: data.id,
      name: data.name,
      email: data.email,
      avatar: data.avatar || "",
      monthlyIncome: data.monthlyIncome || 0,
      currency: data.currency || "INR",
      gmailConnected: data.gmailConnected || false,
      splitWiseConnected: data.splitWiseConnected || false,
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // 🔥 IMPORTANT
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setAuthUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
