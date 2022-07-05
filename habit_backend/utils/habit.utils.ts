import moment from "moment";
import { getMonday } from "./date.utils";
export const createNewHabitLogic = (habit_week: string) => {
  const habitWeekDate = moment(habit_week, "DD-MM-YYYY");
  const mostRecentMonday = moment(getMonday(0), "DD-MM-YYYY");
  return mostRecentMonday.isSame(habitWeekDate);
};
