import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {ReactComponent as ResourceIcon} from '../icons/ResourceIcon.svg'
import {ReactComponent as WaterIcon} from '../icons/WaterIcon.svg'
import {ReactComponent as ContributeIcon} from '../icons/ContributeIcon.svg'
import styles from "./Toolbar.module.scss";
import {useSelector, useDispatch} from 'react-redux'
import {getClosest} from './distanceFunctions'
export default function SimpleBottomNavigation() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const store = useSelector((state) => state);
  const selectedPlace = useSelector((state) => state.selectedPlace);
  const userLocation = useSelector((state) => state.userLocation);
  const allTaps = useSelector(state => state.allTaps);

  const setClosest = () => {
    const closestTap = getClosest(allTaps, userLocation);
    dispatch({ type: "SET_SELECTED_TAP", closestTap });
    dispatch({ type: "SET_MAP_CENTER", coords: { lat: closestTap.lat, lng: closestTap.lon } });
    dispatch({ type: "SET_SELECTED_PLACE", selectedPlace: allTaps[closestTap.id] });
    dispatch({ type: "TOGGLE_INFO_WINDOW", isShown: true });
  }


  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {console.log(store)}
        <BottomNavigationAction
          label="Resources"
          icon={<ResourceIcon className={styles.resourceButton} />}
        />
        <BottomNavigationAction
          label="PHLASK"
          icon={<WaterIcon className={styles.PHLASKButton} />}
          onClick={setClosest}
        />
        <BottomNavigationAction
          label="Contribute"
          icon={<ContributeIcon className={styles.contributeButton} />}
        />
      </BottomNavigation>
    </Box>
  );
}

