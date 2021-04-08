import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import { useDispatch } from "react-redux";

function HomeScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, []);
  const products = [];
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeScreen;
