import React, { Component } from "react";
import { Card, Col, Row, Form } from "react-bootstrap";
import "./FilterCard.css";

export class FilterCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: this.props.display,
      filteredchecked: false,
      adachecked: false
    };
  }

  handleChange(event) {
    if (event.target.id === "filtered") {
      this.setState(
        { filteredchecked: !this.state.filteredchecked },
        // callback parameter for setState to fire when setState is complete
        // {this.props.toggleSwitch("filtered", this.state.filteredchecked);
        console.log("filter card says filtered", this.state.filteredchecked)
      );
    } else if (event.target.id === "ada") {
      this.setState(
        { adaChecked: !this.state.adachecked },
        this.props.toggleSwitch("ada", this.state.adachecked)
      );
    } else console.log("error with toggle");
  }

  render() {
    console.log("init filter state", this.state.filteredchecked);
    if (this.state.display === false) {
      return <></>;
    } else {
      return (
        <Card className="filterCard">
          <Card.Body>
            <Row>
              <Col className="legend">
                <Card.Title className="title">Legend</Card.Title>
                <Row>
                  <div>
                    <img
                      src="https://i.imgur.com/M12e1HV.png"
                      alt="blue"
                      onClick={() => this.props.legendButton("Public")}
                    ></img>
                  </div>
                  <p className="tapName">Public Tap</p>
                </Row>
                <Row>
                  <div>
                    <img
                      src="https://i.imgur.com/DXMMxXR.png"
                      alt="green"
                      onClick={() => this.props.legendButton("Private-Shared")}
                    ></img>
                  </div>
                  <p className="tapName">Private-Shared Tap</p>
                </Row>
                <Row>
                  <div>
                    <img
                      src="https://i.imgur.com/kt825XO.png"
                      alt="yellow"
                      onClick={() => this.props.legendButton("Private")}
                    ></img>
                  </div>
                  <p className="tapName">Private Tap</p>
                </Row>
                <Row>
                  <div>
                    <img
                      src="https://i.imgur.com/5NOdOyY.png"
                      alt="red"
                      onClick={() => this.props.legendButton("Restricted")}
                    ></img>
                  </div>
                  <p className="tapName">Restricted Tap</p>
                </Row>
              </Col>
              <Col className="filter">
                <Card.Title className="title">Filter</Card.Title>
                <Form>
                  <Form.Check
                    type="switch"
                    id="filtered"
                    label="Filtered"
                    onClick={e => this.handleChange(e)}
                  />
                  <Form.Check
                    type="switch"
                    id="ada"
                    label="ADA Accessible"
                    onClick={e => this.handleChange(e)}
                  />
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
    }
  }
}

export default FilterCard;
