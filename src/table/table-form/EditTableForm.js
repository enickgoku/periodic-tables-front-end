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

// Utils
import { getTable, editTable, deleteTable } from "../../utils/api";

/**
 * Defines the form for editing an existing table.
 * @returns {JSX.Element}
 */
function EditTableForm() {
    const history = useHistory();
    const { tableId } = useParams();

    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleClose = () => setShowConfirmation(false);
    const handleShow = () => setShowConfirmation(true);

    useEffect(() => {
        const abortController = new AbortController();
        getTable(tableId, abortController.signal)
            .then(setFormData)
            .catch(setFormError);
        return () => abortController.abort();
    }, [tableId])

    /**
    * Updates the state of the `formData` object on all controlled inputs.
    * @param currentTarget
    *  The target input field value (`onChange`) is assigned to the corresponding key in the `formData` object.
    */
    function handleFormChange({ currentTarget }) {
        setFormError(null);
        setFormData({
            ...formData,
            [currentTarget.name]: currentTarget.value
        });
    }

    /**
    * Handles the form's cancel button `onClick` event by going to the previous page visited.
    */
    function handleCancelClick() {
        history.goBack();
    }

    /**
    * Handles the form's cancel button `onClick` event by going to the previous page visited.
    */
    function handleTableDelete() {
        deleteTable(tableId)
            .then(() => history.push("/"))
            .catch(setFormError);
    }

    /**
    * Handles the form's `onSubmit` event and sends data to the API for posting.
    */
    function handleTableEdit(event) {
        event.preventDefault();
        const data = {
            table_id: tableId,
            table_name: formData.table_name,
            capacity: formData.capacity,
            reservation_id: formData.reservation_id
        }
        editTable({ data }, tableId)
            .then(() => history.push("/"))
            .catch(setFormError);
    }

    return (
        <>
            <Col className="col col-sm-8 col-md-6 col-lg-5 col-xl-4 mb-5">
                <ErrorAlert error={formError} />
                <Form onSubmit={handleTableEdit}>
                    <Form.Group controlId="first_name">
                        <Form.Label>Table Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="table_name"
                            placeholder="ex. Patio #3"
                            size="lg"
                            required={true}
                            defaultValue={formData.table_name}
                            onChange={handleFormChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="first_name">
                        <Form.Label>Capacity:</Form.Label>
                        <Form.Control
                            type="number"
                            name="capacity"
                            size="lg"
                            required={true}
                            defaultValue={formData.capacity}
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
                            Submit
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
                <Button variant="danger" onClick={handleTableDelete}>
                    Continue
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditTableForm;