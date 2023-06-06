import React from 'react';
import Dialog from '@mui/material/Dialog';
import ChooseResource from './ChooseResource';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DialogContent } from '@mui/material';
import { ReactComponent as CloseIcon } from '../icons/CloseIcon.svg';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form';
import { FormControl, TextField, Button } from '@mui/material';

const AddResourceModalV2 = props => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { handleSubmit, register } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  const onClose = () => props.setOpen(false);

  return (
    <>
      <Dialog open={props.open} onClose={onClose} fullScreen={fullScreen}>
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
    </>
  );
};

export default AddResourceModalV2;
