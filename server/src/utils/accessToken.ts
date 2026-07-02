import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.js";
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT Secret not founded");
}


function generateAccessToken(user: User) {

    return jwt.sign({ id: user.getId(), role: user.getRole() }, JWT_SECRET as string, { expiresIn: "60m" });
}

export { generateAccessToken };