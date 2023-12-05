import React from "react";
import {PersonFill, SearchHeartFill, HouseHeartFill} from "react-bootstrap-icons";

import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavDropdown, Container, Button} from 'react-bootstrap';

function NavBar({username, onLogout}) {
    return (

        // NavBar
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand><HouseHeartFill className="mx-1 mb-1"/>MyCharityApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto align-items-lg-center">
                        <LinkContainer to="/explore">
                            <Nav.Link><SearchHeartFill className="mx-1 mb-1"/>Explore</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/account">
                            <Nav.Link className="me-2"><PersonFill className="mx-1 mb-1"/>Account</Nav.Link>
                        </LinkContainer>
                        <Nav.Link><Button variant="outline-primary" onClick={onLogout}>Logout</Button></Nav.Link>

                        {/*<LinkContainer to="/logout">*/}
                        {/*    <Nav.Link><div className="btn btn-outline-primary px-4">Logout</div></Nav.Link>*/}
                        {/*</LinkContainer>*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;