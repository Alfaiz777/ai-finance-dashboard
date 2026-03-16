import { createContext, useContext, useState, useEffect } from "react";
import API from "@/services/api";

type AuthContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const res = await API.get("/user/profile");
      setUser(res.data);
    } catch {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
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
