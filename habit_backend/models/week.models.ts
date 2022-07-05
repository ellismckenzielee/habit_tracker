import { users, weeks } from "../db/db";
import { FindCursor, ObjectId } from "mongodb";
import { createNewHabitLogic } from "../utils/habit.utils";

interface User extends FindCursor {
  _id: string;
  habits: string[];
  username: string;
}
const selectWeekByWeekStart = async (user_id: string, habit_week: string) => {
  const result = await weeks.findOne({ user_id, habit_week: habit_week });
  console.log("in selectWeekByWeekStart");
  console.log(result);
  if (result) {
    return result;
  } else {
    const user = await users.findOne<User>({ _id: new ObjectId(user_id) });
    if (!user)
      return Promise.reject({ status: 404, message: "user not found" });
    if (createNewHabitLogic(habit_week)) {
      console.log("found user");
      const habitsArray = user.habits;
      const week: any = { user_id, habit_week, habits: {} };
      habitsArray.forEach((habit: string) => {
        console.log(habit);
        week["habits"][habit] = [0, 0, 0, 0, 0, 0, 0];
      });
      console.log(week);
      await weeks.insertOne(week);
      return week;
    } else {
      return { habits: {} };
    }
  }
};

const updateHabit = async (
  habitName: string,
  habit_week: string,
  user_id: string,
  updatedDays: number[]
) => {
  try {
    await weeks.updateOne(
      { habit_week, user_id },
      { $set: { [`habits.${habitName}`]: updatedDays } }
    );
  } catch (err) {
    return Promise.reject({ status: 500, message: "could not update habit" });
  }
};

const deleteHabitFromDB = async (user_id: string, habit: string) => {
  const query = { [`habits`]: habit };
  try {
    await users.updateOne({ _id: new ObjectId(user_id) }, { $pull: query });
    await weeks.updateMany(
      { user_id },
      { $unset: { [`habits.${habit}`]: "" } }
    );
  } catch (err) {
    return Promise.reject({ status: 500, message: "could not delete habit" });
  }
};

export { selectWeekByWeekStart, updateHabit, deleteHabitFromDB };
