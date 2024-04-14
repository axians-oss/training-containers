import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

function App() {
  return (
    <div className="App">
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#accounts">SalesCourse</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/accounts">
                            <Nav.Link href="#accounts">Accounts</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/opportunities">
                            <Nav.Link href="#opportunities">Opportunities</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  );
}

export default App;
