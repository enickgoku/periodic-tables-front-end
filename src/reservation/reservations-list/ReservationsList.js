// React + Hooks
import React, { useState, useEffect } from "react";

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
  
  let {
    // currentDate,
    dateSetting,
    // setDateSetting,
    // currentTime,
    // changeDate
  } = props;

  const [reservations, setReservations] = useState([]);
  const [reservationsFilter, setReservationsFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadReservations, [dateSetting, reservationsFilter]);

  /**
   * Fetches all reservations by `date`.
   */
  function loadReservations() {
    const abortController = new AbortController();
    setIsLoading(true);
    setReservations([]);
    setReservationsError(null);
    listReservations({ date: dateSetting, phase: reservationsFilter }, abortController.signal)
      .then((reservations) => {
        setReservations(reservations);
        setIsLoading(false);
      })
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
          {...props}
          key={index}
          reservation={reservation}
          setReservationsError={setReservationsError}
        />
      </Col>
  ));

  return (
    <Col xs={{ order: 1 }} md={{ span: 5, order: 2 }} lg={4} xl={3}>
      <ReservationsListOptions
        {...props}
        reloadReservationList={loadReservations}
        setReservationsFilter={setReservationsFilter}
      />
      <Row className="d-flex flex-column align-items-center p-0 mt-2">
        {reservationsError ? <ErrorAlert error={reservationsError} /> : null}
        {isLoading && !reservationsError ? <img src={process.env.PUBLIC_URL + "/loading.png"} alt="Loading..." /> : null}
        {!reservations.length && !isLoading
          ? <h3 className="p-3">No Reservations</h3>
          : reservationContent}
      </Row>
    </Col>
  );
}

export default ReservationsList;