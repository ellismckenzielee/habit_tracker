import React, { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import style from "../styles/View.module.css";
import { getHabitsByUserId, updateHabit } from "../utils/utils";
import Actions from "./Actions";
import { week, habit } from "../types/types";
import { getDatesForWeek } from "../utils/date.utils";
import moment from "moment";
import _ from "lodash";

const View = ({ date, focus }: { date: string; focus: string }) => {
  const [habits, setHabits] = useState<habit[]>([]);
  const { user } = useContext(UserContext) as UserContextType;
  const dates = getDatesForWeek(date);
  const totalDates = habits.length * 7;
  let count = 0;
  useEffect(() => {
    if (focus) {
      getHabitsByUserId(focus, setHabits);
    }
  }, [date, focus]);
  return (
    <div className={`${style.View} `}>
      <div className={style.HabitGrid}>
        <p className={style.HabitHeaders}>Habit name</p>
        {"MTWTFSS".split("").map((day, indx) => {
          return (
            <p
              className={`${style.HabitHeaders} text-indigo-900`}
              key={day + indx}
            >
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
                if (habit.dates.includes(date)) count++;
                return (
                  <div
                    key={date + indx}
                    className={`${style.HabitCheckBox} ${
                      habit.dates.includes(date)
                        ? style.HabitSuccess
                        : style.HabitCheckBox
                    }`}
                    onClick={(e) => {
                      if (date === moment().format("DD-MM-YYYY")) {
                        let action = habit.dates.includes(date)
                          ? "pull"
                          : "push";
                        updateHabit(focus, habit.name, action, date);
                        setHabits(() => {
                          const habitsCopy = habits.map((habit) => {
                            const habitCopy = _.cloneDeep(habit);
                            if (habitCopy.name === name) {
                              if (action === "push") {
                                habitCopy.dates.push(date);
                                habitCopy.streak++;
                              } else {
                                habitCopy.dates = habitCopy.dates.filter(
                                  (d: string) => d !== date
                                );
                                habitCopy.streak--;
                              }
                            }
                            return habitCopy;
                          });
                          return habitsCopy;
                        });
                      }
                    }}
                  ></div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
      <div className={`flex flex-row justify-center m-5`}>
        <div className={`p-10 sm:w-50 bg-indigo-100 rounded-lg`}>
          <p className={`text-indigo-700 font-bold`}>Week Completion:</p>
          <p className={`text-indigo-400`}>
            {" "}
            {((count / totalDates) * 100).toFixed(1) + "%"}
          </p>
        </div>
      </div>

      <Actions habits={habits} setHabits={setHabits} />
    </div>
  );
};

export default View;
