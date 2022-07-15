import style from "../styles/Add.module.css";
import React, { useContext, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import axios, { AxiosResponse } from "axios";
import { habit } from "../types/types";
interface Data extends AxiosResponse {
  data: { insertedId: string };
}
const Add = ({
  setAction,
  habits,
  setHabits,
}: {
  habits: habit[];
  setHabits: React.Dispatch<React.SetStateAction<habit[]>>;
  setAction: React.Dispatch<React.SetStateAction<null | string>>;
}) => {
  const [habit, setHabit] = useState("");
  const { user } = useContext(UserContext) as UserContextType;
  return (
    <div className={style.Add}>
      <p className={style.AddTitle}>Add Habits</p>
      <form
        className={style.AddForm}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(user);
          if (user.username) {
            axios
              .post(`http://localhost:5656/user/${user.username}/habits`, {
                habit: habit,
              })
              .then(() => {
                setAction(null);
              })
              .catch(console.log);
            setHabits((habits: habit[]) => {
              const additionalHabit: habit = {
                user_id: user.username,
                name: habit,
                streak: 0,
                dates: [],
                _id: "35345",
              };
              return [...habits, additionalHabit];
            });
          }
        }}
      >
        <label className={style.AddHabitLabel} htmlFor="habitName">
          Enter Habit Name
        </label>
        <input
          type="text"
          id="habitName"
          value={habit}
          className={`${style.AddNameInput} text-center border-2 border-indigo-500 focus:outline focus:outline-indigo-900`}
          onChange={(e) => {
            setHabit(e.target.value);
          }}
        ></input>
        <button className={`${style.AddSubmitButton} rounded-xl`}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
