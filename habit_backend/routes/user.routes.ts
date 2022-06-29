import express, { Express, Response, Request } from "express";
const userRouter = express.Router();
import client from "../db/db";
import bcrypt from "bcryptjs";
import passport from "../authentication/authentication";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
dotenv.config();
const secret: string = process.env.JWT_SECRET!;

userRouter.get(
  "/login",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    console.log("in userRouter/login function");
    res.json(req.user);
  }
);

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req: Request, res: Response) => {
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
          const token = jwt.sign(foundUser.username, secret);
          res.json({
            userId: foundUser._id,
            username: foundUser.username,
            token,
          });
        } else {
          res.json(null);
        }
      }
    } catch (err) {
      res.send(null);
    }
  }
);

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

userRouter.delete("/:user_id/habits", async (req: Request, res: Response) => {
  console.log(" in userRouter DELETE");
  const user_id = req.params.user_id;
  const habit_id = req.body.habitId;
  console.log(habit_id);
  const habitDb = client.db("habit_tracker");
  const habits = habitDb.collection("habits");
  console.log(user_id);
  try {
    const result = await habits.deleteMany({
      _id: new ObjectId(habit_id),
      user_id,
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

export default userRouter;
