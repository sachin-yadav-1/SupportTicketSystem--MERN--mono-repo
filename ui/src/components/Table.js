import React from "react";
import Table from "react-bootstrap/Table";

const AppTable = ({ config, data, keyFn }) => {
  const renderedHeaders = config.map((c) => (
    <th key={c.label} className="fs-4 fw-bold border p-2">
      {c.label}
    </th>
  ));

  const renderedRows = data.map((entity) => {
    const renderedCells = config.map((column) => {
      return (
        <td className="fs-5" key={column.label}>
          {column.render(entity)}
        </td>
      );
    });

    return <tr key={keyFn(entity)}>{renderedCells}</tr>;
  });
  return (
    <Table bordered hover>
      <thead className="bg-dark-subtle">
        <tr>{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </Table>
  );
};

export default AppTable;
