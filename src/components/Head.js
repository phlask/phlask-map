import React, { Component } from "react";
import "./Head.css";
import FilterCard from "./FilterCard.js";
import logo from "./cropped-phlask-text-icon-logo.png";
import icon from "./icons8-filter.png";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export class Head extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayFilter: false
    };

    this.display = this.display.bind(this);
  }

  display() {
    if (this.state.displayFilter === false) {
      this.setState({
        displayFilter: true
      });
    } else {
      this.setState({
        displayFilter: false
      });
    }
  }

  render() {
    if (this.state.displayFilter === false) {
      return (
        <div className="menu">
          <header>
            <Navbar bg="light" expand="lg" className="headColumns">
              <Navbar.Brand href="https://phlask.me/">
                <img src={logo} alt="Logo" className="logoImage" />
              </Navbar.Brand>
              <img src={icon} alt="filterImg" onClick={this.display} />
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="menu">
                <Nav className="mr-auto">
                  <Nav.Link href="#eco">Phlask EcoSystem</Nav.Link>
                  <Nav.Link href="#map">Phlask Map</Nav.Link>
                  <Nav.Link href="#share">Share Water</Nav.Link>
                  <Nav.Link href="#blog">Blog</Nav.Link>
                  <NavDropdown title="Data" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#about" className="data">
                      About The Project
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#Business" className="data">
                      Business Benefits
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#Finance" className="data">
                      Financial Data
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#Citation" className="data">
                      Citations and Acknowledgements
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#Bottle" className="data">
                      Phlask Bottle
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#link">Contact</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>
        </div>
      );
    } else {
      return (
        <div className="menu">
          <header>
            <Navbar bg="light" expand="lg" className="headColumns">
              <Navbar.Brand href="https://phlask.me/">
                <img src={logo} alt="Logo" className="logoImage" />
              </Navbar.Brand>
              <img src={icon} alt="filterImg" onClick={this.display} />
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="menu">
                <Nav className="mr-auto">
                  <Nav.Link href="#eco">Phlask EcoSystem</Nav.Link>
                  <Nav.Link href="#map">Phlask Map</Nav.Link>
                  <Nav.Link href="#share">Share Water</Nav.Link>
                  <Nav.Link href="#blog">Blog</Nav.Link>
                  <NavDropdown title="Data" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#about" className="data">
                      About The Project
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#Business" className="data">
                      Business Benefits
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#Finance" className="data">
                      Financial Data
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#Citation" className="data">
                      Citations and Acknowledgements
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#Bottle" className="data">
                      Phlask Bottle
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#link">Contact</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <FilterCard
              display={this.state.displayFilter}
              legendButton={this.props.legendButton}
            />
          </header>
        </div>
      );
    }
  }
}

export default Head;
