import { Fragment } from "react";
import React from "react";
import { Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

let NavbarComponents = ({ userInfo, logoutHandler }) => {
  return (
    <Fragment>
      <LinkContainer to="/cart" className={"px-2"}>
        <NavLink>
          <i className="fas fa-shopping-cart" />
        </NavLink>
      </LinkContainer>

      {userInfo && Object.keys(userInfo).length >= 1 ? (
        <NavDropdown id={"username"} title={userInfo.name} className={"px-2"}>
          <LinkContainer to={"/profile"}>
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
        </NavDropdown>
      ) : (
        <LinkContainer to="/login" className={"px-2"}>
          <NavLink>
            <i className="fas fa-user" />
            Login
          </NavLink>
        </LinkContainer>
      )}

      {userInfo && userInfo.isAdmin && (
        <NavDropdown id={"Admin"} title={"Admin"}>
          <LinkContainer to={"/admin/userlist"}>
            <NavDropdown.Item>Users</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to={"/admin/productlist"}>
            <NavDropdown.Item>Products</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to={"/admin/orderlist"}>
            <NavDropdown.Item>Orders</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      )}
    </Fragment>
  );
};

let Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="dark" variant="primary" expand="lg">
        <div className={"home-search-container"}>
          <LinkContainer to="/">
            <Navbar.Brand>MarioShop</Navbar.Brand>
          </LinkContainer>
          <SearchBox isAdmin={userInfo ? userInfo.isAdmin : false} />
        </div>
        <Nav className="user-menu-container">
          <NavbarComponents userInfo={userInfo} logoutHandler={logoutHandler} />
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
