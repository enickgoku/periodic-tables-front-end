// React + Hooks
import React from "react";

// React Bootstrap Components
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

// Menu Options
import { globalMenuOptions } from "./MenuOptions";

/**
 * Defines the menu for this application.
 * @returns {JSX.Element}
 */
function Menu() {

  /**
   * Defines the menu that displays on all pages.
   */
  const globalPageOptions = globalMenuOptions.map((item, index) => (
    <Dropdown.Item key={index} href={item.url}>
      {item.name}
    </Dropdown.Item>
  ));

  return (
    <Col xs="auto" className="d-flex align-items-center">
      <Dropdown>
        <Dropdown.Toggle
          as="a"
          variant="dark"
          style={{ fontSize: "2rem" }}
        >
          <i className="ri-grid-fill" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {globalPageOptions}
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
}

export default Menu;
