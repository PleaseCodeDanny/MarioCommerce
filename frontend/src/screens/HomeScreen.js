import React, { useEffect, Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Product from "../components/Product";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

function HomeScreen({ location }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;
  const keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </Fragment>
      )}
    </div>
  );
}

export default HomeScreen;
