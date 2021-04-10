// React + Hooks
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
function TableCardOptions(props) {

  let {
    // currentDate,
    // dateSetting,
    // setDateSetting,
    // currentTime,
    // changeDate,
    table,
    setTablesError
  } = props;

  const history = useHistory();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClose = () => setShowConfirmation(false);
  const handleShow = () => setShowConfirmation(true);

  function handleDismissReservation() {
    dismissReservation(table.table_id, table.reservation_id)
      .then(() => history.push("/"))
      .catch(() => setTablesError());
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
          Is this table ready to seat new guests? This cannot be undone. Continue?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" autoFocus={true} onClick={handleDismissReservation}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TableCardOptions;