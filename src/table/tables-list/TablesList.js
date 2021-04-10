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
    <Col key={index} xs={12} md={6} lg={4} xl={3} className="p-0">
      <TableCard
        {...props}
        table={table}
        setTablesError={setTablesError}  
      />
    </Col>
  ));

  return (
    <Col xs={{ span: 12, order: 2 }} md={{ order: 1 }}>
      <Row className="m-0 my-3 w-100">
        <Col className="d-flex justify-content-end p-0">
          <TablesListOptions
            setFilter={setFilter}
            refreshFilteredTables={loadFilteredTables}
          />
        </Col>
      </Row>
      <Row className="scrollable-list">
        <Col className="d-flex flex-wrap justify-content-center align-items-center">
          {tablesError ? <ErrorAlert error={tablesError} /> : null}
          {isLoading && !tablesError ? <img src={process.env.PUBLIC_URL + "/loading.png"} alt="Loading..." /> : null}
          {!tables.length && !isLoading
            ? <h3 className="p-3">No Tables</h3>
            : tableContent}
        </Col>
      </Row>
    </Col>
  );
}

export default TablesList;