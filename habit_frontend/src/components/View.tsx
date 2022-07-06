import React, { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import style from "../styles/View.module.css";
import {
  getHabitsByUserId,
  getWeekByUserIdAndWeekStart,
  updateWeek,
} from "../utils/utils";
import Actions from "./Actions";
import { week, habit } from "../types/types";
import { getDatesForWeek } from "../utils/date.utils";

const View = ({ date }: { date: string }) => {
  const [week, setWeek] = useState<week>({ _id: "", habits: {} });
  const [habits, setHabits] = useState<habit[]>([]);
  console.log("habits", habits);
  const { user } = useContext(UserContext) as UserContextType;
  const dates = getDatesForWeek(date);
  useEffect(() => {
    if (user.userId) {
      getHabitsByUserId(user.userId, setHabits);
    }
  }, [date, user.userId]);
  useEffect(() => {}, []);
  return (
    <div className={style.View}>
      <div className={style.HabitGrid}>
        <p className={style.HabitHeaders}>Habit name</p>
        {"MTWTFSS".split("").map((day, indx) => {
          return (
            <p className={style.HabitHeaders} key={day + indx}>
              {day}
            </p>
          );
        })}
        {habits.map((habit, indx) => {
          console.log(habit.dates);
          return (
            <React.Fragment key={habit.name + indx}>
              <p className={style.HabitTitle}> {habit.name}</p>
              {dates.map((date, indx) => {
                console.log(dates);
                return (
                  <div
                    key={date + indx}
                    className={`${style.HabitCheckBox} ${
                      habit.dates.includes(date)
                        ? style.HabitSuccess
                        : style.HabitCheckBox
                    }`}
                  ></div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
      <Actions week={week} setWeek={setWeek} />
    </div>
  );
};

export default View;
