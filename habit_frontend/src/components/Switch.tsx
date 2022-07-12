import style from "../styles/Switch.module.css";
const Switch = () => {
  return (
    <div className={`${style.Switch} `}>
      <button
        className={`font-bold mt-10 mb-10 bg-indigo-500 p-10 w-60 rounded-l-lg bg-color-blue text-indigo-100`}
      >
        {" "}
        ellismckenzielee{" "}
      </button>
      <button
        className={`font-bold mt-10 mb-10 bg-indigo-500 p-10 w-60 rounded-r-lg text-indigo-100 `}
      >
        {" "}
        johnF{" "}
      </button>
    </div>
  );
};
export default Switch;
