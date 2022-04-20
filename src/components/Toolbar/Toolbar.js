import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {ReactComponent as ResourceIcon} from '../icons/ResourceIcon.svg'
import {ReactComponent as WaterIcon} from '../icons/WaterIcon.svg'
import {ReactComponent as ContributeIcon} from '../icons/ContributeIcon.svg'
import styles from "./Toolbar.module.scss";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}

      >
        <BottomNavigationAction label="Resources" icon={<ResourceIcon className={styles.resourceButton} />} />
        <BottomNavigationAction label="PHLASK" icon={<WaterIcon className={styles.PHLASKButton} />} />
        <BottomNavigationAction label="Contribute" icon={<ContributeIcon className={styles.contributeButton} />} />
      </BottomNavigation>
    </Box>
  );
}

