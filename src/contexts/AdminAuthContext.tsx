import { createContext, useContext, useState, ReactNode } from "react";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: { email: string } | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = async (_email: string, _password: string) => {
    // No backend connected
    return { success: false, error: "No backend connected. Connect Lovable Cloud to enable admin login." };
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated: !!user, user, loading: false, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
};
