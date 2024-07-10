import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { isResourceMenuShownSelector } from '../../hooks/selectors';
import useIsMobile from 'hooks/useIsMobile';
import { toggleResourceMenu, toggleResourceType } from 'actions/actions';

const ListItemEntry = ({ resourceType, icon, actionLabel }) => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const isResourceMenuShown = useSelector(isResourceMenuShownSelector);

  const switchType = type => {
    dispatch(
      toggleResourceType({
        resourceType: type,
        infoWindowClass: isMobile
          ? 'info-window-out'
          : 'info-window-out-desktop'
      })
    );
    dispatch(toggleResourceMenu({ isShown: isResourceMenuShown }));
  };

  return (
    <ListItemButton
      sx={{ alignItems: 'end' }}
      onClick={() => {
        switchType(actionLabel);
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>
        <Grid container justifyContent={'flex-start'}>
          <Box mx={1.25} bgcolor={'white'} p={0.25} borderRadius={1} px={1}>
            <Typography variant="body1" fontSize={15}>
              {resourceType}
            </Typography>
          </Box>
        </Grid>
      </ListItemText>
    </ListItemButton>
  );
};

export default ListItemEntry;
