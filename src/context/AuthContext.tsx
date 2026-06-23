"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

export interface User {
  email: string;
  name: string;
  org_id: string;
  org_name: string;
  role: "federation_admin" | "data_scientist" | "ml_engineer" | "security_officer" | "observer";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for development — will be replaced by real JWT auth
const DEMO_USER: User = {
  email: "admin@sangrah.dev",
  name: "Arjun Mehta",
  org_id: "org_sangrah_001",
  org_name: "Sangrah Research",
  role: "federation_admin",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored session
    const stored = localStorage.getItem("sangrah_session");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("sangrah_session");
      }
    }
    setLoading(false);
  }, []);

  const signIn = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (email: string, _password: string) => {
      // TODO: Replace with real API call to coordinator
      await new Promise((r) => setTimeout(r, 800));
      const sessionUser = { ...DEMO_USER, email };
      setUser(sessionUser);
      localStorage.setItem("sangrah_session", JSON.stringify(sessionUser));
      router.push("/dashboard");
    },
    [router]
  );

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem("sangrah_session");
    router.push("/sign-in");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
