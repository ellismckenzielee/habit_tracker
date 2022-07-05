import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { handleSignup } from "../models/user.models";
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
