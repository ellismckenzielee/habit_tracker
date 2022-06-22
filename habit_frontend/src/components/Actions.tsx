import { useState } from "react";
import style from "../styles/Actions.module.css";

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
      {action === "add" && <p>Add option selected</p>}
      {action === "delete" && <p>Delete option selected</p>}
    </div>
  );
};

export default Actions;
