// React + Hooks
import React from "react";

// React Components
import ReservationCardOptions from "./ReservationCardOptions";
import ReservationCardBody from "./ReservationCardBody";

// React Bootstrap Components
import Card from "react-bootstrap/Card";

/**
 * Defines the main reservation card for mapping.
 * @param {object} reservation
 *  an object containing reservation data.
 * @param {string} date
 *  the value of `dateSetting` from the `Layout` component.
 * @returns {JSX.Element}
 */
function ReservationCard(props) {

  let {
    // currentDate,
    // dateSetting,
    // setDateSetting,
    // currentTime,
    // changeDate,
    reservation,
    setReservationsError
  } = props;

  const style =
    reservation.status === "booked"
      ? "border-list-bg"
      : "border-danger";

  return (
    <Card className={`d-flex flex-row ${style} my-2`}>
      <Card.Body className="col d-flex flex-column p-0">
        <ReservationCardBody {...props} />
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center p-0">
        <ReservationCardOptions
          {...props}
          setReservationsError={setReservationsError}
        />
      </Card.Footer>
    </Card>
  );
}

export default ReservationCard;