import { Response, Request, NextFunction } from "express";
import {
  createPair,
  deletePairFromDB,
  updatePair,
} from "../models/pair.models";

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

export const postPair = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in postPair function");
  const { sender, recipient } = req.body;
  console.log(sender, recipient);
  try {
    await createPair(sender, recipient);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

export const putPair = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(" inside putPair function");
  const { pair_id } = req.params;
  console.log(pair_id);
  try {
    await updatePair(pair_id);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
