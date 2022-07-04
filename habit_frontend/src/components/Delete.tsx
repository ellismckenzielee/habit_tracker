import style from "../styles/Delete.module.css";
import { week } from "../types/types";
import { deleteHabit } from "../utils/utils";
import { UserContext, UserContextType } from "../context/UserContext";
import { useContext } from "react";
const Delete = ({
  week,
  setWeek,
  setAction,
}: {
  week: week;
  setWeek: Function;
  setAction: Function;
}) => {
  const { user } = useContext(UserContext) as UserContextType;
  return (
    <div className={style.Delete}>
      <p className={style.DeleteTitle}> Delete Habits </p>
      {Object.keys(week.habits).map((habit, indx) => {
        return (
          <div key={habit + indx} className={style.HabitContainer}>
            <p className={style.HabitName}> {habit} </p>
            <button
              className={style.DeleteButton}
              onClick={(e) => {
                e.preventDefault();
                deleteHabit(habit, user.userId).then(console.log);
                setAction(null);
                setWeek(() => {
                  const weekCopy = { ...week };
                  delete weekCopy.habits[habit];
                  return weekCopy;
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
