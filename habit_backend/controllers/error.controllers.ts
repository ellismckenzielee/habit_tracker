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
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    next();
  }
};

const handle500 = (err: ErrorRequestHandler, req: Request, res: Response) => {
  res.send({ status: 500, message: "internal server error" });
};

export { handleErrors, handle500 };
