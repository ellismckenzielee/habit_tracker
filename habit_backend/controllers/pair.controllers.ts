import { Response, Request, NextFunction } from "express";
import { deletePairFromDB } from "../models/pair.models";

export const deletePair = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in deletePair function");
  const { pair_id } = req.params;
  try {
    await deletePairFromDB(pair_id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
