import React, { Component } from "react";
import { Accordion, Card, Button } from "react-bootstrap";

export class ClosestTap extends Component {
  render() {
    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Click me to view the closest tap!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {this.props.lat === "" || this.props.lon === "" ? (
                <p>
                  The closest tap feature is unavailable. We require permission
                  to access your location to provide it.
                </p>
              ) : (
                <p>
                  The closest tap is: {this.props.org} <br />
                  Located at:
                  <a
                    href={
                      "https://www.google.com/maps/search/?api=1&query=" +
                      this.props.lat +
                      ", " +
                      this.props.lon
                    }
                  >
                    {this.props.lat}, {this.props.lon}
                  </a>
                </p>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default ClosestTap;
