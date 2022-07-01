import style from "../styles/Date.module.css";
const Date = ({ date, setDate }: { date: string; setDate: Function }) => {
  return (
    <div className={style.Date}>
      <p>
        Week Commencing: <b>{date}</b>
      </p>
    </div>
  );
};

export default Date;
