import style from "../styles/Switch.module.css";
const Switch = ({
  setFocus,
  username,
  pairName,
  userId,
  pairId,
  focus,
}: {
  username: string;
  pairName: string;
  setFocus: Function;
  userId: string;
  pairId: string;
  focus: string;
}) => {
  return (
    <div className={`${style.Switch} `}>
      <button
        className={`font-bold mt-10 mb-10 p-10 w-60 rounded-l-lg bg-color-blue ${
          focus === userId
            ? "bg-indigo-500 text-indigo-100"
            : "bg-indigo-100 text-indigo-500 text-bold"
        }`}
        onClick={() => {
          setFocus(userId);
        }}
      >
        {username}
      </button>
      <button
        className={`font-bold mt-10 mb-10 bg-indigo-500 p-10 w-60 rounded-r-lg   ${
          focus === pairId
            ? "bg-indigo-500 text-indigo-100"
            : "bg-indigo-100 text-indigo-500 text-bold"
        } `}
        onClick={() => {
          setFocus(pairId);
        }}
      >
        {pairName}
      </button>
    </div>
  );
};
export default Switch;
