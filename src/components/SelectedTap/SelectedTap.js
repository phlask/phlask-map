/* eslint-disable no-console */
import React from "react";
import ReactGA from "react-ga";
import { connect } from "react-redux";
import {
  toggleInfoExpanded,
  toggleInfoWindow,
  toggleInfoWindowClass,
  PHLASK_TYPE_WATER
} from "../../actions/actions";
import { isMobile } from "react-device-detect";
// import { connect } from 'react-redux'
import "./SelectedTap.css";
import styles from "./SelectedTap.module.scss";
import sampleImg from "../images/phlask-tessellation.png";
import sampleImg2x from "../images/phlask-tessellation@2x.png";
import phlaskGreen from "../images/phlaskGreen.png";
import phlaskBlue from "../images/phlaskBlue.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretDown,
  faCaretUp,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import SelectedTapIcons from "../SelectedTapIcons/SelectedTapIcons";
import SelectedTapHours from "../SelectedTapHours/SelectedTapHours";
import { Drawer } from "@mui/material";

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
    walkingDistance: 0
  };

  componentWillUnmount() {
    console.log("unmounting");
  }

  getWalkingDurationAndTimes = () => {
    const orsAPIKey =
      "5b3ce3597851110001cf6248ac903cdbe0364ca9850aa85cb64d8dfc";
    fetch(`https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${orsAPIKey}&start=${this.props.userLocation.lng},
    ${this.props.userLocation.lat}&end=${this.props.selectedPlace.lon},${this.props.selectedPlace.lat}`)
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

  toggleInfoWindow(shouldShow) {
    this.props.toggleInfoWindowClass(shouldShow);
    // Animate in
    if (shouldShow) {
      this.props.toggleInfoWindow(shouldShow);
    }
    // Animate Out
    else {
      setTimeout(() => {
        this.props.toggleInfoWindow(false);
      }, this.state.animationSpeed);
    }
  }

  animateInfoExpansion(shouldExpand) {
    // if(shouldExpand){
    //     this.refContentArea.current.scrollTop = 0
    // }
    this.setState(
      {
        infoExpansionStyle: {
          height: shouldExpand ? "80%" : this.state.previewHeight
          // : '40vh'
        }
      },
      () => {
        this.props.toggleInfoExpanded(shouldExpand);
      }
    );
  }

  handleSwipe(direction) {
    if (direction === "top") {
      // console.log('Top')
      this.toggleInfoExpanded(true);
    } else if (direction === "bottom") {
      // console.log('Bottom');
      this.toggleInfoExpanded(false);
    } else if (direction === "left") {
      // console.log('Left');
    } else if (direction === "right") {
      // console.log('Right');
    }
  }

  handleGA() {
    console.log(this.props.selectedPlace);
    ReactGA.event({
      category: `Tap - ${this.props.phlaskType}`,
      action: "InfoShown",
      label: `${this.props.selectedPlace.organization}, ${this.props.selectedPlace.address}`
    });
  }

  // Handle Times

  setCurrentDate() {
    const selectedPlace = this.props.selectedPlace;

    this.setState({
      organization: selectedPlace.organization,
      address: selectedPlace.address,
      tapDescription: selectedPlace.description
        ? selectedPlace.description
        : "Happy PHLasking",
      tapStatement: selectedPlace.statement,
      tapNormsAndRules: selectedPlace.norms_rules
    });
  }

  // getAccess(){
  //     if(this.props.selectedPlace.access === undefined || this.props.selectedPlace.access.length === 0){
  //         console.log('Access is not defined for this entry');
  //         return null
  //     }
  //     else {
  //         let access = tempUnverified
  //         switch(this.props.selectedPlace.access){
  //             case 'Public': access = phlaskBlue
  //                 break
  //             case 'Semi-public': access = phlaskGreen
  //                 break
  //             case 'Private-Shared': access = phlaskGreen
  //                 break
  //             case 'Private': access = phlaskYellow
  //                 break
  //             case 'Restricted': access = phlaskRed
  //                 break
  //             case 'Unverified': access = tempUnverified
  //                 break
  //             // case 'TrashAcademy': access = trashAcademyIcon
  //             //     break
  //             // case 'Water Monsters': access = waterMonstersIcon
  //             //     break
  //         }
  //         return this.props.selectedPlace.icon
  //     }
  // }

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
    console.log("Showing Info Window: " + this.props.showingInfoWindow);
  }

  componentDidMount() {
    this.setCurrentDate();
    // console.log('Height: ' + this.refSelectedTap.current.clientHeight);

    // this.setState({
    //     previewHeight: this.refSelectedTap.current.clientHeight,
    //     infoExpansionStyle: {
    //         height: this.refSelectedTap.current.clientHeight
    //     }
    // })
  }

  render() {
    if (this.props.showingInfoWindow) {
      return (
        <div>
        {isMobile && (
          <div ref={this.refSelectedTap} id="tap-info-container-mobile">
          <Drawer
            anchor="bottom">
            Amet incididunt ad mollit do labore exercitation do ipsum duis eu fugiat voluptate consectetur deserunt. Ipsum aliqua culpa adipisicing ea ad. Deserunt labore aute quis aliquip. Sit velit sint reprehenderit excepteur id commodo pariatur nostrud fugiat elit nisi. Minim cillum qui consequat ut. Ut id aliquip tempor do.

Ullamco tempor aute laborum nisi id nostrud laborum exercitation magna. Nisi enim cillum tempor occaecat aliqua labore id mollit sunt elit quis dolore. Deserunt ad occaecat elit sit irure irure laboris laborum velit ut eiusmod aliqua labore deserunt. Officia laborum ut nostrud minim ex commodo eu tempor anim aliqua. Cillum in consequat eiusmod nulla sunt excepteur.

Qui sint cillum aliquip sunt dolore tempor in. Excepteur Lorem deserunt pariatur nisi est sint. Lorem nulla proident incididunt commodo adipisicing irure mollit reprehenderit aliquip fugiat pariatur magna aliqua et. Elit ea eiusmod enim id et do nulla aute nisi sunt veniam.

Esse elit pariatur est veniam ut commodo. Ipsum quis commodo id cupidatat sunt do pariatur ut. Do veniam tempor reprehenderit id sunt irure culpa consequat. Ullamco sunt sit dolore reprehenderit occaecat eu. Tempor ullamco labore incididunt culpa pariatur labore laboris non ut. In proident duis ad aute sunt dolor voluptate est duis ipsum ea reprehenderit cillum. Do ullamco quis veniam laborum nulla tempor reprehenderit ipsum sint occaecat.
          </Drawer>
          </div>
        )}
        {!isMobile && (
        <div
          ref={this.refSelectedTap}
          id={isMobile ? "tap-info-container-mobile" : "tap-info-container"}
          className={`${this.props.infoWindowClass} ${
            isMobile ? styles.mobileContainer : styles.desktopContainer
          }`}
          style={isMobile ? this.state.infoExpansionStyle : {}}
        >
          {isMobile && (
            <div className={styles.mobileButtons}>
              {!this.state.isDescriptionShown ? (
                <button
                  aria-label="show description"
                  className={styles.mobileButton}
                  onClick={() => {
                    this.toggleInfoExpanded(true);
                  }}
                >
                  <FontAwesomeIcon color="#fff" size="2x" icon={faCaretUp} />
                </button>
              ) : (
                <button
                  aria-label="hide description"
                  className={styles.mobileButton}
                  onClick={() => {
                    this.toggleInfoExpanded(false);
                  }}
                >
                  <FontAwesomeIcon color="#fff" size="2x" icon={faCaretDown} />
                </button>
              )}
              <button
                aria-label="close"
                className={styles.mobileButton}
                onClick={() => {
                  this.toggleInfoWindow(false);
                }}
              >
                <FontAwesomeIcon color="#fff" size="2x" icon={faTimes} />
              </button>
            </div>
          )}
          {!isMobile && (
            <button
              className={styles.closeButton}
              aria-label="Close"
              onClick={() => {
                this.toggleInfoWindow(false);
              }}
            >
              <div id="close-arrow-desktop" className={styles.closeIconWrapper}>
                <FontAwesomeIcon
                  className={styles.closeIcon}
                  color="#999"
                  icon={faCaretLeft}
                />
              </div>
            </button>
          )}

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

            <div
              id={isMobile ? "tap-info-img-box" : "tap-info-img-box-desktop"}
            >
              <img
                id="tap-info-img"
                // src={this.props.displayImg}
                src={tempImages.tapImg}
                srcSet={tempImages.tapImg + ", " + tempImages.tapImg2x + " 2x"}
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
                      src={this.props.selectedPlace.infoIcon}
                      alt=""
                    ></img>
                  ) : (
                    this.props.selectedPlace.infoIcon
                  )}
                </div>
              </div>

              {/* Name & Address */}
              <div
                id={
                  isMobile
                    ? "org-name-and-address"
                    : "org-name-and-address-desktop"
                }
              >
                <div id="tap-organization-name">{this.state.organization}</div>
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
              {isMobile ? (
                <div id="arrow-description-toggle">
                  {this.state.isDescriptionShown && (
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
                  )}
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
        )}
        </div>
      );
    } else {
      return null;
    }
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
