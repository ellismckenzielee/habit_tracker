import express, {
  Express,
  Response,
  Request,
  NextFunction,
  ErrorRequestHandler,
} from "express";
const handleErrors = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorTypes = { 404: "resource not found" };
  res.send({ status: 404, message: "resource not found" });
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
