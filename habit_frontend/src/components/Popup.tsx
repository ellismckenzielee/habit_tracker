import style from "../styles/Popup.module.css";
const Popup = ({ children }: { children: any }) => {
  return <div className={style.Popup}>{children}</div>;
};

export default Popup;
