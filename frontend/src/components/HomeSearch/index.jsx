import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Search form for the home page
function HomeSearch(props) {
    const { update } = props
    const [category, setCategory] = useState("random");
    const [numExcuses, setNumExcuses] = useState(10);

    const submitForm = (e) => {
        e.preventDefault();

        // Create the query to use in the API URL (specify category and number of excuses)  
        var query = ""
        if (category !== "random") {
            query += `${category}/${numExcuses}`
        } else {
            query += `${numExcuses}`
        }
        update(query)
    }

    return (
        <Form onSubmit={submitForm} className="search-form">
            {/* Category selection dropdown */}
            <Form.Group className="mb-3" controlId="categoryDropdown">
                <Form.Label>Category</Form.Label>
                <Form.Select onChange={e => setCategory(e.target.value)}>
                    <option value="random">Random</option>
                    <option value="family">Family</option>
                    <option value="office">Office</option>
                    <option value="children">Children</option>
                    <option value="college">College</option>
                    <option value="party">Party</option>
                    <option value="funny">Funny</option>
                    <option value="unbelievable">Unbelievable</option>
                    <option value="developers">Developers</option>
                    <option value="gaming">Gaming</option>
                </Form.Select>
            </Form.Group>

            {/* Number of excuses input */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Number of Excuses</Form.Label>
                <Form.Control type="number" min="1" max="10" value={numExcuses} onChange={e => setNumExcuses(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Search
            </Button>
        </Form>
    );
}

export default HomeSearch;