import express, { Response, Request, NextFunction } from "express";

export const loginUsingJWT = async (req: Request, res: Response) => {
  console.log("in GET userRouter/login function");
  res.json(req.user);
};
