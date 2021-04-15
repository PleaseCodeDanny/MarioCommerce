import React, { useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen({ history }) {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = Number(
    cart.cartItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2)
  );

  cart.shippingPrice = Number((cart.itemsPrice > 100 ? 0 : 10).toFixed(2));
  cart.taxPrice = Number((0.082 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = Number(
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    dispatch(createOrder);
  }, [dispatch, order, success, history]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                {"   "}
                {cart.shippingAddress.postalCode}
                {"   "}
                {cart.shippingAddress.country}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>

              {cart.cartItems.length === 0 ? (
                <Message variant={"info"}>Your cart is empty</Message>
              ) : (
                <ListGroup variant={"flush"}>
                  {cart.cartItems.map((cartItem, index) => (
                    <ListGroupItem key={`${index}-placeorder`}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={cartItem.image}
                            alt={cartItem.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col className="pt-3">
                          <Link to={`/product/${cartItem.product}`}>
                            {cartItem.name}
                          </Link>
                        </Col>
                        <Col md={4} className="pt-3">
                          {cartItem.qty} X {cartItem.price} = $
                          {(cartItem.qty * cartItem.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items: </Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping Price: </Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax Price: </Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total Price: </Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                {error && <Message variant={"danger"}>{error}</Message>}
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  type={"button"}
                  className={"btn-block"}
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
