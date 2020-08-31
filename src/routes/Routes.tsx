import React from "react";
import { Switch, withRouter, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { Chat, Home } from "../pages";
import { RouteWrapper } from "./RouteWrapper";

export const Routes = withRouter(() => {
  return (
    <main>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <RouteWrapper exact path={ROUTES.CHAT} component={Chat} />
      </Switch>
    </main>
  );
});
