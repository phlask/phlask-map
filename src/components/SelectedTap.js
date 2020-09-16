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
import sampleImg from "./fountain.png";
import phlaskGreen from "./images/phlaskGreen.png";
import phlaskBlue from "./images/phlaskBlue.png";
import { hours } from "./hours.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretDown,
  faCaretUp,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import SelectedTapIcons from "./SelectedTapIcons";

const tempImages = {
  tapImg: sampleImg
};

class SelectedTap extends React.Component {
  refSelectedTap = React.createRef();
  refContentArea = React.createRef();

  state = {
    previewHeight: 0,
    infoExpansionStyle: {},
    isDescriptionShown: false,
    tapDescription: null,
    isHoursExpanded: false,
    animationSpeed: 600,
    currentDay: null,
    currentHour: "",
    currentMinute: "",
    hoursList: null,
    currentOrgHours: null,
    isOpen: null,
    organization: this.props.selectedPlace.organization,
    hours: this.props.selectedPlace.hours,
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
      this.setState({
        isHoursExpanded: false
      });
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
    const today = new Date();
    const currentDay = today.getDay();
    // const hour = today.getHours()
    // const getMinute = today.getMinutes()
    // console.log('Time: ' + today.getHours().toString() + today.getMinutes().toString());

    const selectedPlace = this.props.selectedPlace;

    this.setState({
      currentDay: currentDay,
      currentHour: hours.getHourFromMilitary(today.getHours()),
      currentMinute: today.getMinutes(),
      hoursList: selectedPlace.hours !== undefined ? this.getAllHours() : null,
      currentOrgHours:
        selectedPlace.hours !== undefined
          ? selectedPlace.hours[currentDay] !== undefined
            ? selectedPlace.hours[currentDay].open !== undefined &&
              selectedPlace.hours[currentDay].close !== undefined
              ? {
                  open: hours.getSimpleHours(
                    selectedPlace.hours[currentDay].open.time
                  ),
                  close: hours.getSimpleHours(
                    selectedPlace.hours[currentDay].close.time
                  )
                }
              : false
            : false
          : null,
      organization: selectedPlace.organization,
      address: selectedPlace.address,
      isOpen:
        selectedPlace.hours !== undefined
          ? selectedPlace.hours[currentDay]
            ? selectedPlace.hours[currentDay].close !== undefined &&
              selectedPlace.hours[currentDay].open !== undefined
              ? hours.checkOpen(
                  selectedPlace.hours[currentDay].open.time,
                  selectedPlace.hours[currentDay].close.time
                )
              : false
            : false
          : null,
      tapDescription:
        selectedPlace.description !== undefined
          ? selectedPlace.description
          : null
    });
  }

  /* Return an array of objects containing Day of the week, open time, 
        and closing time, starting with the current day
     */
  getAllHours() {
    const selectedPlace = this.props.selectedPlace;

    if (selectedPlace.hours === undefined) {
      return null;
    } else {
      const hoursList = [];

      selectedPlace.hours.map((orgHours, index) => {
        const formattedHours = {
          day: hours.getDays(index),
          open:
            orgHours.open !== undefined
              ? hours.getSimpleHours(orgHours.open.time)
              : null,
          close:
            orgHours.close !== undefined
              ? hours.getSimpleHours(orgHours.close.time)
              : null
        };
        hoursList.push(formattedHours);
      });

      // Shift array so current day is first
      const date = new Date();
      const day = date.getDay();
      for (let x = 0; x < day; x++) {
        hoursList.push(hoursList.shift());
      }

      return hoursList;
    }
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
        if (this.props.selectedPlace.hours !== undefined) {
          // console.log('Did Update. Props: ' + this.props.selectedPlace);
        }
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

              {/* Hours */}
              <div id="org-hours">
                <div
                  id="tap-info-org-status"
                  style={
                    this.state.isOpen
                      ? { color: "green" }
                      : this.state.isOpen !== null
                      ? { color: "red" }
                      : { color: "orange" }
                  }
                >
                  {this.state.isOpen
                    ? "Open"
                    : this.state.isOpen !== null
                    ? "Closed"
                    : "unavailable"}
                </div>
                {this.state.currentOrgHours && (
                  <div id="hours-area">
                    {/* Placeholder for Dropdown */}

                    <div
                      id="tap-info-hours-container-placeholder"
                      style={
                        this.state.currentOrgHours !== null
                          ? { border: "1px solid #c4c4c4" }
                          : {}
                      }
                    >
                      <div className="tap-hours-list-item">Placeholder</div>
                      {/* <div className='hours-dropdown-arrow-container' style={{width: this.props.infoIsExpanded ? '20px' : '0' }}>
                                            <img className='hours-dropdown-arrow' src={hoursArrow} alt=''></img>
                                        </div> */}
                    </div>

                    {/* Container of all visible hours elements */}
                    <div
                      id="tap-info-hours-container"
                      style={
                        this.state.currentOrgHours !== null
                          ? { border: "1px solid #c4c4c4" }
                          : {}
                      }
                    >
                      {/* Placeholder for Dropdown */}
                      <div id="current-hours-placeholder">
                        <div className="tap-hours-list-item">
                          {this.state.currentOrgHours !== null
                            ? this.state.currentOrgHours !== false
                              ? `${this.state.currentOrgHours.open} - ${this.state.currentOrgHours.close}`
                              : ""
                            : ""}
                        </div>
                        {(this.props.infoIsExpanded || !isMobile) &&
                          this.state.hoursList !== null &&
                          this.state.currentOrgHours !== false && (
                            <div className={styles.hoursDropdownArrowContainer}>
                              <FontAwesomeIcon
                                className={styles.hoursDropdownArrow}
                                color="#999"
                                size="2x"
                                icon={faCaretDown}
                              />
                            </div>
                          )}
                      </div>

                      {/* Current Day Hours */}
                      <div
                        id="current-hours"
                        onClick={() => {
                          if (this.props.infoIsExpanded || !isMobile) {
                            this.setState({
                              isHoursExpanded: !this.state.isHoursExpanded
                            });
                          }
                        }}
                      >
                        <div className="tap-hours-list-item">
                          {this.state.currentOrgHours !== null
                            ? this.state.currentOrgHours !== false
                              ? `${this.state.currentOrgHours.open} - ${this.state.currentOrgHours.close}`
                              : ""
                            : ""}
                        </div>
                        {(this.props.infoIsExpanded || !isMobile) &&
                          this.state.hoursList !== null &&
                          this.state.currentOrgHours !== false && (
                            <div className={styles.hoursDropdownArrowContainer}>
                              <FontAwesomeIcon
                                className={styles.hoursDropdownArrow}
                                color="#999"
                                size="2x"
                                icon={faCaretDown}
                              />
                            </div>
                          )}
                      </div>
                      {/* Other Days */}
                      {this.state.isHoursExpanded &&
                      (this.props.infoIsExpanded || !isMobile) ? (
                        <div id="other-hours-container">
                          {this.state.hoursList !== null ? (
                            this.state.hoursList.map((hours, index) => {
                              if (index !== 0) {
                                return (
                                  <div
                                    className="tap-hours-list-item"
                                    key={index}
                                  >
                                    {`${hours.day} ${hours.open} - ${hours.close}`}
                                  </div>
                                );
                              }
                            })
                          ) : (
                            <div className="tap-hours-list-item">n/a</div>
                          )}
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                )}
              </div>
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
                        {this.state.tapDescription !== null ||
                        this.state.tapDescription !== undefined
                          ? this.state.tapDescription.length > 0
                            ? this.state.tapDescription
                            : "Happy Phlasking"
                          : this.state.organization !== null ||
                            this.state.organization !== undefined
                          ? this.state.organization
                          : "Happy Phlasking"}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className={styles.description}>
                    <div id="tap-info-description">
                      {this.state.tapDescription !== null &&
                      this.state.tapDescription !== undefined
                        ? this.state.tapDescription.length > 0
                          ? this.state.tapDescription
                          : "Happy Phlasking"
                        : this.state.organization !== null &&
                          this.state.organization !== undefined
                        ? this.state.organization
                        : "Happy Phlasking"}
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
