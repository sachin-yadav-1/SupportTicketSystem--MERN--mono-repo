import React from "react";
import Pagination from "react-bootstrap/Pagination";

const AppPagination = () => {
  const items = [];
  for (let i = 1; i <= 5; i++) {
    items.push(
      <Pagination.Item key={i} active={i === 1}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Pagination size="lg">
      <Pagination.First />
      <Pagination.Prev />
      {items}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
};

export default AppPagination;
