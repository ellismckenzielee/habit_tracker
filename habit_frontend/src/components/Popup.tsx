import style from "../styles/Popup.module.css";
const Popup = ({
  children,
  setAction,
}: {
  children: any;
  setAction: React.Dispatch<React.SetStateAction<null | string>>;
}) => {
  return (
    <div className={style.Popup}>
      <div className={style.PopupContent}>
        <h1
          className={style.CloseCross}
          onClick={() => {
            setAction(null);
          }}
        >
          {" "}
          X{" "}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default Popup;
