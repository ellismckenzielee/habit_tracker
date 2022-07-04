import axios from "axios";
import Actions from "../components/Actions";

const getHabitsByUserId = (userId: string, setHabits: Function) => {
  axios.get(`http://localhost:5656/user/${userId}/habits`).then(({ data }) => {
    setHabits(data);
  });
};

const deleteHabit = (habit: string, userId: string) => {
  return axios.delete(`http://localhost:5656/user/${userId}/habits`, {
    data: { habit },
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

const updateWeek = (
  userId: string,
  weekStart: string,
  habitName: string,
  updatedDays: number[]
) => {
  return axios.post(
    `http://localhost:5656/user/${userId}/habits/${weekStart}`,
    {
      instructions: {
        habitName,
        updatedDays,
      },
    }
  );
};

export {
  getHabitsByUserId,
  deleteHabit,
  getWeekByUserIdAndWeekStart,
  updateWeek,
};
