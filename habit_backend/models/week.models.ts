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
  if (result) {
    return result;
  } else {
    const user = await users.findOne<User>({ _id: new ObjectId(user_id) });
    if (!user)
      return Promise.reject({ status: 404, message: "user not found" });
    if (createNewHabitLogic(habit_week)) {
      const habitsArray = user.habits;
      const week: any = { user_id, habit_week, habits: {} };
      habitsArray.forEach((habit: string) => {
        console.log(habit);
        week["habits"][habit] = [0, 0, 0, 0, 0, 0, 0];
      });
      await weeks.insertOne(week);
      return week;
    }
    return { habits: [] };
  }
};

export { selectWeekByWeekStart };
