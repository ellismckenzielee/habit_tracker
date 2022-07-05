import express, { Response, Request, NextFunction } from "express";
import bcrypt from "bcryptjs";
import passport from "../authentication/authentication";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { habits, users, weeks } from "../db/db";
import { handleSignup } from "../models/user.models";
import { getMonday } from "../utils/date.utils";
import moment from "moment";
import { createWeek } from "../models/week.models";
import { loginUsingJWT } from "../controllers/user.controllers";
dotenv.config();
const secret: string = process.env.JWT_SECRET!;
const userRouter = express.Router();

userRouter.get(
  "/login",
  passport.authenticate("jwt", { session: false }),
  loginUsingJWT
);

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("in POST userRouter/login function");
    const username = req.body.username!;
    const password = req.body.password!;
    try {
      const foundUser = await users.findOne({ username });
      if (foundUser) {
        const result = await bcrypt.compare(password, foundUser.password);
        if (result) {
          const token = jwt.sign(foundUser.username, secret);
          res.json({
            userId: foundUser._id,
            username: foundUser.username,
            token,
          });
        } else {
          next({ status: 403, message: "incorrect password" });
        }
      }
    } catch (err) {
      next({ status: 500, message: "something went wrong" });
    }
  }
);

userRouter.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("in POST userRouter/signup function");
    const username = req.body.username!;
    const password = req.body.password!;
    try {
      const user = await handleSignup(username, password);
      console.log("end of userRouter/signup function");
      console.log(user);
      res.json({ userId: user.insertedId });
    } catch (err) {
      next(err);
    }
  }
);

userRouter.post("/:user_id/habits", async (req: Request, res: Response) => {
  console.log("in POST userRouter/:user_id/habits function");
  const user_id = req.params.user_id;
  const habitName = req.body.habit!;
  console.log(user_id, habitName);
  const user = await users.updateOne(
    { _id: new ObjectId(user_id) },
    { $addToSet: { ["habits"]: habitName } }
  );
  const weekToUpdate = getMonday(0);
  console.log("WEEK TO UPDATE", weekToUpdate);
  const week = await weeks.updateOne(
    { user_id, habit_week: weekToUpdate },
    { $set: { [`habits.${habitName}`]: [0, 0, 0, 0, 0, 0, 0] } }
  );
  console.log(week);
  res.sendStatus(204);
});

userRouter.get("/:user_id/habits", async (req: Request, res: Response) => {
  console.log("in GET userRouter/:user_id/habits");
  const user_id = req.params.user_id;
  const result = await habits.find({ user_id });
  result.toArray().then((data) => {
    res.send(data);
  });
});

userRouter.get(
  "/:user_id/habits/:habit_week",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("in GET userRouter/:user_id/habits/:habit_week!");
    const user_id = req.params.user_id;
    const habit_week = req.params.habit_week;
    console.log("userr", user_id, "habitt", habit_week);
    const result = await weeks.findOne({ user_id, habit_week: habit_week });
    const habitWeekDate = moment(habit_week, "DD-MM-YYYY");
    const mostRecentMonday = moment(getMonday(0), "DD-MM-YYYY");
    console.log(
      getMonday(0),
      habitWeekDate,
      habit_week,
      mostRecentMonday,
      mostRecentMonday.isSame(habitWeekDate)
    );
    if (!result) {
      if (!mostRecentMonday.isSame(habitWeekDate)) {
        console.log("Returning empty");
        res.json({ habits: {} });
      } else {
        try {
          const week = await createWeek(user_id, habit_week);
          res.json(week);
        } catch (err) {
          next(err);
        }
      }
    } else {
      res.json(result);
    }
  }
);

userRouter.post(
  "/:user_id/habits/:habit_week",
  async (req: Request, res: Response) => {
    console.log("in GET userRouter/:user_id/habits/:habit_week");
    const user_id = req.params.user_id;
    const habit_week = req.params.habit_week;
    const instructions = req.body.instructions;
    const habitName = instructions.habitName;
    const updatedDays = instructions.updatedDays;
    console.log(user_id);
    console.log(habit_week);
    console.log(instructions, habitName, updatedDays);
    console.log(true);
    await weeks.updateOne(
      { habit_week, user_id },
      { $set: { [`habits.${habitName}`]: updatedDays } }
    );
    console.log("DONE");
    res.sendStatus(204);
  }
);

userRouter.delete(
  "/:user_id/habits",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(" in userRouter DELETE");
    const user_id = req.params.user_id;
    const habit = req.body.habit;
    const query = { [`habits`]: habit };
    try {
      await users.updateOne({ _id: new ObjectId(user_id) }, { $pull: query });
      await weeks.updateMany(
        { user_id },
        { $unset: { [`habits.${habit}`]: "" } }
      );
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
);

export default userRouter;
