// React + Hooks
import React from "react";

// React Components
import ReservationsList from "../reservation/reservations-list/ReservationsList";
import TablesList from "../table/tables-list/TablesList";

// React Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

/**
 * Defines the dashboard page.
 */
function Dashboard(props) {
  return (
      <Container fluid>
        <Row className="d-flex flex-column flex-md-row">
          <TablesList />
          <ReservationsList {...props} />
        </Row>
      </Container>
  );
}

export default Dashboard;