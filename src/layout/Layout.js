// React + Hooks
import React, { useState } from "react";

// React Components
import Menu from "../menu/Menu";
import Routes from "./Routes";

// React Bootstrap Components
import Header from "./header/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// Utils + Settings
import { DateTime, Settings } from "luxon";

// Styles
import "./styles/Layout.css"
import "./styles/scss/custom.scss";

// Set the system time zone where the restaurant resides.
Settings.defaultZoneName = "America/New_York";

/**
 * @function Layout
 * Defines the main layout of the application.
 * @const {string} currentDate
 * the date for the current time zone.
 * @returns {JSX.Element}
 */
function Layout() {
  const [currentDate, setCurrentDate] = useState(DateTime.local().toISODate());
  const [currentTime, setCurrentTime] = useState(DateTime.local().toFormat("T"));
  const [dateSetting, setDateSetting] = useState(currentDate);

  setInterval(() => {
    setCurrentDate(DateTime.local().toISODate());
    setCurrentTime(DateTime.local().toFormat("T"));
  }, 1000);

  /**
   * Adjust the `dateSetting` for displaying reservations.
   * - Lifted from `ReservationsListOptions`.
   * @param {integer} value
   * the number of days +/- to adjust the `dateSetting`.
   */
  const handleChangeDateSetting = (value) =>
    typeof value === "number"
      ? setDateSetting(incrementDate(value))
      : setDateSetting(currentDate);

  /**
   * Helper function for `handleChangeDateSetting`.
   * @param {integer} value
   * the number of days +/- to adjust the `dateSetting`.
   */
  const incrementDate = (value) => 
    DateTime.fromISO(dateSetting).plus({ days: value }).toISODate();

  return (
    <Container fluid>
      <Row className="d-flex justify-content-between p-2 my-4">
        <Menu />
        <Header
          currentDate={currentDate}
          currentTime={currentTime}
          dateSetting={dateSetting}
        />
      </Row>
      <Row className="d-flex justify-content-center">
        <Routes
          currentDate={currentDate}
          dateSetting={dateSetting}
          setDateSetting={setDateSetting}
          currentTime={currentTime}
          changeDate={handleChangeDateSetting}
        />
      </Row>
    </Container>
  );
}

export default Layout;
