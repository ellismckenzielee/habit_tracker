import express, { Response, Request, NextFunction } from "express";
import passport from "../authentication/authentication";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { users, weeks } from "../db/db";
import {
  deleteHabit,
  getHabitsByUserIdAndWeek,
  loginUsingJWT,
  loginUsingUsernamePassword,
  postHabit,
  putHabit,
  signupWithUsernamePassword,
  getHabitsByUserId,
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


userRouter.get("/:user_id/habits", getHabitsByUserId);
userRouter.post("/:user_id/habits", postHabit);
userRouter.put("/:user_id/habits", putHabit);
userRouter.delete("/:user_id/habits", deleteHabit);


userRouter.get("/:user_id/habits/:habit_week", getHabitsByUserIdAndWeek);



export default userRouter;
