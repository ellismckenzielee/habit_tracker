import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  createHabit,
  handleSignup,
  updateHabit,
  deleteHabitFromDB,
  selectPairsByUserId,
  selectHabitsByUsername,
  removeUserByUsername,
} from "../models/user.models";
const secret: string = process.env.JWT_SECRET || "";

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
    const username = req.user.username;
    const token = jwt.sign(username, secret);
    res.json({
      userId: req.user._id,
      username: req.user.username,
      pairId: req.user.pairId,
      pairName: req.user.pairName,
      token,
    });
  } else {
    next();
  }
};

export const signupWithUsernamePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in POST userRouter/signup function");
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await handleSignup(username, password);
    console.log("end of userRouter/signup function");
    console.log(user);
    res.json({ userId: user.insertedId });
  } catch (err) {
    next(err);
  }
};

export const getHabitsByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in getHabitsByUserId function");
  const username = req.params.user_id;
  console.log(username);
  try {
    const habits = await selectHabitsByUsername(username);
    console.log(true);
    res.json(habits);
  } catch (err) {
    next(err);
  }
};

export const postHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in POST userRouter/:user_id/habits function");
  const username = req.params.user_id;
  console.log(username);
  const habit = req.body.habit;
  console.log(habit);
  try {
    await createHabit(username, habit);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

export const putHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.params.user_id;
  const date = req.body.date;
  const action = req.body.action;
  const habit = req.body.habit;
  console.log(user_id, date, action, habit);
  try {
    await updateHabit(user_id, habit, action, date);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export const deleteHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(" in userRouter DELETE");
  const username = req.params.user_id;
  const habit = req.body.habit;
  try {
    deleteHabitFromDB(username, habit);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

export const getPairsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in getPairs by UserId");
  const { user_id } = req.params;
  console.log(user_id);
  try {
    const pairs = await selectPairsByUserId(user_id);
    console.log(pairs);
    res.json(pairs);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.params.user_id;
    await removeUserByUsername(username);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
