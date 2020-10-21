/* eslint-disable no-console */
import React from "react";
import { connect } from "react-redux";
import {
  toggleInfoExpanded,
  toggleInfoWindow,
  toggleInfoWindowClass,
  PHLASK_TYPE_WATER
} from "../actions";
import { isMobile } from "react-device-detect";
// import { connect } from 'react-redux'
import "./SelectedTap.css";
import styles from "./SelectedTap.module.scss";
import sampleImg from "./images/phlask-tessellation.png";
import sampleImg2x from "./images/phlask-tessellation@2x.png";
import phlaskGreen from "./images/phlaskGreen.png";
import phlaskBlue from "./images/phlaskBlue.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretDown,
  faCaretUp,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import SelectedTapIcons from "./SelectedTapIcons";
import SelectedTapHours from "./SelectedTapHours";

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
    }
  };

  componentWillUnmount() {
    console.log("unmounting");
  }

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
            {/* Walk Time & Info Icons */}
            <div className={styles.walkTime}>Estimated Walk Time: 12 mins</div>
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
  phlaskType: state.phlaskType
});
const mapDispatchToProps = {
  toggleInfoExpanded,
  toggleInfoWindow,
  toggleInfoWindowClass
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedTap);
