import style from "../styles/Main.module.css";
import View from "./View";
const Main = () => {
  return (
    <div className={style.Main}>
      <h1> This is the main page </h1>
      <View />
    </div>
  );
};

export default Main;
