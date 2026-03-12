// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersegreto";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const isLoginPage = req.nextUrl.pathname.startsWith('/login');

    if (isLoginPage) {
        if (token) {
            try {
                jwt.verify(token, JWT_SECRET);
                return NextResponse.redirect(new URL("/dashboard", req.url));
            } catch {
                // Token non valido, ignora e lascia accedere a /login
            }
        }
        return NextResponse.next();
    }

    // Protezione per /dashboard e /admin
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        jwt.verify(token, JWT_SECRET);
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/login"],
};
