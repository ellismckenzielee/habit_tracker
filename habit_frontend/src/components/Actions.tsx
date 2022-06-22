import { useState } from "react";
import style from "../styles/Actions.module.css";
import Add from "./Add";
import Popup from "./Popup";
const Actions = () => {
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
        <Popup>
          <Add></Add>
        </Popup>
      )}
      {action === "delete" && <p>Delete option selected</p>}
    </div>
  );
};

export default Actions;
