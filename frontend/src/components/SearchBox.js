import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}`);
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
