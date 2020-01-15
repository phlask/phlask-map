import React, { Component } from "react";
import Head from "../../components/Head";
import ReactGoogleMaps from "./components/ReactGoogleMaps";

export class MapPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ada: false,
      filter: false,
      tapsDisplayed: ["Public", "Private", "Private-Shared", "Restricted"],
    };

    this.legendButton = this.legendButton.bind(this);
  }

  //Toggles wether color is in the tapsDisplayed array or not
  legendButton(color){
    if(this.state.tapsDisplayed.includes(color)){
        //removes color form tapsDisplayed array
        this.state.tapsDisplayed = this.state.tapsDisplayed.filter(item => item !== color);
        this.setState({});
    }

    else{
        //adds color to tapsDisplayed array
        this.state.tapsDisplayed.push(color);
        this.setState({})
    }
    console.log(this.state.tapsDisplayed);
  
  }

  render() {
    return (
      <div className="MapPage">
        <Head legendButton = {this.legendButton}/>
        <ReactGoogleMaps tapsDisplayed = {this.state.tapsDisplayed}/>
      </div>
    );
  }
}

export default MapPage;
