import moment from "moment";
import { getMonday } from "./date.utils";
export const createNewHabitLogic = (habit_week: string) => {
  const habitWeekDate = moment(habit_week, "DD-MM-YYYY");
  const mostRecentMonday = moment(getMonday(0), "DD-MM-YYYY");
  return mostRecentMonday.isSame(habitWeekDate);
};

export const addStreaks = (habits: habit[]) => {
  const date = moment();
  console.log(habits, date.format("DD-MM-YYYY"));
  return habits.map((habit) => {
    let streak = habit.dates.includes(date.format("DD-MM-YYYY")) ? 1 : 0;
    date.subtract(1, "day");

    while (habit.dates.includes(date.format("DD-MM-YYYY"))) {
      console.log("while");
      streak++;
      date.subtract(1, "day");
    }
    return { ...habit, streak };
  });
};
