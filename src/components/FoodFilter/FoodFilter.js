import React from "react";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import FoodOtherFilterIcon from "../icons/FoodOtherFilterIcon";
import FoodSchoolFilterIcon from "../icons/FoodSchoolFilterIcon";
import FoodRecreationFilterIcon from "../icons/FoodRecreationFilterIcon";
import FoodCongregationFilterIcon from "../icons/FoodCongregationFilterIcon";
import styles from "../Filter/Filter.module.scss";
import {
  OverlayTrigger,
  Popover,
  Form,
  Button,
  Row,
  Col
} from "react-bootstrap";
import { connect } from "react-redux";
import {
  setToggleStateFood,
  setFilteredFoodTypes,
  resetFilterFunction
} from "../../actions/actions";

export class FoodFilter extends React.Component {
  handleChange(event) {
    if (event.target.id === "idRequired") {
      this.props.setToggleStateFood("idRequired", !this.props.idRequired);
    } else if (event.target.id === "kidOnly") {
      this.props.setToggleStateFood("kidOnly", !this.props.kidOnly);
    } else if (event.target.id === "openNow") {
      this.props.setToggleStateFood("openNow", !this.props.openNow);
    } else console.log("error with toggle");
  }

  render() {
    return (
      <div>
        <OverlayTrigger
          trigger="click"
          key="top"
          placement={isMobile ? "top" : "top-end"}
          overlay={
            <Popover
              className={`${styles.filterPopover} ${
                isMobile ? styles.mobilePopover : styles.desktopPopover
              }`}
            >
              <Popover.Content>
                {/* // Legend button filters for tap type */}
                <Row className={styles.buttonRow}>
                  <Col>
                    <Row className={styles.legendRow}>
                      <button
                        className={
                          this.props.accessTypesHidden.includes("Food Site")
                            ? styles.disabledTapButton
                            : styles.tapButton
                        }
                        onClick={() =>
                          this.props.setFilteredFoodTypes("Food Site")
                        }
                      >
                        OTHER
                        <FoodOtherFilterIcon
                          disabled={this.props.accessTypesHidden.includes(
                            "Food Site"
                          )}
                        />
                      </button>
                    </Row>
                    <Row className={styles.legendRow}>
                      <button
                        className={
                          this.props.accessTypesHidden.includes("School")
                            ? styles.disabledTapButton
                            : styles.tapButton
                        }
                        onClick={() =>
                          this.props.setFilteredFoodTypes("School")
                        }
                      >
                        SCHOOL
                        <FoodSchoolFilterIcon
                          disabled={this.props.accessTypesHidden.includes(
                            "School"
                          )}
                        ></FoodSchoolFilterIcon>
                      </button>
                    </Row>
                    <Row className={styles.legendRow}>
                      <button
                        className={
                          this.props.accessTypesHidden.includes(
                            "Charter School"
                          )
                            ? styles.disabledTapButton
                            : styles.tapButton
                        }
                        onClick={() =>
                          this.props.setFilteredFoodTypes("Charter School")
                        }
                      >
                        RECREATION
                        <FoodRecreationFilterIcon
                          disabled={this.props.accessTypesHidden.includes(
                            "Charter School"
                          )}
                        ></FoodRecreationFilterIcon>
                      </button>
                    </Row>
                    <Row className={styles.legendRow}>
                      <button
                        className={
                          this.props.accessTypesHidden.includes(
                            "PHA Community Center"
                          )
                            ? styles.disabledTapButton
                            : styles.tapButton
                        }
                        onClick={() =>
                          this.props.setFilteredFoodTypes(
                            "PHA Community Center"
                          )
                        }
                      >
                        CONGREGATION
                        <FoodCongregationFilterIcon
                          disabled={this.props.accessTypesHidden.includes(
                            "PHA Community Center"
                          )}
                        ></FoodCongregationFilterIcon>
                      </button>
                    </Row>
                  </Col>

                  {/* Toggle Switches */}
                  <Col>
                    <Row className={`${styles.legendRow} ${styles.filterRow}`}>
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

                    <Row className={`${styles.legendRow} ${styles.filterRow}`}>
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

                    <Row className={`${styles.legendRow} ${styles.filterRow}`}>
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

                <Row className={styles.resetButtonRow}>
                  <Button
                    variant="secondary"
                    className={styles.resetButton}
                    onClick={() => this.props.resetFilterFunction()}
                  >
                    Reset
                  </Button>
                </Row>
              </Popover.Content>
            </Popover>
          }
        >
          <FontAwesomeIcon
            icon={faSlidersH}
            className={styles.filterIcon}
            size="3x"
            color="#999"
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
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodFilter);
