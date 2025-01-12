import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';

import {
  setResourceType,
  setToolbarModal,
  TOOLBAR_MODAL_NONE,
  TOOLBAR_MODAL_RESOURCE
} from '../../actions/actions';

const MobileResourceButton = props => {
  const dispatch = useDispatch();

  function handleGA(type) {
    // ReactGA.event({
    //   category: `ResourceMenu`,
    //   action: 'MapChangedTo',
    //   label: `${type}`
    // });
  }

  const switchType = type => {
    handleGA(type);
    dispatch(setResourceType(type));
    dispatch(setToolbarModal(TOOLBAR_MODAL_NONE));
  };

  return (
    <ListItemButton
      sx={{ alignItems: 'end' }}
      onClick={() => {
        props.clearAllTags();
        switchType(props.type);
      }}
    >
      <ListItemIcon>
        <props.mobileIcon />
      </ListItemIcon>
      <ListItemText>
        <Grid container justifyContent={'flex-start'}>
          <Box mx={1.25} bgcolor={'white'} p={0.25} borderRadius={1} px={1}>
            <Typography variant="body1" fontSize={15}>
              {props.textLabel}
            </Typography>
          </Box>
        </Grid>
      </ListItemText>
    </ListItemButton>
  );
};

const MobileChooseResourceType = props => {
  const dispatch = useDispatch();
  const toolbarModal = useSelector(state => state.filterMarkers.toolbarModal);

  return (
    <Box>
      <Dialog
        BackdropProps={{ transitionDuration: 400 }}
        open={toolbarModal === TOOLBAR_MODAL_RESOURCE}
        onClose={() => dispatch(setToolbarModal(TOOLBAR_MODAL_NONE))}
        PaperProps={{
          sx: {
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
            {props.resourceTypeInfo.map(entry => (
              <MobileResourceButton key={entry.type} {...entry} clearAllTags={props.clearAllTags} />
            ))}
          </List>
        </Slide>
      </Dialog>
    </Box>
  );
};

export default MobileChooseResourceType;
