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
  let longestStreak = 0;
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
                if (habit.streak > longestStreak) longestStreak = habit.streak;
                return (
                  <div
                    key={date + indx}
                    className={`${style.HabitCheckBox} ${
                      habit.dates.includes(date)
                        ? style.HabitSuccess
                        : style.HabitCheckBox
                    } w-10 rounded-full ml-auto mr-auto border-2 border-black`}
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
      <div className={`flex flex-row flex-wrap justify-center m-5 gap-5`}>
        <div
          className={`p-2 grow basis-1/2 md:basis-1/4  bg-indigo-100 rounded-lg flex flex-col justify-center`}
        >
          <p className={`text-indigo-400`}>
            <span className={"text-3xl font-bold text-indigo-900"}>
              {((count / totalDates) * 100).toFixed(1)}
            </span>{" "}
            %
          </p>
          <p className={`text-indigo-700 font-bold m-auto`}>Week Completion</p>
        </div>
        <div
          className={`p-2 grow basis-1/2 md:basis-1/4  bg-indigo-100 rounded-lg flex flex-col justify-center`}
        >
          <p className={`text-indigo-400`}>
            {" "}
            <span className={"text-3xl font-bold text-indigo-900"}>
              {longestStreak}
            </span>
            days
          </p>

          <p className={`text-indigo-700 font-bold m-auto`}>
            Current longest streak
          </p>
        </div>
      </div>

      <Actions habits={habits} setHabits={setHabits} />
    </div>
  );
};

export default View;
