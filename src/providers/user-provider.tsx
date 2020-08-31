import React, { createContext, useState } from "react";
import { User } from "../types";

type UserProviderValue = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const userProviderInitialValue: UserProviderValue = {
  user: null,
  setUser() {},
};

const UserContext = createContext(userProviderInitialValue);

const UserProvider: React.FC = (props) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
