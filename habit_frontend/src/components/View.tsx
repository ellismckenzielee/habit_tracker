import React, { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import style from "../styles/View.module.css";
import { getHabitsByUserId, updateHabit } from "../utils/utils";
import Actions from "./Actions";
import { week, habit } from "../types/types";
import { getDatesForWeek } from "../utils/date.utils";

const View = ({ date }: { date: string }) => {
  const [week, setWeek] = useState<week>({ _id: "", habits: {} });
  const [habits, setHabits] = useState<habit[]>([]);
  const { user } = useContext(UserContext) as UserContextType;
  const dates = getDatesForWeek(date);
  const totalDates = habits.length;
  useEffect(() => {
    if (user.userId) {
      getHabitsByUserId(user.userId, setHabits);
    }
  }, [date, user.userId]);
  useEffect(() => {}, []);
  console.log(habits);
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
          const name = habit.name;
          return (
            <React.Fragment key={habit.name + indx}>
              <p className={style.HabitTitle}> {habit.name}</p>
              {dates.map((date, indx) => {
                return (
                  <div
                    key={date + indx}
                    className={`${style.HabitCheckBox} ${
                      habit.dates.includes(date)
                        ? style.HabitSuccess
                        : style.HabitCheckBox
                    }`}
                    onClick={() => {
                      console.log("NAME + DATE", name, date);
                      let action = habit.dates.includes(date) ? "pull" : "push";
                      updateHabit(user.userId, habit.name, action, date);
                      setHabits((habits) => {
                        const habitsCopy = habits.map((habit) => {
                          if (habit.name === name) {
                            if (action === "push") habit.dates.push(date);
                            else {
                              habit.dates = habit.dates.filter(
                                (d) => d !== date
                              );
                            }
                          }
                          return { ...habit };
                        });
                        return habitsCopy;
                      });
                    }}
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
