import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Col, Row, Table } from "react-bootstrap";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";
import Paginate from "../components/Paginate";

function ProductListScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //TODO USE CUSTOM HOOKS ASSHOLE (me) !!!!!
  let keyword = history.location.search;
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword));
    }

    let timerDelete;
    if (successDelete) {
      timerDelete = setTimeout(() => {
        dispatch({ type: PRODUCT_DELETE_RESET });
      }, 5000);
    }
    return () => {
      clearTimeout(timerDelete);
    };
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    createdProduct,
    successCreate,
    keyword,
  ]);

  const deleteHandler = (product_id) => {
    if (
      window.confirm(
        `Are you sure you want to delete this product with id: ${product_id}`
      )
    ) {
      dispatch(deleteProduct(product_id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };

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
      {errorDelete && <Message variant={"danger"}>{errorDelete}</Message>}
      {successDelete && <Message variant={"success"}>{successDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant={"danger"}>{errorCreate}</Message>}
      {successCreate && <Message variant={"success"}>{successCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Fragment>
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
          <Paginate
            pages={pages}
            page={page}
            isAdmin={true}
            keyword={keyword}
          />
        </Fragment>
      )}
    </Fragment>
  );
}
export default ProductListScreen;
