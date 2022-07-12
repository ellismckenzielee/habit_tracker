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
  setHabits: Function;
  setAction: Function;
}) => {
  const { user } = useContext(UserContext) as UserContextType;
  return (
    <div className={style.Delete}>
      <p className={style.DeleteTitle}> Delete Habits </p>
      {habits.map((habit, indx) => {
        return (
          <div key={habit.name + indx} className={style.HabitContainer}>
            <p className={style.HabitName}> {habit.name} </p>
            <button
              className={`${style.DeleteButton} rounded-xl`}
              onClick={(e) => {
                e.preventDefault();
                deleteHabit(habit.name, user.userId).then(console.log);
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
