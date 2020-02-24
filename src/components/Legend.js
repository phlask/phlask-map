import React from "react";
import { Card, Container, Row } from "react-bootstrap";
import "./Legend.css";

export function Legend() {
  return (
    <div className="filterContainer">
      <Card className="filterCard">
        <Card.Title className="title">Legend</Card.Title>
        <Container>
          <Row className="legendRow">
            <div>
              <img
                className="tapIcon"
                src="https://i.imgur.com/M12e1HV.png"
                alt="blue"
                onClick={() => this.props.legendButton("Public")}
              ></img>
            </div>
            <p className="tapName">Public Tap</p>
          </Row>
          <Row className="legendRow">
            <div>
              <img
                className="tapIcon"
                src="https://i.imgur.com/DXMMxXR.png"
                alt="green"
                onClick={() => this.props.legendButton("Private-Shared")}
              ></img>
            </div>
            <p className="tapName">Private-Shared Tap</p>
          </Row>
          <Row className="legendRow">
            <div>
              <img
                className="tapIcon"
                src="https://i.imgur.com/kt825XO.png"
                alt="yellow"
                onClick={() => this.props.legendButton("Private")}
              ></img>
            </div>
            <p className="tapName">Private Tap</p>
          </Row>
          <Row className="legendRow">
            <div>
              <img
                className="tapIcon"
                src="https://i.imgur.com/5NOdOyY.png"
                alt="red"
                onClick={() => this.props.legendButton("Restricted")}
              ></img>
            </div>
            <p className="tapName">Restricted Tap</p>
          </Row>
        </Container>
      </Card>
    </div>
  );
}
export default Legend;
