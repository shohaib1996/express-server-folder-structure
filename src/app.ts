import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
import { UserRoutes } from "./app/modules/user/user.route";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
// import { error } from "console";
// import { any } from "zod";
const app: Application = express();

// parser

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"] }));
// application routes
// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Success" });
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
