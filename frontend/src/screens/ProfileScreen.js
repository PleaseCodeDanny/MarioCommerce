import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";

function ProfileScreen({ history }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [message, setMessage] = useState();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  //If we already have userInfo, someone has logged in already. Redirect to home page.
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, user, dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if ((password || confirmPassword) && password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      dispatch(
        updateUserProfile({
          id: user.id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant={"danger"}>{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="name">
            <FormLabel>Name</FormLabel>
            <FormControl
              required
              type="name"
              placeholder="Enter Name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="email">
            <FormLabel>Email Address</FormLabel>
            <FormControl
              required
              type="email"
              placeholder="Enter Email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter Password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter Password"
              value={confirmPassword || ""}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table className={"table-striped-responsive-sm"}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={`${order._id}-profile`}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className={"fas fa-times"} style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className={"btn-sm"}>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
