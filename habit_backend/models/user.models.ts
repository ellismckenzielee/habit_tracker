import bcrypt from "bcryptjs";
import { users, habits, pairs } from "../db/db";
import { addStreaks } from "../utils/habit.utils";

export const handleSignup = async (username: string, password: string) => {
  const foundUser = await users.findOne({ username });
  if (foundUser)
    return Promise.reject({
      status: 409,
      message: "username already exists",
      errorCause: "username",
    });
  const hash = await bcrypt.hash(password, 10);
  const user = await users.insertOne({ username, password: hash });
  return user;
};

export const selectHabitsByUsername = async (username: string) => {
  try {
    const foundHabits = await habits.find<habit>({ username });
    const habitsArray = await foundHabits.toArray();
    const habitsArrayWithStreak = addStreaks(habitsArray);
    console.log(habitsArrayWithStreak);
    return habitsArrayWithStreak;
  } catch (err) {
    return Promise.reject({
      status: 500,
      message: "internal server error during habit retrieval",
    });
  }
};

export const createHabit = async (username: string, habit: string) => {
  try {
    const newHabit = { username, name: habit, dates: [] };
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
    console.log(query, user_id, habit);
    if (action === "push") {
      await habits.updateOne(
        { username: user_id, name: habit },
        { $push: query }
      );
    } else if (action === "pull") {
      await habits.updateOne(
        { username: user_id, name: habit },
        { $pull: query }
      );
    }
    const red = await habits.findOne({ username: user_id, name: habit });
    console.log(red);
    console.log("complete");
  } catch (err) {
    console.log(err);
    return Promise.reject({
      status: 500,
      message: "internal server error during update",
    });
  }
};

export const deleteHabitFromDB = async (username: string, habit: string) => {
  try {
    await habits.deleteMany({ username, name: habit });
  } catch (err) {
    return Promise.reject({
      status: 500,
      message: "internal server error during deletion",
    });
  }
};

export const selectPairsByUserId = async (user_id: string) => {
  try {
    const result = await pairs.find({
      $or: [{ sender: user_id }, { recipient: user_id }],
    });
    const resultArray = await result.toArray();
    const pairArray = resultArray.map((result) => {
      const pairId =
        result.sender === user_id ? result.recipient : result.sender;
      const _id = result._id;
      const status = result.status;
      return { pairId, _id, status, recipient: result.recipient === user_id };
    });
    if (pairArray.length > 0) {
      return {
        userId: user_id,
        recipient: pairArray[0].recipient,
        pairId: pairArray[0].pairId,
        _id: pairArray[0]._id,
        status: pairArray[0].status,
      };
    } else {
      return { userId: user_id, pairId: null, status: null };
    }
  } catch (err) {
    return Promise.reject({ status: 404, message: "user pair does not exist" });
  }
};

export const removeUserByUsername = async (username: string) => {
  try {
    const user = await users.findOne({ username });
    console.log("USER", user);
    if (!user)
      return Promise.reject({ status: 404, message: "username not found" });
    else {
      return;
    }
  } catch (err) {
    return Promise.reject({ status: 500, message: "internal server error" });
  }
};
