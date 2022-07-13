import express, { Response, Request, NextFunction } from "express";
import { deletePair } from "../controllers/pair.controllers";

const pairRouter = express.Router();
pairRouter.delete("/:pair_id", deletePair);
export default pairRouter;
