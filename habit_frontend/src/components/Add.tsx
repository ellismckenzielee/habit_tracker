import style from "../styles/Add.module.css";
import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import axios, { AxiosResponse } from "axios";
import { habit } from "../types/types";
interface Data extends AxiosResponse {
  data: { insertedId: string };
}
const Add = ({
  habits,
  setHabits,
  setAction,
}: {
  habits: habit[];
  setHabits: Function;
  setAction: Function;
}) => {
  const [habit, setHabit] = useState("");
  const { user } = useContext(UserContext) as UserContextType;
  return (
    <div className={style.Add}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(user);
          if (user.userId) {
            axios
              .post(`http://localhost:5656/user/${user.userId}/habits`, {
                habit: habit,
              })
              .then((response: Data) => {
                setHabits(() => {
                  const newHabit = { habit, _id: response.data.insertedId };
                  const habitsCopy = [...habits];
                  return [...habits, newHabit];
                });
                setAction(null);
              })
              .catch(console.log);
          }
        }}
      >
        <label htmlFor="habitName">Habit Name</label>
        <input
          type="text"
          id="habitName"
          value={habit}
          onChange={(e) => {
            setHabit(e.target.value);
          }}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Add;
