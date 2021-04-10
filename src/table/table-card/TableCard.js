// React + Hooks
import React from "react";

// React Components
import TableCardOptions from "./TableCardOptions";
import TableCardBody from "./TableCardBody";

// React Bootstrap Components
import Card from "react-bootstrap/Card";

/**
 * Defines the main table component for mapping.
 * @param {object} table
 *  an object containing table data.
 * @returns {JSX.Element}
 */
function TableCard(props) {

  let {
    // currentDate,
    // dateSetting,
    // setDateSetting,
    // currentTime,
    // changeDate,
    table,
    // setTablesError
  } = props;

  const borderStyle =
    table.reservation_id
      ? "border-danger"
      : "border-body-bg";

  return (
    <Card className={`d-flex flex-row ${borderStyle} mb-1`}>
      <Card.Body className="d-flex flex-column p-0">
        <TableCardBody {...props} />
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center p-0">
        <TableCardOptions {...props} />
      </Card.Footer>
    </Card>
  );
}

export default TableCard;