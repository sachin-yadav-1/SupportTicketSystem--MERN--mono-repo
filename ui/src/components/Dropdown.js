import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const AppDropdown = ({ label, options }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="transparent"
        id="dropdown-basic-button"
        className="py-1 px-2 fs-4 border"
      >
        {label}
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-1 fs-5">
        {options.map((o) => (
          <Dropdown.Item key={o._id} href="#/action-1">
            {o.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AppDropdown;
