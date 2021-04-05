import React from 'react'
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

let Header = _ => {
    return(
        <header>
            <Navbar bg="dark" variant= "primary" expand="lg">
                <LinkContainer to='/'>
                    <Navbar.Brand>MarioShop</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link ><i className='fas fa-shopping-cart'></i>MarioKart</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/login'>
                            <Nav.Link ><i className='fas fa-user'></i>Login</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
};

export default Header;