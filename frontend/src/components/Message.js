import { Alert } from "react-bootstrap";

//This destructured argument comes as a props object. This happens to contain a field "children" containing all the children elements to this component
function Message({ variant, children }) {
  return <Alert variant={variant}>{children}</Alert>;
}

export default Message;
