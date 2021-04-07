// React + Hooks
import React from "react";

// React Bootstrap Components
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

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
        <ButtonGroup>
            <Button
                variant="dark"
                className="border border-list-bg"
                style={{ fontSize: "1.2rem" }}
                onClick={() => refreshFilteredTables()}
            >
                <i className="ri-refresh-line" />
            </Button>
            <Button
                variant="dark"
                className="border border-list-bg"
                style={{ fontSize: "1.2rem" }}
                href={`/tables/new`}
            >
                <i className="ri-add-line" />
            </Button>
            <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle
                    variant="dark"
                    className="border border-list-bg"
                    style={{ fontSize: "1.2rem" }}
                >
                    <i className="ri-filter-3-line" />
                </Dropdown.Toggle>
                <Dropdown.Menu align="right">
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
        </ButtonGroup>
    );
}

export default TablesListOptions;