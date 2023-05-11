import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CreateExcuse() {
    const [category, setCategory] = useState("family")
    const [user, setUser] = useState("")
    const [excuse, setExcuse] = useState("")

    const submitExcuse = (e) => {
        e.preventDefault();

        // Encode the data 
        var details = {
            'category': category,
            'user': user,
            'excuse': excuse
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        // Send POST request
        fetch('http://127.0.0.1:8000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
        
        // Reset fields to the default values
        setUser("")
        setExcuse("")
        setCategory("family")
    };

    return (
        <Form onSubmit={submitExcuse} className="search-form">
            {/* Username input */}
            <Form.Group className="mb-3" controlId="usernameInput">
                <Form.Label>User</Form.Label>
                <Form.Control type="text" value={user} onChange={e => setUser(e.target.value)} placeholder="Enter your username" />
            </Form.Group>

            {/* Category selection dropdown */}
            <Form.Group className="mb-3" controlId="categoryDropdown">
                <Form.Label>Category</Form.Label>
                <Form.Select onChange={e => setCategory(e.target.value)} value={category}>
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

            {/* Input excuse */}
            <Form.Group className="mb-3" controlId="excuseInput">
                <Form.Label>Excuse</Form.Label>
                <Form.Control as="textarea" value={excuse} onChange={e => setExcuse(e.target.value)} placeholder="Enter your excuse for the selected category" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default CreateExcuse;