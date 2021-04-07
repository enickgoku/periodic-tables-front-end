// React + Hooks
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// React Components
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";

/**
 * Defines all of the routes for the application.
 */
function Routes(props) {

  // let {
  //   currentDate,
  //   dateSetting,
  //   setDateSetting,
  //   currentTime,
  //   changeDate
  // } = props;

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path={["/reservations", "/tables", "/dashboard"]}>
        <Dashboard {...props} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
