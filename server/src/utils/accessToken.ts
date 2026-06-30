import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT Secret not founded");
}


function generateAccessToken(userId: string) {

    return jwt.sign({ sub: userId }, JWT_SECRET as string, { expiresIn: "15m" });
}

export { generateAccessToken };