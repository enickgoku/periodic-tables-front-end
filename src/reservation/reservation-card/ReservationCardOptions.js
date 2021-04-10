// React + Hooks
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// React Bootstrap Components
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// API
import { finishReservation } from "../../utils/api";

/**
 * Displays the reservation status and edit options for each `ReservationCard`.
 * @returns {JSX.Element}
 */
function ReservationCardOptions(props) {

  let {
    // currentDate,
    // dateSetting,
    // setDateSetting,
    // currentTime,
    // changeDate,
    reservation,
    setReservationsError
  } = props;

  const history = useHistory();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClose = () => setShowConfirmation(false);
  const handleShow = () => setShowConfirmation(true);

  /**
  * Deletes the current reservation from the database.
  */
  function handleFinishReservation(event) {
    event.preventDefault();
    finishReservation(reservation.reservation_id, "finish")
        .then(() => {
          handleClose();
          history.push("/");
        })
        .catch(() => setReservationsError());
  }

  return (
    <>
      <ButtonGroup vertical>
        {reservation.status === "booked"
          ? <Button
              variant="dark"
              className="d-flex align-items-center text-muted"
              style={{ fontSize: "1.2rem" }}
              href={`/reservations/${reservation.reservation_id}/seat`}
            >
              <i className="ri-map-pin-user-fill" title="Seat Reservation" />
            </Button>
          : null
        }
        {reservation.status === "seated"
          ? <Button
              as="a"
              variant="dark"
              className="d-flex align-items-center text-muted"
              style={{ fontSize: "1.2rem" }}
              onClick={handleShow}
            >
              <i className="ri-close-circle-fill" title="Finished" />
            </Button>
          : null
        }
        <Button
          as="a"
          variant="dark"
          className="d-flex align-items-center text-muted"
          style={{ fontSize: "1.2rem" }}
          href={`/reservations/${reservation.reservation_id}/edit`}
        >
          <i className="ri-pencil-line" title="Edit Reservation" />
        </Button>
      </ButtonGroup>
      <Modal
          show={showConfirmation}
          onHide={handleClose}
      >
        <Modal.Header>
        <Modal.Title>Delete Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        You are about to mark this reservation as finished. This cannot be undone. Continue?
        </Modal.Body>
        <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
            Cancel
        </Button>
        <Button variant="danger" onClick={handleFinishReservation}>
            Continue
        </Button>
        </Modal.Footer>
    </Modal>
  </>
  );
}

export default ReservationCardOptions;