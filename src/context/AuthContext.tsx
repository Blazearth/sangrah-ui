"use client";

import {
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface User {
  email: string;
  name: string;
  org_id: string;
  org_name: string;
  role: "federation_admin" | "data_scientist" | "ml_engineer" | "security_officer" | "observer";
  image?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Map NextAuth session to our User type
  const user: User | null = session?.user
    ? {
        email: session.user.email ?? "",
        name: session.user.name ?? "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        org_id: (session.user as any).org_id ?? "org-aiims",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        org_name: (session.user as any).org_name ?? "Sangrah Research",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        role: (session.user as any).role ?? "observer",
        image: session.user.image ?? undefined,
      }
    : null;

  const signIn = useCallback(
    async (email: string, password: string) => {
      const result = await nextAuthSignIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Invalid credentials");
      }

      router.push("/dashboard");
      router.refresh();
    },
    [router]
  );

  const signOut = useCallback(() => {
    nextAuthSignOut({ callbackUrl: "/sign-in" });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading: status === "loading", signIn, signOut }}
    >
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
