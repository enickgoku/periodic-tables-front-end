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
function TableCard({ table }) {
    const style =
      table.reservation_id
        ? "border-danger"
        : "border-success";

    return (
      <Card className={`d-flex flex-row ${style} my-2`}>
        <Card.Body className="d-flex flex-column p-0">
          <TableCardBody table={table} />
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center p-0">
          <TableCardOptions table={table} />
        </Card.Footer>
      </Card>
    );
}

export default TableCard;