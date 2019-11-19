import React, { Component } from "react";
import Head from "../../components/Head";
import ReactGoogleMaps from "../../components/ReactGoogleMaps";

class MapPage extends Component {
  render() {
    return (
      <div className="MapPage">
        <Head />
        <ReactGoogleMaps />
      </div>
    );
  }
}

export default MapPage;
