import axios from "axios";
import moment from "moment";
import React from "react";
import { habit } from "../types/types";
import { PairType } from "../context/UserContext";
const getHabitsByUsername = (
  username: string,
  setHabits: React.Dispatch<React.SetStateAction<habit[]>>
) => {
  axios
    .get(`http://localhost:5656/user/${username}/habits`)
    .then(({ data }) => {
      setHabits(data);
    });
};

const deleteHabit = (habit: string, username: string) => {
  return axios.delete(`http://localhost:5656/user/${username}/habits`, {
    data: { habit },
  });
};

// const getWeekByUserIdAndWeekStart = (
//   userId: string,
//   weekStart: string,
//   setWeek: Function
// ) => {
//   axios
//     .get(`http://localhost:5656/user/${userId}/habits/${weekStart}`)
//     .then(({ data }) => {
//       setWeek(data);
//     });
// };

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
  username: string,
  habit: string,
  action: string,
  date: string
) => {
  return axios.put(`http://localhost:5656/user/${username}/habits/`, {
    date,
    habit,
    action,
  });
};

const getPairByUserId = async (
  username: string,
  setPair: React.Dispatch<
    React.SetStateAction<PairType | Record<string, string>>
  >
) => {
  return axios
    .get(`http://localhost:5656/user/${username}/pair`)
    .then(({ data }) => {
      setPair(data);
    });
};

const deletePair = async (
  pair_id: string,
  setPair: React.Dispatch<
    React.SetStateAction<PairType | Record<string, string>>
  >
) => {
  return axios.delete(`http://localhost:5656/pair/${pair_id}`).then(() => {
    setPair({});
  });
};

const addPair = async (sender: string, recipient: string) => {
  return axios.post(`http://localhost:5656/pair`, { sender, recipient });
};

const acceptPairRequest = (pair_id: string) => {
  return axios.put(`http://localhost:5656/pair/${pair_id}`);
};

const deleteUser = (username: string) => {
  console.log("in delete user ", username);
  return axios.delete(`http://localhost:5656/user/${username}`);
};

const checkCheckBoxModifiable = (
  date: string,
  username: string,
  displayUser: string
) => {
  const currentDate = moment();
  if (currentDate.format("DD-MM-YYYY") === date && username === displayUser)
    return true;
  return false;
};

export {
  getHabitsByUsername,
  deleteHabit,
  updateWeek,
  updateHabit,
  getPairByUserId,
  deletePair,
  addPair,
  acceptPairRequest,
  checkCheckBoxModifiable,
  deleteUser,
};
