import React, { useEffect, useState } from "react";
import { week } from "../types/types";
import style from "../styles/FriendView.module.css";
import axios from "axios";
import { getHabitsByUserId, getWeekByUserIdAndWeekStart } from "../utils/utils";
const FriendView = ({ date, pairId }: { date: string; pairId: string }) => {
  const [friendWeek, setFriendWeek] = useState<week>({ _id: "", habits: {} });
  useEffect(() => {
    getWeekByUserIdAndWeekStart(
      "62c3ff551ed614bfdfa5d1b6",
      date,
      setFriendWeek
    );
  }, [date]);
  console.log(friendWeek);
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
        {Object.keys(friendWeek.habits).map((name, indx) => {
          return (
            <React.Fragment key={name + indx}>
              <p className={style.HabitTitle}> {name}</p>
              {","
                .repeat(7)
                .split("")
                .map((char, indx) => {
                  return (
                    <div
                      key={indx}
                      className={`${style.HabitCheckBox} ${
                        friendWeek.habits[name][indx] ? style.HabitSuccess : ""
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
