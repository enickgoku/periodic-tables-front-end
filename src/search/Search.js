// React + Hooks
import React from "react";
import { useHistory } from "react-router-dom";

// React Bootstrap Components
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

function Search() {
    const history = useHistory();

    const handleSearchFormCancel = () => {
        history.push("/");
    }

    return (
        <Col sm={8} md={6} lg={5} xl={5} className="mb-5">
            <Form>
                <Form.Group controlId="search">
                    <Form.Control
                        type="text"
                        size="lg"
                        placeholder="Enter Mobile Number"
                    />
                </Form.Group>
                <ButtonGroup className="mt-4 w-100">
                    <Button
                        variant="dark"
                        size="lg"
                        className="col-3"
                        onClick={() => handleSearchFormCancel()}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="success"
                        size="lg"
                        type="submit"
                    >
                        Search
                    </Button>
                </ButtonGroup>
            </Form>
        </Col>
    )
}

export default Search;