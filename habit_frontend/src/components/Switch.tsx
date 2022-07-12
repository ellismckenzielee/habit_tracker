import style from "../styles/Switch.module.css";
const Switch = ({
  setFocus,
  username,
  pairName,
  userId,
  pairId,
}: {
  username: string;
  pairName: string;
  setFocus: Function;
  userId: string;
  pairId: string;
}) => {
  return (
    <div className={`${style.Switch} `}>
      <button
        className={`font-bold mt-10 mb-10 bg-indigo-500 p-10 w-60 rounded-l-lg bg-color-blue text-indigo-100`}
        onClick={() => {
          setFocus(userId);
        }}
      >
        {username}
      </button>
      <button
        className={`font-bold mt-10 mb-10 bg-indigo-500 p-10 w-60 rounded-r-lg text-indigo-100 `}
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
