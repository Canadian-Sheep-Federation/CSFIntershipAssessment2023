import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function ViewExcuses() {
    const [excuses, setExcuses] = useState([]);
    const [id, setID] = useState("");

    // GET and set excuses every time the query is updated
    useEffect(() => {
        var url = `http://127.0.0.1:8000/${id}`
        fetch(url, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response.data)
                setExcuses(response.data)
            })
    }, [id]);

    return (
        <>
            {/* ID input */}
            <Form className="search-form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Search Based on ID</Form.Label>
                    <Form.Control type="number" min="1" max="10" value={id} onChange={e => setID(e.target.value)} />
                </Form.Group>
            </Form>

            {/* Display card for each excuse */}
            <div className="excuses-container">
                {excuses.map((current_excuse) => {
                    return (
                        <Card key={current_excuse.id} className="excuses-card">
                            <Card.Header>
                                <strong>
                                    Category:
                                </strong>
                                {" " + current_excuse.category.charAt(0).toUpperCase() + current_excuse.category.slice(1)}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>By {current_excuse.user}</Card.Title>
                                <Card.Subtitle>{current_excuse.posted}</Card.Subtitle>
                                {current_excuse.excuse}
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
        </>
    );
}

export default ViewExcuses;