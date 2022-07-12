import style from "../styles/Date.module.css";
import { useEffect, useState } from "react";
import { getMonday } from "../utils/date.utils";
const Date = ({ date, setDate }: { date: string; setDate: Function }) => {
  const [offset, setOffset] = useState<number>(0);
  useEffect(() => {
    setDate(getMonday(offset));
  }, [offset, setDate]);
  return (
    <div className={style.Date}>
      <button
        className={`${style.DateButtons} rounded-xl`}
        onClick={() => {
          setOffset(offset - 1);
        }}
      >
        {" "}
        Back{" "}
      </button>
      <p className={style.DateText}>
        Week Commencing: <b>{date}</b>
      </p>
      <button
        className={`${style.DateButtons} rounded-xl`}
        onClick={() => {
          if (offset < 0) {
            setOffset(offset + 1);
          }
        }}
      >
        {" "}
        Forward{" "}
      </button>
    </div>
  );
};

export default Date;
