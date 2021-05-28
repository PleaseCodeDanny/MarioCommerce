import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SearchBox({ isAdmin }) {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const adminPrefix =
      isAdmin && history.location.pathname.includes("admin")
        ? `/admin/productlist`
        : "";
    if (keyword) {
      history.push(`${adminPrefix}/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.location.pathname);
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <FormControl
        type={"text"}
        name={"q"}
        onChange={(e) => setKeyword(e.target.value)}
        className={"mr-sm-2 ml-sm-3"}
      />
      <Button type={"submit"} variant={"outline-success"} className={"p-2"}>
        Submit
      </Button>
    </Form>
  );
}

export default SearchBox;
