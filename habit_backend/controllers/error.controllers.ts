import { Response, Request, NextFunction, ErrorRequestHandler } from "express";

interface Err extends ErrorRequestHandler {
  status: number;
  message: string;
}
const handleErrors = (
  err: Err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status).json({ message: err.message });
};

const handle500 = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send({ status: 500, message: "internal server error" });
};

export { handleErrors, handle500 };
