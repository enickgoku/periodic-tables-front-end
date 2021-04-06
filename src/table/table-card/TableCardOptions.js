// React + Hooks
import React, { useState } from "react";

// React Bootstrap Components
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";

// API
import { dismissReservation } from "../../utils/api";

/**
 * Displays the edit option for each `TableCard`.
 * @param {object} table
 *  an object containing table data.
 * @returns {JSX.Element}
 */
function TableCardOptions({ table }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClose = () => setShowConfirmation(false);
  const handleShow = () => setShowConfirmation(true);

  function handleReservationDismiss() {
    dismissReservation(table.table_id)
      .then(() => window.location.reload())
      .catch((error) => window.alert(error));
  }

  return (
    <>
      <ButtonGroup vertical>
        {table.reservation_id ? (
          <Button
            variant="dark"
            className="d-flex align-items-center text-muted border border-list-bg"
            style={{ fontSize: "1.2rem" }}
            onClick={handleShow}
            data-table-id-finish={table.table_id}
          >
            <i className="ri-user-unfollow-fill" title="Dismiss Reservation" />
          </Button>
        ) : null}
        <Button
          variant="dark"
          className="d-flex align-items-center text-muted border border-list-bg"
          style={{ fontSize: "1.2rem" }}
          href={`/tables/${table.table_id}/edit`}
        >
          <i className="ri-pencil-line" title="Edit Table" />
        </Button>
      </ButtonGroup>
      <Modal
        show={showConfirmation}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Dismiss Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to dismiss the reservation from this table. This cannot be undone. Continue?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleReservationDismiss}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TableCardOptions;