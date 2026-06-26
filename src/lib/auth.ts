/**
 * NextAuth configuration — server-side only.
 *
 * Providers:
 *   1. GitHub OAuth — for developer/admin access
 *   2. Google OAuth — for enterprise users (Google Workspace)
 *   3. Credentials  — for org-specific email/password login
 *
 * Security model:
 *   - JWT sessions with HTTP-only, Secure, SameSite=Lax cookies
 *   - No credentials ever reach the browser
 *   - Edge middleware enforces auth on /dashboard/* before any page loads
 */

import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Registered platform users — in production, this would be a database
// For now, these map to the orgs registered in the coordinator
const REGISTERED_USERS: Record<
  string,
  { password: string; name: string; org_id: string; org_name: string; role: string }
> = {
  "admin@sangrah.dev": {
    password: "sangrah2026",
    name: "Arth Srivastava",
    org_id: "org-aiims",
    org_name: "AIIMS Research",
    role: "federation_admin",
  },
  "aiims@fed-learn.online": {
    password: "aiims2026",
    name: "AIIMS Admin",
    org_id: "org-aiims",
    org_name: "AIIMS Research",
    role: "data_scientist",
  },
  "kgmu@fed-learn.online": {
    password: "kgmu2026",
    name: "KGMU Admin",
    org_id: "org-kgmu",
    org_name: "KGMU Medical College",
    role: "data_scientist",
  },
};

export const authOptions: NextAuthOptions = {
  providers: [
    // GitHub OAuth
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          }),
        ]
      : []),

    // Google OAuth
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),

    // Credentials — email/password for org users
    CredentialsProvider({
      name: "Organization Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = REGISTERED_USERS[credentials.email.toLowerCase()];
        if (!user) return null;
        if (user.password !== credentials.password) return null;

        return {
          id: credentials.email,
          email: credentials.email,
          name: user.name,
          org_id: user.org_id,
          org_name: user.org_name,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // On first sign-in, attach org metadata to the token
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = user as any;
        token.org_id = u.org_id || "org-aiims";
        token.org_name = u.org_name || "Sangrah Research";
        token.role = u.role || "observer";
      }
      return token;
    },

    async session({ session, token }) {
      // Expose org metadata to the client session
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).org_id = token.org_id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).org_name = token.org_name;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in",
    error: "/sign-in",
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  secret: process.env.NEXTAUTH_SECRET,
};
