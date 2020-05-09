import React, { Component } from "react";
import { Card, Col, Row, Form } from "react-bootstrap";
import "./FilterCard.css";
import { connect } from "react-redux";
import { setToggleState, setFilteredTapTypes } from "../actions";

// ============================================== //
// THIS IS THE OLD FILTER
// ============================================== //

export class FilterCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: this.props.display
    };
  }

  handleChange(event) {
    if (event.target.id === "filtered") {
      this.props.setToggleState("filtered", !this.props.filtered);
    } else if (event.target.id === "ada") {
      this.props.setToggleState("handicap", !this.props.handicap);
    } else {
      console.log("error with toggle");
    }
  }

  render() {
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
                      src={this.props.accessTypesHidden.includes("Public") ? "https://i.imgur.com/kKXG3TO.png" : "https://i.imgur.com/M12e1HV.png"}
                      alt="blue"
                      onClick={() => this.props.setFilteredTapTypes("Public")}
                    ></img>
                  </div>
                  <p className="tapName">Public Tap</p>
                </Row>
                <Row>
                  <div>
                    <img
                      src={this.props.accessTypesHidden.includes("Private-Shared") ? "https://i.imgur.com/kKXG3TO.png" : "https://i.imgur.com/DXMMxXR.png"}
                      alt="green"
                      onClick={() => this.props.setFilteredTapTypes("Private-Shared")}
                    ></img>
                  </div>
                  <p className="tapName">Private-Shared Tap</p>
                </Row>
                <Row>
                  <div>
                    <img
                      src={this.props.accessTypesHidden.includes("Private") ? "https://i.imgur.com/kKXG3TO.png" : "https://i.imgur.com/kt825XO.png"}
                      alt="yellow"
                      onClick={() => this.props.setFilteredTapTypes("Private")}
                    ></img>
                  </div>
                  <p className="tapName">Private Tap</p>
                </Row>
                <Row>
                  <div>
                    <img
                      src={this.props.accessTypesHidden.includes("Restricted") ? "https://i.imgur.com/kKXG3TO.png" : "https://i.imgur.com/5NOdOyY.png"}
                      alt="red"
                      onClick={() => this.props.setFilteredTapTypes("Restricted")}
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

const mapStateToProps = state => ({
  filtered: state.tapFilters.filtered,
  handicap: state.tapFilters.handicap,
  accessTypesHidden: state.tapFilters.accessTypesHidden
});

const mapDispatchToProps = {
  setFilteredTapTypes,
  setToggleState
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterCard);
