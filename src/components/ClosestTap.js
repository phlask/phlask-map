import React, { Component } from 'react'
import {Accordion, Card, Button} from 'react-bootstrap'

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
                  The closest tap is: {this.props.org} <br />
                  Located at: {this.props.lat}, {this.props.lon}
                </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
  }
}

export default ClosestTap
