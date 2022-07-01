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
      {habits.map((habit) => {
        return (
          <div key={habit._id} className={style.HabitContainer}>
            <p> {habit.habit} </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log("onClick del habit");
                const deleteHabitId = habit._id;
                deleteHabit(deleteHabitId, user.userId).then(() => {
                  console.log("In delete habit");
                  setAction(null);
                  setHabits(() => {
                    const updatedHabits = habits.filter(
                      (habit) => habit._id !== deleteHabitId
                    );
                    return updatedHabits;
                  });
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
