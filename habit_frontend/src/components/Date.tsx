import style from "../styles/Date.module.css";
import { useEffect, useState } from "react";
import { getMonday } from "../utils/date.utils";
const Date = ({
  date,
  setDate,
}: {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
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
      <div
        className={`${style.DateText} flex flex-row flex-wrap justify-center gap-1`}
      >
        <p className={"grow-0 m-auto"}>Week Commencing:</p>
        <p className={"grow-0 m-auto"}>
          <b>{date}</b>
        </p>
      </div>
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
