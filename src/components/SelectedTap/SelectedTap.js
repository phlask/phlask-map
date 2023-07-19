/* eslint-disable no-console */
import {
  faCaretLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { isMobile } from 'react-device-detect';
import ReactGA from 'react-ga4';
import { connect } from 'react-redux';
import {
  PHLASK_TYPE_WATER,
  toggleInfoExpanded,
  toggleInfoWindow,
  toggleInfoWindowClass
} from '../../actions/actions';
import SelectedTapHours from '../SelectedTapHours/SelectedTapHours';
import SelectedTapIcons from '../SelectedTapIcons/SelectedTapIcons';
import sampleImg from '../images/phlask-tessellation.png';
import sampleImg2x from '../images/phlask-tessellation@2x.png';
import phlaskBlue from '../images/phlaskBlue.png';
import phlaskGreen from '../images/phlaskGreen.png';
import './SelectedTap.css';
import styles from './SelectedTap.module.scss';

import { SwipeableDrawer } from '@mui/material';

import SelectedTapMobile from '../SelectedTapMobile/SelectedTapMobile';

const tempImages = {
  tapImg: sampleImg,
  tapImg2x: sampleImg2x
};

class SelectedTap extends React.Component {
  refSelectedTap = React.createRef();
  refContentArea = React.createRef();

  state = {
    previewHeight: 0,
    infoExpansionStyle: {},
    isDescriptionShown: false,
    tapDescription: null,
    tapStatement: null,
    tapNormsAndRules: null,
    animationSpeed: 600,
    organization: this.props.selectedPlace.organization,
    address: this.props.selectedPlace.address,
    accessible: this.props.selectedPlace.accessible,
    testIcons: {
      access: phlaskBlue,
      accessibility: phlaskGreen
    },
    walkingDuration: 0,
    walkingDistance: 0,
    infoCollapseMobile: false
  };

  getWalkingDurationAndTimes = () => {
    if (!this.props.selectedPlace) return;
    const orsAPIKey =
      '5b3ce3597851110001cf6248ac903cdbe0364ca9850aa85cb64d8dfc';
    fetch(`https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${orsAPIKey}&start=${this.props.userLocation.lng},
    ${this.props.userLocation?.lat}&end=${this.props.selectedPlace?.lon},${this.props.selectedPlace?.lat}`)
      .then(response => response.json())
      .then(data => {
        // duration is returned in seconds
        let duration = Math.round(
          data.features[0].properties.summary.duration / 60
        );
        // distance is returned in m = 0.00062 mi
        let distance = (
          data.features[0].properties.summary.distance * 0.00062
        ).toFixed(1);
        this.setState({ walkingDuration: duration, walkingDistance: distance });
      });
  };

  toggleInfoExpanded(shouldExpand) {
    if (!shouldExpand) {
      // Start animation before unmounting description
      setTimeout(() => {
        this.setState({
          isDescriptionShown: shouldExpand
        });
      }, this.state.animationSpeed);
      // Expand or Collapse
      this.animateInfoExpansion(shouldExpand);
      // Close if in preview mode
      if (!this.props.infoIsExpanded) {
        this.toggleInfoWindow(false);
      }
    } else {
      // Set height on first render to animate expansion
      if (Object.keys(this.state.infoExpansionStyle).length < 1) {
        this.setState(
          {
            infoExpansionStyle: {
              height: this.state.previewHeight
            }
          },
          () => {
            this.setState(
              {
                isDescriptionShown: shouldExpand
              },
              () => {
                // Collapse
                this.animateInfoExpansion(shouldExpand);
              }
            );
          }
        );
      } else {
        this.setState(
          {
            isDescriptionShown: shouldExpand
          },
          () => {
            // Expand
            this.animateInfoExpansion(shouldExpand);
          }
        );
      }
    }
  }
  
  setInfoCollapseMobile = (collapse) => {
    this.setState({infoCollapseMobile: collapse});
  }

  toggleInfoWindow(shouldShow) {
    this.props.toggleInfoWindowClass(shouldShow);
    // Animate in
    if (shouldShow) {
      this.props.toggleInfoWindow(shouldShow);
    }
    // Animate Out
    else {
      this.props.toggleInfoWindow(false);
      this.setInfoCollapseMobile(false);
    }
  }

  animateInfoExpansion(shouldExpand) {
    this.setState(
      {
        infoExpansionStyle: {
          height: shouldExpand ? '80%' : this.state.previewHeight
        }
      },
      () => {
        this.props.toggleInfoExpanded(shouldExpand);
      }
    );
  }

  handleSwipe(direction) {
    if (direction === 'top') {
      this.toggleInfoExpanded(true);
    } else if (direction === 'bottom') {
      this.toggleInfoExpanded(false);
    }
  }

  handleGA() {
    ReactGA.event({
      category: `Tap - ${this.props.phlaskType}`,
      action: 'InfoShown',
      label: `${this.props.selectedPlace?.organization}, ${this.props.selectedPlace?.address}`
    });
  }
  
  // Handle Times

  setCurrentDate() {
    const selectedPlace = this.props.selectedPlace;

    this.setState({
      organization: selectedPlace?.organization,
      address: selectedPlace?.address,
      tapDescription: selectedPlace?.description
        ? selectedPlace?.description
        : 'Happy PHLasking',
      tapStatement: selectedPlace?.statement,
      tapNormsAndRules: selectedPlace?.norms_rules
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.showingInfoWindow) {
      if (this.props.selectedPlace !== prevProps.selectedPlace) {
        this.setCurrentDate();
        this.getWalkingDurationAndTimes();
        this.handleGA();
      }
      if (
        this.state.previewHeight !== this.refSelectedTap.current.clientHeight &&
        !this.state.isDescriptionShown
      ) {
        this.setState({
          previewHeight: this.refSelectedTap.current.clientHeight
        });
      }
    }
  }

  componentDidMount() {
    this.setCurrentDate();
  }

  render() {
    return (
      <div>
        {isMobile && (
          <div ref={this.refSelectedTap} id="tap-info-container-mobile">
            {this.props.selectedPlace && (
              <SwipeableDrawer
                anchor="bottom"
                open={this.props.showingInfoWindow}
                onOpen={() => this.toggleInfoWindow(true)}
                onClose={() => this.toggleInfoWindow(false)}
                PaperProps={{ square: false }}
              >
                <SelectedTapMobile
                  image={tempImages.tapImg}
                  estWalkTime={this.state.walkingDuration}
                  selectedPlace={this.props.selectedPlace}
                  infoCollapse={this.state.infoCollapseMobile}
                  setInfoCollapse={this.setInfoCollapseMobile}
                >
                  <SelectedTapHours
                    infoIsExpanded={this.props.infoIsExpanded}
                    selectedPlace={this.props.selectedPlace}
                  />
                </SelectedTapMobile>
              </SwipeableDrawer>
            )}
          </div>
        )}
        {!isMobile && this.props.showingInfoWindow && (
          <div
            ref={this.refSelectedTap}
            id="tap-info-container"
            className={`${this.props.infoWindowClass} ${styles.desktopContainer}`}
            style={{}}
          >
            <button
              className={styles.closeButton}
              aria-label="Close"
              onClick={() => {
                this.toggleInfoWindow(false);
              }}
            >
              <div
                id="close-arrow-desktop"
                className={styles.closeIconWrapper}
              >
                <FontAwesomeIcon
                  className={styles.closeIcon}
                  color="#999"
                  icon={faCaretLeft}
                />
              </div>
            </button>
            {/* Location Name */}
            <div
              ref={this.refContentArea}
              className={
                this.props.infoIsExpanded
                  ? styles.tapContentExpanded
                  : styles.tapContent
              }
            >
              {/* Main Image */}

              <div id="tap-info-img-box-desktop">
                <img
                  id="tap-info-img"
                  src={tempImages.tapImg}
                  srcSet={
                    tempImages.tapImg + ', ' + tempImages.tapImg2x + ' 2x'
                  }
                  alt=""
                ></img>
              </div>

              <div id="tap-head-info">
                {/* Tap Type Icon */}
                <div id="tap-type-icon-container">
                  <div id="tap-type-icon">
                    {this.props.phlaskType === PHLASK_TYPE_WATER ? (
                      <img
                        className="tap-info-icon-img"
                        src={this.props.selectedPlace?.infoIcon}
                        alt=""
                      ></img>
                    ) : (
                      this.props.selectedPlace?.infoIcon
                    )}
                  </div>
                </div>

                {/* Name & Address */}
                <div id="org-name-and-address-desktop">
                  <div id="tap-organization-name">
                    {this.state.organization}
                  </div>
                  {this.state.address && (
                    <h5 id="tap-info-address">{this.state.address}</h5>
                  )}
                </div>

                <SelectedTapHours
                  infoIsExpanded={this.props.infoIsExpanded}
                  selectedPlace={this.props.selectedPlace}
                />
              </div>
              {/* Walk Time & Info Icons  */}
              <div className={styles.walkTime}>
                Estimated Walk Time: {this.state.walkingDuration} mins (
                {this.state.walkingDistance} mi)
              </div>

              <SelectedTapIcons place={this.props.selectedPlace} />

              {/* Description */}
              <div>
                <div>
                  <div className={styles.description}>
                    <div id="tap-info-description">
                      {this.state.tapDescription && (
                        <div className={styles.section}>
                          <h3>Description</h3>
                          <div>{this.state.tapDescription}</div>
                        </div>
                      )}
                      {this.state.tapStatement && (
                        <div className={styles.section}>
                          <h3>Statement</h3>
                          <div>{this.state.tapStatement}</div>
                        </div>
                      )}
                      {this.state.tapNormsAndRules && (
                        <div className={styles.section}>
                          <h3>Norms &amp; Rules</h3>
                          <div>{this.state.tapNormsAndRules}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showingInfoWindow: state.showingInfoWindow,
  infoIsExpanded: state.infoIsExpanded,
  infoWindowClass: state.infoWindowClass,
  selectedPlace: state.selectedPlace,
  phlaskType: state.phlaskType,
  userLocation: state.userLocation
});
const mapDispatchToProps = {
  toggleInfoExpanded,
  toggleInfoWindow,
  toggleInfoWindowClass
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedTap);
