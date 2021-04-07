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
import Modal from "react-bootstrap/Modal";

// API + Utils
import { getReservation, editReservation, deleteReservation } from "../../utils/api";
import { DateTime } from "luxon";

/**
 * Defines the form used to edit an existing reservation.
 * @param {string} currentDate
 *  the current date formatted as `YYYY-MM-DD`.
 * @param {string} currentTime
 *  the current time in ISO format.
 * @param {callback} changeDate
 *  a function used to lift state to `dateSetting` in the `Layout` component.
 * @returns {JSX.Element}
 */
function EditReservationForm(props) {

    let {
      currentDate,
    //   dateSetting,
    //   setDateSetting,
      currentTime,
      changeDate
    } = props;

    const history = useHistory();
    const { reservationId } = useParams();

    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleClose = () => setShowConfirmation(false);
    const handleShow = () => setShowConfirmation(true);

    useEffect(() => {
        const abortController = new AbortController();
        getReservation(reservationId, abortController.signal)
            .then(setFormData)
            .catch(setFormError);
        return () => abortController.abort();
    }, [reservationId]);

    /**
     * Formats the fetched `reservation_date` to the proper `YYYY-MM-DD`.
     * Format defaults to ISO when fetched with Postgres.
     */
    const formattedReservationDate =
        DateTime.fromISO(formData.reservation_date).toISODate();

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
    * Navigates to the previous page visited.
    */
    function handleCancelClick() {
        history.goBack();
    }

    /**
    * Deletes the current reservation from the database.
    */
    function handleReservationDelete(event) {
        event.preventDefault();
        deleteReservation(reservationId)
            .then(() => history.push("/"))
            .catch(setFormError);
    }

    /**
    * Handles the form's `onSubmit` event and sends data to the API for handling.
    */
    function handleReservationEdit(event) {
        event.preventDefault();
        const data = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            mobile_number: formData.mobile_number,
            reservation_date: formData.reservation_date,
            reservation_time: formData.reservation_time,
            people: parseInt(formData.people),
        }
        editReservation({ data }, reservationId)
            .then(() => {
                changeDate(formData.reservation_date);
                history.push("/");
            })
            .catch(setFormError);
    }

    return (
        <>
            <Col className="col col-sm-8 col-md-6 col-lg-5 col-xl-4 mb-5">
                <ErrorAlert error={formError} />
                <Form onSubmit={handleReservationEdit}>
                    <Form.Group controlId="first_name">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            size="lg"
                            required={true}
                            defaultValue={formData.first_name}
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
                            defaultValue={formData.last_name}
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
                            defaultValue={formData.mobile_number}
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
                            defaultValue={formattedReservationDate}
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
                            defaultValue={formData.reservation_time}
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
                            defaultValue={formData.people}
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
                            variant="danger"
                            className="col-3"
                            onClick={handleShow}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="success"
                            type="submit"
                        >
                            Save
                        </Button>
                    </ButtonGroup>
                </Form>
            </Col>
            <Modal
                show={showConfirmation}
                onHide={handleClose}
            >
                <Modal.Header>
                <Modal.Title>Delete Reservation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                You are about to delete the reservation. This cannot be undone. Continue?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="dark" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleReservationDelete}>
                    Continue
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditReservationForm;