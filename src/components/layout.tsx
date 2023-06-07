import React from "react";
import { Container, Navbar } from "react-bootstrap";

export const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <>
      <Container fluid>
        <Navbar bg="light">
          <Container>Hello</Container>
        </Navbar>
      </Container>
      <Container>{props.children}</Container>
    </>
  );
};
