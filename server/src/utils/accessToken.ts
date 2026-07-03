import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT Secret not founded");
}


function generateAccessToken(id: string, role: string) {

    return jwt.sign({ id: id, role: role }, JWT_SECRET as string, { expiresIn: "60m" });
}

export { generateAccessToken };

