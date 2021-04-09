// React + Hooks
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

// React Components
import ErrorAlert from "../../layout/ErrorAlert";

// React Bootstrap Components
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

// Utils
import { getReservation, listTables, occupyTable } from "../../utils/api";

/**
* The form component used to assign an existing `reservation` to an existing `table`
*/
function SeatReservationForm(props) {

    let {
        // currentDate,
        // dateSetting,
        setDateSetting,
        // currentTime,
        // changeDate
    } = props;

    const history = useHistory();
    const { reservationId } = useParams();

    const [formData, setFormData] = useState(null);
    const [freeTables, setFreeTables] = useState([]);
    const [reservation, setReservation] = useState({});
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        function loadReservation() {
            const abortController = new AbortController();
            getReservation(reservationId, abortController.signal)
                .then((response) => {
                    setReservation(response);
                    setDateSetting(response.reservation_date);
                })
                .catch(setFormError);
            return () => abortController.abort();
        }
        function loadFreeTables() {
            const abortController = new AbortController();
            listTables(abortController.signal)
                .then(setFreeTables)
                .catch(setFormError);
            return () => abortController.abort();
        }
        loadReservation();
        loadFreeTables();
    }, [reservationId, setDateSetting]);

    /**
    * Updates the state of the `formData` object on all controlled inputs.
    * @param currentTarget
    * The target input field value (`onChange`) is assigned to the corresponding key in the `formData` object.
    */
    function handleFormChange({ currentTarget }) {
        setFormError(null);
        setFormData({
            [currentTarget.name]: currentTarget.value
        });
    }

    /**
    * Handles the form's `onSubmit` event and sends data to the API for posting.
    */
    function handleSeatReservation(event) {
        event.preventDefault();
        occupyTable(reservationId, formData.table_id)
            .then(() => {
                setDateSetting(reservation.reservation_date);
                history.push("/");
            })
            .catch(setFormError);
    }

    /**
    * Handles the cancel button in the create reservation form by going to the previous page visited.
    */
    function handleCancelClick() {
        history.goBack();
    }

    const tableOptions = freeTables.map((table, index) =>
        <option key={index} value={table.table_id}>
            {table.table_name} - {table.capacity}
        </option>
    );

    return (
        <Col className="col col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <ErrorAlert error={formError} />
            <Form onSubmit={handleSeatReservation}>
                <Form.Group controlId="table_id">
                    <Form.Label>Select Table:</Form.Label>
                    <Form.Control
                        as="select"
                        name="table_id"
                        size="lg"
                        placeholder="Select Table"
                        required={true}
                        onChange={handleFormChange}
                    >
                        <option value="" defaultValue>---</option>
                        {tableOptions}
                    </Form.Control>
                </Form.Group>
                <ButtonGroup className="mt-4 w-100">
                    <Button
                        variant="dark"
                        className="col-3"
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        type="submit"
                    >
                        Submit
                    </Button>
                </ButtonGroup>
            </Form>
        </Col>
    );
}

export default SeatReservationForm;