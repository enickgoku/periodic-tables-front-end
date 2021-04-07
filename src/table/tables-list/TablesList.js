// React + Hooks
import React, { useState, useEffect } from "react";

// React Components
import TablesListOptions from "./TablesListOptions";
import TableCard from "../table-card/TableCard";
import ErrorAlert from "../../layout/ErrorAlert";

// React Bootstrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// API
import { listTables } from "../../utils/api";

/**
 * Defines the list of fetched tables.
 * @returns {JSX.Element}
 */
function TablesList(props) {

  // let {
  //   currentDate,
  //   dateSetting,
  //   setDateSetting,
  //   currentTime,
  //   changeDate
  // } = props;

  const [tables, setTables] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadFilteredTables, [filter]);

  /**
   * Fetches all tables by `reservation_id = null || !null`.
   */
  function loadFilteredTables() {
    const abortController = new AbortController();
    setIsLoading(true);
    setTables([]);
    setTablesError(null);
    listTables({ status: filter }, abortController.signal)
      .then((tables) => {
        setTables(tables);
        setIsLoading(false);
      })
      .catch(setTablesError);
    return () => abortController.abort();
  }

  /**
   * Defines all fetched table elements.
   */
  const tableContent = tables.map((table, index) => (
    <Col key={index} sm={6} lg={4} xl={3}>
      <TableCard table={table} />
    </Col>
  ));

  const statusDisplay = filter.split("").map((letter, index) => !index ? letter.toUpperCase() : letter);

  return (
    <Col xs={{ order: 2 }} md={{ order: 1 }} className="mb-5">
      <Row className="d-flex justify-content-between align-items-center p-3">
        <h3>{statusDisplay} Tables</h3>
        <TablesListOptions
          setFilter={setFilter}
          refreshFilteredTables={loadFilteredTables}
        />
      </Row>
      <Row className="d-flex flex-wrap justify-content-center p-0 mt-2">
        {tablesError ? <ErrorAlert error={tablesError} /> : null}
        {isLoading ? <h3 className="p-3">Loading...</h3> : null}
        {!tables.length && !isLoading
          ? <h3 className="p-3">No Tables</h3>
          : tableContent}
      </Row>
    </Col>
  );
}

export default TablesList;