import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Col, Row, Table } from "react-bootstrap";
import { deleteProduct, listProducts } from "../actions/productActions";
import { PRODUCT_DELETE_RESET } from "../constants/productConstants";

function ProductListScreen({ history, match }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(listProducts());
    }
    let timer;
    if (successDelete) {
      timer = setTimeout(() => {
        dispatch({ type: PRODUCT_DELETE_RESET });
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (product_id) => {
    if (
      window.confirm(
        `Are you sure you want to delete this product with id: ${product_id}`
      )
    ) {
      dispatch(deleteProduct(product_id));
    }
  };
  const createProductHandler = (product) => {};
  return (
    <Fragment>
      <Row className={"align-items-center"}>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className={"text-right"}>
          <Button className={"my-3"} onClick={createProductHandler}>
            Create Product
            <i className={"fa fa-plus"} />
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant={"danger"}>{error}</Message>}
      {successDelete && <Message variant={"success"}>{successDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className={"table-sm"}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer
                    to={`/admin/product/${product._id}/edit`}
                    style={{ marginRight: "0.5rem" }}
                  >
                    <Button className={"btn-sm"}>
                      <i className={"fas fa-edit"} />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant={"danger"}
                    className={"btn-sm"}
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className={"fas fa-trash"} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
}
export default ProductListScreen;
