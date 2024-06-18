/* eslint-disable no-console */
import React from 'react';
import { isMobile } from 'react-device-detect';
import ReactGA from 'react-ga4';
import { connect } from 'react-redux';
import {
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

import { Paper, SwipeableDrawer } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import SelectedTapMobile from '../SelectedTapMobile/SelectedTapMobile';
import { withStyles } from '@mui/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IosShareIcon from '@mui/icons-material/IosShare';
import CloseIcon from '@mui/icons-material/Close';

import { WATER_RESOURCE_TYPE } from '../../types/ResourceEntry';

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
    tapNormsAndRules: null,
    animationSpeed: 600,
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
    ${this.props.userLocation?.lat}&end=${this.props.selectedPlace?.longitude},${this.props.selectedPlace?.latitude}`)
      .then(response => response.json())
      .then(data => {
        if (!data.features) return;
        // duration is returned in seconds
        let duration = Math.round(
          data.features[0].properties.summary.duration / 60
        );
        // distance is returned in m = 0.00062 mi
        let distance = (
          data.features[0].properties.summary.distance * 0.00062
        ).toFixed(1);
        this.setState({
          walkingDuration: duration,
          walkingDistance: distance
        });
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

  setInfoCollapseMobile = collapse => {
    this.setState({ infoCollapseMobile: collapse });
  };

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
      category: `Tap - ${this.props.resourceType}`,
      action: 'InfoShown',
      label: `${this.props.selectedPlace?.name}, ${this.props.selectedPlace?.address}`
    });
  }

  // Handle Times

  setCurrentDate() {
    const selectedPlace = this.props.selectedPlace;

    this.setState({
      name: selectedPlace?.name,
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
        isMobile &&
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
    const { classes } = this.props;
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
          <div>
            {/* Desktop dialog panel */}
            <Paper
              sx={{
                position: 'absolute',
                right: '32px',
                top: '20px',
                width: '708px',
                height: '700px'
              }}
            >
              {/* <DialogTitle>Dialog Title</DialogTitle> */}

              <IconButton
                aria-label="close"
                onClick={() => {
                  this.toggleInfoWindow(false);
                }}
                sx={{
                  position: 'absolute',
                  left: '45px',
                  top: 20,
                  color: '#000000'
                }}
                size="large"
              >
                <CloseIcon
                  sx={{
                    fontSize: 34
                  }}
                />
              </IconButton>

              <IconButton
                aria-label="close"
                onClick={() => {
                  this.toggleInfoWindow(true);
                }}
                sx={{
                  float: 'right',
                  right: '150px',
                  top: 20,
                  color: '#000000'
                }}
                // size="large"
              >
                <IosShareIcon
                  sx={{
                    fontSize: 34
                  }}
                />
              </IconButton>

              <IconButton
                aria-label="close"
                onClick={() => {
                  this.toggleInfoWindow(true);
                }}
                sx={{
                  float: 'right',
                  top: 20,
                  color: '#000000'
                }}
              >
                <MoreHorizIcon
                  sx={{
                    fontSize: 34
                  }}
                />
              </IconButton>

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
                  <img-alt
                    id="tap-info-img"
                    src={tempImages.tapImg}
                    srcSet={
                      tempImages.tapImg + ', ' + tempImages.tapImg2x + ' 2x'
                    }
                  ></img-alt>
                </div>
                {/* Main Image */}

                <div id="tap-head-info">
                  {/* Tap Type Icon */}
                  <div id="tap-type-icon-container">
                    <div id="tap-type-icon">
                      {this.props.resourceType === WATER_RESOURCE_TYPE ? (
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
                    <div id="tap-organization-name" data-cy="tap-organization-name">
                      {this.state.name}
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
            </Paper>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  showingInfoWindow: state.filterMarkers.showingInfoWindow,
  infoIsExpanded: state.filterMarkers.infoIsExpanded,
  infoWindowClass: state.filterMarkers.infoWindowClass,
  selectedPlace: state.filterMarkers.selectedPlace,
  resourceType: state.filterMarkers.resourceType,
  userLocation: state.filterMarkers.userLocation
});
const mapDispatchToProps = {
  toggleInfoExpanded,
  toggleInfoWindow,
  toggleInfoWindowClass
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SelectedTap));
