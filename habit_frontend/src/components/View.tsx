import React, { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import style from "../styles/View.module.css";
import { getHabitsByUserId } from "../utils/utils";
import Actions from "./Actions";
import { habit } from "../types/types";
const View = () => {
  const [habits, setHabits] = useState<habit[]>([]);
  console.log("HABITS", habits);
  const { user } = useContext(UserContext) as UserContextType;
  useEffect(() => {
    getHabitsByUserId(user.userId, setHabits);
  }, []);
  useEffect(() => {}, []);
  return (
    <div className={style.View}>
      <p>This is the view</p>

      <div className={style.HabitGrid}>
        <p className={style.HabitTitle}>Habit name</p>
        {"MTWTFSS".split("").map((day, indx) => {
          return <p key={day + indx}>{day}</p>;
        })}
        {habits.map((habit, indx) => {
          return (
            <React.Fragment key={habit.habit + indx}>
              <p className={style.HabitTitle}> {habit.habit}</p>
              {","
                .repeat(7)
                .split("")
                .map((num, indx) => {
                  return (
                    <div key={num + indx} className={style.HabitCheckBox}></div>
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
