import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="name">
          <FormLabel>Address</FormLabel>
          <FormControl
            required
            type="text"
            placeholder="Enter Address"
            value={address || ""}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>
      </Form>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="city">
          <FormLabel>City</FormLabel>
          <FormControl
            required
            type="text"
            placeholder="Enter City"
            value={city || ""}
            onChange={(e) => setCity(e.target.value)}
          />
        </FormGroup>
      </Form>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="postalCode">
          <FormLabel>Postal Code</FormLabel>
          <FormControl
            required
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode || ""}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </FormGroup>
      </Form>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="country">
          <FormLabel>Country</FormLabel>
          <FormControl
            required
            type="text"
            placeholder="Enter Country"
            value={country || ""}
            onChange={(e) => setCountry(e.target.value)}
          />
        </FormGroup>
        <Button type={"submit"} variant={"primary"}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}
export default ShippingScreen;
