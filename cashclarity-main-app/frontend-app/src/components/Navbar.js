import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const MyNavbar = ({ isAuthenticated, username, onLogout }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Navbar.Brand as={Link} to="/" className="font-weight-bold">
                Cash Clarity App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {isAuthenticated ? (
                        <>
                            <Nav.Link as={Link} to="/" className="nav-link">
                                Dashboard
                            </Nav.Link>
                            <Nav.Link as={Link} to="/entries" className="nav-link">
                                Entry List
                            </Nav.Link>
                            <Nav.Link as={Link} to="/add" className="nav-link">
                                Add Entry
                            </Nav.Link>
                            <Nav.Link as={Link} to="/about" className="nav-link">
                                About Us
                            </Nav.Link>
                            <Nav.Link as="button" onClick={onLogout} className="nav-link" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                                Logout
                            </Nav.Link>
                            {/* <span className="text-white ml-3 align-self-center">
                                          Signed in as {username}
                            </span> */}
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login" className="nav-link">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/register" className="nav-link">
                                Register
                            </Nav.Link>
                            <Nav.Link as={Link} to="/about" className="nav-link">
                                About Us
                            </Nav.Link>

                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MyNavbar;
