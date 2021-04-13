import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

function RegisterScreen({ location, history }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [message, setMessage] = useState();

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  //If we already have userInfo, someone has logged in already. Redirect to home page.
  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length >= 1) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      setMessage("");
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
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
            required
            type="password"
            placeholder="Enter Password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            required
            type="password"
            placeholder="Enter Password"
            value={confirmPassword || ""}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className={"py-3"}>
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}
export default RegisterScreen;
