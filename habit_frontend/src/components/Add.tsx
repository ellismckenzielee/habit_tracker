import style from "../styles/Add.module.css";
import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import axios, { AxiosResponse } from "axios";
import { week } from "../types/types";
interface Data extends AxiosResponse {
  data: { insertedId: string };
}
const Add = ({
  week,
  setWeek,
  setAction,
}: {
  week: week;
  setWeek: Function;
  setAction: Function;
}) => {
  const [habit, setHabit] = useState("");
  const { user } = useContext(UserContext) as UserContextType;
  return (
    <div className={style.Add}>
      <form
        className={style.AddForm}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(user);
          if (user.userId) {
            axios
              .post(`http://localhost:5656/user/${user.userId}/habits`, {
                habit: habit,
              })
              .then((response: Data) => {
                setWeek(() => {
                  const weekCopy = { ...week };
                  weekCopy.habits[habit] = [0, 0, 0, 0, 0, 0, 0];
                  return weekCopy;
                });
                setAction(null);
              })
              .catch(console.log);
          }
        }}
      >
        <label className={style.AddTitle} htmlFor="habitName">
          Enter Habit Name
        </label>
        <input
          type="text"
          id="habitName"
          value={habit}
          className={style.AddNameInput}
          onChange={(e) => {
            setHabit(e.target.value);
          }}
        ></input>
        <button className={style.AddSubmitButton}>Submit</button>
      </form>
    </div>
  );
};

export default Add;
