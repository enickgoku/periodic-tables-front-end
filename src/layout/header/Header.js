// React + Hooks
import React from "react";

// React Bootstrap Components
import Col from "react-bootstrap/Col";

// Utils
import { DateTime } from "luxon";

/**
 * Defines the main header.
 */
function Header(props) {

  let {
    currentDate,
    dateSetting,
    // setDateSetting,
    currentTime,
    // changeDate
  } = props;
  
  /**
   * The date converted to `Friday, April 2, 2021` format.
   * Displays a specific date prop based on other cicumstances.
   */
  const formalDate =
    currentDate === dateSetting
      ? DateTime.fromISO(dateSetting).toFormat("DDDD")
      : DateTime.fromISO(dateSetting).toFormat("DDDD");

  /**
   * The time converted to `HH:MM AM/PM` format.
   */
  const formalTime = DateTime.fromISO(currentTime).toFormat("t");

  /**
   * If the date setting is prior to today's date, turn text gray.
   */
  const style = dateSetting < currentDate ? "text-muted" : null;

  return (
    <Col className="d-flex flex-column align-items-end">
      <span style={{ fontSize: "2rem" }}>{formalTime}</span>
      <span className={style}>{formalDate}</span>
    </Col>
  );
}

export default Header;