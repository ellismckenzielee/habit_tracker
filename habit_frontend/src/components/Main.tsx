import style from "../styles/Main.module.css";
import Actions from "./Actions";
import View from "./View";
const Main = () => {
  return (
    <div className={style.Main}>
      <h1> This is the main page </h1>
      <View />
      <Actions />
    </div>
  );
};

export default Main;
