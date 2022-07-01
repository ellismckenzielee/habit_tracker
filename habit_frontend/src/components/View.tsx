import React, { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import style from "../styles/View.module.css";
import { getWeekByUserIdAndWeekStart, updateWeek } from "../utils/utils";
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
    if (user.userId) {
      getWeekByUserIdAndWeekStart(user.userId, date, setWeek);
    }
  }, [date, user.userId]);
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
                          date,
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
      <Actions week={week} setWeek={setWeek} />
    </div>
  );
};

export default View;
