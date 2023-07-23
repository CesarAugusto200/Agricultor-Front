import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function CustomNavbar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <NavLink className="navbar-brand" to="/">
        El Amigo Agricultor
      </NavLink>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} to="/Software">
            Software
          </Nav.Link>
          <Nav.Link as={NavLink} to="/Datos">
            Datos
          </Nav.Link>
          <Nav.Link as={NavLink} to="/Informacion">
            Informacion
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
