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
    }
  ];

export default withAuth({
    pages: {
      signIn: "/auth/login",
      error: "/auth/login",
    },
    callbacks: {
      async authorized({ req, token }) {
        const { nextUrl } = req;

        if (req.nextUrl.pathname.startsWith('/user') || 
            req.nextUrl.pathname.startsWith('/auth') || 
            req.nextUrl.pathname.startsWith('/_next/') || 
            req.nextUrl.pathname.startsWith('/api/') || 
            req.nextUrl.pathname.startsWith('/public/') || 
            req.nextUrl.pathname.endsWith('.svg')) 
        {
          return true;
        }

        if (!token) {
          return false;
        }

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