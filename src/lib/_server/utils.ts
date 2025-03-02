import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export function generateToken(payload: any, options: jwt.SignOptions) {
    return jwt.sign(payload, process.env.JWT_SECRET as string, options);
}

export function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}

export async function verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}
