import React, { useEffect, useState } from "react";
import { habit } from "../types/types";
import style from "../styles/FriendView.module.css";
import { getHabitsByUserId, updateHabit } from "../utils/utils";
import { getDatesForWeek } from "../utils/date.utils";
const FriendView = ({ date, pairId }: { date: string; pairId: string }) => {
  const [friendHabits, setFriendHabits] = useState<habit[]>([]);
  useEffect(() => {
    getHabitsByUserId("62c3ff551ed614bfdfa5d1b6", setFriendHabits);
  }, [date]);
  const dates = getDatesForWeek(date);
  return (
    <div className={style.FriendView}>
      <div className={style.HabitGrid}>
        <p className={style.HabitHeaders}>Habit name</p>
        {"MTWTFSS".split("").map((day, indx) => {
          return (
            <p className={style.HabitHeaders} key={day + indx}>
              {day}
            </p>
          );
        })}
        {friendHabits.map((habit, indx) => {
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
                  ></div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default FriendView;
