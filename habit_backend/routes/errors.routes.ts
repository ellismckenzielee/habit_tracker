import express, { Express, Response, Request, NextFunction } from "express";

const handle500 = (req: Request, res: Response, next: NextFunction) => {
  res.send({ status: 500, message: "internal server error" });
};

export { handle500 };
