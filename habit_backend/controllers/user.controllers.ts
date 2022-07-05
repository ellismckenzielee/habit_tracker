import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { handleSignup, insertHabit } from "../models/user.models";
import { selectWeekByWeekStart } from "../models/week.models";
const secret: string = process.env.JWT_SECRET!;

export const loginUsingJWT = async (req: Request, res: Response) => {
  console.log("in GET userRouter/login function");
  res.json(req.user);
};

export const loginUsingUsernamePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in POST userRouter/login function");

  if (req.user && typeof req.user === "object") {
    const username = req.user.username!;
    const token = jwt.sign(username, secret);
    res.json({
      userId: req.user._id,
      username: req.user.username,
      token,
    });
  }
};

export const signupWithUsernamePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

export const postHabit = async (req: Request, res: Response) => {
  console.log("in POST userRouter/:user_id/habits function");
  const user_id = req.params.user_id;
  const habitName = req.body.habit!;
  console.log(user_id, habitName);
  const week = insertHabit(user_id, habitName);
  console.log(week);
  res.sendStatus(204);
};

export const getHabitsByUserIdAndWeek = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in GET userRouter/:user_id/habits/:habit_week!");
  const user_id = req.params.user_id;
  const habit_week = req.params.habit_week;

  try {
    const result = await selectWeekByWeekStart(user_id, habit_week);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
