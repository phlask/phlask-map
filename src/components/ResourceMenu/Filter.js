import React from "react";
import ReactGA from "react-ga";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import styles from "./Filter.module.scss";
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
  setToggleState,
  setFilteredTapTypes,
  resetFilterFunction
} from "../../actions/actions";
import phlaskFilterIcon from "../icons/PhlaskFilterIcon";

export class Filter extends React.Component {
  handleChange(event) {
    if (event.target.id === "filtered") {
      this.props.setToggleState("filtered", !this.props.filtered);
    } else if (event.target.id === "ada") {
      this.props.setToggleState("handicap", !this.props.handicap);
    } else if (event.target.id === "sparkling") {
      this.props.setToggleState("sparkling", !this.props.sparkling);
    } else if (event.target.id === "openNow") {
      this.props.setToggleState("openNow", !this.props.openNow);
    } else console.log("error with toggle");
    this.handleGA(event.target.id, !this.props[event.target.id]);
  }

  handleGA(id, state) {
    ReactGA.event({
      category: `Toolbar`,
      action: "FilterUpdate",
      label: `${id} = ${state} `
    });
  }

  render() {
    return (
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
            <Popover.Body>
              {/* // Legend button filters for tap type */}
              <Row className={styles.buttonRow}>
                <Col>
                  <Row className={styles.legendRow}>
                    <button
                      className={
                        this.props.accessTypesHidden.includes("Public")
                          ? styles.disabledTapButton
                          : styles.tapButton
                      }
                      onClick={() => this.props.setFilteredTapTypes("Public")}
                    >
                      PUBLIC
                      <img
                        className={styles.tapIcon}
                        src={phlaskFilterIcon(
                          this.props.accessTypesHidden.includes("Public")
                            ? "disabled"
                            : "Public",
                          35,
                          35
                        )}
                        alt="Public"
                      ></img>
                    </button>
                  </Row>
                  <Row className={styles.legendRow}>
                    <button
                      className={
                        this.props.accessTypesHidden.includes("Private-Shared")
                          ? styles.disabledTapButton
                          : styles.tapButton
                      }
                      onClick={() =>
                        this.props.setFilteredTapTypes("Private-Shared")
                      }
                    >
                      SHARED
                      <img
                        className={styles.tapIcon}
                        src={phlaskFilterIcon(
                          this.props.accessTypesHidden.includes(
                            "Private-Shared"
                          )
                            ? "disabled"
                            : "Private-Shared",
                          35,
                          35
                        )}
                        alt="Private-Shared"
                      ></img>
                    </button>
                  </Row>
                  <Row className={styles.legendRow}>
                    <button
                      className={
                        this.props.accessTypesHidden.includes("Private")
                          ? styles.disabledTapButton
                          : styles.tapButton
                      }
                      onClick={() => this.props.setFilteredTapTypes("Private")}
                    >
                      PRIVATE
                      <img
                        className={styles.tapIcon}
                        src={phlaskFilterIcon(
                          this.props.accessTypesHidden.includes("Private")
                            ? "disabled"
                            : "Private",
                          35,
                          35
                        )}
                        alt="Private"
                      ></img>
                    </button>
                  </Row>
                  <Row className={styles.legendRow}>
                    <button
                      className={
                        this.props.accessTypesHidden.includes("Restricted")
                          ? styles.disabledTapButton
                          : styles.tapButton
                      }
                      onClick={() =>
                        this.props.setFilteredTapTypes("Restricted")
                      }
                    >
                      RESTRICTED
                      <img
                        className={styles.tapIcon}
                        src={phlaskFilterIcon(
                          this.props.accessTypesHidden.includes("Restricted")
                            ? "disabled"
                            : "Restricted",
                          35,
                          35
                        )}
                        alt="Restricted"
                      ></img>
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
                    <Form.Check.Label>ADA Accessible</Form.Check.Label>
                    <Form.Check
                      type="switch"
                      id="ada"
                      label=""
                      checked={this.props.handicap}
                      onClick={e => this.handleChange(e)}
                      readOnly
                    />
                  </Row>

                  <Row className={`${styles.legendRow} ${styles.filterRow}`}>
                    <Form.Check.Label>Filtered Water</Form.Check.Label>
                    <Form.Check
                      type="switch"
                      id="filtered"
                      label=""
                      checked={this.props.filtered}
                      onClick={e => this.handleChange(e)}
                      readOnly
                    />
                  </Row>

                  <Row className={`${styles.legendRow} ${styles.filterRow}`}>
                    <Form.Check.Label>Sparkling Water</Form.Check.Label>
                    <Form.Check
                      type="switch"
                      id="sparkling"
                      label=""
                      checked={this.props.sparkling}
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
            </Popover.Body>
          </Popover>
        }
      >
        <div /* Div used to avoid forwardRef error that would appear */>
          <FontAwesomeIcon
            icon={faSlidersH}
            className={styles.filterIcon}
            size="3x"
            color="#999"
          />
        </div>
      </OverlayTrigger>
    );
  }
}

const mapStateToProps = state => ({
  filtered: state.tapFilters.filtered,
  handicap: state.tapFilters.handicap,
  sparkling: state.tapFilters.sparkling,
  openNow: state.tapFilters.openNow,
  accessTypesHidden: state.tapFilters.accessTypesHidden,
  showingInfoWindow: state.showingInfoWindow
});

const mapDispatchToProps = {
  setFilteredTapTypes,
  setToggleState,
  resetFilterFunction
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
