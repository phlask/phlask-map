import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as FoodIcon } from '../icons/FoodIconV2.svg';
import { ReactComponent as ForagingIcon } from '../icons/ForagingIconV2.svg';
import { ReactComponent as ToiletIcon } from '../icons/ToiletIconV2.svg';
import { ReactComponent as WaterIcon } from '../icons/WaterIconV2.svg';
import MobileResourceEntry from './MobileResourceEntry';
import {
  setToolbarModal,
  TOOLBAR_MODAL_NONE,
  TOOLBAR_MODAL_RESOURCE
} from '../../actions/actions';
import {
  WATER_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  BATHROOM_RESOURCE_TYPE
} from '../../types/ResourceEntry';


const resourceTypeInfo = [
  {
    resourceType: WATER_RESOURCE_TYPE,
    resourceTextLabel: 'Water',
    icon: <WaterIcon />,
  },
  {
    resourceType: FOOD_RESOURCE_TYPE,
    resourceTextLabel: 'Food',
    icon: <FoodIcon />,
  },
  {
    resourceType: FORAGE_RESOURCE_TYPE,
    resourceTextLabel: 'Foraging',
    icon: <ForagingIcon />,
  },
  {
    resourceType: BATHROOM_RESOURCE_TYPE,
    resourceTextLabel: 'Bathroom',
    icon: <ToiletIcon />,
  }
];

const MobileChooseResourceType = (props) => {

  const dispatch = useDispatch();

  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);

  return (
    <Box>
      <Dialog
        BackdropProps={{ transitionDuration: 400 }}
        open={toolbarModal === TOOLBAR_MODAL_RESOURCE}
        onClose={() => dispatch(setToolbarModal(TOOLBAR_MODAL_NONE))}
        PaperProps={{
          style: {
            background: 'transparent',
            overflow: 'visible',
            boxShadow: 'none',
            position: 'absolute',
            bottom: '0vh',
            left: '0vh',
            transform: 'translate(-13%, -28%)'
          }
        }}
      >
        <Slide
          direction="up"
          in={toolbarModal === TOOLBAR_MODAL_RESOURCE}
          mountOnEnter
          unmountOnExit
        >
          <List sx={{ maxWidth: 210 }}>
            {resourceTypeInfo?.map(entry => (
              <MobileResourceEntry key={entry.resourceType} {...entry} />
            ))}
          </List>
        </Slide>
      </Dialog>
    </Box >
  );
};

export default MobileChooseResourceType;
