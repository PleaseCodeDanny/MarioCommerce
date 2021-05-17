import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserList } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { USER_DELETE_RESET } from "../constants/userConstants";

function UserListScreen({ history }) {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const userLogin = useSelector((state) => state.userLogin);
  const userDelete = useSelector((state) => state.userDelete);
  const { userInfo } = userLogin;
  const {
    success: successDelete,
    successMessage: successMessageDelete,
  } = userDelete;
  const { loading, error, users } = userList;
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(getUserList());
    }
    if (successMessageDelete) {
      const messageTimer = setTimeout(() => {
        dispatch({ type: USER_DELETE_RESET });
      }, 5000);
      return () => clearTimeout(messageTimer);
    }
  }, [dispatch, history, successDelete, userInfo, successMessageDelete]);

  const deleteHandler = (user_id) => {
    if (
      window.confirm(
        `Are you sure you want to delete this user with id: ${user_id}`
      )
    )
      dispatch(deleteUser(user_id));
  };
  return (
    <Fragment>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Fragment>
          {successMessageDelete && (
            <Message variant={"success"}>{successMessageDelete}</Message>
          )}
          <Table striped bordered hover responsive className={"table-sm"}>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className={"fas fa-check"}
                        style={{ color: "green" }}
                      />
                    ) : (
                      <i className={"fas fa-ban"} style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer
                      to={`/admin/user/${user._id}/edit`}
                      style={{ marginRight: "0.5rem" }}
                    >
                      <Button className={"btn-sm"}>
                        <i className={"fas fa-edit"} />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant={"danger"}
                      className={"btn-sm"}
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className={"fas fa-trash"} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Fragment>
      )}
    </Fragment>
  );
}
export default UserListScreen;
