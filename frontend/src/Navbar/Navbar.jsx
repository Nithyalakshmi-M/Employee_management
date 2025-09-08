import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import {
  FaCog,
  FaBell,
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const AppNavbar = () => {
  return (
    <div>
      
      <Navbar
        bg="white"
        fixed="top"
        className="border-bottom py-3"
        style={{ zIndex: 1000 }}
      >
        <Container fluid>
          
          <Navbar.Brand
            href="#"
            className="fw-bold text-primary"
            style={{ letterSpacing: "2px", }}
          >
            RS-TECH
          </Navbar.Brand>

         
          <div className="d-flex align-items-center gap-3 ms-auto">
            <FaCog
              size={29}
              style={{
                background: "#f4f4f4",
                borderRadius: "50%",
                padding: "6px",
                cursor: "pointer",
              }}
            />
            <FaBell
              size={29}
              style={{
                background: "#f4f4f4",
                borderRadius: "50%",
                padding: "5px",
                cursor: "pointer",
              }}
            />
            <img
              src="data:image/jpeg;base64,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"
              alt="User"
              width={38}
              height={38}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          </div>
        </Container>
      </Navbar>

      
      <div
        style={{
          width: "260px",
          height: "100vh",
          background: "#f8f9fa",
          borderRight: "1px solid #ddd",
          position: "fixed",
          top: "0",
          left: "0",
          paddingTop: "70px",
        }}
      >
        <Nav className="flex-column px-3 gap-3">
          <Nav.Link
            href="#dashboard"
            className="d-flex align-items-center gap-2 text-secondary"
          >
            <FaTachometerAlt /> Dashboard
          </Nav.Link>

      
          <Nav.Link
            href="#employee"
            className="d-flex align-items-center gap-2 fw-medium"
            style={{
              background: "#007bff",
              color: "#fff",
              borderRadius: "25px",
              padding: "10px 15px",
            }}
          >
            <FaUsers /> Employee
          </Nav.Link>

          <Nav.Link
            href="#calendar"
            className="d-flex align-items-center gap-2 text-secondary"
          >
            <FaCalendarAlt /> Calendar
          </Nav.Link>

          <Nav.Link
            href="#messages"
            className="d-flex align-items-center gap-2 text-secondary"
          >
            <FaEnvelope /> Messages
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
};

export default AppNavbar;
