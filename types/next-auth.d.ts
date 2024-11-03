import { UserRole } from "@/enum/UserRole";
import { Role } from "@/interfaces/user";
import { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {

  export interface Session {
    token?: string;
    user?: User;
  }

  export interface User {
    id?: string;
    username?: string;
    email?: string;
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token?: string;
    exp?: number;
    iat?: number;
    jti?: string;
    user?: User;
  }
}