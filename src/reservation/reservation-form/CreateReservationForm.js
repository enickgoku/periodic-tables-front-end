// React + Hooks
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// React Components
import ErrorAlert from "../../layout/ErrorAlert";

// React Bootstrap Components
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

// API + Utils
import { createReservation } from "../../utils/api";
import { DateTime } from "luxon";

/**
 * Defines the form used to create a new reservation.
 * @param {string} date
 *  the value of `dateSetting` from the `Layout` component.
 * @returns {JSX.Element}
 */
function CreateReservationForm(props) {

    let {
      currentDate,
    //   dateSetting,
      setDateSetting,
      currentTime,
    //   changeDate
    } = props;

    const history = useHistory();

    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState(null);

    /**
    * Updates the state of the `formData` object on all controlled inputs.
    * @param currentTarget
    * the target input field value (`onChange`) is assigned to the corresponding key in the `formData` object.
    */
    function handleFormChange({ currentTarget }) {
        setFormError(null);
        setFormData({
            ...formData,
            [currentTarget.name]: currentTarget.value
        });
    }

    /**
    * Handles the form's `onSubmit` event and sends data to the API for handling.
    */
    function handleReservationCreate(event) {
        event.preventDefault();
        const data = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            mobile_number: formData.mobile_number,
            reservation_date: formData.reservation_date,
            reservation_time: formData.reservation_time,
            people: parseInt(formData.people),
        }
        createReservation({ data })
            .then(() => {
                setDateSetting(DateTime.fromISO(formData.reservation_date).toISODate());
                history.push("/");
            })
            .catch(setFormError);
    }

    /**
    * Handles the form's cancel button `onClick` event by going to the previous page visited.
    */
    function handleCancelClick() {
        history.goBack();
    }

    return (
        <Col className="col col-sm-8 col-md-6 col-lg-5 col-xl-4 mb-5">
            <ErrorAlert error={formError} />
            <Form onSubmit={handleReservationCreate}>
                <Form.Group controlId="first_name">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        size="lg"
                        required={true}
                        onChange={handleFormChange}
                    />
                </Form.Group>
                <Form.Group controlId="last_name">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        size="lg"
                        required={true}
                        onChange={handleFormChange}
                    />
                </Form.Group>
                <Form.Group controlId="mobile_number">
                    <Form.Label>Mobile Number:</Form.Label>
                    <Form.Control
                        type="tel"
                        name="mobile_number"
                        placeholder="Mobile Number"
                        size="lg"
                        required={true}
                        onChange={handleFormChange}
                    />
                </Form.Group>
                <Form.Group controlId="reservation_date">
                    <Form.Label>Reservation Date:</Form.Label>
                    <Form.Control
                        type="date"
                        name="reservation_date"
                        size="lg"
                        min={currentDate}
                        required={true}
                        onChange={handleFormChange}
                    />
                </Form.Group>
                <Form.Group controlId="reservation_time">
                    <Form.Label>Reservation Time:</Form.Label>
                    <Form.Control
                        type="time"
                        name="reservation_time"
                        size="lg"
                        min={formData.reservation_date === currentDate
                            ? currentTime
                            : null}
                        required={true}
                        onChange={handleFormChange}
                    />
                </Form.Group>
                <Form.Group controlId="people">
                    <Form.Label>Number of People:</Form.Label>
                    <Form.Control
                        type="number"
                        name="people"
                        size="lg"
                        required={true}
                        onChange={handleFormChange}
                    />
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

export default CreateReservationForm;