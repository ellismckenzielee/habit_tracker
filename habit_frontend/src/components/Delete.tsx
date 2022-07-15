import style from "../styles/Delete.module.css";
import { habit } from "../types/types";
import { deleteHabit } from "../utils/utils";
import { UserContext, UserContextType } from "../context/UserContext";
import { useContext } from "react";
const Delete = ({
  habits,
  setHabits,
  setAction,
}: {
  habits: habit[];
  setHabits: React.Dispatch<React.SetStateAction<habit[]>>;
  setAction: React.Dispatch<React.SetStateAction<null | string>>;
}) => {
  const { user } = useContext(UserContext) as UserContextType;
  return (
    <div className={style.Delete}>
      <p className={style.DeleteTitle}> Delete Habits </p>
      {habits.map((habit, indx) => {
        return (
          <div
            key={habit.name + indx}
            className={`${style.HabitContainer} rounded-lg`}
          >
            <p className={`${style.HabitName} m-auto`}> {habit.name} </p>
            <button
              className={`${style.DeleteButton} rounded-xl bg-indigo-800 text-white hover:bg-indigo-300`}
              onClick={(e) => {
                e.preventDefault();
                deleteHabit(habit.name, user.username).then(console.log);
                setAction(null);
                setHabits(() => {
                  return habits.filter((h) => h.name !== habit.name);
                });
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
