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
      {Object.keys(week.habits).map((habit, indx) => {
        return (
          <div key={habit + indx} className={style.HabitContainer}>
            <p> {habit} </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                
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
