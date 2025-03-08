import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/home"];
const authRestrictedRoutes = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value;

    if (authRestrictedRoutes.some((route) => path.startsWith(route)) && token) {
        return NextResponse.redirect(new URL("/home", request.url));
    }
    if (protectedRoutes.some((route) => path.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}
