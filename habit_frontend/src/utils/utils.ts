import axios from "axios";
import Actions from "../components/Actions";

const getHabitsByUserId = (userId: string, setHabits: Function) => {
  axios.get(`http://localhost:5656/user/${userId}/habits`).then(({ data }) => {
    setHabits(data);
  });
};

const deleteHabit = (habitId: string, userId: string) => {
  return axios.delete(`http://localhost:5656/user/${userId}/habits`, {
    data: { habitId },
  });
};

const getWeekByUserIdAndWeekStart = (
  userId: string,
  weekStart: string,
  setWeek: Function
) => {
  axios
    .get(`http://localhost:5656/user/${userId}/habits/${weekStart}`)
    .then(({ data }) => {
      setWeek(data);
    });
};

export { getHabitsByUserId, deleteHabit, getWeekByUserIdAndWeekStart };
