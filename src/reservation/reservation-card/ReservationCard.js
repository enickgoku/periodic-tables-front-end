// React + Hooks
import React from "react";

// React Components
import ReservationCardOptions from "./ReservationCardOptions";
import ReservationCardBody from "./ReservationCardBody";

// React Bootstrap Components
import Card from "react-bootstrap/Card";

/**
 * Defines the main reservation card for mapping.
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

  const borderStyle =
    reservation.status === "booked" || reservation.status === "finished"
      ? "border-list-bg"
      : "border-danger";

  const finishedStyle =
    reservation.status === "finished"
      ? "40%"
      : "100%";

  return (
    <Card className={`d-flex flex-row ${borderStyle} my-2`} style={{ opacity: finishedStyle }}>
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