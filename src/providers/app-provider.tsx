import React, { FC } from "react";
import { ChatProvider } from "./chat-provider";
import { UserProvider } from "./user-provider";

const AppProvider: FC = ({ children }) => {
  const providers: FC[] = [ChatProvider, UserProvider];

  return (
    <>
      {providers.reduce(
        (acc, Provider) => (
          <Provider>{acc}</Provider>
        ),
        children
      )}
    </>
  );
};

export { AppProvider };
