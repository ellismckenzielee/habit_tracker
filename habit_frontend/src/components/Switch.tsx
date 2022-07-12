import style from "../styles/Switch.module.css";
const Switch = ({
  setFocus,
  username,
  pairName,
}: {
  username: string;
  pairName: string;
  setFocus: Function;
}) => {
  return (
    <div className={`${style.Switch} `}>
      <button
        className={`font-bold mt-10 mb-10 bg-indigo-500 p-10 w-60 rounded-l-lg bg-color-blue text-indigo-100`}
      >
        {username}
      </button>
      <button
        className={`font-bold mt-10 mb-10 bg-indigo-500 p-10 w-60 rounded-r-lg text-indigo-100 `}
      >
        {pairName}
      </button>
    </div>
  );
};
export default Switch;
