import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ResourceIcon from '../icons/ResourceIcon';
import WaterIcon from '../icons/WaterIcon';
import ContributeIcon from '../icons/ContributeIcon';
import styles from "./Toolbar.module.scss";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}

      >
        <BottomNavigationAction label="Resources" icon={<ResourceIcon />} />
        <BottomNavigationAction label="PHLASK" icon={<WaterIcon className={styles.PHLASKbutton}/>} />
        <BottomNavigationAction label="Contribute" icon={<ContributeIcon />} />
      </BottomNavigation>
    </Box>
  );
}

