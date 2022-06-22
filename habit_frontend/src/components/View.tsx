import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import style from "../styles/View.module.css";
const View = () => {
  interface habit {
    habit: string;
  }
  const [habits, setHabits] = useState<habit[]>([]);
  const { user } = useContext(UserContext) as UserContextType;
  useEffect(() => {
    axios
      .get(`http://localhost:5656/user/${user.userId}/habits`)
      .then(({ data }) => {
        console.log(data);
        setHabits(data);
      });
  }, []);
  return (
    <div className={style.View}>
      <p>This is the view</p>
      {habits.map((habit, indx) => {
        return <p key={habit.habit + indx}> {habit.habit}</p>;
      })}
    </div>
  );
};

export default View;
