import express, { Express, Response, Request } from "express";
const userRouter = express.Router();
import { MongoClient, ObjectId, WithId } from "mongodb";
import bcrypt from "bcryptjs";

const url = process.env.DB_URL!;
console.log(process.env.PORT, process.env.DB_URL);
const client = new MongoClient(url);

userRouter.post("/signup", async (req: Request, res: Response) => {
  const habitDb = client.db("habit_tracker");
  const users = habitDb.collection("users");
  const username = req.body.username!;
  const password = req.body.password!;
  console.log(username, password, "!");
  const hash = await bcrypt.hash(password, 10);
  const user = await users.insertOne({ username, password: hash });
  res.json(user);
});

export default userRouter;
