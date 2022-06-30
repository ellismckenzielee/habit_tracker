import express, { Express, Response, Request, NextFunction } from "express";
import bcrypt from "bcryptjs";
import passport from "../authentication/authentication";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { habits, users } from "../db/db";
import { handleSignup } from "../models/user.models";
import { nextTick } from "process";

dotenv.config();
const secret: string = process.env.JWT_SECRET!;
const userRouter = express.Router();

userRouter.get(
  "/login",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    console.log("in GET userRouter/login function");
    res.json(req.user);
  }
);

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req: Request, res: Response) => {
    console.log("in POST userRouter/login function");
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

userRouter.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("in POST userRouter/signup function");
    const username = req.body.username!;
    const password = req.body.password!;
    try {
      const user = await handleSignup(username, password);
      console.log("end of userRouter/signup function");
      console.log(user);
      res.json({ userId: user.insertedId });
    } catch (err) {
      next(err);
    }
  }
);

userRouter.post("/:user_id/habits", async (req: Request, res: Response) => {
  console.log("in POST userRouter/:user_id/habits function");
  const user_id = req.params.user_id;
  const habitName = req.body.habit!;
  const habit = await habits.insertOne({ user_id, habit: habitName });
  res.json(habit);
});

userRouter.get("/:user_id/habits", async (req: Request, res: Response) => {
  console.log("in GET userRouter/:user_id/habits");
  const user_id = req.params.user_id;
  const result = await habits.find({ user_id });
  result.toArray().then((data) => {
    res.send(data);
  });
});

userRouter.delete("/:user_id/habits", async (req: Request, res: Response) => {
  console.log(" in userRouter DELETE");
  const user_id = req.params.user_id;
  const habit_id = req.body.habitId;
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
