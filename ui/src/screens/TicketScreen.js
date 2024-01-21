import React from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { Filters, Table } from "../components";

const tableData = [
  {
    _id: 1,
    topic: "Topic 1",
    description: "Description 1",
    status: "NEW",
    type: "PAYMENTS_AND_BILLING",
    severiety: "CRITICAL",
    assignedTo: null,
    resolvedAt: null,
    createdAt: new Date(),
  },
  {
    _id: 2,
    topic: "Topic 2",
    description: "Description 2",
    status: "ASSIGNED",
    type: "FEEDBACK_AND_COMPLAINTS",
    severiety: "MODERATE",
    assignedTo: {
      name: "Sachin Yadav",
    },
    resolvedAt: new Date("2023-01-01"),
    createdAt: new Date(),
  },
  {
    _id: 3,
    topic: "Topic 2",
    description: "Description 2",
    status: "ASSIGNED",
    type: "FEEDBACK_AND_COMPLAINTS",
    severiety: "MODERATE",
    assignedTo: {
      name: "Sachin Yadav",
    },
    resolvedAt: new Date("2023-01-01"),
    createdAt: new Date(),
  },
  {
    _id: 4,
    topic: "Topic 2",
    description: "Description 2",
    status: "ASSIGNED",
    type: "FEEDBACK_AND_COMPLAINTS",
    severiety: "MODERATE",
    assignedTo: {
      name: "Sachin Yadav",
    },
    resolvedAt: new Date("2023-01-01"),
    createdAt: new Date(),
  },
  {
    _id: 5,
    topic: "Topic 1",
    description: "Description 1",
    status: "NEW",
    type: "PAYMENTS_AND_BILLING",
    severiety: "CRITICAL",
    assignedTo: null,
    resolvedAt: null,
    createdAt: new Date(),
  },
  {
    _id: 6,
    topic: "Topic 2",
    description: "Description 2",
    status: "ASSIGNED",
    type: "FEEDBACK_AND_COMPLAINTS",
    severiety: "MODERATE",
    assignedTo: {
      name: "Sachin Yadav",
    },
    resolvedAt: new Date("2023-01-01"),
    createdAt: new Date(),
  },
  {
    _id: 7,
    topic: "Topic 2",
    description: "Description 2",
    status: "ASSIGNED",
    type: "FEEDBACK_AND_COMPLAINTS",
    severiety: "MODERATE",
    assignedTo: {
      name: "Sachin Yadav",
    },
    resolvedAt: new Date("2023-01-01"),
    createdAt: new Date(),
  },
  {
    _id: 8,
    topic: "Topic 2",
    description: "Description 2",
    status: "ASSIGNED",
    type: "FEEDBACK_AND_COMPLAINTS",
    severiety: "MODERATE",
    assignedTo: {
      name: "Sachin Yadav",
    },
    resolvedAt: new Date("2023-01-01"),
    createdAt: new Date(),
  },
  {
    _id: 9,
    topic: "Topic 2",
    description: "Description 2",
    status: "ASSIGNED",
    type: "FEEDBACK_AND_COMPLAINTS",
    severiety: "MODERATE",
    assignedTo: {
      name: "Sachin Yadav",
    },
    resolvedAt: new Date("2023-01-01"),
    createdAt: new Date(),
  },
  {
    _id: 10,
    topic: "Topic 2",
    description: "Description 2",
    status: "ASSIGNED",
    type: "FEEDBACK_AND_COMPLAINTS",
    severiety: "MODERATE",
    assignedTo: {
      name: "Sachin Yadav",
    },
    resolvedAt: new Date("2023-01-01"),
    createdAt: new Date(),
  },
];

const config = [
  { label: "Topic", render: (ticket) => ticket.topic },
  { label: "Status", render: (ticket) => ticket.status },
  { label: "Severiety", render: (ticket) => ticket.severiety },
  { label: "Type", render: (ticket) => ticket.type },
  { label: "Assigned To", render: (ticket) => ticket.assignedTo?.name || "-" },
  {
    label: "Resolved At",
    render: (ticket) => ticket.resolvedAt?.toDateString() || "-",
  },
  {
    label: "Created At",
    render: (ticket) => ticket.createdAt?.toDateString() || "-",
  },
];

const keyFn = (ticket) => ticket._id 

const TicketScreen = () => {
  return (
    <>
      <Container className="p-3">
        <Stack gap={3} direction="horizontal" className="border-bottom py-3">
          <Filters />
        </Stack>
        <Stack className="mt-2">
          <Table data={tableData} config={config} keyFn={keyFn} />
        </Stack>
      </Container>
    </>
  );
};

export default TicketScreen;
