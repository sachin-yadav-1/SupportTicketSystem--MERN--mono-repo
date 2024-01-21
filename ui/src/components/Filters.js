import React from "react";
import Stack from "react-bootstrap/Stack";
import AppDropdown from "./Dropdown";

const assigned = [
  { _id: 1, name: "Sachin Yadav" },
  { _id: 2, name: "Pinky Chouhdary" },
];

const severiety = [
  { _id: 1, name: "LOW" },
  { _id: 2, name: "CRITICAL" },
];

const Filters = () => {
  return (
    <>
      <Stack direction="horizontal" gap={5}>
        <Stack gap={3} direction="vertical">
          <div className="fw-bold">(FILTER) </div>
          <Stack gap={3} direction="horizontal">
            <AppDropdown label={"Assigned To"} options={assigned} />
            <AppDropdown label={"Severierty"} options={severiety} />
            <AppDropdown label={"Status"} options={severiety} />
            <AppDropdown label={"Type"} options={severiety} />
          </Stack>
        </Stack>
        <div className="vr"></div>
        <Stack gap={3} direction="vertical" className="ms-auto">
          <div className="fw-bold">(SORT) </div>
          <Stack gap={3} direction="horizontal">
            <AppDropdown label={"Resolved On"} options={assigned} />
            <AppDropdown label={"Date Created"} options={severiety} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Filters;
