import express, { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secret: string = process.env.JWT_SECRET!;

export const loginUsingJWT = async (req: Request, res: Response) => {
  console.log("in GET userRouter/login function");
  res.json(req.user);
};

interface UserRequest extends Request {
  user: {
    username: string;
    _id: string;
  };
}
export const loginUsingUsernamePassword = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("in POST userRouter/login function");
  const username = req.user.username!;
  const token = jwt.sign(username, secret);
  res.json({
    userId: req.user._id,
    username: req.user.username,
    token,
  });
};
