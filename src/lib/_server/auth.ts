"use server";
import bcrypt from "bcrypt";
import prisma from "../prisma";
import { generateToken, verifyPassword, verifyToken } from "./utils";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { error } from "console";
import { RedirectStatusCode } from "next/dist/client/components/redirect-status-code";

interface User {
    email: string;
    password: string;
    username: string;
}

interface AuthAction {
    data: null | Record<string, string | any> | string;
    error: null | any;
    defaultValue?: any;
}

export const createuser = async (prevstate: User, data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const username = data.get("name") as string;
    const confirmpassword = data.get("cpassword");

    const defaultValue = {
        email,
        password,
        username,
        cpassword: confirmpassword,
    };

    if (!email) {
        return { error: { email: "This field is required" }, defaultValue };
    }

    if (!username) {
        return { error: { username: "This field is required" }, defaultValue };
    }
    if (!password) {
        return { error: { password: "This field is required" }, defaultValue };
    }

    if (!confirmpassword || confirmpassword !== password) {
        return {
            error: { cpassword: "Password does not match" },
            defaultValue,
        };
    }

    if (!email.includes("@")) {
        return { error: { email: "Invalid email" }, defaultValue };
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return {
                error: "User with this email already exists",
                defaultValue,
                data: null,
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: username,
            },
        });
        const { password: _, ...safeUser } = user;

        const token = generateToken({ userId: user.id }, { expiresIn: "7d" });
        const session = await prisma.session.create({
            data: {
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                token,
            },
        });
        const sessiontoken = generateToken(
            { sessionId: session.id },
            { expiresIn: "7d" }
        );
        (await cookies()).set("token", sessiontoken, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        // return { error: null, data: "Signup successfully!" };
        redirect("/");
    } catch (err: any) {
        return { error: err.message, data: null };
    }
};

export const loginuser = async (prevstate: User, data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const defaultValue = { email, password };
    if (!email) {
        return { error: { email: "This field is required" }, data: null };
    }
    if (!password) {
        return {
            error: { password: "This field is required" },
            data: null,
            defaultValue: { email, password },
        };
    }
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return {
                error: "Invalid email or password",
                defaultValue,
                data: null,
            };
        }
        if (!(await verifyPassword(password, user?.password as any))) {
            return {
                error: "Invalid email or password",
                defaultValue,
                data: null,
            };
        }
        const _token = generateToken({ userId: user.id }, { expiresIn: "7d" });
        const session = await prisma.session.create({
            data: {
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                token: _token,
            },
        });
        const token = generateToken(
            { sessionId: session.id },
            { expiresIn: "7d" }
        );
        (await cookies()).set("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
    } catch (err: any) {
        console.log(err);
        return { error: "An error occured please try again later", data: null };
    }
    redirect("/");
};

export const checkAuth = async (prevstate: User, data: FormData) => {
    try {
        const token = (await cookies()).get("token");
        if (!token?.value) {
            return { error: "Unauthorized", data: null };
        }
        const { sessionId } = verifyToken(token.value as string) as any;
        const session = await prisma.session.findUnique({
            where: { id: sessionId },
        });
        if (!session) {
            return { error: "Unauthorized", data: null };
        }
        return { error: null, data: "Authorized" };
    } catch (err: any) {
        return { error: "Unauthorized", data: null };
    }
};
