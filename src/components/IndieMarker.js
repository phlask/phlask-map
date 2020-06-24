import React, { Component } from "react";
import { Marker } from "google-maps-react";
import { connect } from "react-redux";
import { getTaps, toggleInfoWindow, setSelectedPlace, setMapCenter } from "../actions";
import makeGetVisibleTaps from '../selectors/tapSelectors';
import './IndieMarker.css'

class IndieMarker extends React.Component{

    state = {
        icon: '',
        shouldUpdate: true,
        markerVisibility: {
            visibility: this.props.visibleTaps.includes(this.props.tap)
                ? 'visible'
                : 'hidden'
        }
    }

    componentWillUnmount(){
        console.log('unmount');
    }
    
    shouldComponentUpdate(nextProps){
      // return this.props.accessTypesHidden.includes(this.props.tap.access) === nextProps.accessTypesHidden.includes(this.props.tap.access) 
      // return nextProps.visibleTaps.includes(this.props.tap) === this.props.visibleTaps.includes(this.props.tap)
      // After initial icon is set, shouldUpdate is false.
      // Checks to see if this tap was updated in props
      return !this.state.shouldUpdate
        ? nextProps.visibleTaps.includes(this.props.tap) === this.props.visibleTaps.includes(this.props.tap)
          ? false
          :true
        : true
    }

    componentDidUpdate(prevProps){
      console.log(('Did Update'));
      
      // if(this.props.visibleTaps === prevProps.visibleTaps){
      //   this.setState(this.getIcon(this.props.tap.access))
      // }
    }
  
    componentDidMount(){
      this.setState({
        icon: this.getIcon(this.props.tap.access),
      }, ()=>{
        this.setState({
          shouldUpdate: false
        })
      })
    }

    getIcon(access) {  
      if (!this.props.accessTypesHidden.includes(access)) {
        switch (access) {
          case "Public":
            return require('./images/tap-marker-icons/Public.png')
          case "Private-Shared":
            return require('./images/tap-marker-icons/Shared.png')
          case "Private":
            return require('./images/tap-marker-icons/Private.png')
          case "Restricted":
            return require('./images/tap-marker-icons/Restricted.png')
          case "Semi-public":
            return require('./images/tap-marker-icons/Shared.png')
          case "TrashAcademy":
            return "https://i.imgur.com/fXTeEKL.png";
          default:
            return "https://i.imgur.com/kKXG3TO.png";
        }
      } else {
        return "https://i.imgur.com/kKXG3TO.png";
      }
    }

    onMarkerClick(tap){
        this.props.toggleInfoWindow(true);
        this.props.setSelectedPlace(tap);
        this.props.setMapCenter(tap.position);
      }


  
    render(){
        console.log('rendered marker');
        
      return(
        // Doesn't Render Marker as child of div, 
        // so can't use this method to style individual Markers 
        <div 
          // className="testMarker"
            // style={this.state.markerVisibility}
        >
            <Marker
                  access={this.props.tap.access}
                  map={this.props.map}
                  google={this.props.google}
                  mapCenter={this.props.mapCenter}
                  key={this.props.key}
                  name={this.props.tap.tapnum}
                  organization={this.props.tap.organization}
                  address={this.props.tap.address}
                  hours={this.props.tap.hours}
                  description={this.props.tap.description}
                  filtration={this.props.tap.filtration}
                  handicap={this.props.tap.handicap}
                  service={this.props.tap.service}
                  sparkling={"sparkling" in this.props.tap ? this.props.tap.sparkling : "no"}
                  tap_type={this.props.tap.tap_type}
                  norms_rules={this.props.tap.norms_rules}
                  vessel={this.props.tap.vessel}
                  img={this.props.tap.images}
                  onClick={this.onMarkerClick.bind(this)}
                  position={{ lat: this.props.tap.lat, lng: this.props.tap.lon }}
                  icon={{
                    url: this.state.icon
                  }}
                />
        </div>
      )
    }
  }

const makeMapStateToProps = () => {
    const getVisibleTaps = makeGetVisibleTaps()
    const mapStateToProps = (state, props) => {
      return {
        visibleTaps: getVisibleTaps(state, props),
        filtered: state.tapFilters.filtered,
        handicap: state.tapFilters.handicap,
        accessTypesHidden: state.tapFilters.accessTypesHidden,
        allTaps: state.allTaps,
        mapCenter: state.mapCenter
      }
    }
    return mapStateToProps
  }
  
  const mapDispatchToProps = { getTaps, toggleInfoWindow, setSelectedPlace, setMapCenter };
  
  export default connect(makeMapStateToProps, mapDispatchToProps)(IndieMarker);