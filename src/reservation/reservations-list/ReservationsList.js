// React + Hooks
import React, { useEffect, useState } from "react";

// React Components
import ReservationsListOptions from "./ReservationsListOptions";
import ReservationCard from "../reservation-card/ReservationCard";
import ErrorAlert from "../../layout/ErrorAlert";

// React Bootstrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// API
import { listReservations } from "../../utils/api";

/**
 * Defines the list of fetched reservations.
 * @param {string} date
 *  the current `dateSetting` from the `Layout` component that is used for fetching reservations.
 * @param {callback} changeDate
 *  a function for lifting state to `dateSetting` in the `Layout` component.
 * @returns {JSX.Element} 
 */
function ReservationsList(props) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadReservations, [props.dateSetting]);

  /**
   * Fetches all reservations by `date`.
   */
  function loadReservations() {
    const abortController = new AbortController();
    setReservations([]);
    setReservationsError(null);
    listReservations({ date: props.dateSetting }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  /**
   * Defines all fetched reservation elements as multiple `ReservationCard` components.
   */
  const reservationContent =
    reservations.map((reservation, index) => (
      <Col key={index}>
        <ReservationCard
          key={index}
          reservation={reservation}
          currentDate={props.currentDate}
        />
      </Col>
  ));

  return (
    <Col xs={{ order: 1 }} md={{ span: 4, order: 2 }} lg={4} xl={3}>
      <ReservationsListOptions
        {...props}
        refreshReservationList={loadReservations}
      />
      <Row className="d-flex flex-column align-items-center p-0 mt-2">
        {reservationsError
          ? <ErrorAlert error={reservationsError} />
          : null}
        {!reservations.length && !reservationsError
          ? <h3 className="p-3">No Reservations</h3>
          : reservationContent}
      </Row>
    </Col>
  );
}

export default ReservationsList;