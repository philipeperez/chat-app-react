import React, { useContext, FC } from "react";
import { UserContext } from "../providers/user-provider";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const RouteWrapper: FC<RouteProps> = (props) => {
  const { user } = useContext(UserContext);

  if (user) return <Route {...props} />;

  return <Redirect to={ROUTES.HOME} />;
};

export { RouteWrapper };
