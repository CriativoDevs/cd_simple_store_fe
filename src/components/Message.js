import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function Message({ variant, children }) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert
        variant={variant}
        onClose={() => setShow(false)}
        dismissible
        className="text-center mt-5"
        style={{ width: "100%", margin: "auto" }}
      >
        <Alert.Heading>Oh snap! You got an {children}!</Alert.Heading>
      </Alert>
    );
  }
  return (
    <Button
      onClick={() => setShow(true)}
      className="mt-3"
    >
      Show Alert
    </Button>
  );
}

export default Message;
