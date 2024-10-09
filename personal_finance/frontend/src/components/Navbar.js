import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const MyNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Navbar.Brand as={Link} to="/" className="font-weight-bold">
                Cash Clarity App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/" className="nav-link">
                        Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/entries" className="nav-link">
                        Entries
                    </Nav.Link>
                    <Nav.Link as={Link} to="/create" className="nav-link">
                        Create Entry
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MyNavbar;
