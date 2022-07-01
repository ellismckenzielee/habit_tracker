import { useState } from "react";
import style from "../styles/Actions.module.css";
import Add from "./Add";
import Delete from "./Delete";
import Popup from "./Popup";
import { habit } from "../types/types";
const Actions = ({
  habits,
  setHabits,
}: {
  habits: habit[];
  setHabits: Function;
}) => {
  const [action, setAction] = useState<null | string>(null);
  return (
    <div className={style.Actions}>
      <p>This is the actions component</p>
      <button
        className={style.Button}
        onClick={() => {
          setAction(action === "add" ? null : "add");
        }}
      >
        Add
      </button>
      <button
        className={style.Button}
        onClick={() => {
          setAction(action === "delete" ? null : "delete");
        }}
      >
        Delete
      </button>
      {action === "add" && (
        <Popup setAction={setAction}>
          <Add
            setAction={setAction}
            habits={habits}
            setHabits={setHabits}
          ></Add>
        </Popup>
      )}
      {action === "delete" && (
        <Popup setAction={setAction}>
          <Delete habits={habits}></Delete>
        </Popup>
      )}
    </div>
  );
};

export default Actions;
