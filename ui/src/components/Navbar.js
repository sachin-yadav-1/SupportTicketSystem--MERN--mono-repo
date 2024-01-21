import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/Stack";
import LinkContainer from "react-router-bootstrap/LinkContainer";

const AppNavbar = () => {
  return (
    <Navbar className="bg-primary bg-dark" variant="dark">
      <Container gap={2} className="fs-4">
        <Navbar.Brand className="fs-4" style={{ marginRight: "5rem" }}>
          Ticket System
        </Navbar.Brand>

        <Nav className="me-auto">
          <Stack direction="horizontal" gap={3}>
            <LinkContainer to="/tickets">
              <Nav.Link>Tickets</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/agents">
              <Nav.Link>Agent</Nav.Link>
            </LinkContainer>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
