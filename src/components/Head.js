import React, { Component } from "react";
import "./Head.css";
import logo from "./cropped-phlask-text-icon-logo.png";
//import $ from 'jquery';
//import Popper from 'popper.js';
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

export class Head extends Component {
  render() {
    return (
      <div className = 'menu'>
        <header>
                    <Navbar bg="light" expand="lg" className = "headColumns">
              <Navbar.Brand href="https://phlask.me/"><img src={logo} alt="Logo" className = "logoImage"/></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className= "menu">
                <Nav className="mr-auto">
                  <Nav.Link href="#eco">Phlask EcoSystem</Nav.Link>
                  <Nav.Link href="#map">Phlask Map</Nav.Link>
                  <Nav.Link href="#share">Share Water</Nav.Link>
                  <Nav.Link href="#blog">Blog</Nav.Link>
                  <NavDropdown title="Data" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#about" className="data">About The Project</NavDropdown.Item >
                    <NavDropdown.Item href="#Business" className="data">Business Benifits</NavDropdown.Item>
                    <NavDropdown.Item href="#Finance" className="data">Finantial Data</NavDropdown.Item>
                    <NavDropdown.Item href="#Citation" className="data">Citations and Acknowledgements</NavDropdown.Item>
                    <NavDropdown.Item href="#Bottle" className="data">Phlask Bottle</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#link">Contact</Nav.Link>
                </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
      
          <Navbar bg="light" expand="lg" className="headColumns">
            <div className = 'logo'>
              <Navbar.Brand href="https://phlask.me/">
                <img src={logo} alt="Logo" className="logoImage" />
              </Navbar.Brand>
            </div>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#eco">Phlask EcoSystem</Nav.Link>
                <Nav.Link href="#map">Phlask Map</Nav.Link>
                <Nav.Link href="#share">Share Water</Nav.Link>
                <Nav.Link href="#blog">Blog</Nav.Link>
                <NavDropdown title="Data" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#about">
                    About The Project
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#Business">
                    Business Benefits
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#Finance">
                    Financial Data
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#Citation">
                    Citations and Acknowledgements
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#Bottle">
                    Phlask Bottle
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#link">Contact</Nav.Link>
              </Nav>
              <div id = 'searchBar'>
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </div>
              
            </Navbar.Collapse>
          </Navbar>
        </header>
      </div>
    );
  }
}

export default Head;
