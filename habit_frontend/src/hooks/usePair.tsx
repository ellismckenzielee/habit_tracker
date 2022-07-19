import { useState, useEffect } from "react";
import { PairType, UserType } from "../context/UserContext";
import { getPairByUserId } from "../utils/utils";
import { getMonday } from "../utils/date.utils";
const usePair = (
  user: UserType | Record<string, string>,
  pair: PairType | Record<string, string>,
  setPair: React.Dispatch<
    React.SetStateAction<PairType | Record<string, string>>
  >
) => {
  const [date, setDate] = useState<string>(getMonday(0));
  const [focus, setFocus] = useState<string>(user.username);
  console.log("FOCUS", focus);
  console.log("PAIR", pair);
  useEffect(() => {
    getPairByUserId(user.username, setPair);
  }, [user.username]);
  return { focus, setFocus, date, setDate };
};

export default usePair;
