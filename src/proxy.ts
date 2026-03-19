// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersegreto";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const isLoginPage = req.nextUrl.pathname.startsWith('/login');
    const isAdminPath = ['/admin', '/register'].some(path => req.nextUrl.pathname.startsWith(path));

    // redirezionalo direttamente alla dashboard (evita il doppio login)
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

    // Protezione generale se non ha il token
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        // Verifica e decodifica il token
        const decoded = jwt.verify(token, JWT_SECRET) as any;

        // Controllo aggiuntivo sui ruoli (per "/admin" e "/register")
        if (isAdminPath && decoded.role !== 'admin') {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        return NextResponse.next();
    } catch {
        // Se il token è scaduto o manomesso
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/profile/:path*",
        "/register/:path*",
        "/login"
    ],
};
