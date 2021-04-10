// React + Hooks
import React from "react";

// React Bootstrap Components
import ListGroup from "react-bootstrap/ListGroup";

/**
 * Defines the table `<Card.Body>` for the `TableCard` component.
 * @param {object} table
 *  an object containing table data.
 * @returns {JSX.Element}
 */
function TableCardBody(props) {

  let {
    // currentDate,
    // dateSetting,
    // setDateSetting,
    // currentTime,
    // changeDate,
    table
  } = props;

  return (
    <ListGroup>
      <ListGroup.Item className="d-flex flex-column bg-list-bg p-2">
        <small>Status:</small>
        <span data-table-id-status={table.table_id}>
          {table.reservation_id ? "Occupied" : "Free"}
        </span>
      </ListGroup.Item>
      <ListGroup.Item className="d-flex flex-column bg-list-bg p-2">
        <small>Table Name:</small>
        <span>{table.table_name}</span>
      </ListGroup.Item>
      <ListGroup.Item className="d-flex flex-column bg-list-bg p-2">
        <small>Capacity:</small>
        <span>{table.capacity}</span>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default TableCardBody;