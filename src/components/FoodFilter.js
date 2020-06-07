import React from "react";
import { isMobile } from 'react-device-detect'
import icon from "./icons8-filter-mod.png";
import "./Filter.css";
import {
  OverlayTrigger,
  Popover,
  Form,
  Button,
  Row,
  Col
} from "react-bootstrap";
import { connect } from "react-redux";
import { setToggleStateFood, setFilteredFoodTypes, resetFilterFunction } from "../actions";

let icon_food_site = require('./images/food-marker-icons/food-site.png')
let icon_school = require('./images/food-marker-icons/school.png')
let icon_charter_school = require('./images/food-marker-icons/charter-school.png')
let icon_pha = require('./images/food-marker-icons/pha.png')
let icon_food_site_disabled = require ('./images/food-marker-icons/food-site-disabled.png')
let icon_school_disabled = require ('./images/food-marker-icons/school-disabled.png')
let icon_charter_school_disabled = require ('./images/food-marker-icons/charter-school-disabled.png')
let icon_pha_disabled = require ('./images/food-marker-icons/pha-disabled.png')
export class FoodFilter extends React.Component {

  handleChange(event) {
    if (event.target.id === "idRequired") {
      this.props.setToggleStateFood("idRequired", !this.props.idRequired);
    } else if (event.target.id === "kidOnly") {
      this.props.setToggleStateFood("kidOnly", !this.props.kidOnly);
    } else if (event.target.id === "openNow") {
        this.props.setToggleStateFood("openNow", !this.props.openNow)
    }
    else console.log("error with toggle");
  }

  render() {
    return (
      <div>
        <OverlayTrigger
          trigger="click"
          key="top"
          placement="top"
          overlay={
            <Popover id="popover-basic">
              <Popover.Content>
                {/* // Legend button filters for tap type */}
                <Row className="buttonRow">
                  <Col>
                    <Row className="legendRow">
                      <p className="tapName">FOOD SITE</p>
                      <div>
                        <img
                          className="tapIcon"
                          src={this.props.accessTypesHidden.includes("Food Site") ? icon_food_site_disabled : icon_food_site}
                          alt="blue"
                          onClick={() => this.props.setFilteredFoodTypes("Food Site")}
                        ></img>
                      </div>
                    </Row>
                    <Row className="legendRow">
                      <p className="tapName">SCHOOL</p>
                      <div>
                        <img
                          className="tapIcon"
                          src={this.props.accessTypesHidden.includes("School") ? icon_school_disabled : icon_school}
                          alt="green"
                          onClick={() => this.props.setFilteredFoodTypes("School")}
                        ></img>
                      </div>
                    </Row>
                    <Row className="legendRow">
                      <p className="tapName">CHARTER SCHOOL</p>
                      <div>
                        <img
                          className="tapIcon"
                          src={this.props.accessTypesHidden.includes("Charter School") ? icon_charter_school_disabled : icon_charter_school}
                          alt="yellow"
                          onClick={() => this.props.setFilteredFoodTypes("Charter School")}
                        ></img>
                      </div>
                    </Row>
                    <Row className="legendRow">
                      <p className="tapName">PHA</p>
                      <div>
                        <img
                          className="tapIcon"
                          src={this.props.accessTypesHidden.includes("PHA Community Center") ? icon_pha_disabled : icon_pha}
                          alt="red"
                          onClick={() => this.props.setFilteredFoodTypes("PHA Community Center")}
                        ></img>
                      </div>
                    </Row>
                  </Col>
                  <Col xs={1}>
                    <div className="filterDivider"></div>
                  </Col>

                  {/* Toggle Switches */}
                  <Col>
                    <Row className="legendRow filterRow">
                      <Form.Check.Label>Open Now</Form.Check.Label>
                      <Form.Check
                        type="switch"
                        id="openNow"
                        label=""
                        checked={this.props.openNow}
                        onClick={e => this.handleChange(e)}
                        readOnly
                      />
                    </Row>

                    <Row className="legendRow filterRow">
                      <Form.Check.Label>ID Required</Form.Check.Label>
                      <Form.Check
                        type="switch"
                        id="idRequired"
                        label=""
                        checked={this.props.idRequired}
                        onClick={e => this.handleChange(e)}
                        readOnly
                      />
                    </Row>

                    <Row className="legendRow filterRow">
                      <Form.Check.Label>Kids Only</Form.Check.Label>
                      <Form.Check
                        type="switch"
                        id="kidOnly"
                        label=""
                        checked={this.props.kidOnly}
                        onClick={e => this.handleChange(e)}
                        readOnly
                      />
                    </Row>
                  </Col>
                </Row>

                <Row className="resetButtonRow">
                  <div className="resetButton" onClick={() => this.props.resetFilterFunction()}>RESET</div>
                </Row>
              </Popover.Content>
            </Popover>
          }
        >

        <img
          src={icon}
          alt="filterImg"
          className="filterIcon"
          //   onClick={this.display}
          style={isMobile
            ? {top: '35%'}
            : this.props.showingInfoWindow
              ?{top: '75%', left: '30%'}
              :{top: '75%'}
          }
        />
        </OverlayTrigger>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  idRequired: state.foodFilters.idRequired,
  kidOnly: state.foodFilters.kidOnly,
  openNow: state.foodFilters.openNow,
  accessTypesHidden: state.foodFilters.accessTypesHidden,
  showingInfoWindow: state.showingInfoWindow
});

const mapDispatchToProps = {
  setFilteredFoodTypes,
  setToggleStateFood,
  resetFilterFunction
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodFilter);
