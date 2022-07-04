import { useState } from "react";
import style from "../styles/Actions.module.css";
import Add from "./Add";
import Delete from "./Delete";
import Popup from "./Popup";
import { habit, week } from "../types/types";
const Actions = ({ week, setWeek }: { week: week; setWeek: Function }) => {
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
          <Add setAction={setAction} week={week} setWeek={setWeek}></Add>
        </Popup>
      )}
      {action === "delete" && (
        <Popup setAction={setAction}>
          <Delete setAction={setAction} week={week} setWeek={setWeek}></Delete>
        </Popup>
      )}
    </div>
  );
};

export default Actions;
