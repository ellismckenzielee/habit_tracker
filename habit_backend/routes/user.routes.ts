import express, { Express, Response, Request } from "express";
const userRouter = express.Router();
import client from "../db/db";
import bcrypt from "bcryptjs";

userRouter.post("/login", async (req: Request, res: Response) => {
  console.log("in userRouter/login function");

  const habitDb = client.db("habit_tracker");
  const users = habitDb.collection("users");
  const username = req.body.username!;

  const password = req.body.password!;
  habitDb.listCollections().forEach(console.log);
  try {
    console.log("trying findUser");
    const foundUser = await users.findOne({ username });
    console.log(foundUser);
    if (foundUser) {
      const result = await bcrypt.compare(password, foundUser.password);
      if (result) {
        res.json({ username: foundUser.username });
      } else {
        res.json(null);
      }
    }
  } catch (err) {
    res.send(null);
  }
});

userRouter.post("/signup", async (req: Request, res: Response) => {
  console.log("in userRouter/signup function");
  const habitDb = client.db("habit_tracker");
  const users = habitDb.collection("users");
  const username = req.body.username!;
  const password = req.body.password!;
  console.log(username, password, "!");
  const hash = await bcrypt.hash(password, 10);
  const user = await users.insertOne({ username, password: hash });
  console.log("end of userRouter/signup function");
  res.json(user);
});

export default userRouter;
