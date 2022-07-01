import React, { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import style from "../styles/View.module.css";
import {
  getHabitsByUserId,
  getWeekByUserIdAndWeekStart,
  updateWeek,
} from "../utils/utils";
import Actions from "./Actions";
import { habit, week } from "../types/types";
import Date from "./Date";
const View = () => {
  const [habits, setHabits] = useState<habit[]>([]);
  const [week, setWeek] = useState<week>({ _id: "", habits: {} });
  const [date, setDate] = useState<string>("27-06-2022");
  console.log("WEEK", week);
  console.log("HABITS", habits);
  const { user } = useContext(UserContext) as UserContextType;
  useEffect(() => {
    getHabitsByUserId(user.userId, setHabits);
    getWeekByUserIdAndWeekStart(user.userId, "27-06-2022", setWeek);
  }, []);
  useEffect(() => {}, []);
  return (
    <div className={style.View}>
      <Date date={date} setDate={setDate} />
      <div className={style.HabitGrid}>
        <p className={style.HabitTitle}>Habit name</p>
        {"MTWTFSS".split("").map((day, indx) => {
          return <p key={day + indx}>{day}</p>;
        })}
        {Object.keys(week.habits).map((name, indx) => {
          return (
            <React.Fragment key={name + indx}>
              <p className={style.HabitTitle}> {name}</p>
              {","
                .repeat(7)
                .split("")
                .map((num, indx) => {
                  return (
                    <div
                      key={num + indx}
                      onClick={() => {
                        const updatedHabits: any = {};
                        Object.keys(week.habits).forEach((name) => {
                          const weekRecord = [...week.habits[name]];
                          updatedHabits[name] = weekRecord;
                        });
                        updatedHabits[name][indx] =
                          1 - updatedHabits[name][indx];
                        updateWeek(
                          user.userId,
                          "27-06-2022",
                          name,
                          updatedHabits[name]
                        );
                        setWeek(() => {
                          const updatedWeek = { ...week };
                          updatedWeek.habits = updatedHabits;
                          return updatedWeek;
                        });
                      }}
                      className={`${style.HabitCheckBox} ${
                        week.habits[name][indx] ? style.HabitSuccess : ""
                      }`}
                    ></div>
                  );
                })}
            </React.Fragment>
          );
        })}
      </div>
      <Actions habits={habits} setHabits={setHabits} />
    </div>
  );
};

export default View;
