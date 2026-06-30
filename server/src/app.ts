import express, { Errback, NextFunction, Request, Response } from "express";

const app = express();

import { router as itemRouter } from "../src/routes/itemRoutes.js";
import { router as orderRouter } from "../src/routes/orderRoutes.js";
import { router as userRouter } from "../src/routes/userRoutes.js";


app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));

app.use("/item", itemRouter)
app.use("/order", orderRouter)
app.use("/user", userRouter)


app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Not Found" });
});

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
});

export { app };

