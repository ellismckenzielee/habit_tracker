import express, { Express, Response, Request, NextFunction } from "express";
import userRouter from "./routes/user.routes";
import bodyParser from "body-parser";
import cors from "cors";
import { handle500, handleErrors } from "./controllers/error.controllers";
import pairRouter from "./routes/pair.routes";

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
const port: string = process.env.PORT || "";

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  console.log("reached / endpoint");
  try {
    res.send("reached root");
  } catch (err) {
    next();
  }
});

app.use("/user", userRouter);
app.use("/pair", pairRouter);
app.use(handleErrors);
app.use(handle500);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}

export default app;
