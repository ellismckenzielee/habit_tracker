import express from "express";
import { deletePair, postPair, putPair } from "../controllers/pair.controllers";

const pairRouter = express.Router();
pairRouter.delete("/:pair_id", deletePair);
pairRouter.post("/", postPair);
pairRouter.put("/:pair_id", putPair);
export default pairRouter;
