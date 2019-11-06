import React, { Component } from "react";
import {Card,Col,Row,Form} from "react-bootstrap";

export class FilterCard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            display : this.props.display,
            ada: true,
            filter: true,
            tapsDisplayed: ["blue", "green", "red", "yellow"],
        };

        this.legendButton = this.legendButton.bind(this);
        }

    legendButton(color){
        if(this.state.tapsDisplayed.includes(color)){
            this.state.tapsDisplayed = this.state.tapsDisplayed.filter(item => item !== color);
        }
        else{
            this.state.tapsDisplayed.push(color);
        }
        console.log(this.state.tapsDisplayed);
    }

    render(){
        if(this.state.display === false){
            return(
                <></>
            );
        }
        else{
            return(
                <Card>
                    <Card.Body>  
                        <Row>
                            <Col>
                                <Card.Title>Legend</Card.Title>
                                <div>
                                    <img src = "https://i.imgur.com/M12e1HV.png" alt = "blue" onClick={() => {this.legendButton("blue")}}></img>
                                </div>
                                <div>
                                    <img src = "https://i.imgur.com/DXMMxXR.png" alt = "green" onClick={() => {this.legendButton("green")}}></img>
                                </div>
                                <div>
                                    <img src = "https://i.imgur.com/kt825XO.png" alt = "yellow" onClick={() => {this.legendButton("yellow")}}></img>
                                </div>
                                <div>
                                    <img src = "https://i.imgur.com/5NOdOyY.png" alt = "red" onClick={() => {this.legendButton("red")}}></img>
                                </div>
                            </Col>
                            <Col>
                                <Card.Title>Filter</Card.Title>
                            <Form>
                                <Form.Check 
                                    type="switch"
                                    id="filter"
                                    label="Filter"
                                />
                                <Form.Check
                                    type="switch"
                                    id="ada"
                                    label="ADA"
                                />
                            </Form>
                            </Col>
                        </Row> 
                    </Card.Body>
                </Card>
            )
        }
        
    }
}

export default FilterCard;