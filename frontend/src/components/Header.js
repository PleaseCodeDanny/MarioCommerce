import React from "react";
import { Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

let Header = (_) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="dark" variant="primary" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>MarioShop</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/cart">
              <NavLink>
                <i className="fas fa-shopping-cart" />
                MarioKart
              </NavLink>
            </LinkContainer>

            {userInfo && Object.keys(userInfo).length >= 1 ? (
              <NavDropdown id={"username"} title={userInfo.name}>
                <LinkContainer to={"/profile"}>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <NavLink>
                  <i className="fas fa-user" />
                  Login
                </NavLink>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
