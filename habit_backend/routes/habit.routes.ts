import express, { Response, Request, NextFunction } from "express";
import dotenv from "dotenv";
import { putHabit } from "../controllers/habit.controllers";
dotenv.config();
const habitRouter = express.Router();

habitRouter.put("/:habit_id", putHabit);

export default habitRouter;
