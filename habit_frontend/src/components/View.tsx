import React, { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import style from "../styles/View.module.css";
import { getHabitsByUsername, updateHabit } from "../utils/utils";
import Actions from "./Actions";
import { habit } from "../types/types";
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
      getHabitsByUsername(focus, setHabits);
    }
  }, [date, focus]);
  return (
    <div className={`${style.View} `}>
      <div className={`${style.HabitGrid}`}>
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
              <p className={`h-10 p-2 my-auto`}> {habit.name}</p>
              {dates.map((date, indx) => {
                if (habit.dates.includes(date)) count++;
                if (habit.streak > longestStreak) longestStreak = habit.streak;
                let success = habit.dates.includes(date);
                return (
                  <div
                    key={date + indx}
                    className={`${style.HabitCheckBox} ${
                      success ? style.HabitSuccess : style.HabitCheckBox
                    } w-10 h-10 rounded-full ml-auto mr-auto border-2 border-black flex flex-column justify-center`}
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
                  >
                    {success && (
                      <p className={`${style.CheckSymbol} my-0 text-indigo-50`}>
                        &#10004;
                      </p>
                    )}
                  </div>
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
            {longestStreak === 1 ? " day" : " days"}
          </p>

          <p className={`text-indigo-700 font-bold m-auto`}>
            Current longest streak
          </p>
        </div>
      </div>

      {user.username === focus && (
        <Actions habits={habits} setHabits={setHabits} />
      )}
    </div>
  );
};

export default View;
