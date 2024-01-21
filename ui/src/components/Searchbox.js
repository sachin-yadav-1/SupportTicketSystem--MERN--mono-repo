import React from "react";
import Form from "react-bootstrap/Form";

const Searchbox = () => {
  return (
    <Form>
      <Form.Control
        className="p-3 fs-4"
        type="search"
        placeholder="Search here..."
      />
    </Form>
  );
};

export default Searchbox;
