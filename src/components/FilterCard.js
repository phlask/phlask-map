import React, { Component } from "react";
import icon from "./icons8-filter.png"
import {Card,Col,Row} from "react-bootstrap";

export class FilterCard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            display : this.props.display,
        };
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
                            </Col>
                            <Col>
                                <Card.Title>Filter</Card.Title>
                            </Col>
                        </Row> 
                    </Card.Body>
                </Card>
            )
        }
        
    }
}

export default FilterCard;