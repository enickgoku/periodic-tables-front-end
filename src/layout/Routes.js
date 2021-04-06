// React + Hooks
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// React Components
import Dashboard from "../dashboard/Dashboard";
import SeatReservationForm from "../seat/SeatReservationForm";
import CreateReservationForm from "../reservation/reservation-form/CreateReservationForm";
import EditReservationForm from "../reservation/reservation-form/EditReservationForm";
import CreateTableForm from "../table/table-form/CreateTableForm";
import EditTableForm from "../table/table-form/EditTableForm";
import NotFound from "./NotFound";

/**
 * Defines all of the routes for the application.
 * 
 * @param {{ currentDate: string,
 *           dateSetting: string,
 *           setDateSetting: Function,
 *           currentTime: string,
 *           changeDate: Function }} props
 * 
 * @property {string} currentDate
 *  the current date in `YYYY-MM-DD` format.
 * @param dateSetting
 *  the current `dateSetting` in `YYYY-MM-DD` format.
 * @callback setDateSetting
 *  a function used to lift state to the `dateSetting` in the `Layout` component.
 * @param currentTime
 *  the current time used for form submission constraints.
 * @param changeDate
 *  a function used to lift state to `dateSetting` in the `Layout` component.
 * @returns {JSX.Element}
 */
function Routes(props) {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/tables">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard {...props} />
      </Route>
      <Route path="/reservations/new">
        <CreateReservationForm {...props} />
      </Route>
      <Route path="/reservations/:reservationId/edit">
        <EditReservationForm {...props} />
      </Route>
      <Route path={`/reservations/:reservationId/seat`}>
        <SeatReservationForm />
      </Route>
      <Route path="/tables/new">
        <CreateTableForm />
      </Route>
      <Route path="/tables/:tableId/edit">
        <EditTableForm />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
