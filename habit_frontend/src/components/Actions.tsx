import React, { useState } from "react";
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
  setHabits: React.Dispatch<React.SetStateAction<habit[]>>;
}) => {
  const [action, setAction] = useState<null | string>(null);
  return (
    <div className={style.Actions}>
      <button
        className={`${style.Button} rounded-xl`}
        onClick={() => {
          setAction(action === "add" ? null : "add");
        }}
      >
        Add
      </button>
      <button
        className={`${style.Button} rounded-xl`}
        onClick={() => {
          setAction(action === "delete" ? null : "delete");
        }}
      >
        Delete
      </button>
      {action === "add" && (
        <Popup setAction={setAction}>
          <Add setAction={setAction} setHabits={setHabits}></Add>
        </Popup>
      )}
      {action === "delete" && (
        <Popup setAction={setAction}>
          <Delete
            setAction={setAction}
            habits={habits}
            setHabits={setHabits}
          ></Delete>
        </Popup>
      )}
    </div>
  );
};

export default Actions;
