import {Marker } from "google-maps-react";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getTaps, toggleInfoWindow } from '../actions'

class FilteredTaps extends Component {

    state = {
        unfilteredTaps: this.props.tapsDisplayed
    }
    
    componentDidMount(){
        console.log('FilteredTaps');
    }
  
    componentWillReceiveProps(nextProps) {
    this.setState({
      unfilteredTaps: nextProps.tapsDisplayed
    });
  }

    showInfoWindow(){
        this.props.toggleInfoWindow(true)
    }
    
      onMarkerClick = (props, marker, e) => {
        this.showInfoWindow()
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true,
          currlat: props.position.lat,
          currlon: props.position.lng
        });
      };
      
      getIcon(access) {
        if (this.state.unfilteredTaps.includes(access) === true) {
          switch (access) {
            // blue with blue outline
            case "Public":
              return "https://imgur.com/czMZ0SC.png";
            // green with green outline
            case "Private-Shared":
              return "https://imgur.com/ZslHzRe.png";
            // yellow with yellow outline
            case "Private":
              return "https://imgur.com/2SItPIV.png";
            // red with red outline
            case "Restricted":
              return "https://imgur.com/waTJBzj.png";
            // yellow with yellow outline
            case "Semi-public":
              return "https://imgur.com/ZslHzRe.png";
            // blue with gray outline
            default:
              return "https://imgur.com/iCyD4Nt.png";
          }
        } else {
          return "https://i.imgur.com/kKXG3TO.png";
        }
      }
      componentDidMount(){
          console.log('Filter Mounted');
          console.log(this.props.filteredTaps);
          
      }

    render(){
        return(
            <div>
                {this.props.filteredTaps
                    /* {toggledTaps */
                    .map((tap, index) => (
                        <Marker
                        key={index}
                        name={tap.tapnum}
                        organization={tap.organization}
                        address={tap.address}
                        description={tap.description}
                        filtration={tap.filtration}
                        handicap={tap.handicap}
                        service={tap.service}
                        tap_type={tap.tap_type}
                        norms_rules={tap.norms_rules}
                        vessel={tap.vessel}
                        img={tap.images}
                        onClick={this.onMarkerClick}
                        position={{ lat: tap.lat, lng: tap.lon }}
                        icon={{
                            url: this.getIcon(tap.access),
                            // icon images as of April 2020 are 300x397 px
                            // so scale images ~3:4 ratio
                            scaledSize: { width: 37, height: 50 }
                        }}
                        />
                    ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // filtered: state.filtered,
    handicap: state.handicap,
    // allTaps: state.allTaps,
    filteredTaps: state.filteredTaps,
    // filterFunction: state.filterFunction,
    showingInfoWindow: state.showingInfoWindow,
    infoIsExpanded: state.infoIsExpanded
  });
  
const mapDispatchToProps = { getTaps, toggleInfoWindow };

export default connect(mapStateToProps,mapDispatchToProps)(FilteredTaps)