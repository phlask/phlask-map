import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Box
} from '@mui/material';
import CloseIcon from 'icons/CloseIcon';
import PhlaskNoTextIcon from 'icons/PhlaskNoText';
import PhlaskIcon from 'icons/PhlaskV2';
import UsersIcon from 'icons/UsersIcon';

const SidebarButton = styled(ListItemButton)(({ theme }) => ({
  color: '#2D3748',
  textDecoration: 'none',
  '&.active': {
    color: '#2D3748',
    textDecoration: 'none'
  }
}));

const SideBar = ({ open, setOpenResourceModal, showControls }) => {
  const handleClose = () => {
    setOpenResourceModal(false);
  };

  const handleLogoClick = () => {
    setOpenResourceModal(false);
    showControls(true);
  };

  return (
    <Drawer
      anchor="left"
      variant="temporary"
      open={open}
      onClose={handleClose}
      sx={{
        width: '100%',
        '& .MuiDrawer-paper': {
          width: '262px',
          height: '100%'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '50px'
        }}
      >
        <IconButton
          sx={{
            overflow: 'visible',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            marginRight: '10px',
            marginLeft: '6px',
            marginTop: '6px'
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ marginTop: '7px' }}>
          <PhlaskIcon />
        </Box>
      </Box>

      <List>
        <SidebarButton onClick={handleClose}>
          <ListItemIcon sx={{ marginLeft: '-1px' }}>
            <PhlaskNoTextIcon />
          </ListItemIcon>
          <ListItemText sx={{ marginLeft: '-4px' }}>About</ListItemText>
        </SidebarButton>
        <SidebarButton onClick={handleClose}>
          <ListItemIcon sx={{ marginLeft: '-3px' }}>
            <UsersIcon />
          </ListItemIcon>
          <ListItemText>Join Team</ListItemText>
        </SidebarButton>
        <SidebarButton onClick={handleClose}>
          <ListItemIcon sx={{ marginLeft: '-3px' }}>
            <UsersIcon />
          </ListItemIcon>
          <ListItemText>Acknowledgements</ListItemText>
        </SidebarButton>
      </List>
    </Drawer>
  );
};

export default SideBar;
