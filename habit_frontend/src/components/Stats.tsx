import style from "../styles/Stats.module.css";
import { habit } from "../types/types";
const Stats = ({
  habits,
  count,
  totalDates,
  maxScore,
  bestDay,
  longestStreak,
}: {
  habits: habit[];
  count: number;
  totalDates: number;
  maxScore: number;
  longestStreak: number;
  bestDay: string;
}) => {
  return (
    <div className={`${style.Stats}`}>
      <div className={`flex flex-row flex-wrap justify-center m-5 gap-2`}>
        <div
          className={`p-2 grow basis-1/3 md:basis-1/4  bg-indigo-100 rounded-lg flex flex-col justify-center`}
        >
          <p className={`text-indigo-400 mb-1`}>
            <span className={"text-3xl font-bold text-indigo-900"}>
              {((count / totalDates) * 100).toFixed(1)}
            </span>{" "}
            %
          </p>
          <p className={`text-indigo-700 font-bold m-auto`}>Week Completion</p>
        </div>
        <div
          className={`p-2 grow basis-1/3 md:basis-1/4  bg-indigo-100 rounded-lg flex flex-col justify-center`}
        >
          <p className={`text-indigo-400 mb-1`}>
            {" "}
            <span className={"text-3xl font-bold text-indigo-900"}>
              {longestStreak}
            </span>
            {longestStreak === 1 ? " day" : " days"}
          </p>

          <p className={`text-indigo-700 font-bold m-auto`}>
            Current longest streak
          </p>
        </div>
        <div
          className={`p-2 grow basis-1/3 md:basis-1/4  bg-indigo-100 rounded-lg flex flex-col justify-center`}
        >
          <p className={`text-indigo-400 mb-1`}>
            <span className={"text-3xl font-bold text-indigo-900"}>
              {maxScore + "/" + habits.length}
            </span>
          </p>

          <p className={`text-indigo-700 font-bold m-auto`}>{bestDay}</p>
        </div>
      </div>
    </div>
  );
};
export default Stats;
