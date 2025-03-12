import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserByEmail } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  trustHost: true,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserByEmail(user.email as string);
      if (existingUser) {
        if (!user.password) return false;
        const passwordsMatch = bcrypt.compare(
          user.password,
          existingUser.password as string
        );
        if (!passwordsMatch) return false;
      } else {
        return false;
      }
      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user && token.email) {
        session.user.email = token.email;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserByEmail(token.email ?? "");
      if (!existingUser) return token;

      token.email = existingUser.email;

      token.sub = existingUser.id.toString();

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db),
  ...authConfig,
});
