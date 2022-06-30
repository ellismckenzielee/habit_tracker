import express, { Express, Response, Request, NextFunction } from "express";
import userRouter from "./routes/user.routes";
import bodyParser from "body-parser";
import cors from "cors";
import { handle500, handleErrors } from "./routes/errors.routes";

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
const port: string = process.env.PORT!;

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log("reached / endpoint");
  res.send("reached root");
});

app.use("/user", userRouter);
app.use(handleErrors);
app.use(handle500);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}

export default app;
