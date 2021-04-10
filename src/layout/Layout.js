// React + Hooks
import React, { useState } from "react";

// React Components
import Header from "./header/Header";
import Menu from "../menu/Menu";
import Routes from "./Routes";

// React Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Utils
import { DateTime, Settings } from "luxon";

// Styles
import "./styles/layout/Layout.css";
import "./styles/scss/custom.scss";

// Set the system time zone where the restaurant resides.
Settings.defaultZoneName = "America/New_York";

/**
 * Defines the main layout of the application.
 * @returns {JSX.Element}
 */
function Layout() {
  /**
   * Provides an option to set the date setting with a URL search query.
   */
  const currentUrlParams = new URLSearchParams(window.location.search);

  const [currentDate, setCurrentDate] = useState(DateTime.local().toISODate());
  const [currentTime, setCurrentTime] = useState(DateTime.local().toFormat("T"));
  const [dateSetting, setDateSetting] = useState(currentUrlParams.get("date") || currentDate);

  setInterval(() => {
    setCurrentDate(DateTime.local().toISODate());
    setCurrentTime(DateTime.local().toFormat("T"));
  }, 1000);

  /**
   * Adjust the `dateSetting` for displaying reservations.
   */
  const handleChangeDateSetting = (value) =>
    typeof value === "number"
      ? setDateSetting(incrementDate(value))
      : setDateSetting(currentDate);

  /**
   * Helper function for `handleChangeDateSetting`.
   */
  const incrementDate = (value) => 
    DateTime.fromISO(dateSetting).plus({ days: value }).toISODate();

  return (
    <Container fluid>
      <Row style={{ minHeight: "10vh" }}>
        <Col xs={12} className="d-flex justify-content-between align-items-center p-0">
          <Menu />
          <Header
            currentDate={currentDate}
            currentTime={currentTime}
            dateSetting={dateSetting}
          />
        </Col>
      </Row>
      <Row style={{ height: "90vh" }}>
        <Col xs={12} className="d-flex justify-content-center align-items-center p-0">
          <Routes
            currentDate={currentDate}
            dateSetting={dateSetting}
            setDateSetting={setDateSetting}
            currentTime={currentTime}
            changeDate={handleChangeDateSetting}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;
