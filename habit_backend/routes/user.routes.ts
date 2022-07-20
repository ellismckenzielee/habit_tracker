import express, { Request, Response, NextFunction } from "express";
import passport from "../authentication/authentication";
import dotenv from "dotenv";
import {
  deleteHabit,
  loginUsingJWT,
  loginUsingUsernamePassword,
  postHabit,
  putHabit,
  signupWithUsernamePassword,
  getHabitsByUsername,
  getPairsByUserId,
  deleteUser,
} from "../controllers/user.controllers";
dotenv.config();
const userRouter = express.Router();

userRouter.get(
  "/login",
  passport.authenticate("jwt", { session: false }),
  loginUsingJWT
);

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginUsingUsernamePassword
);

userRouter.post("/signup", signupWithUsernamePassword);

userRouter.get("/:user_id/habits", getHabitsByUsername);
userRouter.post("/:user_id/habits", postHabit);
userRouter.put("/:user_id/habits", putHabit);
userRouter.delete("/:user_id/habits", deleteHabit);
userRouter.delete("/:user_id", deleteUser);
userRouter.get("/:user_id/pair", getPairsByUserId);
userRouter.all("/*", (req: Request, res: Response, next: NextFunction) => {
  next({ status: 404, message: "invalid URL" });
});

export default userRouter;
