/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import { connect } from "react-redux";
import foodButton from "./images/foodButton.png";
import waterButton from "./images/phlaskBlue.png";
import "./TypeToggle.css";
import {
  togglePhlaskType,
  PHLASK_TYPE_WATER,
  PHLASK_TYPE_FOOD
} from "../../actions/actions";

function TypeToggle(props) {
  const [phlaskTypeIcon, setTypeIcon] = useState(foodButton);
  function switchType(type) {
    setTypeIcon(type);
    phlaskTypeIcon === foodButton
      ? // Set to food mode
        props.togglePhlaskType(PHLASK_TYPE_FOOD)
      : // Set to water mode
        props.togglePhlaskType(PHLASK_TYPE_WATER);
  }

  return (
    <div id="phlask-toggle-container">
      <div id="phlask-toggle-btn">
        <img
          id="phlask-icon"
          alt=""
          src={phlaskTypeIcon}
          onClick={() => {
            switchType(
              phlaskTypeIcon === waterButton ? foodButton : waterButton
            );
          }}
        ></img>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  togglePhlaskType,
  PHLASK_TYPE_FOOD,
  PHLASK_TYPE_WATER
};

export default connect(null, mapDispatchToProps)(TypeToggle);
