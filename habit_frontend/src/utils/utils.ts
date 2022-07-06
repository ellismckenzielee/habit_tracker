import axios from "axios";

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

const updateHabit = async (
  userId: string,
  habit: string,
  action: string,
  date: string
) => {
  return axios.put(`http://localhost:5656/user/${userId}/habits/`, {
    date,
    habit,
    action,
  });
};

export {
  getHabitsByUserId,
  deleteHabit,
  getWeekByUserIdAndWeekStart,
  updateWeek,
  updateHabit,
};
