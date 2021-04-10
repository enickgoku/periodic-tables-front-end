// React + Hooks
import React from "react";

// React Bootstrap Components
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

/**
 * Defines the `Button` options for the `ReservationsListHeader` component.
 * @param changeDate
 *  a function used for lifting state to `dateSetting` in the `Layout` component.
 * @returns {JSX.Element}
 */
function ReservationsListOptions(props) {

    let {
      currentDate,
    //   dateSetting,
      setDateSetting,
    //   currentTime,
      changeDate,
      reloadReservationList,
      setReservationsFilter
    } = props;

    return (
        <>
            <ButtonGroup className="w-100 mr-3">
                <OverlayTrigger
                    transition={false}
                    placement="top"  
                    overlay={<Tooltip id="reservations-previous-tooltip">Previous</Tooltip>}
                >
                    <Button
                        variant="dark"
                        className="border border-list-bg"
                        style={{ fontSize: "1.2rem" }}
                        onClick={() => changeDate(-1)}
                    >
                        <i className="ri-arrow-left-s-line" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    transition={false}
                    placement="top"  
                    overlay={<Tooltip id="reservations-current-tooltip">Today</Tooltip>}
                >
                    <Button
                        variant="dark"
                        className="border border-list-bg"
                        style={{ fontSize: "1.2rem" }}
                        onClick={() => setDateSetting(currentDate)}
                    >
                        <i className="ri-home-line" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    transition={false}
                    placement="top"  
                    overlay={<Tooltip id="reservations-next-tooltip">Next</Tooltip>}
                >
                    <Button
                        variant="dark"
                        className="border border-list-bg"
                        style={{ fontSize: "1.2rem" }}
                        onClick={() => changeDate(1)}
                    >
                        <i className="ri-arrow-right-s-line" />
                    </Button>
                </OverlayTrigger>
            </ButtonGroup>
            <ButtonGroup>
                <OverlayTrigger
                    transition={false}
                    placement="top"  
                    overlay={<Tooltip id="reservations-refresh-tooltip">Refresh</Tooltip>}
                >
                    <Button
                        variant="dark"
                        className="border border-list-bg"
                        style={{ fontSize: "1.2rem" }}
                        onClick={() => reloadReservationList()}
                    >
                        <i className="ri-refresh-line" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    transition={false}
                    placement="top"  
                    overlay={<Tooltip id="reservations-add-tooltip">Add</Tooltip>}
                >
                    <Button
                        variant="dark"
                        className="border border-list-bg"
                        style={{ fontSize: "1.2rem" }}
                        href={`/reservations/new`}
                    >
                        <i className="ri-add-line" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    transition={false}
                    placement="top"  
                    overlay={<Tooltip id="reservations-filter-tooltip">Filter</Tooltip>}
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
                            <Dropdown.Item onSelect={() => setReservationsFilter("all")}>
                                All
                            </Dropdown.Item>
                            <Dropdown.Item onSelect={() => setReservationsFilter("booked")}>
                                Booked
                            </Dropdown.Item>
                            <Dropdown.Item onSelect={() => setReservationsFilter("seated")}>
                                Seated
                            </Dropdown.Item>
                            <Dropdown.Header>History</Dropdown.Header>
                            <Dropdown.Item onSelect={() => setReservationsFilter("finished")}>
                                Finished
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </OverlayTrigger>
            </ButtonGroup>
        </>
    );
}

export default ReservationsListOptions;