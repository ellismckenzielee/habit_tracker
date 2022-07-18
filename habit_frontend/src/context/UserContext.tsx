import React, { createContext, useState } from "react";

type PairType = {
  userId: string;
  pairId: string;
  _id: string;
  status: string;
  recipient: boolean;
};
type UserContextType = {
  user: UserType | Record<string, string>; // Not sure what these are, type it appropriately
  setUser: React.Dispatch<
    React.SetStateAction<UserType | Record<string, string>>
  >;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  pair: PairType | Record<string, string>;
  setPair: React.Dispatch<
    React.SetStateAction<PairType | Record<string, string>>
  >;
};

type UserType = {
  user_id: string;
  username: string;
  pairId: string;
  pairName: string;
};

const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<UserType | Record<string, string>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pair, setPair] = useState<PairType | Record<string, string>>({});
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
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
export type { UserContextType, UserType, PairType };
