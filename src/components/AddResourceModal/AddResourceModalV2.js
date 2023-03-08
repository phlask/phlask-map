import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from '@mui/material/Dialog';
import ChooseResource from './ChooseResource';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { isMobile } from 'react-device-detect';
import styles from './AddResourceModal.module.scss';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DialogContent } from '@mui/material';
import { ReactComponent as CloseIcon } from '../icons/CloseIcon.svg';
import IconButton from '@mui/material/IconButton';

const AddResourceModalV2 = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const onClose = () => setOpen(false);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 20,
            top: 48,
            color: theme => theme.palette.grey[500]
          }}
          size="large"
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <ChooseResource setFormStep={() => {}} />
        </DialogContent>
      </Dialog>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${isMobile ? styles.mobileAddButton : ''} ${
          styles.addButton
        }`}
        data-cy="AddResourceButton"
      >
        <FontAwesomeIcon icon={faPlus} size="2x" />
      </button>
    </>
  );
};

export default AddResourceModalV2;
