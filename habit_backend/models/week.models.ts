import { users, weeks } from "../db/db";
import { FindCursor, ObjectId } from "mongodb";

interface User extends FindCursor {
  _id: string;
  habits: string[];
  username: string;
}
const createWeek = async (user_id: string, habit_week: string) => {
  const user = await users.findOne<User>({ _id: new ObjectId(user_id) });
  if (!user) return Promise.reject({ status: 404, message: "user not found" });
  const habitsArray = user.habits;
  const week: any = { user_id, habit_week, habits: {} };
  habitsArray.forEach((habit: string) => {
    console.log(habit);
    week["habits"][habit] = [0, 0, 0, 0, 0, 0, 0];
  });
  const result = await weeks.insertOne(week);
  return week;
};

export { createWeek };
