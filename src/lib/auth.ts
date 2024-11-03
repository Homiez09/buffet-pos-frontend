import type { AuthOptions, Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axiosInstance from "./axiosInstance";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          const res = await axiosInstance.post("/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });
          if (res.status === 200) {
            return res.status === 200 ? res.data : null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user?.email) {
        return { ...token, ...user };
      }

      return { ...token, ...user };
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      const tokenData = JSON.parse(
        atob(token?.token!.split(".")[1])
      );
      session.user = tokenData;
      token.tokenExpires = tokenData.exp;

      session.token = token?.token;

      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
