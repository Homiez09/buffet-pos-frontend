import { withAuth } from "next-auth/middleware";
import { match } from "path-to-regexp";
import { Role } from "./interfaces/user";

interface IPATH {
  pathname: string;
  roles: Role[];
}

export const PATH: IPATH[] = [
    {
        pathname: "/manager/*whatever",
        roles: [Role.EMPLOYEE, Role.MANAGER],
    },
    {
        pathname: "/user/*whatever",
        roles: [],
    },
    {
        pathname: "/auth/*whatever",
        roles: [Role.EMPLOYEE, Role.MANAGER],
    },
  ];

  export default withAuth({
    pages: {
      signIn: "/auth/login",
      error: "/auth/login",
    },
    callbacks: {
      async authorized({ req, token }) {
        const { nextUrl } = req;
        

        // Bypass authorization for paths that don't require authentication
        if (
          nextUrl.pathname.startsWith('/_next/') ||
          nextUrl.pathname.startsWith('/api/') ||
          nextUrl.pathname.startsWith('/public/') ||
          nextUrl.pathname.endsWith('.svg') ||
          /^\/user\/.*/.test(nextUrl.pathname) ||// Bypass login for /user/*whatever
          "/user/"// Bypass login for /user/*whatever
        ) {
          return true;
        }
  
        // If there's no token, redirect to sign-in (except for /auth/* paths)
        if (!token) {
          if (/^\/auth\/.*/.test(nextUrl.pathname)) {
            return true;
          }
          return false;
        }
  
        // Check if the user has the necessary role for the requested path
        const isAuthorized = PATH.some(({ pathname, roles }) => {
          const isInRole = roles.length === 0 || roles.some((role) => token.role == role);
          const matching = match(pathname, { decode: decodeURIComponent });
          const isMatch = matching(nextUrl.pathname);
  
          return !!isMatch && isInRole;
        });
  
        return isAuthorized;
      },
    },
  });