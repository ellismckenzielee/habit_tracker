import { Response, Request, NextFunction } from "express";

export const putHabit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const habit_id = req.params.habit_id;
  const streak = req.body.streak;
  const date = req.body.date;
  console.log(habit_id, streak, date);
  res.send(null);
};
