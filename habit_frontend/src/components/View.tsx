import React, { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import style from "../styles/View.module.css";
import {
  getHabitsByUsername,
  updateHabit,
  checkCheckBoxModifiable,
} from "../utils/utils";
import Actions from "./Actions";
import { habit } from "../types/types";
import { getDatesForWeek } from "../utils/date.utils";
import _ from "lodash";
import Stats from "./Stats";

const View = ({ date, focus }: { date: string; focus: string }) => {
  const [habits, setHabits] = useState<habit[]>([]);
  const { user } = useContext(UserContext) as UserContextType;
  const dates = getDatesForWeek(date);
  const totalDates = habits.length * 7;
  let count = 0;
  let longestStreak = 0;
  let bestDay = "Monday";
  const dayScores = [0, 0, 0, 0, 0, 0, 0];
  let maxScore = 0;
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
                const success = habit.dates.includes(date);
                dayScores[indx] += success ? 1 : 0;
                if (dayScores[indx] > maxScore) {
                  maxScore = dayScores[indx];
                  bestDay = days[indx];
                }
                const modifiable = checkCheckBoxModifiable(
                  date,
                  user.username,
                  focus
                );
                return (
                  <div
                    key={date + indx}
                    className={`${modifiable ? style.HabitModifiable : ""} ${
                      success ? style.HabitSuccess : style.HabitNoSuccess
                    } w-10 h-10 rounded-full ml-auto mr-auto border-2 border-black flex flex-column justify-center`}
                    onClick={() => {
                      if (modifiable) {
                        const action = habit.dates.includes(date)
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
      <Stats
        habits={habits}
        maxScore={maxScore}
        longestStreak={longestStreak}
        totalDates={totalDates}
        bestDay={bestDay}
        count={count}
      />
      {user.username === focus && (
        <Actions habits={habits} setHabits={setHabits} />
      )}
    </div>
  );
};

export default View;
