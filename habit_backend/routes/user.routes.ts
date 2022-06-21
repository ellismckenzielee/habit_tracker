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
  try {
    const foundUser = await users.findOne({ username });
    if (foundUser) {
      const result = await bcrypt.compare(password, foundUser.password);
      if (result) {
        res.json({ userId: foundUser._id, username: foundUser.username });
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

userRouter.post("/:user_id/habit", async (req: Request, res: Response) => {
  console.log("in userRouter/:user_id/habit function");
  const habitDb = client.db("habit_tracker");
  const habits = habitDb.collection("habits");
  const user_id = req.params.user_id;
  const habitName = req.body.habit!;
  const habit = await habits.insertOne({ user_id, habit: habitName });
  res.json(habit);
});

userRouter.get("/:user_id/habits", async (req: Request, res: Response) => {
  const user_id = req.params.user_id;
  const habitDb = client.db("habit_tracker");
  const habits = habitDb.collection("habits");
  console.log(user_id);
  const result = await habits.find({ user_id });
  result.toArray().then((data) => {
    res.send(data);
  });
});

export default userRouter;
