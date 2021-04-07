// React + Hooks
import React from "react";

// React Bootstrap Components
import ListGroup from "react-bootstrap/ListGroup";

// Utils
import { DateTime } from "luxon";

/**
 * Defines the reservation `<Card.Body>` for the `ReservationCard` component.
 * @param {object} reservation
 *  an object containing reservation data.
 * @param {string} date
 *  the value of `dateSetting` from the `Layout` component.
 * @returns {JSX.Element}
 */
function ReservationCardBody(props) {

  let {
    currentDate,
    // dateSetting,
    // setDateSetting,
    // currentTime,
    // changeDate,
    reservation
  } = props;
  
    /**
     * The `reservation_time` displayed in `ex. 8:00 PM` format.
     */
    const formalTime =
      DateTime.fromISO(reservation.reservation_time).toFormat("t");

    /**
     * The `currentDate` displayed in `ex. Friday, April 9, 2021` format.
     */
    const formalDate =
      DateTime.fromISO(reservation.reservation_date).toFormat("cccc");
    
    return (
      <ListGroup>
        <ListGroup.Item className="d-flex flex-column bg-list-bg p-2">
          <small>{!reservation.current_table ? "Reserved For: " : "Current Table: "}</small>
          <span>
            {!reservation.current_table
            ? currentDate === reservation.reservation_date
                ? `Today at ${formalTime}`
                : `${formalDate} at ${formalTime}`
            : `${reservation.current_table}`}
          </span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex flex-column bg-list-bg p-2">
          <small>Guest Name:</small>
          <span>{reservation.first_name} {reservation.last_name}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex flex-column bg-list-bg p-2">
          <small>Phone Number:</small>
          <span>{reservation.mobile_number}</span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex flex-column bg-list-bg p-2">
          <small>Number of Guests:</small>
          <span>{reservation.people}</span>
        </ListGroup.Item>
      </ListGroup>
    );
}

export default ReservationCardBody;