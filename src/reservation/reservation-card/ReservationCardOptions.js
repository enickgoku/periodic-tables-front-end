// React + Hooks
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// React Bootstrap Components
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

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
          ? <OverlayTrigger
              transition={false}
              placement="left"
              overlay={<Tooltip id={`reservation-${reservation.reservation_id}-seat-tooltip`}>Seat To Table</Tooltip>}
            >
              <Button
                variant="dark"
                className="d-flex align-items-center text-muted"
                style={{ fontSize: "1.2rem" }}
                href={`/reservations/${reservation.reservation_id}/seat`}
              >
                <i className="ri-map-pin-user-fill" />
              </Button>
            </OverlayTrigger>
          : null
        }
        {reservation.status === "seated"
          ? <OverlayTrigger
              transition={false}
              placement="left"
              overlay={<Tooltip id={`reservation-${reservation.reservation_id}-finish-tooltip`}>Finish Reservation</Tooltip>}
            >
              <Button
                as="a"
                variant="dark"
                className="d-flex align-items-center text-muted"
                style={{ fontSize: "1.2rem" }}
                onClick={handleShow}
              >
                <i className="ri-close-circle-fill" />
              </Button>
            </OverlayTrigger>
          : null
        }
        <OverlayTrigger
          transition={false}
          placement="left"
          overlay={<Tooltip id={`reservation-${reservation.reservation_id}-edit-tooltip`}>Edit</Tooltip>}
        >
          <Button
            as="a"
            variant="dark"
            className="d-flex align-items-center text-muted"
            style={{ fontSize: "1.2rem" }}
            href={`/reservations/${reservation.reservation_id}/edit`}
          >
            <i className="ri-pencil-line" />
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
      <Modal
        animation={false}
        show={showConfirmation}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header>
        <Modal.Title>Finish Reservation</Modal.Title>
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