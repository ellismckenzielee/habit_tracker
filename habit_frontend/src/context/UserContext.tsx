import { createContext, useState } from "react";
type UserContextType = {
  user: any; // Not sure what these are, type it appropriately
  setUser: any;
  isLoggedIn: any;
  setIsLoggedIn: any;
};
const UserContext = createContext<UserContextType | null>(null);

const UserProvider = (props: any) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const values: UserContextType = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
export type { UserContextType };
