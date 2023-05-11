import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import HomeSearch from '../../components/HomeSearch'

function Home() {
    const [excuses, setExcuses] = useState([]);
    const [query, setQuery] = useState("10");

    // Set query parameters
    const updateQuery = (query) => {
        setQuery(query)
    };

    // Get and set excuses every time the query is updated
    useEffect(() => {
        var url = `https://excuser-three.vercel.app/v1/excuse/${query}`
        fetch(url, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                setExcuses(data)
            })
    }, [query]);

    return (
        <>
            <HomeSearch update={updateQuery} />
            {/* Display each excuse in a card */}
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
                                {current_excuse.excuse}
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
        </>
    )
}

export default Home;
