import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { users, weeks, habits } from "../db/db";
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

export const selectHabitsByUserId = async (userId: string) => {
  try {
    const foundHabits = await habits.find({ user_id: userId });
    const habitsArray = foundHabits.toArray();
    return habitsArray;
  } catch (err) {
    return Promise.reject({
      status: 500,
      message: "internal server error during habit retrieval",
    });
  }
};

export const createHabit = async (user_id: string, habit: string) => {
  try {
    const newHabit = { user_id, name: habit, dates: [] };
    await habits.insertOne(newHabit);
  } catch (err) {
    return Promise.reject({
      status: 500,
      message: "internal server error during creation",
    });
  }
};

export const updateHabit = async (
  user_id: string,
  habit: string,
  action: string,
  date: string
) => {
  try {
    const query = {
      dates: date,
    };
    if (action === "push") {
      await habits.updateOne({ user_id, name: habit }, { $push: query });
    } else if (action === "pull") {
      await habits.updateOne({ user_id, name: habit }, { $pull: query });
    }
  } catch (err) {
    console.log(err);
    return Promise.reject({
      status: 500,
      message: "internal server error during update",
    });
  }
};

export const deleteHabitFromDB = async (user_id: string, habit: string) => {
  try {
    await habits.deleteMany({ user_id, name: habit });
  } catch (err) {
    return Promise.reject({
      status: 500,
      message: "internal server error during deletion",
    });
  }
};
