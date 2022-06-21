import express, { Express, Response, Request } from "express";
import client from "./db/db";
import userRouter from "./routes/user.routes";
import bodyParser from "body-parser";
import cors from "cors";
const app: Express = express();
app.use(cors());
app.use(bodyParser());
const port: string = process.env.PORT!;

app.get("/", async (req: Request, res: Response) => {
  console.log("root path");
  const habitDb = client.db("habit_tracker");
  const habits = habitDb.collection("habits");
  console.log("root path finished");
  res.send({ success: "reached root" });
});

app.use("/user", userRouter);
app.get("/habits", async (req: Request, res: Response) => {
  const habitDb = client.db("habit_tracker");
  const habits = habitDb.collection("habits");
  const result = await habits.find();
  result.toArray().then((data) => {
    res.send(data);
  });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}

export default app;
