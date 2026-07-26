import express, { NextFunction, Request, Response } from "express";

const app = express();

import { router as authRouter } from "./routes/authRoutes.js";
import { router as itemRouter } from "./routes/itemRoutes.js";
import { router as orderRouter } from "./routes/orderRoutes.js";
import { router as userRouter } from "./routes/userRoutes.js";



app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));

app.use("/item", itemRouter)
app.use("/order", orderRouter)
app.use("/user", userRouter)
app.use("/auth", authRouter)



app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Not Found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
});

export { app };

