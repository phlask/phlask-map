import React, { Component } from "react";
import { Marker } from "google-maps-react";
import { connect } from "react-redux";
import { getFoodOrgs, toggleInfoWindow, setSelectedPlace, setMapCenter } from "../actions";
import makeGetVisibleTaps from '../selectors/foodOrgSelectors';
import foodIcon from './images/food-marker-icons/food-site.png'
import './IndieMarker.css'

class IndieMarker extends React.Component{

    state = {
        icon: '',
        shouldUpdate: true,
        markerVisibility: {
            visibility: this.props.visibleTaps.includes(this.props.org)
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
        ? nextProps.visibleTaps.includes(this.props.org) === this.props.visibleTaps.includes(this.props.org)
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
        icon: this.getIcon(this.props.org.access),
      }, ()=>{
        this.setState({
          shouldUpdate: false
        })
      })
    }

    getIcon(access) {
      if (!this.props.accessTypesHidden.includes(access)) {
        switch (access) {
          case "Food Site":
            return require('./images/food-marker-icons/food-site.png')
          case "School":
            return require('./images/food-marker-icons/school.png')
          case "Charter School":
            return require('./images/food-marker-icons/charter-school.png')
          case "PHA Community Center":
            return require('./images/food-marker-icons/pha.png')
          default:
            return "./images/foodIcon.png";
        }
      } 
      else {
        return {foodIcon};
      }
    }

    onMarkerClick(org){
        this.props.toggleInfoWindow(true);
        this.props.setSelectedPlace(org);
        this.props.setMapCenter(org.position);
      }


  
    render(){
        console.log('rendered marker');
        
      return(
        // Doesn't Render Marker as child of div, 
        // so can't use this method to style individual Markers 
        !this.props.visibleTaps.includes(this.props.org)
          ? []
          : <div 
          // className="testMarker"
            // style={this.state.markerVisibility}
        >
            <Marker
                  access={this.props.org.access}
                  map={this.props.map}
                  google={this.props.google}
                  mapCenter={this.props.mapCenter}
                  key={this.props.key}
                  organization={this.props.org.organization}
                  address={this.props.org.address}
                  hours={this.props.org.hours}
                  idRequired={this.props.org.id_required === 'yes' ? true : false}
                  kidOnly={this.props.org.kid_only === 'yes' ? true : false}
                  description={this.props.org.description}
                  img={this.props.org.images}
                  onClick={this.onMarkerClick.bind(this)}
                  position={{ lat: this.props.org.lat, lng: this.props.org.lon }}
                  icon={this.getIcon(this.props.org.access)}
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
        // filtered: state.tapFilters.filtered,
        // handicap: state.tapFilters.handicap,
        accessTypesHidden: state.foodFilters.accessTypesHidden,
        allTaps: state.allFoodOrgs,
        mapCenter: state.mapCenter
      }
    }
    return mapStateToProps
  }
  
  const mapDispatchToProps = { getFoodOrgs, toggleInfoWindow, setSelectedPlace, setMapCenter };
  
  export default connect(makeMapStateToProps, mapDispatchToProps)(IndieMarker);