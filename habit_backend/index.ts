import express, { Express, Response, Request } from "express";
import client from "./db/db";
import userRouter from "./routes/user.routes";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "./authentication/authentication";
import { handle500 } from "./routes/errors.routes";

const secret = process.env.JWT_SECRET;

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
const port: string = process.env.PORT!;

// passport.use(
//   new JwtStrategy(opts, async function (jwt_payload, done) {
//     console.log("JWT PAYLOAD", jwt_payload);
//     const habitDb = client.db("habit_tracker");
//     const users = habitDb.collection("users");
//     done("error", false);

//     const foundUser = await users.findOne({ id: jwt_payload.sub });
//     console.log(foundUser);
//   })
// );

app.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    console.log("root path");
    const habitDb = client.db("habit_tracker");
    console.log("root path finished");
    res.send({ success: "reached root" });
  }
);

app.post(
  "/",
  passport.authenticate("local", { session: false }),
  async (req: Request, res: Response) => {
    console.log("root path");
    const habitDb = client.db("habit_tracker");
    console.log("root path finished");
    res.send({ success: "reached root" });
  }
);

app.use("/user", userRouter);
app.get("/habits", async (req: Request, res: Response) => {
  const habitDb = client.db("habit_tracker");
  const habits = habitDb.collection("habits");
  const result = await habits.find();
  result.toArray().then((data) => {
    res.send(data);
  });
});

app.use(handle500);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}

export default app;
