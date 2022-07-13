import express, { Response, Request, NextFunction } from "express";
import { deletePair, postPair } from "../controllers/pair.controllers";

const pairRouter = express.Router();
pairRouter.delete("/:pair_id", deletePair);
pairRouter.post("/", postPair);
export default pairRouter;
