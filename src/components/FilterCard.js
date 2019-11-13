import React, { Component } from "react";
import {Card,Col,Row,Form} from "react-bootstrap";
import "./FilterCard.css";

export class FilterCard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            display : this.props.display,
            ada: true,
            filter: true,
            tapsDisplayed: ["blue", "green", "red", "yellow"],
            filtersOn: {
                filter: false,
                ada: false,
            }
        };

        this.legendButton = this.legendButton.bind(this);
        }

    //Toggles wether color is in the tapsDisplayed array or not
    legendButton(color){
        if(this.state.tapsDisplayed.includes(color)){
            //removes color form tapsDisplayed array
            this.state.tapsDisplayed = this.state.tapsDisplayed.filter(item => item !== color);
        }
        else{
            //adds color to tapsDisplayed array
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
                <Card className = "filterCard">
                    <Card.Body>  
                        <Row>
                            <Col className = "legend">
                                <Card.Title className = "title">Legend</Card.Title>
                                <Row>
                                <div>
                                    <img src = "https://i.imgur.com/M12e1HV.png" alt = "blue" onClick={() => {this.legendButton("blue")}}></img>
                                </div>
                                    <p className = "tapName">Public Tap</p>
                                </Row>
                                <Row>
                                <div>
                                    <img src = "https://i.imgur.com/DXMMxXR.png" alt = "green" onClick={() => {this.legendButton("green")}}></img>
                                </div>
                                    <p className = "tapName">Private-Shared Tap</p>
                                </Row>
                                <Row>
                                <div>
                                    <img src = "https://i.imgur.com/kt825XO.png" alt = "yellow" onClick={() => {this.legendButton("yellow")}}></img>
                                </div>
                                    <p className = "tapName">Private Tap</p>
                                </Row>
                                <Row>
                                <div>
                                    <img src = "https://i.imgur.com/5NOdOyY.png" alt = "red" onClick={() => {this.legendButton("red")}}></img>
                                </div>
                                    <p className = "tapName">Restricted Tap</p>
                                </Row>
                            </Col>
                            <Col className = "filter">
                                <Card.Title className = "title">Filter</Card.Title>
                                <Form>
                                    <Form.Check 
                                        type="switch"
                                        id="filtered"
                                        label="Filtered"
                                    />
                                    <Form.Check
                                        type="switch"
                                        id="ada"
                                        label="ADA Accessible"
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