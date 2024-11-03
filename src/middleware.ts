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
        roles: [Role.EMPLOYEE, Role.MANAGER],
    },
    {
        pathname: "/auth/*whatever",
        roles: [Role.EMPLOYEE, Role.MANAGER],
    }
  ];

export default withAuth({
    pages: {
      signIn: "/auth/login",
      error: "/auth/login",
    },
    callbacks: {
      async authorized({ req, token }) {

        if (req.nextUrl.pathname.startsWith('/_next/') || req.nextUrl.pathname.startsWith('/api/') || req.nextUrl.pathname.startsWith('/public/') || req.nextUrl.pathname.endsWith('.svg')) {
          return true;
        }

        if (!token) {
          if (/^\/auth\/.*/.test(req.nextUrl.pathname)) {
            return true;
          }
          return false;
        }
        const { nextUrl } = req;

        const isAuthorized = PATH.some(({ pathname, roles }) => {
          const isInRole = roles.some((role) => token.role == role);
          const matching = match(pathname, { decode: decodeURIComponent });
          const isMatch = matching(nextUrl.pathname);

          return !!isMatch && isInRole;
        });

        return isAuthorized;
      },
    },
  });