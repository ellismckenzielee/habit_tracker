import style from "../styles/Delete.module.css";
import { habit } from "../types/types";
import { deleteHabit } from "../utils/utils";
import { UserContext, UserContextType } from "../context/UserContext";
import { useContext } from "react";
const Delete = ({ habits }: { habits: habit[] }) => {
  const { user } = useContext(UserContext) as UserContextType;
  return (
    <div className={style.Delete}>
      {habits.map((habit) => {
        return (
          <div key={habit._id} className={style.HabitContainer}>
            <p> {habit.habit} </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(habit._id);
                deleteHabit(habit._id, user.userId);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Delete;
