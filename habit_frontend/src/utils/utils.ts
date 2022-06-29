import axios from "axios";
import Actions from "../components/Actions";

const getHabitsByUserId = (userId: string, setHabits: Function) => {
  axios.get(`http://localhost:5656/user/${userId}/habits`).then(({ data }) => {
    setHabits(data);
  });
};

const deleteHabit = (habitId: string, userId: string) => {
  axios
    .delete(`http://localhost:5656/user/${userId}/habits`, {
      data: { habitId },
    })
    .then(console.log);
};

export { getHabitsByUserId, deleteHabit };
