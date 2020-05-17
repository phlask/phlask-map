import React from "react";
import { Card, Container, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./Legend.css";

export function Legend() {
  return (
    <div className="filterContainer">
      <Card className="filterCard">
        <Card.Title className="title">Legend</Card.Title>
        <Container>
          <OverlayTrigger
            overlay={
              <Tooltip id={`Public Tap`}>
                These taps are maintained by the City or publicly-oriented enterprise
              </Tooltip>}>
            <Row className="legendRow">
              <div>
                <img
                  className="tapIcon"
                  src="https://i.imgur.com/M12e1HV.png"
                  alt="blue"
                  onClick={() => this.props.legendButton("Public")}>
                </img>    
              </div>
              <p className="tapName">Public Tap</p>
          </Row>
        </OverlayTrigger>
        <OverlayTrigger
           overlay={
              <Tooltip id={`Public Tap`}>
                Taps located in private enterprises that have either explicitly granted public access or function as a de-facto public space
              </Tooltip>}>
              <Row className="legendRow"> 
                <img
                  className="tapIcon"
                  src="https://i.imgur.com/DXMMxXR.png"
                  alt="green"
                  onClick={() => this.props.legendButton("Private-Shared")}> 
                </img>
                <p className="tapName">Private-Shared Tap</p>
            </ Row>
            </OverlayTrigger>
            <OverlayTrigger
                overlay={
                  <Tooltip id={`Private Tap`}>
                    These taps are located in private businesses; public access is not guaranteed
                   </Tooltip>}>
              <Row>
                <img
                  className="tapIcon"
                  src="https://i.imgur.com/kt825XO.png"
                  alt="yellow"
                  onClick={() => this.props.legendButton("Private")}>
                </img>   
            <p className="tapName">Private Tap</p>
          </Row>
          </OverlayTrigger>
          <OverlayTrigger
                overlay={
                  <Tooltip id={`Restricted Tap`}>
                    These taps are restricted from public use
                   </Tooltip>}>
          <Row className="legendRow">
            <div>
              <img
                className="tapIcon"
                src="https://i.imgur.com/5NOdOyY.png"
                alt="red"
                onClick={() => this.props.legendButton("Restricted")}>
              </img>   
            </div>
            <p className="tapName">Restricted Tap</p>
          </Row>
          </OverlayTrigger>
        </Container>
      </Card>
    </div>
  );
}
export default Legend;
