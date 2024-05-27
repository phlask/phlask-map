/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import foodButton from './images/foodButton.png';
import waterButton from './images/phlaskBlue.png';
import './TypeToggle.css';
import {
  toggleResourceType
} from '../../actions/actions';
import {
  WATER_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE
} from '../../types/ResourceEntry';

function TypeToggle(props) {
  const [resourceTypeIcon, setTypeIcon] = useState(foodButton);
  function switchType(type) {
    setTypeIcon(type);
    resourceTypeIcon === foodButton
      ? // Set to food mode
        props.toggleResourceType(FOOD_RESOURCE_TYPE)
      : // Set to water mode
        props.toggleResourceType(WATER_RESOURCE_TYPE);
  }

  return (
    <div id="phlask-toggle-container">
      <div id="phlask-toggle-btn">
        <img
          id="phlask-icon"
          alt=""
          src={resourceTypeIcon}
          onClick={() => {
            switchType(
              resourceTypeIcon === waterButton ? foodButton : waterButton
            );
          }}
        ></img>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  toggleResourceType,
  PHLASK_TYPE_FOOD,
  PHLASK_TYPE_WATER
};

export default connect(null, mapDispatchToProps)(TypeToggle);
