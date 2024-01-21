import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import TicketForm from "./TicketForm";

const AppModal = ({ ticket, onCloseModal }) => {
  const [show, setShow] = useState(true);
  const [editTicket, setEditTicket] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEditTicket(false);
    onCloseModal();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered fullscreen>
        <Modal.Header closeButton>
          <Modal.Title as="h1">Ticket Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TicketForm ticket={ticket} edit={editTicket} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AppModal;
