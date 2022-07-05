import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { users, weeks } from "../db/db";
import { getMonday } from "../utils/date.utils";

export const handleSignup = async (username: string, password: string) => {
  const foundUser = await users.findOne({ username });
  if (foundUser)
    return Promise.reject({ status: 409, message: "username already exists" });
  const hash = await bcrypt.hash(password, 10);
  const user = await users.insertOne({ username, password: hash });
  return user;
};

export const insertHabit = async (user_id: string, habitName: string) => {
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
  return week;
};
