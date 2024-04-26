import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{ width: "100px", height: "100px", margin: "auto", display: "block" }}
      className="my-5"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loader;
