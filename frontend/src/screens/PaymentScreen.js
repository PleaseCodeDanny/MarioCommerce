import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  Button,
  Col,
  Form,
  FormCheck,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  if (!shippingAddress.address) {
    history.push("/shipping");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel as={"legend"}>Select Method</FormLabel>
          <Col>
            <FormCheck
              type={"radio"}
              label={"PayPal or Credit Card"}
              id={"paypal"}
              name={"paymentMethod"}
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </FormGroup>
        <Button type={"submit"} variant={"primary"}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}
export default PaymentScreen;
