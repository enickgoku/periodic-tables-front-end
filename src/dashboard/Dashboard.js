// React + Hooks
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// React Components
import ReservationsList from "../reservation/reservations-list/ReservationsList";
import TablesList from "../table/tables-list/TablesList";
import CreateReservationForm from "../reservation/reservation-form/CreateReservationForm";
import EditReservationForm from "../reservation/reservation-form/EditReservationForm";
import SeatReservationForm from "../reservation/reservation-form/SeatReservationForm";
import CreateTableForm from "../table/table-form/CreateTableForm";
import EditTableForm from "../table/table-form/EditTableForm";

import ErrorAlert from "../layout/ErrorAlert";

// React Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

/**
 * Defines the dashboard page.
 */
function Dashboard(props) {

  const [dashboardError, setDashboardError] = useState(null);

  return (
      <Container fluid>
        <Row className="d-flex flex-column flex-md-row justify-content-md-center">
          <Switch>
            <Route exact={true} path={"/dashboard"}>
              {dashboardError ? <ErrorAlert error={dashboardError} /> :
                <>
                  <TablesList
                    {...props}
                    setDashboardError={setDashboardError}
                   />
                  <ReservationsList
                    {...props}
                    setDashboardError={setDashboardError}
                  />
                </>}
            </Route>
            <Route exact={true} path={"/reservations"}>
              <Redirect to={"/dashboard"} />
            </Route>
            <Route exact={true} path={"/reservations/new"}>
              <CreateReservationForm {...props} />
            </Route>
            <Route exact={true} path={"/reservations/:reservationId/edit"}>
              <EditReservationForm {...props} />
            </Route>
            <Route exact={true} path={"/reservations/:reservationId/seat"}>
              <SeatReservationForm {...props} />
            </Route>
            <Route exact={true} path={"/tables"}>
              <Redirect to={"/dashboard"} />
            </Route>
            <Route exact={true} path={"/tables/new"}>
              <CreateTableForm />
            </Route>
            <Route exact={true} path={"/tables/:tableId/edit"}>
              <EditTableForm />
            </Route>
          </Switch>
        </Row>
      </Container>
  );
}

export default Dashboard;