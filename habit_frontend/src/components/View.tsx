import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import style from "../styles/View.module.css";
import { getHabitsByUserId } from "../utils/utils";
import Actions from "./Actions";
import { habit } from "../types/types";
const View = () => {
  const [habits, setHabits] = useState<habit[]>([]);
  const { user } = useContext(UserContext) as UserContextType;
  useEffect(() => {
    getHabitsByUserId(user.userId, setHabits);
  }, []);
  return (
    <div className={style.View}>
      <p>This is the view</p>
      {habits.map((habit, indx) => {
        return <p key={habit.habit + indx}> {habit.habit}</p>;
      })}
      <Actions habits={habits} />
    </div>
  );
};

export default View;
