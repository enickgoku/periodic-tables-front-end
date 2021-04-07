// React + Hooks
import React from "react";

// React Bootstrap Components
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

/**
 * Displays the reservation status and edit options for each `ReservationCard`.
 * @param {object} reservation
 *  an object containing reservation data.
 * @returns {JSX.Element}
 */
function ReservationCardOptions(props) {

  let {
    // currentDate,
    // dateSetting,
    // setDateSetting,
    // currentTime,
    // changeDate,
    reservation
  } = props;

  return (
    <ButtonGroup vertical>
      <Button
        variant="dark"
        className="d-flex align-items-center text-muted"
        style={{ fontSize: "1.2rem" }}
        href={`/reservations/${reservation.reservation_id}/seat`}
      >
        <i className="ri-map-pin-user-fill" title="Seat Reservation" />
      </Button>
      <Button
        variant="dark"
        className="d-flex align-items-center text-muted"
        style={{ fontSize: "1.2rem" }}
        href={`/reservations/${reservation.reservation_id}/edit`}
      >
        <i className="ri-pencil-line" title="Edit Reservation" />
      </Button>
    </ButtonGroup>
  );
}

export default ReservationCardOptions;