/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import foodButton from './images/foodButton.png';
import waterButton from './images/phlaskBlue.png';
import './TypeToggle.css';
import { toggleResourceType } from '../../actions/actions';
import {
  WATER_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE
} from '../../types/ResourceEntry';

function TypeToggle() {
  const dispatch = useDispatch();
  const [resourceTypeIcon, setTypeIcon] = useState(foodButton);
  function switchType(type) {
    setTypeIcon(type);
    resourceTypeIcon === foodButton
      ? // Set to food mode
        dispatch(toggleResourceType({ resourceType: FOOD_RESOURCE_TYPE }))
      : // Set to water mode
        dispatch(toggleResourceType({ resourceType: WATER_RESOURCE_TYPE }));
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

export default TypeToggle;
