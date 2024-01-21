import React, { useReducer, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

const reducer = (state, action) => {
  if (action.type === "TOPIC") {
    return { ...state, topic: action.payload };
  }
  if (action.type === "DESCRIPTION") {
    return { ...state, description: action.payload };
  }
  if (action.type === "SEVERIETY") {
    return { ...state, severiety: action.payload };
  }
  if (action.type === "TYPE") {
    return { ...state, type: action.payload };
  }
};

const TicketForm = ({ ticket }) => {
  const [editTicket, setEditTicket] = useState(false);
  const [ticketState, dispatch] = useReducer(reducer, { ...ticket });

  const handleEditTicket = () => {
    setEditTicket((prev) => !prev);
  };
  const handleOnTopicChange = (e) => {
    dispatch({ type: "TOPIC", payload: e.target.value });
  };
  const handleOnDescriptionChange = (e) => {
    dispatch({ type: "DESCRIPTION", payload: e.target.value });
  };
  const handleOnSeverietyChange = (e) => {
    dispatch({ type: "SEVERIETY", payload: e.target.value });
  };
  const handleOnTypeChange = (e) => {
    dispatch({ type: "TYPE", payload: e.target.value });
  };

  return (
    <Form style={{ height: "100vh" }}>
      <Stack
        direction="horizontal"
        gap={2}
        className="justify-content-end mt-auto"
      >
        <Button
          variant="secondary"
          size="lg"
          onClick={handleEditTicket}
          disabled={!editTicket || ticket.resolvedAt}
        >
          Resolve Ticket
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={handleEditTicket}
          disabled={!editTicket || ticket.assignedTo?.name}
        >
          Assign to an Agent
        </Button>
        <Button variant="primary" size="lg" onClick={handleEditTicket}>
          {!editTicket ? "Edit Ticket" : "Save Changes and Close"}
        </Button>
      </Stack>

      <Stack gap={4}>
        <Stack>
          <Form.Label>Topic</Form.Label>
          <Form.Control
            type="text"
            onChange={handleOnTopicChange}
            value={ticketState.topic}
            disabled={!editTicket}
            className="fs-3"
          />
        </Stack>
        <Stack>
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={handleOnDescriptionChange}
            as="textarea"
            rows="10"
            value={ticketState.description}
            disabled={!editTicket}
            className="fs-3"
          />
        </Stack>

        <Stack direction="horizontal" gap={3}>
          <Stack>
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              value={ticketState.status}
              disabled={true}
              className="fs-3"
            />
          </Stack>

          <Stack>
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              value={ticketState.assignedTo?.name || "-"}
              disabled={true}
              className="fs-3"
            />
          </Stack>

          <Stack>
            <Form.Label>Severiety</Form.Label>
            <Form.Select
              className="fs-3"
              disabled={!editTicket}
              onChange={handleOnSeverietyChange}
            >
              <option value="CRITICAL">CRITICAL</option>
              <option value="Pinky Choudhary">LOW</option>
            </Form.Select>
          </Stack>

          <Stack>
            <Form.Label>Type</Form.Label>
            <Form.Select
              className="fs-3"
              disabled={!editTicket}
              onChange={handleOnTypeChange}
            >
              <option value="PAYMENTS">PAYMENTS</option>
              <option value="FEEDBACK">FEEDBACK</option>
            </Form.Select>
          </Stack>
        </Stack>
      </Stack>
    </Form>
  );
};

export default TicketForm;
