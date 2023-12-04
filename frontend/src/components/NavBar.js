import React from "react";
import {PersonFill, SearchHeartFill, HouseHeartFill} from "react-bootstrap-icons";

import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

function NavBar() {
    return (

        // NavBar
        // <div className="container-fluid m-0 p-0">
        //     <nav className="navbar navbar-light py-3 px-5">
        //         <a className="navbar-brand" href="#"><HouseHeartFill className="mx-1 mb-1"/>MyCharityApp</a>
        //         <div className="navbar-nav flex-row">
        //             <a className="nav-item nav-link active" href="#"><SearchHeartFill className="mx-1 mb-1"/>Explore</a>
        //             <a className="nav-item nav-link ms-3" href="#"><PersonFill className="mx-1 mb-1"/>Account</a>
        //             <a className="btn btn-outline-primary px-4 ms-4" href="#">Logout</a>
        //         </div>
        //     </nav>
        // </div>

        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand><HouseHeartFill className="mx-1 mb-1"/>MyCharityApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto align-items-lg-center">
                        <LinkContainer to="/explore">
                            <Nav.Link><SearchHeartFill className="mx-1 mb-1"/>Explore</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/account">
                            <Nav.Link className="me-2"><PersonFill className="mx-1 mb-1"/>Account</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/logout">
                            <Nav.Link><div className="btn btn-outline-primary px-4">Logout</div></Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;