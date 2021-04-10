// React + Hooks
import React from "react";

// React Bootstrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

/**
 * Defines the `ButtonGroup` options for the `TablesListHeader` component.
 * @param {callback} changeFilter
 *  a function used for lifting state to `filterTablesBy` in the `TablesList` component.
 * @returns {JSX.Element}
 */
function TablesListOptions(props) {

    let {
    //   currentDate,
    //   dateSetting,
    //   setDateSetting,
    //   currentTime,
    //   changeDate,
      setFilter,
      refreshFilteredTables
    } = props;

    return (
        <Row>
            <Col className="d-flex justify-content-end">
                {/* UNDER DEVELOPMENT */}
                {/* <InputGroup className="mr-3">
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        size="lg"
                        className="border border-dark"
                    />
                    <InputGroup.Append>
                        <Button
                        variant="dark"
                        className="border border-dark"
                        >
                        <i className="ri-search-line" />
                        </Button>
                    </InputGroup.Append>
                </InputGroup> */}
                <ButtonGroup>
                    <OverlayTrigger
                        transition={false}
                        placement="top"  
                        overlay={<Tooltip id="tables-refresh-tooltip">Refresh</Tooltip>}
                    >
                        <Button
                            variant="dark"
                            className="border border-list-bg"
                            style={{ fontSize: "1.2rem" }}
                            onClick={() => refreshFilteredTables()}
                        >
                            <i className="ri-refresh-line" />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        transition={false}
                        placement="top"  
                        overlay={<Tooltip id="tables-add-tooltip">Add</Tooltip>}
                    >
                    <Button
                        variant="dark"
                        className="border border-list-bg"
                        style={{ fontSize: "1.2rem" }}
                        href={`/tables/new`}
                    >
                        <i className="ri-add-line" />
                    </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        transition={false}
                        placement="top"  
                        overlay={<Tooltip id="tables-filter-tooltip">Filter</Tooltip>}
                    >
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle
                                variant="dark"
                                className="border border-list-bg"
                                style={{ fontSize: "1.2rem" }}
                            >
                                <i className="ri-filter-3-line" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="right">
                                <Dropdown.Header>Filter</Dropdown.Header>
                                <Dropdown.Item onSelect={() => setFilter("all")}>
                                    All
                                </Dropdown.Item>
                                <Dropdown.Item onSelect={() => setFilter("free")}>
                                    Free
                                </Dropdown.Item>
                                <Dropdown.Item onSelect={() => setFilter("occupied")}>
                                    Occupied
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </OverlayTrigger>
                </ButtonGroup>
            </Col>
        </Row>


    );
}

export default TablesListOptions;