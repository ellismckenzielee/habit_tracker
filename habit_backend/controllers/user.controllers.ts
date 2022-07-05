import express, { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
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
