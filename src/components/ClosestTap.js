import React, { Component } from 'react'
import {Accordion, Card, Button} from 'react-bootstrap'

export class ClosestTap extends Component {
  render() {
    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Click me!
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                  Hello! I'm the body
                  CurrentLat = {this.props.lat}
                  CurrentLon = {this.props.lon}
                </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
  }
}

export default ClosestTap
