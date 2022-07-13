import { createContext, useState } from "react";

type PairType = {
  userId: string;
  pairId: string;
  _id: string;
};
type UserContextType = {
  user: any; // Not sure what these are, type it appropriately
  setUser: any;
  isLoggedIn: any;
  setIsLoggedIn: any;
  logout: Function;
  pair: any;
  setPair: Function;
};

type UserType = {
  user_id: string;
  username: string;
  pairId: string;
  pairName: string;
};

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = (props: any) => {
  const [user, setUser] = useState<UserType | {}>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pair, setPair] = useState<PairType | {}>({});
  const values: UserContextType = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    pair,
    setPair,
    logout: () => {
      setUser({});
      window.localStorage.removeItem("jwt-token");
    },
  };
  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
export type { UserContextType, UserType };
