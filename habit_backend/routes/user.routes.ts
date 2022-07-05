import express, { Response, Request, NextFunction } from "express";
import bcrypt from "bcryptjs";
import passport from "../authentication/authentication";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { habits, users, weeks } from "../db/db";
import { handleSignup } from "../models/user.models";
import { getMonday } from "../utils/date.utils";
import moment from "moment";
import {
  getHabitsByUserIdAndWeek,
  loginUsingJWT,
  loginUsingUsernamePassword,
  postHabit,
  signupWithUsernamePassword,
} from "../controllers/user.controllers";
dotenv.config();
const userRouter = express.Router();

userRouter.get(
  "/login",
  passport.authenticate("jwt", { session: false }),
  loginUsingJWT
);

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginUsingUsernamePassword
);

userRouter.post("/signup", signupWithUsernamePassword);

userRouter.post("/:user_id/habits", postHabit);

userRouter.get("/:user_id/habits/:habit_week", getHabitsByUserIdAndWeek);

userRouter.post(
  "/:user_id/habits/:habit_week",
  async (req: Request, res: Response) => {
    console.log("in GET userRouter/:user_id/habits/:habit_week");
    const user_id = req.params.user_id;
    const habit_week = req.params.habit_week;
    const instructions = req.body.instructions;
    const habitName = instructions.habitName;
    const updatedDays = instructions.updatedDays;
    console.log(user_id);
    console.log(habit_week);
    console.log(instructions, habitName, updatedDays);
    console.log(true);
    await weeks.updateOne(
      { habit_week, user_id },
      { $set: { [`habits.${habitName}`]: updatedDays } }
    );
    console.log("DONE");
    res.sendStatus(204);
  }
);

userRouter.delete(
  "/:user_id/habits",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(" in userRouter DELETE");
    const user_id = req.params.user_id;
    const habit = req.body.habit;
    const query = { [`habits`]: habit };
    try {
      await users.updateOne({ _id: new ObjectId(user_id) }, { $pull: query });
      await weeks.updateMany(
        { user_id },
        { $unset: { [`habits.${habit}`]: "" } }
      );
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
);

export default userRouter;
