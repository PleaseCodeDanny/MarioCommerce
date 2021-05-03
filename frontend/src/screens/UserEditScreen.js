import React, { Fragment, useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import {
  Button,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_SUCCESS } from "../constants/userConstants";

function UserEditScreen({ match, history }) {
  const userId = match.params.id;
  const [email, setEmail] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdateUser,
    error: errorUpdateUser,
    success: successUpdateUser,
  } = userUpdate;

  //If we already have userInfo, someone has logged in already. Redirect to home page.
  useEffect(() => {
    if (successUpdateUser) {
      dispatch({ type: USER_UPDATE_SUCCESS });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== Number(userId)) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [history, user, userId, dispatch, successUpdateUser]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
  };

  return (
    <Fragment>
      <Link to={"/admin/userlist"}>Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdateUser && <Loader />}
        {errorUpdateUser && (
          <Message variant={"danger"}>{errorUpdateUser}</Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name">
              <FormLabel>Name</FormLabel>
              <FormControl
                type="name"
                placeholder="Enter Name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="email">
              <FormLabel>Email Address</FormLabel>
              <FormControl
                type="email"
                placeholder="Enter Email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="isadmin">
              <FormCheck
                type={"checkbox"}
                label={"Is Admin"}
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </FormGroup>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
}
export default UserEditScreen;
