import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

// Navbar for the application 
function Layout() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand id="home" as={Link} to="/">Excuser</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/create-excuse">Create Excuse</Nav.Link>
                    <Nav.Link as={Link} to="/view-excuses">View Submitted Excuses</Nav.Link>
                </Nav>
            </Navbar>
            <Outlet />
        </>
    )
}

export default Layout;
