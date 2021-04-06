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

// Utils
import { createTable } from "../../utils/api";

/**
 * Defines the form for creating a new table.
 * @param {callback} setHeading
 *  a function used to lift state to `heading` in the `Routes` component.
 * @returns {JSX.Element}
 */
function CreateTableForm() {
    const history = useHistory();

    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState(null);

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
    * Handles the form's `onSubmit` event and sends data to the API for posting.
    */
    function handleTableFormSubmit(event) {
        event.preventDefault();
        const data = {
            table_name: formData.table_name,
            capacity: parseInt(formData.capacity),
        }
        createTable({ data })
            .then(() => history.push("/"))
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
            <Form onSubmit={handleTableFormSubmit}>
                <Form.Group controlId="first_name">
                    <Form.Label>Table Name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="table_name"
                        placeholder="ex. Patio #3"
                        size="lg"
                        required={true}
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

export default CreateTableForm;