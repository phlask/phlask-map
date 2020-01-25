import React, { Component } from "react";
import {Card} from "react-bootstrap";


export class ClosestTap extends Component {
  constructor(props) {
    super(props);

    this.state = {
        text : "Click for nearest tap!"
    };

    this.change = this.change.bind(this);
  }

  change(){
    if(this.props.lat === "" || this.props.lon === ""){
      this.setState({
        text: <p>
        The closest tap feature is unavailable. We require permission
        to access your location to provide it.
      </p>
      })
    }
    else{
      this.setState({
        text: <p>
        The closest tap is: {this.props.org} <br />
        Located at:   &nbsp;
        <a
          href={
            "https://www.google.com/maps/search/?api=1&query=" +
            this.props.lat +
            ", " +
            this.props.lon
          }
        >
          {this.props.address}
        </a>
      </p>  
      });
    }
  }

  render() {
    return (
      <div className = "closestTap">
        <Card>
          <Card.Header onClick={this.change}>
              {this.state.text}
          </Card.Header>
            
        </Card>
      </div>
    );
  }
}

export default ClosestTap;
