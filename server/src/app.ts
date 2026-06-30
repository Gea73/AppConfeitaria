import express from "express";
import { v7 as uuidv7 } from "uuid";
import { userRepo } from "./repositories/userRepo.js";

const app = express();
app.use(express.json({ limit: "10kb" }));
const id = uuidv7();
//userRepo.createUser(id, "teste", "senhateste", "email@email", "admin");

userRepo.getUserById("019F1420-85FA-71DD-A630-A540722E4435")
export { app };

